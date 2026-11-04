import { formatDateTime, formatDuration, formatTime } from './date-time';

describe('date-time formatters', () => {
  const date = new Date(2020, 4, 1, 12, 4);

  it('formats time as HH:mm', () => {
    expect(formatTime(date)).toBe('12:04');
  });

  it('formats date and time as dd.MM.yyyy HH:mm', () => {
    expect(formatDateTime(date)).toBe('01.05.2020 12:04');
  });

  it.each([
    [0, 'just now'],
    [59_000, 'just now'],
    [5 * 60_000, '5 min'],
    [60 * 60_000, '1 h'],
    [130 * 60_000, '2 h 10 min'],
    [-1_000, 'just now'],
  ])('formats a duration of %i ms as "%s"', (milliseconds, expected) => {
    expect(formatDuration(milliseconds)).toBe(expected);
  });
});
