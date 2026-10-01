import { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { getTheme } from "./theme/theme";
import WeekView from "./components/week/WeekView";
import MonthView from "./components/month/MonthView";
import BottomNav from "./components/navigation/BottomNav";
import PasswordGate from "./components/auth/PasswordGate";
import BusView from "./features/transit/BusView";

const NAV_HEIGHT = 64;
const appTheme = getTheme();

export default function App() {
  const [tab, setTab] = useState("week");

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <PasswordGate>
        <Box
          sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            backgroundImage: "radial-gradient(circle, rgba(202,135,154,.09) 1px, transparent 1px), linear-gradient(180deg, #FFF9F7 0%, #FCEDF2 100%)",
            backgroundSize: "18px 18px, 100% 100%",
          }}
        >
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
              boxSizing: "border-box",
              pb: `calc(${NAV_HEIGHT}px + env(safe-area-inset-bottom, 0px))`,
            }}
          >
            {tab === "week" && <WeekView />}
            {tab === "month" && <MonthView />}
            {tab === "bus" && <BusView />}
          </Box>
        </Box>
        <BottomNav value={tab} onChange={setTab} height={NAV_HEIGHT} />
      </PasswordGate>
    </ThemeProvider>
  );
}
