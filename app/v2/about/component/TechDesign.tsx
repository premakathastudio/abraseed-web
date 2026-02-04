"use client";
import { FileText, Cpu, Zap } from 'lucide-react';

export const TechDesign = () => {
  const specs = [
    { label: "Controller", value: "ESP32 DevKit V1" },
    { label: "Connectivity", value: "WiFi 2.4GHz" },
    { label: "Sensors", value: "LDR & Ultrasonic" },
    { label: "Actuator", value: "Submersible Pump" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* SECTION 1: SCHEMATIC */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><FileText size={24} /></div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">01. Schematic Logic</h2>
        </div>
        <div className="aspect-square bg-slate-50 rounded-[3rem] relative overflow-hidden group border border-slate-100 shadow-xl">
           <div className="absolute inset-0 p-4 group-hover:scale-105 transition-transform duration-700">
              <img src="/schematic.png" alt="Schematic" className="w-full h-full object-contain opacity-80" />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
           <div className="absolute bottom-8 left-8 text-white uppercase italic font-black">Circuit Logic</div>
        </div>
      </div>

      {/* SECTION 2: PCB */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Cpu size={24} /></div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">02. PCB Architecture</h2>
        </div>
        <div className="aspect-square bg-slate-900 rounded-[3rem] relative overflow-hidden group shadow-2xl p-2">
           <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
              <img src="/pcb.png" alt="PCB" className="w-full h-full object-cover" />
           </div>
           <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div className="bg-emerald-500 w-fit p-3 rounded-2xl text-white shadow-lg"><Zap size={24} /></div>
              <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 grid grid-cols-2 gap-4">
                 {specs.map((s, i) => (
                   <div key={i}>
                     <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                     <p className="text-[10px] font-bold text-white italic truncate">{s.value}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};