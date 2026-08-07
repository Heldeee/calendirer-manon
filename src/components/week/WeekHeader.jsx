import { Box, Typography } from "@mui/material";

export const WEEK_HEADER_HEIGHT = 88;

export default function WeekHeader({ label }) {
    return (
        <Box
            sx={{
                height: WEEK_HEADER_HEIGHT,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 3,
                background: "linear-gradient(160deg, #FFFFFF 0%, #FDF0F2 100%)",
                borderBottom: "1px solid rgba(227,154,166,0.18)",
            }}
        >
            <Typography variant="overline" color="text.secondary" fontWeight={600}>
                Planning
            </Typography>
            <Typography variant="h1" sx={{ fontSize: "1.5rem", textTransform: "capitalize" }}>
                {label}
            </Typography>
        </Box>
    );
}