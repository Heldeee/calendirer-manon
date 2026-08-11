import { Paper } from "@mui/material";
import { RADIUS } from "../../theme/radius";

export default function GlassCard({ children, sx = {}, ...props }) {
    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: `${RADIUS.card}px`,
                p: 2.5,
                bgcolor: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(227,154,166,0.25)",
                boxShadow:
                    "0 8px 30px rgba(183,110,121,0.10), 0 1px 3px rgba(183,110,121,0.06)",
                cursor: "default",
                userSelect: "none",
                ...sx,
            }}
            {...props}
        >
            {children}
        </Paper>
    );
}