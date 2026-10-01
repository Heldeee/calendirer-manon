const BASE = 'https://bdx.mecatran.com/utw/ws/siri/2.0/bordeaux/';
export const BUS_STOPS = [
  { id: 'home', name: 'Stade Nautique', direction: 'Bouliac Centre Commercial', ref: '5525', directionRef: '1' },
  { id: 'work', name: 'Vincent', direction: 'Pessac · Cap de Bos', ref: '1205', directionRef: '0' },
];
const value = (item) => typeof item === 'string' ? item : item?.value ?? '';
const array = (item) => item == null ? [] : Array.isArray(item) ? item : [item];
export function parseDepartures(data, stop, now = Date.now()) {
  const deliveries = data.Siri?.ServiceDelivery?.StopMonitoringDelivery;
  if (!deliveries) throw new Error('Réponse TBM non reconnue.');
  const departures = [];
  for (const delivery of array(deliveries)) {
    if (delivery.Status === false || delivery.ErrorCondition) throw new Error('Les passages TBM sont indisponibles.');
    for (const visit of array(delivery.MonitoredStopVisit)) {
      const journey = visit.MonitoredVehicleJourney;
      if (!journey || value(journey.LineRef) !== 'bordeaux:Line:24:LOC' || value(journey.DirectionRef) !== stop.directionRef) continue;
      const call = journey.MonitoredCall;
      if (!call || call.Cancellation === true || value(call.DepartureStatus) === 'cancelled') continue;
      const expected = call.ExpectedDepartureTime || call.ExpectedArrivalTime;
      const aimed = call.AimedDepartureTime || call.AimedArrivalTime;
      const time = Date.parse(expected || aimed);
      if (!Number.isFinite(time) || time < now) continue;
      departures.push({ id: value(journey.FramedVehicleJourneyRef?.DatedVehicleJourneyRef) || `${time}`, time,
        realtime: Boolean(expected) && journey.Monitored !== false,
        destination: value(array(journey.DirectionName)[0]) || value(array(journey.DestinationName)[0]),
        delay: expected && Number.isFinite(Date.parse(aimed)) ? Math.round((time - Date.parse(aimed)) / 60000) : 0 });
    }
  }
  return [...new Map(departures.map((departure) => [departure.id, departure])).values()].sort((a, b) => a.time - b.time).slice(0, 4);
}
export async function getDepartures(stop, signal) {
  const url = new URL('stop-monitoring.json', BASE);
  url.search = new URLSearchParams({ AccountKey: 'opendata-bordeaux-metropole-flux-gtfs-rt', MonitoringRef: `bordeaux:StopPoint:BP:${stop.ref}:LOC` });
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error('Le flux TBM est indisponible.');
  return parseDepartures(await response.json(), stop);
}
