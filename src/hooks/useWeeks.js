function toISO(d) {
    return d.toISOString().split("T")[0];
}

function startOfWeekMonday(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0 = dimanche
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function useWeeks(schedule) {
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;

    const anchorMonday = startOfWeekMonday(today);
    if (isWeekend) anchorMonday.setDate(anchorMonday.getDate() + 7);

    // Fenêtre : une semaine avant l'ancre, l'ancre, et 2 semaines après
    const offsets = [-1, 0, 1, 2];

    const weeks = offsets.map((offset) => {
        const monday = new Date(anchorMonday);
        monday.setDate(monday.getDate() + offset * 7);

        const days = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            const iso = toISO(d);
            return { dateISO: iso, date: d, entry: schedule[iso] || null };
        });

        return { monday, days };
    });

    return { weeks, anchorIndex: offsets.indexOf(0), todayISO: toISO(today) };
}