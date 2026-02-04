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
    <div className="flex min-h-screen bg-[#F0F7F2]">
      {/* SIDEBAR - Balik ke Hijau Awal */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1b4d2c] text-white p-6 flex flex-col justify-between z-50 shadow-2xl">
        <div>
          {/* LOGO CONTAINER - Background Terang agar Logo Terbaca */}
          <div className="mb-10">
            <div className="bg-white p-4 rounded-3xl shadow-inner flex items-center justify-center overflow-hidden h-32">
              <img 
                src="/logo-abraseed.png.png" 
                alt="Abraseed Logo" 
                // Scale up & object-cover buat nge-crop blank space
                className="w-full h-full object-contain scale-150 transition-transform duration-500 hover:scale-[1.6]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes(".png.png")) target.src = "/logo-abraseed.png";
                }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-[10px] font-black text-green-400 tracking-[0.4em] uppercase opacity-80">
                Smart Farming System
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
                  pathname === item.path 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-900/40 translate-x-2' 
                  : 'text-green-100/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="flex items-center gap-3 text-green-100/30 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
          <ArrowLeft size={14} />
          Back to Version 1.0
        </Link>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-64 p-12 relative overflow-x-hidden">
        {children}
      </main>

      {/* MUSIC PLAYER */}
      <audio ref={audioRef} loop>
        <source src="/laguabra.mpeg" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={toggleMusic}
          className={`group flex items-center gap-3 p-3 pr-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 shadow-2xl ${
            isPlaying 
            ? 'bg-[#1b4d2c] border-green-500/30 text-white' 
            : 'bg-white/90 border-slate-200 text-slate-500'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all ${isPlaying ? 'bg-green-500 text-white scale-110' : 'bg-slate-100'}`}>
            {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-black uppercase tracking-widest mb-0.5">
              {isPlaying ? 'Now Playing' : 'Music Off'}
            </span>
            <span className="text-[9px] font-medium opacity-50 truncate w-24 text-left">Laguabra.mpeg</span>
          </div>
        </button>
      </div>
    </div>
  );
}