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
    <div className="flex min-h-screen bg-[#F0F7F2] relative overflow-hidden">
      {/* BACKGROUND DECORATION (Biar efek transparan sidebar kelihatan) */}
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] bg-green-200/40 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/50 blur-[150px] rounded-full -z-10"></div>

      {/* SIDEBAR - Dark Emerald Glassmorphism */}
      <aside className="fixed left-4 top-4 bottom-4 w-72 bg-[#1b4d2c]/85 backdrop-blur-2xl text-white p-6 flex flex-col justify-between z-50 shadow-[20px_0_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] border border-white/10">
        <div>
          {/* LOGO AREA - Melayang di atas kaca */}
          <div className="mb-10 group">
            <div className="relative bg-white p-3 rounded-[2rem] flex items-center justify-center overflow-hidden h-40 shadow-2xl border border-white/20">
              <img 
                src="/logo-abraseed.png.png" 
                alt="Abraseed Logo" 
                className="w-full h-full object-contain scale-[2.5] transition-transform duration-700 ease-in-out group-hover:scale-[2.7]"
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
              <p className="text-[12px] font-black uppercase tracking-[0.15em] text-amber-400 drop-shadow-md">
                Output Luar Biasa
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-500 group ${
                    isActive 
                    ? 'bg-white text-[#1b4d2c] shadow-lg shadow-black/10 scale-[1.05]' 
                    : 'text-green-100/30 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`${isActive ? 'text-[#1b4d2c]' : 'text-green-400/50 group-hover:text-green-300'}`}>
                    {item.icon}
                  </div>
                  <span className="text-[13px] tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher */}
        <Link href="/" className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl text-green-100/20 hover:text-white hover:bg-white/10 transition-all text-[9px] font-black uppercase tracking-widest">
          <ArrowLeft size={14} />
          Switch to v1.0
        </Link>
      </aside>

      {/* CONTENT AREA - Dikasih margin kiri lebih besar karena sidebar melayang */}
      <main className="flex-1 ml-80 p-12 min-h-screen">
        {children}
      </main>

      {/* MUSIC PLAYER - Glassmorphism Style */}
      <audio ref={audioRef} loop>
        <source src="/laguabra.mpeg" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-10 right-10 z-[100]">
        <button 
          onClick={toggleMusic}
          className={`flex items-center gap-4 p-2 pr-6 rounded-2xl backdrop-blur-md border transition-all duration-500 shadow-2xl ${
            isPlaying 
            ? 'bg-[#1b4d2c]/90 border-amber-400/30 text-white' 
            : 'bg-white/80 border-slate-200 text-slate-500'
          }`}
        >
          <div className={`p-3 rounded-xl transition-all ${isPlaying ? 'bg-amber-400 text-[#1b4d2c]' : 'bg-slate-100'}`}>
            {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isPlaying ? 'text-amber-400' : 'text-slate-400'}`}>
              {isPlaying ? 'System On' : 'Muted'}
            </span>
            <span className="text-[9px] mt-1 opacity-40 font-bold uppercase tracking-tighter">Abraseed Beats</span>
          </div>
        </button>
      </div>
    </div>
  );
}