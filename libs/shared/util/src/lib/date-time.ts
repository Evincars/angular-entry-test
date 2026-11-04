const pad = (value: number): string => String(value).padStart(2, '0');

/** `HH:mm` in local time, e.g. `12:44`. */
export function formatTime(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** `dd.MM.yyyy HH:mm` in local time, e.g. `01.05.2020 12:44`. */
export function formatDateTime(date: Date): string {
  const day = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
  return `${day} ${formatTime(date)}`;
}

/** Human readable, coarse duration, e.g. `just now`, `5 min`, `2 h 10 min`. */
export function formatDuration(milliseconds: number): string {
  const totalMinutes = Math.floor(Math.max(0, milliseconds) / 60_000);
  if (totalMinutes < 1) {
    return 'just now';
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes} min`;
  }
  return minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`;
}
