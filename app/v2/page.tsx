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
      {/* SIDEBAR - Solid & Professional */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-[#1b4d2c] text-white p-6 flex flex-col justify-between z-50 shadow-[10px_0_40px_rgba(0,0,0,0.15)]">
        <div>
          {/* LOGO AREA - White Box */}
          <div className="mb-10 group">
            <div className="relative bg-white p-4 rounded-[2.5rem] flex items-center justify-center overflow-hidden h-44 shadow-2xl border-4 border-white/10">
              <img 
                src="/logo-abraseed.png.png" 
                alt="Abraseed Logo" 
                className="w-full h-full object-contain scale-[2.5] transition-transform duration-700 ease-in-out group-hover:scale-[2.6]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes(".png.png")) target.src = "/logo-abraseed.png";
                }}
              />
            </div>
            
            <div className="mt-6 px-2 text-center">
              <p className="text-[10px] font-medium text-green-200/40 italic tracking-tight">
                Project suka-suka,
              </p>
              <p className="text-[13px] font-black uppercase tracking-[0.1em] text-white mt-1 drop-shadow-md">
                Output Luar Biasa
              </p>
              <div className="h-[2px] w-10 bg-white/20 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          {/* Navigation - With Outlines per Option */}
          <nav className="space-y-3 mt-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 border ${
                    isActive 
                    ? 'bg-white text-[#1b4d2c] border-white shadow-xl translate-x-2' 
                    : 'bg-transparent text-green-100/40 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`${isActive ? 'text-[#1b4d2c]' : 'text-green-400/50 group-hover:text-green-300'} transition-colors`}>
                    {item.icon}
                  </div>
                  <span className="text-[13px] tracking-wide uppercase">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher */}
        <Link href="/" className="flex items-center justify-center gap-3 py-4 border border-white/10 rounded-2xl text-green-100/30 hover:text-white hover:bg-white/10 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
          <ArrowLeft size={14} />
          Back to v1.0
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

      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={toggleMusic}
          className={`flex items-center gap-4 p-3 pr-7 rounded-2xl transition-all duration-500 shadow-2xl border-2 ${
            isPlaying 
            ? 'bg-[#1b4d2c] border-white/20 text-white' 
            : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <div className={`p-2.5 rounded-xl transition-all ${isPlaying ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-100'}`}>
            {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isPlaying ? 'text-white' : 'text-slate-400'}`}>
              {isPlaying ? 'Audio Active' : 'Muted'}
            </span>
            <span className="text-[9px] mt-1 font-medium opacity-30 uppercase tracking-tighter italic">Laguabra.mpeg</span>
          </div>
        </button>
      </div>
    </div>
  );
}