/** Format an ISO date (YYYY-MM-DD) as e.g. "Mon 5 Oct". */
export function formatDayShort(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

/** Format an ISO date (YYYY-MM-DD) as e.g. "Monday 5 October 2026". */
export function formatDayLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .filter((c, i, arr) => i === 0 || i === arr.length - 1)
    .join('')
    .toUpperCase();
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
