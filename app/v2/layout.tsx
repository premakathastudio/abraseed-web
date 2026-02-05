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
      {/* SIDEBAR - Tetap menggunakan folder 'v2' sesuai preferensi [2026-02-04] */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-[#1b4d2c] text-white p-6 flex flex-col justify-between z-50 shadow-[10px_0_40px_rgba(0,0,0,0.15)] overflow-hidden">
        
        {/* AKSEN BACKGROUND SIDEBAR */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          {/* LOGO AREA - TEGAS & MODERN (PERSEGI PANJANG) */}
          <div className="mb-12 group">
            {/* Box dibuat Persegi Panjang (Tegas) dengan Border Hijau di Kiri */}
            <div className="relative h-44 w-full flex flex-col items-center justify-center bg-white shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 border-l-8 border-emerald-500 overflow-hidden">
              
              {/* Subtle Inner Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"></div>

              {/* Logo Wrapper - SCALE 2.0x Sesuai Request */}
              <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[2.1] scale-[2.0] flex items-center justify-center z-10">
                <img 
                  src="/logo-abraseed.png" 
                  alt="Abraseed Logo" 
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Version Badge - Squared Shape */}
              <div className="absolute top-0 right-0 z-20">
                <span className="text-[8px] font-black px-3 py-1.5 bg-[#1b4d2c] text-white tracking-[0.2em] uppercase border-b border-l border-white/10 shadow-sm">
                  V2.0
                </span>
              </div>
            </div>
            
            {/* SUB-TEKS - Project Suka Suka & Output Luar Biasa */}
            <div className="mt-4 text-left border-l border-white/20 pl-4 py-1">
              <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-[0.4em] mb-1 italic">
                Ecosystem Framework
              </p>
              <p className="text-[14px] font-black uppercase tracking-[0.1em] text-white">
                Output <span className="text-emerald-400 italic font-black">Luar Biasa</span>
              </p>
            </div>
          </div>

          {/* NAVIGATION ITEMS - KEMBALI KE GAYA ROUNDED KEK SEMULA */}
          <nav className="space-y-2.5 mt-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 border ${
                    isActive 
                    ? 'bg-white text-[#1b4d2c] border-white shadow-xl translate-x-2' 
                    : 'bg-transparent text-green-100/40 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`${isActive ? 'text-[#1b4d2c]' : 'text-green-400/40'} transition-colors`}>
                    {item.icon}
                  </div>
                  <span className="text-[12px] tracking-widest uppercase">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher - Tetap Gaya Rounded */}
        <Link href="/" className="relative z-10 flex items-center justify-center gap-3 py-4 bg-black/10 border border-white/5 rounded-2xl text-green-100/30 hover:text-white hover:bg-white/10 transition-all text-[9px] font-black uppercase tracking-[0.3em]">
          <ArrowLeft size={14} />
          Go to Legacy v1
        </Link>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-72 p-12 min-h-screen">
        {children}
      </main>

      {/* MUSIC PLAYER */}
      <audio ref={audioRef} loop>
        <source src="/laguabra.mpeg" type="audio/mpeg" />
      </audio>

      {/* MUSIC CONTROLS - Rounded Style */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={toggleMusic}
          className={`flex items-center gap-4 p-3 pr-7 rounded-2xl transition-all duration-500 shadow-2xl border ${
            isPlaying 
            ? 'bg-[#1b4d2c] border-white/20 text-white' 
            : 'bg-white border-slate-200 text-slate-500 shadow-slate-200/50'
          }`}
        >
          <div className={`p-2.5 rounded-xl transition-all ${isPlaying ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100'}`}>
            {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className={`text-[9px] font-black uppercase tracking-widest ${isPlaying ? 'text-white' : 'text-slate-400'}`}>
              {isPlaying ? 'System Audio' : 'Muted'}
            </span>
            <span className="text-[8px] mt-1 font-medium opacity-40 uppercase tracking-tighter italic">Laguabra.mpeg</span>
          </div>
        </button>
      </div>
    </div>
  );
}