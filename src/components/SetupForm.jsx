import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseGoogleMapsUrl } from '../utils/mapsParser';
import { 
  User, 
  Navigation, 
  RefreshCw, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

export default function SetupForm() {
  const navigate = useNavigate();

  // State variables for configuration
  const [selfName, setSelfName] = useState('Self');
  const [friendName, setFriendName] = useState('Friend');
  const [selfCoords, setSelfCoords] = useState(null); // { lat, lon }
  const [friendCoords, setFriendCoords] = useState(null); // { lat, lon }
  
  const [selfGeoLoading, setSelfGeoLoading] = useState(false);
  const [selfGeoError, setSelfGeoError] = useState('');
  
  const [friendUrl, setFriendUrl] = useState('');
  const [friendUrlValid, setFriendUrlValid] = useState(false);
  const [friendUrlError, setFriendUrlError] = useState('');

  // Handle Friend Google Maps URL parsing
  const handleFriendUrlChange = (e) => {
    const val = e.target.value;
    setFriendUrl(val);

    if (!val.trim()) {
      setFriendUrlValid(false);
      setFriendCoords(null);
      setFriendUrlError('');
      return;
    }

    const coords = parseGoogleMapsUrl(val);
    if (coords) {
      setFriendCoords(coords);
      setFriendUrlValid(true);
      setFriendUrlError('');
    } else {
      setFriendCoords(null);
      setFriendUrlValid(false);
      setFriendUrlError('Invalid URL syntax. Paste a valid Google Maps URL containing coordinates.');
    }
  };

  // Browser Geolocation for Self
  const handleFindMe = () => {
    if (!navigator.geolocation) {
      setSelfGeoError('Geolocation API is not supported by your browser.');
      return;
    }

    setSelfGeoLoading(true);
    setSelfGeoError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelfCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setSelfGeoLoading(false);
      },
      (error) => {
        let errorMsg = 'Failed to retrieve your position.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Permission denied. Please enable browser location services.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Position unavailable. Try again in an open space.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Request timed out. Please check network connection.';
        }
        setSelfGeoError(errorMsg);
        setSelfGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleGenerateDashboard = () => {
    if (selfCoords && friendCoords) {
      navigate('/dashboard', {
        state: {
          selfName,
          friendName,
          selfCoords,
          friendCoords
        }
      });
    }
  };

  return (
    <main className="flex-1 bg-[#f8fafc] bg-grid-pattern p-6 md:p-12 flex flex-col justify-center items-center z-10">
      <div className="w-full max-w-4xl bg-white brutalist-border brutalist-shadow-lg p-6 md:p-10 flex flex-col gap-8">
        <div>
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-slate-500">// INITIALIZATION MATRIX</span>
          <h2 className="text-3xl font-bold tracking-tight uppercase mt-1">NODE CONFIGURATION</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN: SELF NODE */}
          <div className="bg-[#f8fafc] brutalist-border p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 stroke-[2.5]" />
                <h3 className="font-bold tracking-widest uppercase">NODE_01 // SELF</h3>
              </div>
              <span className="text-[9px] font-mono tracking-widest bg-black text-white px-2 py-0.5">LOCAL</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-mono tracking-widest font-bold">NAME IDENTIFIER</label>
              <input
                type="text"
                value={selfName}
                onChange={(e) => setSelfName(e.target.value)}
                className="w-full bg-white brutalist-border px-4 py-3 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter self name"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleFindMe}
                disabled={selfGeoLoading}
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest brutalist-border brutalist-shadow brutalist-shadow-hover hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {selfGeoLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin stroke-[2.5]" />
                    FETCHING LOCATION...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 stroke-[2.5] fill-black" />
                    [ FIND ME ]
                  </>
                )}
              </button>

              {/* Geolocation result */}
              {selfCoords ? (
                <div className="brutalist-border border-emerald-500 bg-emerald-50 px-4 py-3 font-mono text-xs text-emerald-800 flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]">
                  <div>
                    <div className="font-bold uppercase tracking-widest text-[9px] text-emerald-600 mb-0.5">GEOLOCATION LOCKED</div>
                    <div>LAT: {selfCoords.lat.toFixed(5)}</div>
                    <div>LON: {selfCoords.lon.toFixed(5)}</div>
                  </div>
                  <Check className="w-5 h-5 stroke-[3] text-emerald-600 shrink-0" />
                </div>
              ) : selfGeoError ? (
                <div className="brutalist-border border-red-500 bg-red-50 px-4 py-3 font-mono text-xs text-red-800 flex items-start gap-2 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]">
                  <AlertTriangle className="w-5 h-5 stroke-[2.5] text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold uppercase tracking-widest text-[9px] text-red-600 mb-0.5">GEOLOCATION ERROR</div>
                    <div>{selfGeoError}</div>
                  </div>
                </div>
              ) : (
                <div className="brutalist-border-thin border-dashed border-slate-400 bg-white p-4 font-mono text-xs text-slate-500 text-center uppercase tracking-wider">
                  COORDINATES REQUIRED
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: FRIEND NODE */}
          <div className="bg-[#f8fafc] brutalist-border p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 stroke-[2.5] text-emerald-600" />
                <h3 className="font-bold tracking-widest uppercase">NODE_02 // FRIEND</h3>
              </div>
              <span className="text-[9px] font-mono tracking-widest bg-emerald-500 text-white px-2 py-0.5">REMOTE</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-mono tracking-widest font-bold">NAME IDENTIFIER</label>
              <input
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className="w-full bg-white brutalist-border px-4 py-3 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter friend name"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono tracking-widest font-bold">GOOGLE MAPS URL</label>
                <input
                  type="text"
                  value={friendUrl}
                  onChange={handleFriendUrlChange}
                  className={`w-full bg-white brutalist-border px-4 py-3 font-mono text-xs focus:outline-none focus:ring-2 transition-all duration-100 ease-in-out ${
                    friendUrlValid 
                      ? 'border-emerald-500 focus:ring-emerald-500 shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]' 
                      : friendUrl 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'focus:ring-black'
                  }`}
                  placeholder="Paste link e.g. https://www.google.com/maps/@40.7128,-74.006..."
                />
              </div>

              {friendCoords ? (
                <div className="brutalist-border border-emerald-500 bg-emerald-50 px-4 py-3 font-mono text-xs text-emerald-800 flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]">
                  <div>
                    <div className="font-bold uppercase tracking-widest text-[9px] text-emerald-600 mb-0.5">PARSED COORDINATES</div>
                    <div>LAT: {friendCoords.lat.toFixed(5)}</div>
                    <div>LON: {friendCoords.lon.toFixed(5)}</div>
                  </div>
                  <Check className="w-5 h-5 stroke-[3] text-emerald-600 shrink-0" />
                </div>
              ) : friendUrlError ? (
                <div className="brutalist-border border-red-500 bg-red-50 px-4 py-3 font-mono text-xs text-red-800 flex items-start gap-2 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]">
                  <AlertTriangle className="w-5 h-5 stroke-[2.5] text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold uppercase tracking-widest text-[9px] text-red-600 mb-0.5">PARSE ERROR</div>
                    <div>{friendUrlError}</div>
                  </div>
                </div>
              ) : (
                <div className="brutalist-border-thin border-dashed border-slate-400 bg-white p-4 font-mono text-xs text-slate-500 text-center uppercase tracking-wider">
                  URL INJECTION LISTENING...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DASHBOARD TRIGGER */}
        <div className="border-t-2 border-black pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs tracking-wide text-slate-500">
            {(!selfCoords || !friendCoords) 
              ? '⚠️ LOCATE BOTH NODES TO GENERATE DASHBOARD telemetry.' 
              : '✅ READY TO GENERATE SYSTEM DATAFRAME.'}
          </span>
          <button
            disabled={!selfCoords || !friendCoords}
            onClick={handleGenerateDashboard}
            className="w-full sm:w-auto px-8 py-4 bg-black text-white font-bold tracking-widest uppercase brutalist-border brutalist-shadow brutalist-shadow-hover disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer transition-all duration-100 ease-in-out text-sm"
          >
            GENERATE DASHBOARD //
          </button>
        </div>
      </div>
    </main>
  );
}
