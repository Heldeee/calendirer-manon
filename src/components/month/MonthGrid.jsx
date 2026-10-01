import { Box } from "@mui/material";
import MonthDayCell from "./MonthDayCell";
import { useScheduleData } from "../../hooks/useSchedule";
import { toISO } from "../../utils/date";

export default function MonthGrid({ year, month, todayISO }) {
  const schedule = useScheduleData();

  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = startOffset; i > 0; i--) {
    const d = new Date(year, month, 1);
    d.setDate(d.getDate() - i);
    cells.push(d);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1];
    const d = new Date(last);
    d.setDate(d.getDate() + 1);
    cells.push(d);
  }

  const rowCount = cells.length / 7;

  return (
    <Box
      sx={{
        height: "100%",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
        gap: 0.75,
        px: 2.5,
        py: 1.5,
      }}
    >
      {cells.map((date, i) => {
        const iso = toISO(date);
        const isOutsideMonth = date.getMonth() !== month;
        const entry = schedule[iso] || null;

        return (
          <MonthDayCell
            key={i}
            date={date}
            entry={isOutsideMonth ? null : entry}
            isToday={iso === todayISO}
            isOutsideMonth={isOutsideMonth}
          />
        );
      })}
    </Box>
  );
}
