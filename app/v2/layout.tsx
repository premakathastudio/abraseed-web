'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX, LayoutDashboard, Map, Info, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function V2Layout({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  const toggleMusic = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
        audioRef.current.muted = false;
      } else {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const menuItems = [
    { name: 'Monitoring', path: '/v2', icon: <LayoutDashboard size={20} /> },
    { name: 'Roadmap', path: '/v2/roadmap', icon: <Map size={20} /> },
    { name: 'About Project', path: '/v2/about', icon: <Info size={20} /> },
    { name: 'Our Team', path: '/v2/team', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFB]">
      {/* SIDEBAR REDESIGNED */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0F172A] text-white p-6 flex flex-col justify-between z-50 border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.05)]">
        <div>
          {/* LOGO CONTAINER - White backdrop effect to make logo pop */}
          <div className="mb-10 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl flex flex-col items-center">
              <img 
                src="/logo-abraseed.png.png" 
                alt="Abraseed Logo" 
                className="w-full h-auto object-contain brightness-110 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes(".png.png")) target.src = "/logo-abraseed.png";
                }}
              />
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[9px] font-black text-emerald-400/60 tracking-[0.3em] uppercase">
                  V2.0 Professional
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 group ${
                    isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-900/40' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'} transition-colors`}>
                    {item.icon}
                  </div>
                  <span className="text-[13px] tracking-tight">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM NAV */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10 text-[11px] font-bold group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Switch to Version 1.0
          </Link>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-64 p-10 relative overflow-x-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-50/50 to-transparent -z-10"></div>
        {children}
      </main>

      {/* MUSIC PLAYER - UI REDESIGNED */}
      <audio ref={audioRef} loop>
        <source src="/laguabra.mpeg" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={toggleMusic}
          className={`flex items-center gap-3 p-2 pr-5 rounded-full border transition-all duration-500 shadow-2xl overflow-hidden ${
            isPlaying 
            ? 'bg-slate-900 border-emerald-500/50 text-white ring-4 ring-emerald-500/10' 
            : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <div className={`p-2.5 rounded-full transition-all ${isPlaying ? 'bg-emerald-500 text-white rotate-[360deg] duration-1000' : 'bg-slate-100'}`}>
            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </div>
          <div className="flex flex-col items-start">
            <span className={`text-[9px] font-black uppercase tracking-tighter ${isPlaying ? 'text-emerald-400' : 'text-slate-400'}`}>
              {isPlaying ? 'System Audio On' : 'Audio Muted'}
            </span>
            <div className="h-1 w-16 bg-slate-200 rounded-full mt-1 overflow-hidden">
               {isPlaying && <div className="h-full bg-emerald-500 animate-progress"></div>}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}