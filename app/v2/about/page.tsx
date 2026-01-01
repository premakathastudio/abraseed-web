'use client';

import { Cpu, Database, Layout, Wifi, ShieldCheck, Zap, Leaf } from 'lucide-react';

export default function AboutPage() {
  const techStack = [
    { 
      name: "ESP32 / Arduino", 
      desc: "Hardware inti untuk akuisisi data sensor dan kontrol aktuator secara real-time.", 
      icon: <Cpu className="text-orange-500" size={24} /> 
    },
    { 
      name: "Supabase", 
      desc: "Database PostgreSQL cloud untuk penyimpanan data log sensor yang aman dan cepat.", 
      icon: <Database className="text-green-500" size={24} /> 
    },
    { 
      name: "Next.js 14", 
      desc: "Framework React modern untuk performa dashboard yang kencang dan responsif.", 
      icon: <Zap className="text-yellow-500" size={24} /> 
    },
    { 
      name: "Tailwind CSS", 
      desc: "Framework CSS untuk desain antarmuka (UI) yang estetik dan modern.", 
      icon: <Layout className="text-cyan-500" size={24} /> 
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-[#1b4d2c] rounded-[3rem] p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4 text-green-400">
            <Leaf size={24} />
            <span className="font-bold tracking-widest uppercase text-sm">Smart Agriculture</span>
          </div>
          <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase italic">
            About ABRA<span className="text-green-400">SEED</span>
          </h2>
          <p className="text-green-100/80 leading-relaxed font-medium text-lg">
            ABRASEED adalah sistem pemantauan dan otomasi tanaman berbasis Internet of Things (IoT). 
            Proyek ini dirancang untuk menjawab tantangan urban farming dengan cara mengintegrasikan 
            teknologi sensor presisi dan dashboard analitik yang dapat diakses secara real-time.
          </p>
        </div>
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* TIGA PILAR UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
            <Wifi size={24} />
          </div>
          <h4 className="font-black text-slate-800 mb-2 uppercase tracking-tighter">IoT Connectivity</h4>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">Data dikirim langsung dari mikrokontroler melalui Wi-Fi untuk pemantauan jarak jauh.</p>
        </div>
        
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600">
            <ShieldCheck size={24} />
          </div>
          <h4 className="font-black text-slate-800 mb-2 uppercase tracking-tighter">Reliable Storage</h4>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">Seluruh log sensor tersimpan aman di cloud database untuk keperluan analisis jangka panjang.</p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
            <Layout size={24} />
          </div>
          <h4 className="font-black text-slate-800 mb-2 uppercase tracking-tighter">Intuitive UI</h4>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">Visualisasi data yang interaktif memudahkan siapa saja untuk memahami kondisi tanaman.</p>
        </div>
      </div>

      {/* TECH STACK SECTION */}
      <div className="pb-10">
        <h3 className="text-2xl font-black text-[#1b4d2c] mb-8 px-2 uppercase tracking-tight">Technology Stack</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((tech, i) => (
            <div key={i} className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-slate-50 hover:bg-green-50 hover:border-green-100 transition-all group">
              <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform flex shrink-0">
                {tech.icon}
              </div>
              <div>
                <h5 className="font-black text-slate-800 text-lg">{tech.name}</h5>
                <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER DEKORATIF */}
      <div className="text-center py-6 border-t border-slate-100">
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
          ABRASEED • Ecosystem Version 2.0
        </p>
      </div>
    </div>
  );
}