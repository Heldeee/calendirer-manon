import { createTheme } from "@mui/material/styles";

const buildPalette = (mode) => ({
    mode,
    ...(mode === "light"
        ? {
            background: { default: "#FBF3EF", paper: "rgba(255,255,255,0.6)" },
            primary: { main: "#E8B4BC", contrastText: "#3A2C2F" },
            secondary: { main: "#B76E79" },
            text: { primary: "#3A2C2F", secondary: "#7A6265" },
        }
        : {
            background: { default: "#221A1D", paper: "rgba(45,32,36,0.55)" },
            primary: { main: "#C98A96", contrastText: "#F3E7E9" },
            secondary: { main: "#D89AA5" },
            text: { primary: "#F3E7E9", secondary: "#B79AA0" },
        }),
    gold: "#D9C08A",
});

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode: "light",
            background: {
                default: "#FDF6F3",
                paper: "#FFFFFF",
            },
            primary: {
                main: "#E39AA6",
                light: "#F4C9D1",
                dark: "#B76E79",
                contrastText: "#FFFFFF",
            },
            secondary: {
                main: "#D9C08A",
            },
            text: {
                primary: "#3A2C2F",
                secondary: "#9C848A",
            },
        },
        shape: { borderRadius: 24 },
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            h1: { fontSize: "1.9rem", fontWeight: 700 },
            h2: { fontSize: "2.1rem", fontWeight: 700, fontVariantNumeric: "tabular-nums" },
        },
        components: {
            MuiButtonBase: { defaultProps: { disableRipple: true } },
        },
    });