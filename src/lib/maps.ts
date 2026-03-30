const MAP_HOST_PATTERNS = [
  /google\.[^/]+$/i,
  /maps\.apple\.com$/i,
  /waze\.com$/i,
  /openstreetmap\.org$/i,
  /mapquest\.com$/i
];

export function isMapUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase();
    if (MAP_HOST_PATTERNS.some((pattern) => pattern.test(host))) {
      return true;
    }

    if (host.includes('google.') && (url.pathname.includes('/maps') || url.searchParams.has('q'))) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

export function buildGoogleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`;
}

export function toMapHref(rawHref: string, label: string): string {
  if (isMapUrl(rawHref)) {
    return rawHref;
  }

  const query = label.trim() || rawHref.trim();
  return buildGoogleMapsSearchUrl(query);
}
