import { describe, expect, it } from 'vitest';
import { buildGoogleMapsSearchUrl, isMapUrl, toMapHref } from '../src/lib/maps';

describe('maps utilities', () => {
  it('detects map urls', () => {
    expect(isMapUrl('https://www.google.com/maps/place/Spokane')).toBe(true);
    expect(isMapUrl('https://maps.apple.com/?q=Kalispell')).toBe(true);
    expect(isMapUrl('https://example.com/something')).toBe(false);
  });

  it('builds google maps search urls', () => {
    expect(buildGoogleMapsSearchUrl('Palouse Falls')).toContain('Palouse%20Falls');
  });

  it('returns raw href for map urls and generated url for normal links', () => {
    const raw = 'https://www.google.com/maps/place/Leavenworth';
    expect(toMapHref(raw, 'Leavenworth')).toBe(raw);
    expect(toMapHref('https://parks.wa.gov/find-parks/state-parks/palouse-falls-state-park-heritage-site', 'Palouse Falls')).toContain('Palouse%20Falls');
  });
});
