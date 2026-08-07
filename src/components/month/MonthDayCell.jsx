import { Box, Typography } from "@mui/material";
import { RADIUS } from "../../theme/radius";

export default function MonthDayCell({ date, entry, isToday, isOutsideMonth }) {
    return (
        <Box
            sx={{
                borderRadius: `${RADIUS.card / 2}px`,
                height: "100%",
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.25,
                bgcolor: isOutsideMonth ? "transparent" : "rgba(255,255,255,0.85)",
                border: isToday ? "2Dpx solid rgba(255, 0, 43, 0.2)" : "1px solid transparent",
                opacity: isOutsideMonth ? 0.35 : 1,
            }}
        >
            <Typography
                variant="body2"
                fontWeight={600}
                color={isOutsideMonth ? "text.secondary" : "text.primary"}
            >
                {date.getDate()}
            </Typography>

            {/* Hauteur réservée systématiquement, même sans horaire, pour garder toutes les cellules identiques */}
            <Box sx={{ minHeight: 26, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {entry ? (
                    <>
                        <Typography sx={{ fontSize: "0.62rem", color: "primary.dark", fontWeight: 700, lineHeight: 1.15 }}>
                            {entry.debut}
                        </Typography>
                        <Typography sx={{ fontSize: "0.62rem", color: "text.secondary", lineHeight: 1.15 }}>
                            {entry.fin}
                        </Typography>
                    </>
                ) : (
                    <Typography sx={{ fontSize: "0.62rem", color: "transparent", lineHeight: 1.15 }}>
                        —
                    </Typography>
                )}
            </Box>
        </Box>
    );
}