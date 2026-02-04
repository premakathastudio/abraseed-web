'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX, LayoutDashboard, Map, Info, Users, ArrowLeft, Leaf } from 'lucide-react';
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
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-[#1b4d2c] text-white p-6 flex flex-col justify-between z-50 shadow-[10px_0_40px_rgba(0,0,0,0.15)] overflow-hidden">
        
        {/* AKSEN BACKGROUND SIDEBAR (Biar Gak Flat) */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          {/* LOGO AREA - RE-DESIGNED */}
          <div className="mb-12 group">
            <div className="relative h-48 w-full flex flex-col items-center justify-center rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 group-hover:border-white/20">
              
              {/* Soft Radial Glow di belakang logo */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50"></div>

              {/* Logo Wrapper */}
              <div className="relative w-40 h-20 transition-transform duration-700 ease-out group-hover:scale-110">
                <img 
                  src="/logo-abraseed.png" 
                  alt="Abraseed Logo" 
                  className="w-full h-full object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.classList.remove('brightness-0', 'invert'); // Kalau logonya sudah berwarna, hapus filter ini
                  }}
                />
              </div>

              {/* Version Badge */}
              <div className="absolute top-4 right-6">
                <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white tracking-widest uppercase">V2.0</span>
              </div>
            </div>
            
            <div className="mt-6 px-2 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-[1px] w-4 bg-green-200/20"></div>
                <p className="text-[10px] font-bold text-green-200/40 uppercase tracking-[0.2em] italic">
                  Ecosystem
                </p>
                <div className="h-[1px] w-4 bg-green-200/20"></div>
              </div>
              <p className="text-[14px] font-black uppercase tracking-[0.15em] text-white drop-shadow-lg">
                Output <span className="text-emerald-400">Luar Biasa</span>
              </p>
            </div>
          </div>

          {/* Navigation */}
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

        {/* Bottom Switcher */}
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

      {/* FLOATING CONTROLS */}
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
            <span className="text-[8px] mt-1 font-medium opacity-40 uppercase tracking-tighter">Current: Laguabra</span>
          </div>
        </button>
      </div>
    </div>
  );
}