import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import { Compass } from 'lucide-react';
import LandingPage from './components/LandingPage';
import SetupForm from './components/SetupForm';
import Dashboard from './components/Dashboard';

// Global Header Component displaying status telemetry conditionally
function Header() {
  const location = useLocation();
  const path = location.pathname;

  let status = 'LANDING';
  if (path === '/setup') status = 'CONFIGURATION';
  if (path === '/dashboard') status = 'DASHBOARD';

  return (
    <header className={`px-6 py-4 flex justify-between items-center z-20 transition-all ${
      path === '/'
        ? 'absolute top-0 left-0 right-0 bg-white/70 border-b-2 border-black/10'
        : 'relative bg-white border-b-4 border-black'
    }`}>
      <div className="flex items-center gap-3">
        <Compass className="w-8 h-8 stroke-[3]" />
        <span className="text-xl font-bold tracking-widest uppercase">MAPSYNC //</span>
      </div>
      <div className="text-[10px] uppercase font-mono tracking-widest border-2 border-black bg-[#f8fafc] px-3 py-1 hidden sm:block">
        STATUS: {status}
      </div>
    </header>
  );
}

// Main Layout wrapping Routes and initializing scroll
function MainLayout() {
  useEffect(() => {
    const scrollInstance = new LocomotiveScroll();
    return () => {
      scrollInstance.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col antialiased">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<SetupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
