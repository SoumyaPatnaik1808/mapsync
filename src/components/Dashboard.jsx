import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import MapView from './MapView';
import { getHaversineDistance } from '../utils/geoCalc';
import { 
  ArrowLeft, 
  RefreshCw, 
  AlertTriangle 
} from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract state passed from router navigation
  const { 
    selfName = 'Self', 
    friendName = 'Friend', 
    selfCoords, 
    friendCoords 
  } = location.state || {};

  // Redirect back to setup if coords are missing
  useEffect(() => {
    if (!selfCoords || !friendCoords) {
      navigate('/setup');
    }
  }, [selfCoords, friendCoords, navigate]);

  // Weather Comparison API state
  const [selfWeather, setSelfWeather] = useState(null);
  const [friendWeather, setFriendWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // Fetch Meteorological Telemetry on coords lock
  const fetchWeatherData = async () => {
    if (!selfCoords || !friendCoords) return;

    setWeatherLoading(true);
    setWeatherError('');
    try {
      // Fetch Self Weather
      const selfRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selfCoords.lat}&longitude=${selfCoords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );
      if (!selfRes.ok) throw new Error('Failed to fetch self weather telemetry.');
      const selfData = await selfRes.json();
      setSelfWeather(selfData.current);

      // Fetch Friend Weather
      const friendRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${friendCoords.lat}&longitude=${friendCoords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );
      if (!friendRes.ok) throw new Error('Failed to fetch friend weather telemetry.');
      const friendData = await friendRes.json();
      setFriendWeather(friendData.current);
    } catch (err) {
      setWeatherError(err.message || 'Error loading live meteorological comparison.');
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [selfCoords, friendCoords]);

  if (!selfCoords || !friendCoords) {
    return null; // Don't render layout if redirecting
  }

  const calculatedDistance = getHaversineDistance(
    selfCoords.lat, 
    selfCoords.lon, 
    friendCoords.lat, 
    friendCoords.lon
  );

  return (
    <main className="flex-1 flex flex-col md:flex-row relative">
      {/* Left Column: Metric Panel & Weather Module Comparison */}
      <div className="w-full md:w-5/12 bg-white border-r-0 md:border-r-4 border-black flex flex-col z-10">
        {/* Top Ribbon tracking distance output */}
        <div className="bg-black text-white p-6 brutalist-border border-l-0 border-t-0 border-r-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-slate-400 block">// TELEMETRY ENGINE</span>
            <span className="text-lg font-bold tracking-wider font-mono">HAVERSINE DISTANCE</span>
          </div>
          <div className="bg-[#f8fafc] text-black px-4 py-2 border-2 border-white font-mono font-bold text-xl tracking-widest shadow-[2px_2px_0px_0px_#10b981]">
            {calculatedDistance.toFixed(2)} KM
          </div>
        </div>

        {/* Meteorologic readings */}
        <div className="flex-1 p-6 flex flex-col gap-6 justify-center">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-widest text-slate-500 block uppercase">// METEOROLOGICAL MODULES</span>
            <h3 className="text-xl font-bold tracking-tight uppercase">ATMOSPHERIC TELEMETRY</h3>
          </div>

          {weatherLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 gap-3 brutalist-border bg-[#f8fafc]">
              <RefreshCw className="w-8 h-8 animate-spin stroke-[2.5]" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">POLLING SATELLITE SYSTEM DATA...</span>
            </div>
          ) : weatherError ? (
            <div className="brutalist-border border-red-500 bg-red-50 p-6 font-mono text-xs text-red-800 flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
              <AlertTriangle className="w-6 h-6 stroke-[2.5] text-red-600 shrink-0" />
              <div>
                <div className="font-bold uppercase tracking-widest text-[9px] text-red-600 mb-1">API DATA ERROR</div>
                <p className="mb-4">{weatherError}</p>
                <button 
                  onClick={fetchWeatherData} 
                  className="bg-red-600 text-white px-3 py-1 font-bold brutalist-border text-[9px] tracking-wider uppercase"
                >
                  RETRY POLLING
                </button>
              </div>
            </div>
          ) : selfWeather && friendWeather ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileCard name={selfName} isSelf={true} weather={selfWeather} />
              <ProfileCard name={friendName} isSelf={false} weather={friendWeather} />
            </div>
          ) : (
            <div className="brutalist-border p-4 font-mono text-xs uppercase tracking-wider text-center text-slate-500 bg-white">
              NO METEOROLOGICAL DATA RECEIVED
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="p-6 border-t-2 border-black bg-[#f8fafc]">
          <button
            onClick={() => navigate('/setup')}
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest brutalist-border brutalist-shadow brutalist-shadow-hover hover:cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            RE-INITIALIZE CHANNELS
          </button>
        </div>
      </div>

      {/* Right Column: grayscaled MapView */}
      <div className="w-full md:w-7/12 min-h-[400px] md:min-h-0 bg-[#e2e8f0] relative grayscale-map border-t-4 md:border-t-0 border-black z-0">
        <MapView 
          selfCoords={selfCoords} 
          friendCoords={friendCoords} 
          selfName={selfName} 
          friendName={friendName} 
        />
      </div>
    </main>
  );
}
