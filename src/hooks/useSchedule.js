import { useMemo } from "react";
import scheduleCsvRaw from "../data/schedule.csv?raw";
import { parseScheduleCsv } from "../utils/parseSchedule";

export function useScheduleData() {
  return useMemo(() => parseScheduleCsv(scheduleCsvRaw), []);
}