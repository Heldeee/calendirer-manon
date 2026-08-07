import { Box } from "@mui/material";
import { useWeeks } from "../../hooks/useWeeks";
import WeekHeader from "./WeekHeader";
import WeekPager from "./WeekPager";
import schedule from "../../data/schedule.json";

export default function WeekView() {
    const { weeks, anchorIndex, todayISO } = useWeeks(schedule);
    const anchorWeek = weeks[anchorIndex];
    const label = `Semaine du ${anchorWeek.monday.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}`;

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <WeekHeader label={label} />
            <WeekPager weeks={weeks} anchorIndex={anchorIndex} todayISO={todayISO} />
        </Box>
    );
}