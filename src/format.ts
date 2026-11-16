/** Swedish dates and numbers ("mån 7 dec", "v. 46", "68 %"). Dates are handled as local calendar days. */
import { sv } from "./i18n/sv.ts";

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** Today's local date as YYYY-MM-DD. */
export function todayISO(now: Date = new Date()): string {
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

function parts(iso: string): [number, number, number] {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return [y, m, d];
}

/** Whole days from a to b (b - a), ignoring time of day and DST. */
export function daysBetween(aISO: string, bISO: string): number {
  const [ay, am, ad] = parts(aISO);
  const [by, bm, bd] = parts(bISO);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86_400_000);
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = parts(iso);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${pad2(dt.getUTCMonth() + 1)}-${pad2(dt.getUTCDate())}`;
}

function weekday(iso: string): number {
  const [y, m, d] = parts(iso);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** "mån 7 dec" */
export function shortDate(iso: string): string {
  const [, m, d] = parts(iso);
  return `${sv.format.weekdays[weekday(iso)]} ${d} ${sv.format.months[m - 1]}`;
}

/** "7 dec" */
export function dayMonth(iso: string): string {
  const [, m, d] = parts(iso);
  return `${d} ${sv.format.months[m - 1]}`;
}

/** "7 december" */
export function longDayMonth(iso: string): string {
  const [, m, d] = parts(iso);
  return `${d} ${sv.format.monthsLong[m - 1]}`;
}

/** ISO 8601 week number ("v. 46"). */
export function isoWeek(iso: string): number {
  const [y, m, d] = parts(iso);
  const date = new Date(Date.UTC(y, m - 1, d));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

export function percent(n: number): string {
  return sv.format.percent(n);
}

/** "14:05" */
export function time24(date: Date): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}
