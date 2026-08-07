import schedule from "../data/schedule.json";

function toISO(date) {
    return date.toISOString().split("T")[0];
}

export function useSchedule() {
    const today = new Date();

    const getEntry = (date) => schedule[toISO(date)] || null;

    const upcoming = Array.from({ length: 5 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i + 1);
        return {
            dateISO: toISO(d),
            label: d.toLocaleDateString("fr-FR", { weekday: "long" }),
            entry: getEntry(d),
        };
    });

    return {
        todayISO: toISO(today),
        todayEntry: getEntry(today),
        upcoming,
        schedule,
    };
}