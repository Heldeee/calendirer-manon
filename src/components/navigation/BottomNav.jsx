import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import ViewWeekIcon from "@mui/icons-material/ViewWeekOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthOutlined";
import { RADIUS } from "../../theme/radius";

export default function BottomNav({ value, onChange, height = 64 }) {
    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height,
                borderRadius: `${RADIUS.nav}px`,
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(20px) saturate(160%)",
                WebkitBackdropFilter: "blur(20px) saturate(160%)",
                borderTop: "1px solid rgba(227,154,166,0.2)",
            }}
            elevation={0}
        >
            <BottomNavigation
                value={value}
                onChange={(_, v) => onChange(v)}
                showLabels
                sx={{
                    height: "100%",
                    bgcolor: "transparent",
                    "& .Mui-selected": { color: "primary.dark" },
                    "& .MuiBottomNavigationAction-root": { color: "text.secondary" },
                }}
            >
                <BottomNavigationAction label="Semaine" value="week" icon={<ViewWeekIcon />} />
                <BottomNavigationAction label="Mois" value="month" icon={<CalendarMonthIcon />} />
            </BottomNavigation>
        </Paper>
    );
}