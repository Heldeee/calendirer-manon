const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
export function parisDate(now = Date.now()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
export function tomorrowDate(now = Date.now()) {
  const today = new Date(`${parisDate(now)}T12:00:00Z`);
  today.setUTCDate(today.getUTCDate() + 1);
  return today.toISOString().slice(0, 10);
}

// GTFS times are local to the agency and can exceed 24:00 after midnight.
function parisTime(date, time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const wall = Date.parse(`${date}T00:00:00Z`) + (hours * 3600 + minutes * 60 + seconds) * 1000;
  let result = wall;
  for (let i = 0; i < 3; i++) {
    const offsetName = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Paris', timeZoneName: 'shortOffset' }).formatToParts(result).find((part) => part.type === 'timeZoneName').value;
    const offset = Number(offsetName.replace('GMT', '') || 0) * 3600000;
    result = wall - offset;
  }
  return result;
}

export function plannedDepartures(data, stop, date, from = '06:00') {
  const key = date.replaceAll('-', '');
  const weekday = weekdays[new Date(`${date}T12:00:00Z`).getUTCDay()];
  const covered = Object.values(data.calendar).some((row) => row.start_date <= key && row.end_date >= key)
    || data.exceptions.some((row) => row.date === key && row.exception_type === '1');
  if (!covered) throw new Error('Les horaires publiés ne couvrent pas cette date.');
  const services = new Set(Object.values(data.calendar).filter((row) => row.start_date <= key && row.end_date >= key && row[weekday] === '1').map((row) => row.service_id));
  for (const row of data.exceptions) {
    if (row.date !== key) continue;
    if (row.exception_type === '1') services.add(row.service_id);
    else if (row.exception_type === '2') services.delete(row.service_id);
  }
  const threshold = parisTime(date, `${from}:00`);
  return (data.stops[stop.id] || []).filter((departure) => services.has(departure.service)).map((departure) => ({
    id: departure.id, time: parisTime(date, departure.time), destination: departure.destination,
    realtime: false, delay: 0,
  })).filter((departure) => departure.time >= threshold).sort((a, b) => a.time - b.time).slice(0, 3);
}
