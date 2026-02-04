"use client";

import React from 'react';
import { FileText, Cpu, Zap, Box, Layers } from 'lucide-react';

export const TechDesign = () => {
  const specs = [
    { label: "Controller", value: "ESP32 DevKit V1" },
    { label: "Connectivity", value: "WiFi 2.4GHz" },
    { label: "Sensors", value: "LDR & Ultrasonic" },
    { label: "Actuator", value: "Submersible Pump" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
      
      {/* 01. SCHEMATIC SECTION */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-800 uppercase italic leading-none">01. Schematic Logic</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">System Blueprint</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[3rem] relative overflow-hidden group border border-slate-100 shadow-sm min-h-[400px]">
          <div className="absolute inset-0 p-8 group-hover:scale-105 transition-transform duration-700 ease-in-out flex items-center justify-center">
            <img 
              src="/schematic.png" 
              alt="Schematic Design" 
              className="w-full h-full object-contain"
            />
          </div>
          {/* Overlay Tipis di pojok agar gambar tetap dominan */}
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1 bg-slate-100/80 backdrop-blur-sm rounded-full text-[8px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">
              V2.0 Certified
            </span>
          </div>
        </div>
      </div>

      {/* 02. PCB SECTION - REVISED NO OVERLAP */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm">
            <Cpu size={20} />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-800 uppercase italic leading-none">02. PCB Architecture</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Custom Routing</p>
          </div>
        </div>

        <div className="flex-1 bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col min-h-[400px]">
          {/* TOP: FULL IMAGE AREA (BEBAS GANGGUAN) */}
          <div className="relative flex-[1.5] group overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <img 
              src="/pcb.png" 
              alt="PCB Design" 
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out" 
            />
            <div className="absolute top-6 right-6">
              <div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-lg shadow-emerald-500/40">
                <Zap size={20} className="animate-pulse" />
              </div>
            </div>
          </div>

          {/* BOTTOM: INFO AREA (BAWAH GAMBAR) */}
          <div className="p-10 bg-slate-800/80 backdrop-blur-xl border-t border-white/5 relative z-10">
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {specs.map((s, i) => (
                <div key={i} className="group/item">
                  <p className="text-[7px] font-black text-emerald-500/60 uppercase tracking-[0.2em] mb-1 group-hover/item:text-emerald-400 transition-colors">
                    {s.label}
                  </p>
                  <p className="text-[11px] font-bold text-slate-200 italic tracking-tight">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-slate-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Double Layer PCB</span>
              </div>
              <p className="text-[9px] font-black text-emerald-500 italic">5V Stable Output</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};