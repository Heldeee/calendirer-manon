import { Stack } from "@mui/material";
import DayRow from "./DayRow";


export default function WeekPage({ week, todayISO }) {
    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                display: 'grid',
                gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                flexShrink: 0,
                px: 2.5,
                py: 2,
                gap: 1.25,
                boxSizing: "border-box",
            }}
        >
            {week.days.map((day) => (
                <DayRow key={day.dateISO} day={day} isToday={day.dateISO === todayISO} />
            ))}
        </Stack>
    );
}
