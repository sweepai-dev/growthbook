import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import differenceInDays from "date-fns/differenceInDays";
import { addMonths } from "date-fns";

export function date(date: string | Date): string {
  if (!date) return "";
  return format(getValidDate(date), "PP");
}
export function datetime(date: string | Date): string {
  if (!date) return "";
  return format(getValidDate(date), "PPp");
}
export function ago(date: string | Date): string {
  if (!date) return "";
  return formatDistance(getValidDate(date), new Date(), { addSuffix: true });
}
export function daysLeft(date: string | Date): number {
  return differenceInDays(getValidDate(date), new Date());
}
export function subtractMonths(date: string | Date, num: number): Date {
  return addMonths(getValidDate(date), -1 * num);
}
export function monthYear(date: string | Date): string {
  return format(getValidDate(date), "MMM yyy");
}
export function daysBetween(start: string | Date, end: string | Date): number {
  return differenceInDays(getValidDate(end), getValidDate(start));
}

export function getValidDate(
  dateStr: string | Date | null | number,
  fallback?: Date
): Date {
  fallback = fallback || new Date();

  if (!dateStr) return fallback;

  let d: Date;

  if (typeof dateStr === "string") {
    // Fix date parsing for Safari
    let reformattedDateStr = (dateStr + "").replace(/[/\s]/g, "-");
    if (reformattedDateStr.match(/-/g)?.length === 1) {
      reformattedDateStr = reformattedDateStr.replace("-", "-1-");
    }
    d = new Date(reformattedDateStr);
  } else {
    d = new Date(dateStr);
  }
  if (isNaN(d.getTime())) {
    return fallback;
  }
  return d;
}
