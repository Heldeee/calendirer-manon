import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import GlassCard from '../../components/ui/GlassCard';
import { BUS_STOPS, getDepartures } from './transitService';
import { plannedDepartures, tomorrowDate } from './plannedService';
const clock = (time) => new Date(time).toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
export default function BusView() {
  const [states, setStates] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [mode, setMode] = useState('current');
  const [from, setFrom] = useState('06:00');
  const [schedule, setSchedule] = useState(null);
  const [scheduleError, setScheduleError] = useState('');
  const tomorrow = tomorrowDate(now);
  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(tick);
  }, []);
  useEffect(() => {
    if (mode !== 'tomorrow') return;
    const controller = new AbortController();
    setScheduleError('');
    fetch(`${import.meta.env.BASE_URL}bus-schedule.json`, { signal: controller.signal, cache: 'no-cache' })
      .then((response) => { if (!response.ok) throw new Error('Horaires indisponibles'); return response.json(); })
      .then(setSchedule)
      .catch(() => { if (!controller.signal.aborted) setScheduleError('Fiche horaire indisponible.'); });
    return () => controller.abort();
  }, [mode, refresh]);
  useEffect(() => {
    if (mode !== 'current') return;
    const controller = new AbortController();
    let active = true;
    let busy = false;
    async function load() {
      if (busy || document.hidden) return;
      busy = true;
      await Promise.all(BUS_STOPS.map(async (stop) => {
        setStates((previous) => ({ ...previous, [stop.id]: { ...previous[stop.id], loading: true } }));
        try {
          const departures = await getDepartures(stop, AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]));
          if (active) setStates((previous) => ({ ...previous, [stop.id]: { departures, updated: Date.now(), loading: false } }));
        } catch {
          if (active) setStates((previous) => ({ ...previous, [stop.id]: { ...previous[stop.id], loading: false, error: 'Impossible de récupérer les passages TBM. Réessaie dans un instant.' } }));
        }
      }));
      busy = false;
    }
    load();
    const interval = setInterval(load, 30000);
    document.addEventListener('visibilitychange', load);
    return () => { active = false; controller.abort(); clearInterval(interval); document.removeEventListener('visibilitychange', load); };
  }, [refresh, mode]);
  const loading = mode === 'current' && Object.values(states).some((state) => state.loading);
  return <Box sx={{ height: '100%', minHeight: 0, overflow: 'hidden', boxSizing: 'border-box', containerType: 'size', px: { xs: 2, sm: 3 }, py: 1.5, maxWidth: 680, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
      <Typography component="h1" sx={{ fontFamily: '"Fraunces", serif', fontWeight: 500, color: '#665257', fontSize: 'clamp(1.5rem, 4cqh, 1.9rem)', lineHeight: 1.2 }}>Bus</Typography>
      <Button aria-label="Actualiser les horaires" disabled={loading} onClick={() => setRefresh((n) => n + 1)} sx={{ minWidth: 44, minHeight: 44, color: '#B76E79' }}><RefreshIcon /></Button>
    </Box>
    <Box sx={{ display: 'flex', gap: .5, p: .5, borderRadius: '14px', bgcolor: '#F5E8EC', flexShrink: 0 }}>
      {[['current', 'Actuel'], ['tomorrow', 'Demain']].map(([value, label]) => <Button key={value} aria-pressed={mode === value} onClick={() => setMode(value)} sx={{ flex: 1, minHeight: 34, borderRadius: '11px', textTransform: 'none', color: '#765E65', bgcolor: mode === value ? 'rgba(255,255,255,.9)' : 'transparent', boxShadow: mode === value ? '0 2px 6px rgba(120,80,90,.05)' : 'none' }}>{label}</Button>)}
    </Box>
    {mode === 'tomorrow' ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexShrink: 0 }}>
      <Typography sx={{ fontSize: '.75rem', color: '#765E65' }}>{new Date(`${tomorrow}T12:00:00Z`).toLocaleDateString('fr-FR', { timeZone: 'Europe/Paris', weekday: 'long', day: 'numeric', month: 'long' })}</Typography>
      <Box component="label" sx={{ display: 'flex', alignItems: 'center', gap: .75, fontSize: '.7rem', color: '#9C848A' }}>À partir de
        <Box component="input" aria-label="Heure de départ demain" type="time" value={from} onChange={(event) => { if (event.target.value) setFrom(event.target.value); }} sx={{ width: 90, color: '#765E65', bgcolor: 'rgba(255,255,255,.75)', border: '1px solid #EBD8DE', borderRadius: '8px', p: .5, font: 'inherit' }} />
      </Box>
    </Box> : null}
    <Box sx={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>{BUS_STOPS.map((stop) => {
      let state = states[stop.id];
      if (mode === 'tomorrow') {
        state = { loading: !schedule && !scheduleError, error: scheduleError };
        if (schedule && !scheduleError) {
          try { state = { departures: plannedDepartures(schedule, stop, tomorrow, from), updated: Date.parse(schedule.updated) }; }
          catch (error) { state = { error: error.message }; }
        }
      }
      const departures = (state?.departures || []).filter((departure) => mode === 'tomorrow' || departure.time >= now);
      const stale = mode === 'current' && Boolean(state?.error || (state?.updated && now - state.updated > 90000));
      const next = departures[0];
      const minutes = next ? Math.max(0, Math.ceil((next.time - now) / 60000)) : 0;
      const direction = (next?.destination || (stop.id === 'work' ? 'Pessac' : stop.direction))
        .replace(/BOULIAC/g, 'Bouliac').replace(/PESSAC/g, 'Pessac');
      return <GlassCard key={stop.id} component="section" aria-labelledby={`stop-${stop.id}`} sx={{ minHeight: 0, p: 'clamp(12px, 2.5cqh, 24px)', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.4cqh, 14px)', border: '1px solid #F0E0E3', boxShadow: '0 4px 18px rgba(183,110,121,.045)', bgcolor: 'rgba(255,255,255,.76)' }}>
        <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
          <Box sx={{ bgcolor: '#F9EFF1', color: '#98727C', borderRadius: '12px', width: 32, height: 32, display: 'grid', placeItems: 'center', fontSize: '.85rem', fontWeight: 600, flexShrink: 0 }}>24</Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography id={`stop-${stop.id}`} component="h2" sx={{ fontFamily: '"Fraunces", serif', fontWeight: 500, color: '#665257', fontSize: 'clamp(1.1rem, 2.8cqh, 1.35rem)', lineHeight: 1.15 }}>{stop.name}</Typography>
          </Box>
        </Box>
        <Box sx={{ px: 1.25, py: .75, borderRadius: '12px', bgcolor: '#FAF3F4' }}>
          <Typography sx={{ color: '#9C848A', fontSize: '.65rem', lineHeight: 1.2 }}>Direction</Typography>
          <Typography sx={{ color: '#765E65', fontSize: 'clamp(.8rem, 2.1cqh, .95rem)', lineHeight: 1.3, mt: .25 }}>{direction}</Typography>
        </Box>
        <Box aria-live="polite" sx={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center' }}>
          {next ? <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(90px, .65fr)', gap: 1.5, alignItems: 'center' }}>
            <Box>
              <Typography sx={{ fontSize: '.7rem', color: '#9C848A' }}>{mode === 'tomorrow' ? 'Passage prévu' : 'Prochain passage'}</Typography>
              <Typography sx={{ fontSize: 'clamp(1.6rem, 4.6cqh, 2.4rem)', fontWeight: 500, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums', color: '#665257' }}>{clock(next.time)}</Typography>
              <Typography sx={{ fontSize: 'clamp(.8rem, 2cqh, .95rem)', color: '#A37B86', fontWeight: 400 }}>{mode === 'tomorrow' ? 'Demain' : stale ? 'À confirmer' : minutes <= 1 ? 'Imminent' : `Dans ${minutes} min`}</Typography>
              <PassageStatus departure={next} />
            </Box>
            <Box sx={{ borderLeft: '1px solid #F0DCE0', pl: 1.5 }}>
              <Typography sx={{ fontSize: '.65rem', color: '#9C848A', mb: .5 }}>Les suivants</Typography>
              {departures.slice(1, 3).map((departure) => <Box key={departure.id} sx={{ py: .5 }}>
                <Typography sx={{ fontWeight: 400, color: '#765E65', fontSize: 'clamp(.9rem, 2.4cqh, 1.1rem)', lineHeight: 1.15, fontVariantNumeric: 'tabular-nums' }}>{clock(departure.time)}</Typography>
                <PassageStatus departure={departure} small />
              </Box>)}
              {departures.length < 2 ? <Typography sx={{ fontSize: '.75rem', color: '#9C848A' }}>Non annoncés</Typography> : null}
            </Box>
          </Box> : <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!state || (state.loading && !state.updated && !state.error) ? <><CircularProgress size={18} /><Typography variant="body2">Recherche des passages…</Typography></> : <Typography variant="body2" color="text.secondary">{state.error ? mode === 'tomorrow' ? state.error : 'Flux TBM indisponible.' : mode === 'tomorrow' ? 'Aucun passage prévu après cette heure.' : 'Aucun passage annoncé.'}</Typography>}
          </Box>}
        </Box>
        <Box sx={{ borderTop: '1px solid #F5E7EA', pt: .75, flexShrink: 0 }}>
          {stale && state?.updated ? <Typography sx={{ fontSize: '.65rem', color: '#A15F6B' }}>Données anciennes · à confirmer</Typography> : null}
          <Typography sx={{ fontSize: '.65rem', color: '#9C848A' }}>{state?.updated ? mode === 'tomorrow' ? `Fiche récupérée le ${new Date(state.updated).toLocaleDateString('fr-FR', { timeZone: 'Europe/Paris' })}` : `Mis à jour à ${clock(state.updated)}` : mode === 'tomorrow' ? 'Horaires théoriques TBM' : 'En attente du flux TBM'}{state?.loading && state?.updated ? ' · Actualisation…' : ''}</Typography>
        </Box>
      </GlassCard>;
    })}</Box>
    {mode === 'tomorrow' ? <Typography sx={{ fontSize: '.65rem', color: '#9C848A', flexShrink: 0 }}>Horaires prévus, sans estimation de retard. <Box component="a" href="https://www.infotbm.com/fr/lignes/24" target="_blank" rel="noreferrer" sx={{ color: '#98727C' }}>Fiche officielle ↗</Box></Typography> : null}
  </Box>;
}

function PassageStatus({ departure, small = false }) {
  return <Box sx={{ mt: .35 }}>
    <Typography sx={{ fontSize: small ? '.6rem' : '.7rem', color: departure.realtime ? '#628270' : '#9C848A', lineHeight: 1.2 }}>{departure.realtime ? '● Temps réel' : 'Horaire théorique'}</Typography>
    {departure.realtime && departure.delay > 0 ? <Typography sx={{ fontSize: small ? '.6rem' : '.7rem', color: '#B76E79', lineHeight: 1.2, mt: .25 }}>Retard +{departure.delay} min</Typography> : null}
  </Box>;
}
