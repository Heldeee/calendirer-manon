// ============================================
// Conversion Date -> "YYYY-MM-DD" en HEURE LOCALE
// Ne jamais utiliser toISOString() ici : ça convertit
// en UTC et peut décaler la date d'un jour selon l'heure
// et le fuseau horaire de l'appareil.
// ============================================
export function toISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function startOfWeekMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = dimanche
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}