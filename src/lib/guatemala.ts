export const GUATEMALA_LOCALE = "es-GT";
export const GUATEMALA_TIME_ZONE = "America/Guatemala";
export const GUATEMALA_CURRENCY = "GTQ";

const currencyFormatter = new Intl.NumberFormat(GUATEMALA_LOCALE, {
  style: "currency",
  currency: GUATEMALA_CURRENCY,
  currencyDisplay: "symbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat(GUATEMALA_LOCALE, {
  timeZone: GUATEMALA_TIME_ZONE,
  dateStyle: "medium",
});

const dateTimeFormatter = new Intl.DateTimeFormat(GUATEMALA_LOCALE, {
  timeZone: GUATEMALA_TIME_ZONE,
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatDate(value: string | Date): string {
  return dateFormatter.format(new Date(value));
}

export function formatDateTime(value: string | Date): string {
  return dateTimeFormatter.format(new Date(value));
}
