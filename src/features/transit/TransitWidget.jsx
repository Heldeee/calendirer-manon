// TransitWidget.jsx
import GlassCard from "../../components/ui/GlassCard";
import { Typography } from "@mui/material";

export default function TransitWidget({ trip }) {
    if (!trip) return null; // invisible tant qu'aucune donnée
    return (
        <GlassCard sx={{ mt: 1.5, opacity: 0.9 }}>
            <Typography variant="body2">🚋 Départ à {trip.departureTime} — {trip.line}</Typography>
        </GlassCard>
    );
}