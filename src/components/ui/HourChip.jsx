import { Chip } from "@mui/material";
import { RADIUS } from "../../theme/radius";

export default function HourChip({ label, variant = "start" }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: { xs: '.72rem', sm: '.8rem' },
        height: 28,
        borderRadius: `${RADIUS.chip}px`,
        ...(variant === "start"
          ? { bgcolor: "#F5D9E3", color: "#754B5B" }
          : { bgcolor: "#FFF9FB", color: "#8F5D70", border: "1px solid #EED2DC" }),
        pointerEvents: "none",
        "& .MuiChip-label": { px: 1, fontVariantNumeric: 'tabular-nums' },
      }}
    />
  );
}
