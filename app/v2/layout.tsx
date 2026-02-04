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
    <div className="flex min-h-screen bg-[#F4F8F5]">
      {/* SIDEBAR - Original Green with Professional Touch */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1b4d2c] text-white p-6 flex flex-col justify-between z-50 shadow-[10px_0_30px_rgba(0,0,0,0.1)] border-r border-white/5">
        <div>
          {/* LOGO AREA - Professional White Panel */}
          <div className="mb-10 group">
            <div className="relative bg-white p-4 rounded-[2rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden h-36 border-4 border-white/10 transition-all duration-500 group-hover:shadow-green-400/20">
              <img 
                src="/logo-abraseed.png.png" 
                alt="Abraseed Logo" 
                // Scale 1.75 untuk nge-zoom total & crop blank space
                className="w-full h-full object-contain scale-[1.75] transition-transform duration-700 ease-in-out group-hover:scale-[1.85]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes(".png.png")) target.src = "/logo-abraseed.png";
                }}
              />
              {/* Overlay gradasi halus di atas logo agar lebih elegan */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Tagline Baru */}
            <div className="mt-5 px-2 text-center">
              <p className="text-[10px] font-medium text-green-200/60 leading-relaxed italic tracking-wide">
                "Project suka-suka, <br /> 
                <span className="text-green-400 font-black uppercase not-italic tracking-widest text-[11px]">output luar biasa.</span>"
              </p>
            </div>
          </div>

          {/* Navigation with Glass Effect on Active */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 group ${
                    isActive 
                    ? 'bg-white text-[#1b4d2c] shadow-[0_8px_20px_rgba(0,0,0,0.15)] scale-[1.02]' 
                    : 'text-green-100/40 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`${isActive ? 'text-[#1b4d2c]' : 'text-green-400/50 group-hover:text-green-300'} transition-colors`}>
                    {item.icon}
                  </div>
                  <span className="text-[13px] tracking-tight">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Link */}
        <Link href="/" className="flex items-center gap-3 px-4 py-3 border border-white/10 rounded-xl text-green-100/30 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
          <ArrowLeft size={14} />
          Back to Version 1.0
        </Link>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-64 p-12 relative overflow-x-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-100/50 blur-[120px] -z-10 rounded-full"></div>
        {children}
      </main>

      {/* MUSIC PLAYER - More Minimalist & Elegant */}
      <audio ref={audioRef} loop>
        <source src="/laguabra.mpeg" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={toggleMusic}
          className={`flex items-center gap-4 p-2.5 pr-6 rounded-2xl transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border ${
            isPlaying 
            ? 'bg-[#1b4d2c] border-green-500/30 text-white translate-y-[-4px]' 
            : 'bg-white border-slate-200 text-slate-500 hover:border-green-200'
          }`}
        >
          <div className={`p-2.5 rounded-xl transition-all ${isPlaying ? 'bg-green-500 text-white' : 'bg-slate-100'}`}>
            {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isPlaying ? 'text-green-300' : 'text-slate-400'}`}>
              {isPlaying ? 'Audio Active' : 'Audio Muted'}
            </span>
            <span className="text-[9px] mt-1 font-medium opacity-50 italic">Laguabra.mpeg</span>
          </div>
        </button>
      </div>
    </div>
  );
}