import { CODE_MAP } from "../data/codeMap";

// Normalise "2026-8-27" ou "2026-08-27" -> toujours "2026-08-27"
function normalizeDate(raw) {
  const [year, month, day] = raw.trim().split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

/**
 * Parse le contenu brut du CSV (Date,Code) vers :
 * { "2026-08-26": { debut, fin } | null, ... }
 */
export function parseScheduleCsv(csvText) {
  const lines = csvText.trim().split("\n");
  const schedule = {};

  // On saute la ligne d'en-tête (index 0 = "Date,Code")
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [rawDate, rawCode] = line.split(",");
    if (!rawDate) continue;

    const dateISO = normalizeDate(rawDate);
    const code = rawCode ? rawCode.trim().toUpperCase() : "";

    if (!code) {
      schedule[dateISO] = null; // jour off
      continue;
    }

    const hours = CODE_MAP[code];
    if (!hours) {
      console.warn(`Code inconnu "${code}" pour la date ${dateISO} — ignoré`);
      schedule[dateISO] = null;
      continue;
    }

    schedule[dateISO] = hours;
  }

  return schedule;
}