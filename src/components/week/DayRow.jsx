import { Stack, Typography, Chip } from "@mui/material";
import GlassCard from "../ui/GlassCard";
import HourChip from "../ui/HourChip";

export default function DayRow({ day, isToday }) {
    const label = day.date.toLocaleDateString("fr-FR", { weekday: "long" });
    const dateNum = day.date.getDate();

    return (
        <GlassCard sx={{ py: 1.8, px: 2.5, cursor: "default" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="baseline" sx={{ minWidth: 110 }}>
                    <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
                        {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dateNum}
                    </Typography>
                    {isToday && (
                        <Chip
                            label="Aujourd'hui"
                            size="small"
                            sx={{ height: 20, fontSize: "0.65rem", bgcolor: "primary.light", color: "primary.dark" }}
                        />
                    )}
                </Stack>

                {day.entry ? (
                    <Stack direction="row" spacing={1}>
                        <HourChip label={day.entry.debut} variant="start" />
                        <HourChip label={day.entry.fin} variant="end" />
                    </Stack>
                ) : (
                    <Chip
                        label="Off"
                        size="small"
                        sx={{ bgcolor: "rgba(156,132,138,0.12)", color: "text.secondary", fontWeight: 600, height: 28 }}
                    />
                )}
            </Stack>
        </GlassCard>
    );
}