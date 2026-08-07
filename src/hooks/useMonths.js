import { toISO } from "../utils/date";

export function useMonths() {
  const today = new Date();
  const anchorYear = today.getFullYear();
  const anchorMonth = today.getMonth();

  const offsets = [-1, 0, 1, 2];

  const months = offsets.map((offset) => {
    const d = new Date(anchorYear, anchorMonth + offset, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  return { months, anchorIndex: offsets.indexOf(0), todayISO: toISO(today) };
}