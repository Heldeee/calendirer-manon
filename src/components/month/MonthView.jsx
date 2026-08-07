import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useMonths } from "../../hooks/useMonths";
import PagerHeader from "../ui/PagerHeader";
import MonthPager from "./MonthPager";

const JOURS_LABEL = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function MonthView() {
  const { months, anchorIndex, todayISO } = useMonths();
  const [activeIndex, setActiveIndex] = useState(anchorIndex);

  const active = months[activeIndex];
  const label = new Date(active.year, active.month, 1).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PagerHeader eyebrow="Calendrier" label={label} />

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", px: 2, pt: 1.5, flexShrink: 0 }}>
        {JOURS_LABEL.map((j) => (
            <Typography
            key={j}
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            sx={{ textAlign: "center", width: "100%" }}
            >
            {j}
            </Typography>
        ))}
    </Box>

      <MonthPager
        months={months}
        anchorIndex={anchorIndex}
        todayISO={todayISO}
        onActiveChange={setActiveIndex}
      />
    </Box>
  );
}