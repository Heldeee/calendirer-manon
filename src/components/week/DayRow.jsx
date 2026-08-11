import { Stack, Typography, Chip, Box } from "@mui/material";
import GlassCard from "../ui/GlassCard";
import HourChip from "../ui/HourChip";
import hellokittySticker from "../../assets/hello-kitty.png"

export default function DayRow({ day, isToday }) {
  const label = day.date.toLocaleDateString("fr-FR", {
    weekday: "long",
  });

  const dateNum = day.date.getDate();

  return (
    <GlassCard
      sx={{
        position: "relative",
        overflow: "visible",
        py: 1.8,
        px: 2.5,
        border: isToday
          ? "1px solid rgba(227, 154, 166, 0.68)"
          : "1px solid rgba(227, 154, 166, 0.25)",
        borderLeft: isToday ? "4px solid" : undefined,
        borderLeftColor: isToday ? "primary.dark" : undefined,
      }}
    >
      {isToday && (
        <Box
          component="img"
          src={hellokittySticker}
          alt=""
          sx={{
            position: "absolute",
            top: -10,
            right: -20,
            width: 50,
            transform: "rotate(30deg)",
            transformOrigin: "center",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            fontWeight: 600,
          }}
        >
          {label} {dateNum}
        </Typography>

        {day.entry ? (
          <Stack direction="row" spacing={2}>
            <HourChip label={day.entry.debut} variant="start" />
            <HourChip label={day.entry.fin} variant="end" />
          </Stack>
        ) : (
          <Chip
            label="Journée OFF"
            size="small"
            sx={{
              bgcolor: "rgba(156,132,138,0.12)",
              color: "text.secondary",
              fontWeight: 600,
              height: 28,
            }}
          />
        )}
      </Box>
    </GlassCard>
  );
}