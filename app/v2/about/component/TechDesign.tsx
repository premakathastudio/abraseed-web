"use client";

import React from 'react';
import { FileText, Cpu, Zap, ListChecks, Activity } from 'lucide-react';

export const TechDesign = () => {
  const specs = [
    { label: "Controller", value: "ESP32 DevKit V1" },
    { label: "Connectivity", value: "WiFi 2.4GHz" },
    { label: "Sensors", value: "LDR Lux & Ultrasonic" },
    { label: "Actuator", value: "Mini Pump 5V" },
    { label: "Power Source", value: "USB-C / 5V DC" },
    { label: "Logic Level", value: "3.3V (ESP Native)" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      
      {/* CARD 1: SCHEMATIC */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><FileText size={18} /></div>
          <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">01. Schematic</h2>
        </div>
        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 flex items-center justify-center group">
          <img 
            src="/schematic.png" 
            alt="Schematic Blueprint" 
            className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* CARD 2: PCB VISUAL (BERSIH TOTAL) */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Cpu size={18} /></div>
          <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">02. PCB Layout</h2>
        </div>
        <div className="flex-1 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
          <img 
            src="/pcb.png" 
            alt="PCB Design" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
          <div className="absolute top-4 right-4 bg-emerald-500 p-2 rounded-xl text-white shadow-lg">
            <Zap size={16} className="animate-pulse" />
          </div>
        </div>
      </div>

      {/* CARD 3: TECHNICAL SPECS (KARTU TERPISAH) */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><ListChecks size={18} /></div>
          <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">03. Hardware Specs</h2>
        </div>
        <div className="flex-1 bg-[#1b4d2c] rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-between border-b-8 border-green-900">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Activity size={16} className="text-emerald-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-200/50">Core Components</span>
            </div>
            <div className="space-y-5">
              {specs.map((s, i) => (
                <div key={i} className="border-b border-white/5 pb-2 last:border-0">
                  <p className="text-[7px] font-black text-emerald-200/40 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-[11px] font-bold italic text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[8px] font-medium text-emerald-100/60 leading-relaxed italic">
              "Sirkuit dirancang untuk efisiensi daya maksimal dan stabilitas transmisi data real-time ke Supabase Cloud."
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};