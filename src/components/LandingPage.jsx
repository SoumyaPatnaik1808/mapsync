import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Landing Viewport */}
      <main className="min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-12 relative overflow-hidden">
        {/* Left panel (Tagline and CTA) */}
        <div className="col-span-1 md:col-span-6 bg-white flex flex-col justify-center px-8 md:px-16 py-20 md:py-32 z-10 asymmetric-slope border-r-0 md:border-r-2 md:border-black bg-dot-pattern">
          <div className="max-w-xl flex flex-col gap-8 md:gap-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
              Get your friends, <br />
              <span className="bg-black text-white px-2 py-1 inline-block mt-2 mb-2">wherever</span> <br />
              they are!
            </h1>
            <p className="text-lg font-mono tracking-tight text-slate-700 leading-relaxed max-w-md">
              Compare telemetry and atmospheric data instantaneously. Input your geolocation, paste your friend's coordinates, and map the distance.
            </p>
            <div>
              <button
                onClick={() => navigate('/setup')}
                className="px-10 py-5 bg-black text-white font-bold text-2xl tracking-widest uppercase brutalist-border brutalist-shadow brutalist-shadow-hover hover:cursor-pointer transition-all duration-100 ease-in-out"
              >
                START //
              </button>
            </div>
          </div>
        </div>

        {/* Right panel (Video, clean background) */}
        <div className="col-span-1 md:col-span-6 bg-[#f8fafc] relative min-h-[350px] md:min-h-0 flex items-center justify-center border-t-4 md:border-t-0 border-black overflow-hidden">
          {/* Background video */}
          <video
            src="/Vedio.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
          />

          {/* Bottom info strip */}
          <div className="absolute bottom-4 right-4 bg-white brutalist-border px-3 py-1 font-mono text-[9px] tracking-widest uppercase z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            LOC: ESTABLISHED // PING: 18MS
          </div>
        </div>
      </main>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-[#f8fafc] border-t-4 border-black py-20 px-8 md:px-16 bg-dot-pattern flex flex-col gap-12 z-10 relative">
        <div className="max-w-xl flex flex-col gap-2">
          <span className="font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">// SYSTEM OPERATION</span>
          <h2 className="text-4xl font-bold tracking-tight uppercase">HOW IT WORKS</h2>
          <p className="text-slate-600 font-mono text-sm">
            Three precise mechanical steps to resolve relative distance and atmospheric differentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* STEP 1 */}
          <div className="bg-white brutalist-border p-6 flex flex-col justify-between gap-8 brutalist-shadow">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-bold text-slate-500">// INPUT_NODE_01</span>
                <span className="font-bold text-2xl font-mono">01</span>
              </div>
              <h3 className="font-bold text-lg uppercase tracking-tight">GEOLOCATE SELF</h3>
              <p className="text-sm text-slate-700 font-mono leading-relaxed">
                Lock Node 1 coordinates via hardware-bound HTML5 Geolocation API, extracting high-precision browser positioning instantly.
              </p>
            </div>
            <div className="text-[10px] font-mono bg-black text-white px-2 py-1 self-start uppercase tracking-widest">
              API: GEOLOCATION
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-white brutalist-border p-6 flex flex-col justify-between gap-8 brutalist-shadow">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-bold text-slate-500">// INPUT_NODE_02</span>
                <span className="font-bold text-2xl font-mono">02</span>
              </div>
              <h3 className="font-bold text-lg uppercase tracking-tight">PARSE FRIEND</h3>
              <p className="text-sm text-slate-700 font-mono leading-relaxed">
                Paste a standard Google Maps link. Our client-side regex compiler strips coordinate telemetry out of raw query text.
              </p>
            </div>
            <div className="text-[10px] font-mono bg-[#10b981] text-white px-2 py-1 self-start uppercase tracking-widest">
              ENGINE: REGEX PARSER
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-white brutalist-border p-6 flex flex-col justify-between gap-8 brutalist-shadow">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-bold text-slate-500">// METRICS_OUTPUT</span>
                <span className="font-bold text-2xl font-mono">03</span>
              </div>
              <h3 className="font-bold text-lg uppercase tracking-tight">COMPUTE & MAP</h3>
              <p className="text-sm text-slate-700 font-mono leading-relaxed">
                Solve great-circle paths with the Haversine formula, query Open-Meteo for atmospheric differences, and view grayscale maps.
              </p>
            </div>
            <div className="text-[10px] font-mono bg-black text-white px-2 py-1 self-start uppercase tracking-widest">
              METRIC: HAVERSINE
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
