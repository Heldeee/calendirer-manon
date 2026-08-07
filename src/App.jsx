import { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { geTheme } from "./theme/theme";
import WeekView from "./components/week/WeekView";
import MonthView from "./components/month/MonthView";
import BottomNav from "./components/navigation/BottomNav";
import PasswordGate from "./components/auth/PasswordGate";

const NAV_HEIGHT = 64;

export default function App() {
  const [tab, setTab] = useState("week");

  return (
    <ThemeProvider theme={geTheme}>
      <CssBaseline />
      <PasswordGate>
        <Box
          sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg, #FDF6F3 0%, #FCEFF1 100%)",
          }}
        >
          <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden", pb: `${NAV_HEIGHT}px` }}>
            {tab === "week" && <WeekView />}
            {tab === "month" && <MonthView />}
          </Box>
        </Box>
        <BottomNav value={tab} onChange={setTab} height={NAV_HEIGHT} />
      </PasswordGate>
    </ThemeProvider>
  );
}