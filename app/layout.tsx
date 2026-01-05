'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function V2Layout({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play().catch(err => console.log("Autoplay dicegah browser, perlu klik manual"));
        audioRef.current.muted = false;
      } else {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F0F7F2] font-sans">
      {/* SIDEBAR (Pastikan sidebar kamu tetap ada di sini) */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1b4d2c] text-white p-6 z-40">
        <div className="mb-10">
           <h2 className="text-2xl font-black tracking-tighter">ABRA<span className="text-green-400">SEED</span></h2>
           <p className="text-[10px] font-bold text-green-200/50 tracking-[0.3em]">VERSION 2.0</p>
        </div>
        {/* Navigasi menu kamu... */}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10 relative">
        {children}
      </main>

      {/* AUDIO ELEMENT - Mengarah ke public/laguabra.mpeg */}
      <audio ref={audioRef} loop>
        <source src="/laguabra.mpeg" type="audio/mpeg" />
      </audio>

      {/* FLOATING MUSIC CONTROL */}
      <button 
        onClick={toggleMusic}
        className={`fixed bottom-8 right-8 p-4 rounded-2xl shadow-2xl transition-all duration-500 z-50 flex items-center gap-3 border border-white/20 backdrop-blur-md ${
          isPlaying ? 'bg-[#1b4d2c] text-white' : 'bg-white text-slate-400'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <Volume2 size={18} className="relative z-10" />
              <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></span>
            </>
          ) : (
            <VolumeX size={18} />
          )}
        </div>
        
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black uppercase tracking-widest">
            {isPlaying ? "Now Playing" : "Music Off"}
          </span>
          <span className="text-[9px] font-medium opacity-60">Laguabra.mpeg</span>
        </div>
      </button>
    </div>
  );
}