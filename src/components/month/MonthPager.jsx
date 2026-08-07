import { useRef, useLayoutEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import MonthGrid from "./MonthGrid";

export default function MonthPager({ months, anchorIndex, todayISO, onActiveChange }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(anchorIndex);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: anchorIndex * el.clientHeight, behavior: "auto" });
  }, [anchorIndex]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollTop / el.clientHeight);
    if (index !== activeIndex) {
      setActiveIndex(index);
      onActiveChange?.(index);
    }
  };

  return (
    <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          height: "100%",
          minHeight: 0,
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {months.map((m, i) => (
          <Box
            key={i}
            sx={{ height: "100%", scrollSnapAlign: "start", scrollSnapStop: "always", boxSizing: "border-box" }}
          >
            <MonthGrid year={m.year} month={m.month} todayISO={todayISO} />
          </Box>
        ))}
      </Box>

      <Stack spacing={0.8} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }}>
        {months.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: i === activeIndex ? 16 : 6,
              borderRadius: 3,
              bgcolor: i === activeIndex ? "primary.dark" : "rgba(156,132,138,0.4)",
              transition: "all 0.25s ease",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}