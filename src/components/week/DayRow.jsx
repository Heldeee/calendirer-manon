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
        py: 1,
        px: { xs: 1.5, sm: 2.5 },
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        bgcolor: isToday ? '#FFF8FA' : 'rgba(255,255,255,.82)',
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
            top: 4,
            left: 4,
            width: 24,
            opacity: .85,
            transform: "rotate(-12deg)",
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
          gap: 1,
          pl: isToday ? 2 : 0,
        }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            fontWeight: 500,
            fontSize: { xs: '.82rem', sm: '.95rem' },
          }}
        >
          {label} {dateNum}
        </Typography>

        {day.entry ? (
          <Stack direction="row" spacing={.75}>
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
