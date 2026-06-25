/**
 * Maps Open-Meteo numerical weather codes (WMO code) to simple human-readable string descriptors.
 * @param {number} code - Weather status code
 * @returns {string} - Weather description
 */
export function getWeatherDescription(code) {
  if (code === undefined || code === null) return 'N/A';
  if (code === 0) return 'Clear Sky';
  if (code >= 1 && code <= 3) return 'Mainly Clear';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 65) return 'Rainy';
  if (code >= 71 && code <= 75) return 'Snowy';
  if (code === 77) return 'Snow Grains';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code === 85 || code === 86) return 'Snow Showers';
  if (code === 95) return 'Thunderstorm';
  if (code >= 96 && code <= 99) return 'Thunderstorm with Hail';
  return 'Unknown State';
}
