import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  CloudSun 
} from 'lucide-react';
import { getWeatherDescription } from '../utils/weatherCodes';

/**
 * Renders individual profile weather readings with brutalist styling.
 * @param {object} props
 * @param {string} props.name - Name identifier
 * @param {boolean} props.isSelf - True if Node 1 (Local), False if Node 2 (Remote)
 * @param {object} props.weather - Open-Meteo current readings
 * @param {number} props.weather.temperature_2m - Temperature value
 * @param {number} props.weather.relative_humidity_2m - Humidity percentage
 * @param {number} props.weather.wind_speed_10m - Wind speed value
 * @param {number} props.weather.weather_code - Numerical weather state code
 */
export default function ProfileCard({ name, isSelf, weather }) {
  if (!weather) return null;

  return (
    <div className="bg-[#f8fafc] brutalist-border p-4 flex flex-col gap-4">
      {/* Panel header */}
      <div className="flex justify-between items-center border-b-2 border-black pb-2">
        <span className="font-bold uppercase tracking-wider text-xs font-mono">
          {name}
        </span>
        <span className={`w-2.5 h-2.5 ${isSelf ? 'bg-black' : 'bg-[#10b981]'}`}></span>
      </div>

      {/* Metrics matrix */}
      <div className="flex flex-col gap-3">
        {/* Temperature */}
        <div className="flex justify-between items-center bg-white brutalist-border-thin px-3 py-2">
          <div className="flex items-center gap-2 text-slate-600">
            <Thermometer className="w-4 h-4 stroke-[2.5]" />
            <span className="font-mono text-[9px] tracking-wider font-bold">TEMP</span>
          </div>
          <span className="font-mono font-bold text-sm">{weather.temperature_2m}°C</span>
        </div>

        {/* Humidity */}
        <div className="flex justify-between items-center bg-white brutalist-border-thin px-3 py-2">
          <div className="flex items-center gap-2 text-slate-600">
            <Droplets className="w-4 h-4 stroke-[2.5]" />
            <span className="font-mono text-[9px] tracking-wider font-bold">HUMIDITY</span>
          </div>
          <span className="font-mono font-bold text-sm">{weather.relative_humidity_2m}%</span>
        </div>

        {/* Wind Speed */}
        <div className="flex justify-between items-center bg-white brutalist-border-thin px-3 py-2">
          <div className="flex items-center gap-2 text-slate-600">
            <Wind className="w-4 h-4 stroke-[2.5]" />
            <span className="font-mono text-[9px] tracking-wider font-bold">WIND</span>
          </div>
          <span className="font-mono font-bold text-sm">{weather.wind_speed_10m} km/h</span>
        </div>

        {/* Condition Descriptor */}
        <div className="flex justify-between items-center bg-white brutalist-border-thin px-3 py-2">
          <div className="flex items-center gap-2 text-slate-600">
            <CloudSun className="w-4 h-4 stroke-[2.5]" />
            <span className="font-mono text-[9px] tracking-wider font-bold">CONDITION</span>
          </div>
          <span className="font-mono font-bold text-[10px] uppercase text-right leading-none max-w-[120px] truncate">
            {getWeatherDescription(weather.weather_code)}
          </span>
        </div>
      </div>
    </div>
  );
}
