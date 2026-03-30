import matter from 'gray-matter';
import { marked } from 'marked';

export interface DaySection {
  id: string;
  number: number;
  heading: string;
  titleMarkdown: string;
  title: string;
  dateText: string | null;
  dateIso: string | null;
  markdown: string;
}

export interface TripContent {
  title: string;
  preambleMarkdown: string;
  days: DaySection[];
  frontmatter: Record<string, unknown>;
}

const DAY_HEADING_REGEX = /^##\s+Day\s+(\d+)\s*(?:\(([^)]+)\))?\s*[–-]\s*(.+)$/i;

marked.setOptions({
  gfm: true,
  breaks: false
});

function toIsoDate(dateText: string | null): string | null {
  if (!dateText) {
    return null;
  }

  const parsed = new Date(dateText);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, (match) => {
      const textMatch = match.match(/\[([^\]]*)\]/);
      return textMatch?.[1] ?? '';
    })
    .replace(/[`*_>#~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseDaySection(markdown: string): DaySection {
  const lines = markdown.split('\n');
  const headingLine = lines[0]?.trim() ?? '';
  const contentMarkdown = lines.slice(1).join('\n').trim();

  const match = headingLine.match(DAY_HEADING_REGEX);
  if (match) {
    const number = Number.parseInt(match[1], 10);
    const dateText = match[2]?.trim() ?? null;
    const titleMarkdown = (match[3] ?? '').trim();
    const title = stripMarkdown(titleMarkdown).trim();

    return {
      id: `day-${number}`,
      number,
      heading: headingLine.replace(/^##\s*/, '').trim(),
      titleMarkdown,
      title,
      dateText,
      dateIso: toIsoDate(dateText),
      markdown: contentMarkdown
    };
  }

  const fallbackMatch = headingLine.match(/^##\s+Day\s+(\d+)/i);
  const number = fallbackMatch ? Number.parseInt(fallbackMatch[1], 10) : 0;

  return {
    id: `day-${number || 0}`,
    number,
    heading: headingLine.replace(/^##\s*/, '').trim(),
    titleMarkdown: headingLine.replace(/^##\s*/, '').trim(),
    title: stripMarkdown(headingLine.replace(/^##\s*/, '').trim()),
    dateText: null,
    dateIso: null,
    markdown: contentMarkdown
  };
}

export function parseTripMarkdown(rawMarkdown: string): TripContent {
  const { data, content } = matter(rawMarkdown);
  const dayHeadingMatches = Array.from(content.matchAll(/^##\s+Day\s+\d+.*$/gim));

  if (dayHeadingMatches.length === 0) {
    return {
      title: String((data.title as string | undefined) ?? 'Trip Guide'),
      preambleMarkdown: content,
      days: [],
      frontmatter: data
    };
  }

  const preambleMarkdown = content.slice(0, dayHeadingMatches[0].index).trim();
  const sections = dayHeadingMatches.map((match, index) => {
    const startIndex = match.index ?? 0;
    const endIndex = dayHeadingMatches[index + 1]?.index ?? content.length;
    return content.slice(startIndex, endIndex).trim();
  });

  const days = sections.map(parseDaySection).sort((a, b) => a.number - b.number);

  const headingMatch = content.match(/^#\s+(.+)$/m);
  const title = String((data.title as string | undefined) ?? headingMatch?.[1] ?? 'Trip Guide');

  return {
    title,
    preambleMarkdown,
    days,
    frontmatter: data
  };
}

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown) as string;
}

export function renderInlineMarkdown(markdown: string): string {
  return marked.parseInline(markdown) as string;
}
