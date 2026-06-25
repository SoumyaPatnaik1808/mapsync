// Regex Patterns for Google Maps Url Coordinate Extraction
const standardCoordsPattern = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
const queryCoordsPattern = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;

/**
 * Extracts lat/lon coordinates from a standard Google Maps URL.
 * Supports standard '@lat,lon' format and '?q=lat,lon' query parameters.
 * @param {string} url - Google Maps link string
 * @returns {{lat: number, lon: number} | null} - Parsed coordinates or null
 */
export function parseGoogleMapsUrl(url) {
  if (!url || !url.trim()) {
    return null;
  }

  // Try matching standard coordinates first
  let match = url.match(standardCoordsPattern);
  if (!match) {
    // Try matching query string coordinates
    match = url.match(queryCoordsPattern);
  }

  if (match) {
    return {
      lat: parseFloat(match[1]),
      lon: parseFloat(match[2])
    };
  }

  return null;
}
