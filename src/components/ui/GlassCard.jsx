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
                bgcolor: "rgba(255,255,255,0.82)",
                border: "1px solid #F0DEE5",
                boxShadow:
                    "0 4px 18px rgba(183,110,121,0.055)",
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
