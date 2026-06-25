import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom Map Markers matching the strict mechanical brutalist aesthetic
const selfIcon = L.divIcon({
  className: 'custom-marker-self',
  html: `
    <div class="w-6 h-6 flex items-center justify-center bg-black border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <span class="text-[9px] font-bold text-white tracking-widest">S</span>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const friendIcon = L.divIcon({
  className: 'custom-marker-friend',
  html: `
    <div class="w-6 h-6 flex items-center justify-center bg-[#10b981] border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <span class="text-[9px] font-bold text-white tracking-widest">F</span>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Map Controller to fit boundaries automatically
function MapController({ selfCoords, friendCoords }) {
  const map = useMap();

  useEffect(() => {
    if (selfCoords && friendCoords) {
      const bounds = L.latLngBounds(
        [selfCoords.lat, selfCoords.lon],
        [friendCoords.lat, friendCoords.lon]
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  }, [selfCoords, friendCoords, map]);

  return null;
}

/**
 * Renders the grayscale Leaflet map with nodes and polyline.
 * @param {object} props
 * @param {{lat: number, lon: number}} props.selfCoords - Self node position
 * @param {{lat: number, lon: number}} props.friendCoords - Friend node position
 * @param {string} props.selfName - Self node name
 * @param {string} props.friendName - Friend node name
 */
export default function MapView({ selfCoords, friendCoords, selfName, friendName }) {
  if (!selfCoords || !friendCoords) return null;

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[selfCoords.lat, selfCoords.lon]}
        zoom={10}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Grayscale styled light tileset (CartoDB Positron format) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Node 1 (Self) Pin */}
        <Marker position={[selfCoords.lat, selfCoords.lon]} icon={selfIcon}>
          <Popup>
            <div className="font-mono text-xs">
              <strong className="uppercase">{selfName} // NODE_01</strong><br />
              LAT: {selfCoords.lat.toFixed(5)}<br />
              LON: {selfCoords.lon.toFixed(5)}
            </div>
          </Popup>
        </Marker>

        {/* Node 2 (Friend) Pin */}
        <Marker position={[friendCoords.lat, friendCoords.lon]} icon={friendIcon}>
          <Popup>
            <div className="font-mono text-xs">
              <strong className="uppercase text-emerald-600">{friendName} // NODE_02</strong><br />
              LAT: {friendCoords.lat.toFixed(5)}<br />
              LON: {friendCoords.lon.toFixed(5)}
            </div>
          </Popup>
        </Marker>

        {/* Connecting Vector Link */}
        <Polyline 
          positions={[
            [selfCoords.lat, selfCoords.lon],
            [friendCoords.lat, friendCoords.lon]
          ]} 
          color="black"
          dashArray="6, 8"
          weight={3}
        />

        {/* Camera automation wrapper to center and fit bounds */}
        <MapController selfCoords={selfCoords} friendCoords={friendCoords} />
      </MapContainer>

      {/* Map Telemetry Overlay Info Box */}
      <div className="absolute top-4 right-4 bg-white brutalist-border p-4 z-[1000] font-mono text-[9px] tracking-wider uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-w-[200px]">
        <div className="font-bold border-b border-black pb-1 mb-1.5">// MAP_TELEMETRY</div>
        <div className="mb-0.5"><span className="font-bold text-slate-500">NODE_01:</span> {selfCoords.lat.toFixed(4)}, {selfCoords.lon.toFixed(4)}</div>
        <div><span className="font-bold text-slate-500">NODE_02:</span> {friendCoords.lat.toFixed(4)}, {friendCoords.lon.toFixed(4)}</div>
      </div>
    </div>
  );
}
