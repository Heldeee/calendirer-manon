import { Chip } from "@mui/material";
import { RADIUS } from "../../theme/radius";

export default function HourChip({ label, variant = "start" }) {
    return (
        <Chip
            label={label}
            size="small"
            clickable={false}
            sx={{
                fontWeight: 700,
                fontSize: "0.82rem",
                height: 30,
                borderRadius: `${RADIUS.chip}px`,
                bgcolor: variant === "start" ? "primary.light" : "secondary.light",
                color: "primary.dark",
                pointerEvents: "none", // aucune interaction, aucun état hover/active possible
                "& .MuiChip-label": { px: 1.2 },
            }}
        />
    );
}