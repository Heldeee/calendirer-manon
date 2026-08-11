import { Paper, BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import ViewWeekIcon from "@mui/icons-material/ViewWeekOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthOutlined";
import { RADIUS } from "../../theme/radius";
import hellokittySticker from "../../assets/hello-kitty.png"
import hellokittySticker2 from "../../assets/hello-kitty-2.png"


export default function BottomNav({ value, onChange, height = 64 }) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: `${RADIUS.nav}px`,
        bgcolor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderTop: "1px solid rgba(227,154,166,0.2)",
        height: `calc(${height}px + env(safe-area-inset-bottom, 0px))`,
        pb: "env(safe-area-inset-bottom, 0px)",
        boxSizing: "border-box",
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={(_, v) => onChange(v)}
        showLabels
        sx={{
          height,
          bgcolor: "transparent",
          "& .Mui-selected": { color: "primary.dark" },
          "& .MuiBottomNavigationAction-root": { color: "text.secondary" },
        }}
      >
        <BottomNavigationAction label="Semaine" value="week" icon={<ViewWeekIcon />} />
        <Box
          component="img"
          src={hellokittySticker}
          alt=""
          sx={{
            position: "absolute",
            width: 70,
            right: 0,
            transform: "rotate(30deg)",
            transformOrigin: "center",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <Box
          component="img"
          src={hellokittySticker}
          alt=""
          sx={{
            position: "absolute",
            width: 70,
            left: 10,
            transform: "rotate(-30deg)",
            transformOrigin: "center",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <Box
          component="img"
          src={hellokittySticker2}
          alt=""
          sx={{
            position: "absolute",
            width: 50,
            transformOrigin: "center",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <BottomNavigationAction label="Mois" value="month" icon={<CalendarMonthIcon />} />
      </BottomNavigation>
    </Paper>
  );
}