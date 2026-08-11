import { Stack } from "@mui/material";
import DayRow from "./DayRow";
import { motion } from "framer-motion"


export default function WeekPage({ week, todayISO }) {
    return (
        <Stack
            justifyContent="center"
            sx={{
                width: "100%",
                height: "100%",
                flexShrink: 0,
                px: 4,
                gap: 1.5,
                boxSizing: "border-box",
            }}
        >
            {week.days.map((day) => (
                <DayRow key={day.dateISO} day={day} isToday={day.dateISO === todayISO} />
            ))}
        </Stack>
    );
}