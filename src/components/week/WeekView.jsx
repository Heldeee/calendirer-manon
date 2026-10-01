import { useState, useRef } from "react";
import { Box } from "@mui/material";
import { useWeeks } from "../../hooks/useWeeks";
import { useScheduleData } from "../../hooks/useSchedule";
import PagerHeader from "../ui/PagerHeader";
import WeekPager from "./WeekPager";

export default function WeekView() {
  const schedule = useScheduleData();
  const { weeks, anchorIndex, todayISO } = useWeeks(schedule);
  const [activeIndex, setActiveIndex] = useState(anchorIndex);
  const pagerRef = useRef(null);

  const activeWeek = weeks[activeIndex];
  const label = `Semaine du ${activeWeek.monday.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}`;

  const isOnCurrentWeek = activeIndex === anchorIndex;

  const goToToday = () => {
    pagerRef.current?.scrollToIndex(anchorIndex);
  };

  return (
    <Box sx={{ height: "100%", width: '100%', maxWidth: 680, mx: 'auto', display: "flex", flexDirection: "column" }}>
      <PagerHeader
        eyebrow="Planning"
        label={label}
        action={!isOnCurrentWeek ? { label: "Aujourd'hui", onClick: goToToday } : null}
      />
      <WeekPager
        ref={pagerRef}
        weeks={weeks}
        anchorIndex={anchorIndex}
        todayISO={todayISO}
        onActiveChange={setActiveIndex}
      />
    </Box>
  );
}
