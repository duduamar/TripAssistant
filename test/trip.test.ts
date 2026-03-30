import { describe, expect, it } from 'vitest';
import { parseTripMarkdown } from '../src/lib/trip';

const sample = `---
trip_dates: Jul 25 - Aug 1, 2026
---

# Sample Trip

## Day 1 (Sat, Jul 25, 2026) - Bothell to Spokane

Plan one.

## Day 2 (Sun, Jul 26, 2026) - Spokane to Coeur d'Alene

Plan two.
`;

describe('trip markdown parsing', () => {
  it('splits preamble and day sections', () => {
    const parsed = parseTripMarkdown(sample);
    expect(parsed.title).toBe('Sample Trip');
    expect(parsed.days).toHaveLength(2);
    expect(parsed.days[0]?.id).toBe('day-1');
    expect(parsed.days[1]?.dateIso).toBe('2026-07-26');
  });

  it('extracts all days from the canonical trip file', async () => {
    const file = await import('node:fs/promises');
    const path = await import('node:path');
    const markdownPath = path.resolve('src/content/trips/wa-mt-id-roadtrip.md');
    const markdown = await file.readFile(markdownPath, 'utf8');
    const parsed = parseTripMarkdown(markdown);

    expect(parsed.days.length).toBeGreaterThanOrEqual(8);
    expect(parsed.days[0]?.number).toBe(1);
    expect(parsed.days[7]?.number).toBe(8);
  });
});
