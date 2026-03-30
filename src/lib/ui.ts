import { stripMarkdown } from './trip';

export function truncateText(input: string, maxLength = 72): string {
  const clean = stripMarkdown(input);
  if (clean.length <= maxLength) {
    return clean;
  }

  return `${clean.slice(0, maxLength - 1).trimEnd()}…`;
}

export function compactDayLabel(dayNumber: number): string {
  return `D${dayNumber}`;
}

export function dayRoute(baseUrl: string, dayNumber: number): string {
  return `${baseUrl}day/${dayNumber}/`;
}

export function summarizeDay(markdown: string): string {
  const clean = stripMarkdown(markdown).replace(/\s+/g, ' ').trim();
  if (!clean) {
    return 'Open day plan';
  }

  const firstSentence = clean.split(/[.!?]\s/)[0] ?? clean;
  return truncateText(firstSentence, 110);
}
