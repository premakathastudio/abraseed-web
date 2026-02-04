"use client";

import Image from 'next/image';
import { Box, Cpu, Zap, Share2, Layers, HardDrive, FileText } from 'lucide-react';

export default function AboutV2() {
  const specs = [
    { label: "Controller", value: "ESP32 DevKit V1" },
    { label: "Connectivity", value: "WiFi 2.4GHz / Supabase Realtime" },
    { label: "Sensors", value: "LDR Lux, Ultrasonic HC-SR04" },
    { label: "Actuator", value: "Mini Submersible Pump 5V" }
  ];

  return (
    <div className="w-full space-y-16 pb-20">
      {/* HEADER SECTION */}
      <div className="max-w-3xl">
        <h1 className="text-6xl font-black text-slate-800 tracking-tighter italic lowercase">
          the engineering <span className="text-slate-300 not-italic font-light">/ inside abraseed</span>
        </h1>
        <p className="mt-6 text-slate-500 font-medium leading-relaxed italic">
          Dari coretan skematik hingga purwarupa fisik. Abraseed dibangun dengan presisi untuk menjembatani alam dan teknologi digital.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* SECTION 1: SCHEMATIC DESIGN */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">01. Schematic Logic</h2>
          </div>
          
          <div className="aspect-square bg-slate-50 rounded-[3rem] relative overflow-hidden group border border-slate-100 shadow-xl">
             {/* PANGGIL GAMBAR SCHEMATIC KAMU DI SINI */}
             <div className="absolute inset-0 p-4 group-hover:scale-105 transition-transform duration-700 ease-in-out">
                <img 
                  src="/schematic.png" // Ganti sesuai nama file kamu di public
                  alt="Schematic Design"
                  className="w-full h-full object-contain opacity-80"
                />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
             <div className="absolute bottom-8 left-8">
                <p className="text-white font-black text-lg italic tracking-tighter uppercase">Circuit Logic Diagram</p>
                <p className="text-white/60 text-[10px] font-medium tracking-widest uppercase">Precision Routing System</p>
             </div>
          </div>
        </div>

        {/* SECTION 2: PCB DESIGN */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Cpu size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">02. PCB Architecture</h2>
          </div>

          <div className="aspect-square bg-slate-900 rounded-[3rem] relative overflow-hidden group shadow-2xl flex flex-col justify-between p-2">
             {/* PANGGIL GAMBAR PCB KAMU DI SINI */}
             <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <img 
                  src="/pcb.png" // Ganti sesuai nama file kamu di public
                  alt="PCB Design"
                  className="w-full h-full object-cover"
                />
             </div>

             <div className="relative z-10 p-8">
                <div className="bg-emerald-500 w-fit p-3 rounded-2xl text-white mb-6 shadow-lg shadow-emerald-500/20">
                   <Zap size={24} />
                </div>
                <h3 className="text-white text-4xl font-black tracking-tighter leading-none mb-2 italic">Custom PCB.</h3>
                <p className="text-slate-400 text-xs font-medium max-w-[250px]">Layout efisien untuk stabilitas daya 5V dan transmisi data sensor tanpa noise.</p>
             </div>

             {/* Tech Specs Overlay */}
             <div className="relative z-10 p-8 bg-slate-800/80 backdrop-blur-md rounded-b-[2.8rem] border-t border-white/5">
                <div className="grid grid-cols-2 gap-4">
                   {specs.map((item, i) => (
                     <div key={i} className="space-y-1">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.label}</p>
                       <p className="text-[10px] font-bold text-white italic truncate">{item.value}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* ADDITIONAL INFO: 3D PRINTING / CASE */}
      <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
           <h3 className="text-3xl font-black text-slate-800 italic tracking-tighter">Housing & Build.</h3>
           <p className="text-slate-500 text-sm leading-relaxed">
             Semua komponen elektronik dilindungi oleh casing hasil cetak 3D dengan material PETG yang tahan air dan panas, dirancang agar mudah dibongkar pasang (Modular Design).
           </p>
           <div className="flex gap-4 pt-2">
              <span className="px-4 py-2 bg-white rounded-full text-[10px] font-black text-slate-400 border border-slate-200 uppercase tracking-widest">3D Printed</span>
              <span className="px-4 py-2 bg-white rounded-full text-[10px] font-black text-slate-400 border border-slate-200 uppercase tracking-widest">Modular</span>
           </div>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-[2.5rem] overflow-hidden">
            {/* Jika ada foto fisik 3D print kalian, taruh di sini */}
            <div className="w-full h-full flex items-center justify-center bg-slate-300">
               <Layers size={48} className="text-slate-400" />
            </div>
        </div>
      </div>
    </div>
  );
}