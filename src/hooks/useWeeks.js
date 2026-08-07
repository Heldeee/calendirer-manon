import { toISO, startOfWeekMonday } from "../utils/date";

export function useWeeks(schedule) {
  const today = new Date();
  const todayISO = toISO(today);
  const todayMonday = startOfWeekMonday(today);

  const dateKeys = Object.keys(schedule).sort();

  let firstMonday = todayMonday;
  let lastMonday = todayMonday;

  if (dateKeys.length > 0) {
    const firstDataMonday = startOfWeekMonday(new Date(dateKeys[0]));
    const lastDataMonday = startOfWeekMonday(new Date(dateKeys[dateKeys.length - 1]));

    firstMonday = firstDataMonday < todayMonday ? firstDataMonday : todayMonday;
    lastMonday = lastDataMonday > todayMonday ? lastDataMonday : todayMonday;
  }

  const weeks = [];
  let cursor = new Date(firstMonday);
  while (cursor <= lastMonday) {
    const monday = new Date(cursor);
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const iso = toISO(d);
      return { dateISO: iso, date: d, entry: schedule[iso] ?? null };
    });
    weeks.push({ monday, days });
    cursor.setDate(cursor.getDate() + 7);
  }

  const anchorIndex = weeks.findIndex(
    (w) => w.monday.getTime() === todayMonday.getTime()
  );

  return { weeks, anchorIndex, todayISO };
}