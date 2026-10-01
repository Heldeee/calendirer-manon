import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { plannedDepartures, tomorrowDate } from '../src/features/transit/plannedService.js';

const calendar = { regular: { service_id: 'regular', start_date: '20260101', end_date: '20261231', friday: '1' } };
const fixture = { calendar, exceptions: [], stops: { home: [
  { id: 'early', time: '06:30:00', service: 'regular' },
  { id: 'morning', time: '07:12:00', service: 'regular' },
  { id: 'night', time: '25:10:00', service: 'regular' },
] } };
test('Paris date crosses UTC midnight correctly', () => {
  assert.equal(tomorrowDate(Date.parse('2026-10-01T22:30:00Z')), '2026-10-03');
});
test('time filter, Paris summer time, and GTFS times beyond 24h', () => {
  const result = plannedDepartures(fixture, { id: 'home' }, '2026-10-02', '07:00');
  assert.equal(result.length, 2);
  assert.equal(new Date(result[0].time).toISOString(), '2026-10-02T05:12:00.000Z');
  assert.equal(new Date(result[1].time).toISOString(), '2026-10-02T23:10:00.000Z');
  assert.equal(result[0].realtime, false);
});
test('calendar removals and additions override weekly schedule', () => {
  const removed = { ...fixture, exceptions: [{ service_id: 'regular', date: '20261002', exception_type: '2' }] };
  assert.equal(plannedDepartures(removed, { id: 'home' }, '2026-10-02').length, 0);
  const added = { ...fixture, exceptions: [{ service_id: 'regular', date: '20261003', exception_type: '1' }] };
  assert.equal(plannedDepartures(added, { id: 'home' }, '2026-10-03', '07:00').length, 2);
});
test('winter time and missing calendar coverage', () => {
  const result = plannedDepartures(fixture, { id: 'home' }, '2026-10-30', '07:00');
  assert.equal(new Date(result[0].time).toISOString(), '2026-10-30T06:12:00.000Z');
  assert.throws(() => plannedDepartures(fixture, { id: 'home' }, '2027-01-01'));
});
test('official TBM snapshot contains both journeys for tomorrow', () => {
  const data = JSON.parse(readFileSync(new URL('../public/bus-schedule.json', import.meta.url), 'utf8'));
  for (const id of ['home', 'work']) {
    const departures = plannedDepartures(data, { id }, '2026-10-02');
    assert.equal(departures.length, 3);
    assert.ok(departures.every((departure) => !departure.realtime));
  }
});
