import { Box, Typography } from "@mui/material";
import MonthDayCell from "./MonthDayCell";
import schedule from "../../data/schedule.json";

function toISO(d) { return d.toISOString().split("T")[0]; }

const JOURS_LABEL = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function MonthView() {
    const today = new Date();
    const todayISO = toISO(today);
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    // getDay() : 0=dimanche...6=samedi → on veut lundi=0...dimanche=6
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];

    // Jours du mois précédent pour compléter le début de la grille
    for (let i = startOffset; i > 0; i--) {
        const d = new Date(year, month, 1);
        d.setDate(d.getDate() - i);
        cells.push(d);
    }
    // Jours du mois en cours
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push(new Date(year, month, d));
    }
    // Compléter à un multiple de 7 (5 ou 6 lignes selon le mois, jamais de ligne vide en trop)
    while (cells.length % 7 !== 0) {
        const last = cells[cells.length - 1];
        const d = new Date(last);
        d.setDate(d.getDate() + 1);
        cells.push(d);
    }

    const rowCount = cells.length / 7;

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", px: 2, py: 3, boxSizing: "border-box" }}>
            <Typography variant="h1" sx={{ mb: 2, textTransform: "capitalize", flexShrink: 0 }}>
                {today.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </Typography>

            {/* En-tête des jours, mêmes colonnes que la grille en dessous (CSS Grid, pas MUI Grid) */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    mb: 1,
                    flexShrink: 0,
                }}
            >
                {JOURS_LABEL.map((j) => (
                    <Typography key={j} variant="caption" color="text.secondary" fontWeight={600} textAlign="center">
                        {j}
                    </Typography>
                ))}
            </Box>

            {/* Grille des jours : remplit tout l'espace restant, colonnes/lignes garanties égales */}
            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gridTemplateRows: `repeat(${rowCount}, 1fr)`,
                    gap: 0.75,
                }}
            >
                {cells.map((date, i) => {
                    const iso = toISO(date);
                    const isOutsideMonth = date.getMonth() !== month;
                    const entry = schedule[iso] || null;

                    return (
                        <MonthDayCell
                            key={i}
                            date={date}
                            entry={isOutsideMonth ? null : entry}
                            isToday={iso === todayISO}
                            isOutsideMonth={isOutsideMonth}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}