"""Extract the two line 24 quays from the official TBM GTFS publication."""
import argparse
import csv
import io
import json
from pathlib import Path
from datetime import datetime, timezone
import urllib.request
import zipfile

SOURCE = 'https://www.pigma.org/public/opendata/nouvelle_aquitaine_mobilites/publication/bordeaux_metropole-aggregated-gtfs.zip'
QUAYS = {'MOBIITI:Quay:68139': ('home', '1'), 'MOBIITI:Quay:68904': ('work', '0')}


def extract(archive):
    def rows(name):
        with archive.open(name) as source:
            yield from csv.DictReader(io.TextIOWrapper(source, encoding='utf-8-sig'))

    trips = {trip['trip_id']: trip for trip in rows('trips.txt')
             if trip['route_id'] == 'BORDEAUX_METROPOLE:Line:24'}
    stops = {'home': [], 'work': []}
    services = set()
    for row in rows('stop_times.txt'):
        quay = QUAYS.get(row['stop_id'])
        trip = trips.get(row['trip_id'])
        if not quay or not trip or trip['direction_id'] != quay[1] or row['pickup_type'] == '1':
            continue
        headsign = row['stop_headsign'] or trip['trip_headsign']
        # Exclude short workings to Pessac Centre from the Bouliac journey.
        if quay[0] == 'home' and 'BOULIAC' not in headsign.upper():
            continue
        departure = row['departure_time'] or row['arrival_time']
        if not departure:
            continue
        stops[quay[0]].append({'id': trip['trip_id'], 'time': departure,
                             'service': trip['service_id'], 'destination': headsign})
        services.add(trip['service_id'])
    calendar = {row['service_id']: row for row in rows('calendar.txt') if row['service_id'] in services}
    exceptions = [row for row in rows('calendar_dates.txt') if row['service_id'] in services]
    if not all(stops.values()) or not calendar:
        raise ValueError('GTFS does not contain the expected line 24 timetables')
    return {'updated': datetime.now(timezone.utc).isoformat(), 'source': SOURCE,
            'calendar': calendar, 'exceptions': exceptions, 'stops': stops}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--archive', help='Local GTFS ZIP for offline generation')
    args = parser.parse_args()
    if args.archive:
        archive = zipfile.ZipFile(args.archive)
    else:
        with urllib.request.urlopen(SOURCE, timeout=90) as response:
            archive = zipfile.ZipFile(io.BytesIO(response.read()))
    with archive:
        data = extract(archive)
    target = Path(__file__).resolve().parents[1] / 'public' / 'bus-schedule.json'
    target.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print('TBM timetable:', {key: len(value) for key, value in data['stops'].items()})
