import { Chip } from "@mui/material";
import { RADIUS } from "../../theme/radius";

export default function HourChip({ label, variant = "start" }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontWeight: 700,
        fontSize: "0.82rem",
        height: 30,
        borderRadius: `${RADIUS.chip}px`,
        ...(variant === "start"
          ? { bgcolor: "primary.main", color: "#FFFFFF" }
          : { bgcolor: "transparent", color: "primary.dark", border: "1.5px solid", borderColor: "primary.light" }),
        pointerEvents: "none",
        "& .MuiChip-label": { px: 1.2 },
      }}
    />
  );
}