import { Paper, BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import ViewWeekIcon from "@mui/icons-material/ViewWeekOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthOutlined";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBusOutlined";
import { RADIUS } from "../../theme/radius";
import hellokittySticker from "../../assets/hello-kitty.png"
import hellokittySticker2 from "../../assets/hello-kitty-2.png"
import KittyAccent from '../ui/KittyAccent';


export default function BottomNav({ value, onChange, height = 64 }) {
  return (
    <Paper
      component="nav"
      aria-label="Navigation principale"
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
        zIndex: 10,
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
          px: 4,
          "& .Mui-selected": { color: "primary.dark", bgcolor: '#FAEDF2' },
          "& .MuiBottomNavigationAction-root": {
            color: "text.secondary", flex: "1 1 0", minWidth: 0, maxWidth: "none",
            minHeight: 48, px: 1,
            my: .75, mx: .25, borderRadius: '14px', transition: 'background-color .18s ease',
          },
          "& .MuiBottomNavigationAction-label": { fontSize: '.7rem', mt: .25 },
          "& .MuiBottomNavigationAction-label.Mui-selected": { fontSize: '.7rem' },
          "& .MuiBottomNavigationAction-root:focus-visible": {
            outline: "2px solid #B76E79", outlineOffset: "-4px", borderRadius: "12px",
          },
        }}
      >
        <BottomNavigationAction label="Semaine" value="week" icon={<ViewWeekIcon />} />
        <BottomNavigationAction label="Mois" value="month" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction label="Bus" value="bus" icon={<DirectionsBusIcon />} />
      </BottomNavigation>
      <Box component="img" src={hellokittySticker} alt="" aria-hidden="true"
        sx={{ position: "absolute", width: 26, left: 5, top: 18, transform: "rotate(-20deg)", pointerEvents: "none" }} />
      <KittyAccent sx={{ position: 'absolute', width: 20, height: 16, left: '33.333%', top: 22, transform: 'translateX(-50%)', opacity: .7 }} />
      <Box component="img" src={hellokittySticker2} alt="" aria-hidden="true"
        sx={{ position: "absolute", width: 26, right: 5, top: 18, transform: "rotate(20deg)", pointerEvents: "none" }} />
    </Paper>
  );
}
