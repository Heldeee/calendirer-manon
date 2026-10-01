import { Box, Typography } from "@mui/material";
import { RADIUS } from "../../theme/radius";
import KittyAccent from '../ui/KittyAccent';

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
                position: 'relative',
                minHeight: 0,
                bgcolor: isOutsideMonth ? "transparent" : isToday ? '#FFF8FA' : "rgba(255,255,255,0.82)",
                border: isToday ? "1px solid #CA879A" : isOutsideMonth ? '1px solid transparent' : "1px solid #F0DEE5",
                boxShadow: isOutsideMonth ? 'none' : '0 3px 12px rgba(183,110,121,.035)',
                opacity: isOutsideMonth ? 0.35 : 1,
            }}
        >
            {isToday ? <KittyAccent sx={{ position: 'absolute', right: 1, top: 1, width: 16, height: 12 }} /> : null}
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
                        <Typography sx={{ fontSize: "0.62rem", color: "#754B5B", bgcolor: '#F5D9E3', px: .5, borderRadius: '5px', fontWeight: 600, lineHeight: 1.35, fontVariantNumeric: 'tabular-nums' }}>
                            {entry.debut}
                        </Typography>
                        <Typography sx={{ fontSize: "0.62rem", color: "#8F5D70", lineHeight: 1.35, fontVariantNumeric: 'tabular-nums' }}>
                            {entry.fin}
                        </Typography>
                    </>
                ) : (
                    <Typography sx={{ fontSize: "0.6rem", color: isOutsideMonth ? 'transparent' : '#A68A93', lineHeight: 1.15 }}>
                        OFF
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
