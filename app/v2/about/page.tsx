"use client";

import React, { useState } from 'react';
import { 
  Cpu, Zap, Maximize, Sun, MoveUp, 
  LayoutGrid, GitBranch, Box, PencilRuler, 
  ChevronRight, Droplets, Waves, Settings,
  Target, ShieldCheck, Microscope
} from 'lucide-react';

export default function AboutProject() {
  const [activeTab, setActiveTab] = useState('parts');

  const tabs = [
    { id: 'general', label: 'General', icon: <LayoutGrid size={16} /> },
    { id: 'flowchart', label: 'Flowchart', icon: <GitBranch size={16} /> },
    { id: 'parts', label: 'Components', icon: <Box size={16} /> },
    { id: 'design', label: 'Design', icon: <PencilRuler size={16} /> },
  ];

  const mainParts = [
    {
      category: "Brain & Controller",
      name: "ESP32 Microcontroller",
      desc: "Otak utama sistem yang menangani konektivitas IoT, pembacaan sensor secara real-time, dan eksekusi algoritma Fuzzy Logic.",
      icon: <Cpu className="text-emerald-600" size={32} />,
      color: "bg-emerald-50"
    },
    {
      category: "Sensor Suite",
      name: "Monitoring Sensors",
      desc: "Kombinasi sensor Lux, TOF (Water Level), dan Ultrasonik untuk akuisisi data lingkungan yang presisi.",
      icon: <Maximize className="text-blue-600" size={32} />,
      color: "bg-blue-50"
    },
    {
      category: "Actuators",
      name: "Dynamic Actuators",
      desc: "DC Pump, Servo Motor, dan Grow Light Strip yang bekerja otomatis berdasarkan output kendali cerdas.",
      icon: <Zap className="text-orange-600" size={32} />,
      color: "bg-orange-50"
    }
  ];

  const subParts = [
    "Grow Light (1-6 Strip)", "DC Motor 12V", "Step Down Buck Converter", "Relay Module", "Frame PVC & Acrylic"
  ];

  return (
    <div className="min-h-screen bg-transparent py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-800 mb-4">About <span className="text-emerald-600">ABRASEED</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            Integrasi teknologi IoT dan Sistem Kendali Cerdas untuk optimasi pertanian hidroponik masa depan.
          </p>
        </div>

        {/* NAVIGATION BAR */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'bg-[#1b4d2c] text-white shadow-lg shadow-green-900/20' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* TAB: COMPONENTS */}
          {activeTab === 'parts' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mainParts.map((part, index) => (
                  <div key={index} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50 hover:shadow-xl transition-all duration-500 group">
                    <div className={`w-16 h-16 ${part.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                      {part.icon}
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{part.category}</span>
                    <h3 className="text-xl font-black text-slate-800 mt-1 mb-3">{part.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {part.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 text-center md:text-left">
                  <h4 className="text-lg font-black text-slate-800 mb-1">Supporting Parts</h4>
                  <p className="text-xs text-slate-400">Komponen pendukung stabilitas sistem.</p>
                </div>
                <div className="md:w-2/3 flex flex-wrap justify-center md:justify-start gap-2">
                  {subParts.map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-xl border border-slate-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1b4d2c] rounded-[2rem] p-8 text-white flex items-center justify-between group hover:scale-[1.02] transition-transform cursor-default">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-white/10 rounded-2xl text-emerald-400"><Sun size={24}/></div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest">Logic Control A</p>
                      <h5 className="font-bold text-sm">Fuzzy: Light Lux → LED Strips</h5>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-emerald-700" />
                </div>
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex items-center justify-between group hover:scale-[1.02] transition-transform cursor-default">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-white/10 rounded-2xl text-blue-400"><MoveUp size={24}/></div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-400/60 uppercase tracking-widest">Logic Control B</p>
                      <h5 className="font-bold text-sm">Fuzzy: Plant Height → Servo Angle</h5>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-700" />
                </div>
              </div>
            </div>
          )}

          {/* TAB: FLOWCHART */}
          {activeTab === 'flowchart' && (
            <div className="space-y-12 animate-in fade-in zoom-in duration-500">
              <div className="bg-[#1b4d2c] rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-2">Decision Making Flow</h3>
                  <p className="text-emerald-100/70 text-sm max-w-xl">
                    Visualisasi alur kerja sistem dari pembacaan sensor hingga pengambilan keputusan otomatis oleh ESP32 menggunakan Fuzzy Logic.
                  </p>
                </div>
                <GitBranch className="absolute right-10 top-1/2 -translate-y-1/2 text-white/5" size={150} />
              </div>

              <div className="flex flex-col items-center space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <Sun className="mx-auto mb-2 text-yellow-500" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Input 1</span>
                    <p className="font-bold text-slate-800 text-sm italic">Light Lux</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <MoveUp className="mx-auto mb-2 text-blue-500" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Input 2</span>
                    <p className="font-bold text-slate-800 text-sm italic">Plant Height</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center hidden md:block">
                    <Droplets className="mx-auto mb-2 text-cyan-500" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Input 3</span>
                    <p className="font-bold text-slate-800 text-sm italic">Soil Moisture</p>
                  </div>
                </div>

                <div className="h-10 w-0.5 bg-slate-200 relative">
                    <div className="absolute -bottom-1 -left-[3px] w-2 h-2 bg-slate-200 rotate-45"></div>
                </div>

                <div className="w-full max-w-2xl bg-white p-8 rounded-[3rem] border-2 border-emerald-500 shadow-xl shadow-emerald-100 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                    Brain Center
                  </div>
                  <Cpu className="mx-auto mb-4 text-emerald-600" size={40} />
                  <h4 className="text-xl font-black text-slate-800 mb-2 tracking-tight">Fuzzy Decision Making</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto italic">
                    Memproses variabel input melalui aturan "If-Then" untuk menghasilkan output yang presisi bagi aktuator.
                  </p>
                </div>

                <div className="h-10 w-0.5 bg-slate-200 relative">
                    <div className="absolute -bottom-1 -left-[3px] w-2 h-2 bg-slate-200 rotate-45"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="bg-slate-900 p-6 rounded-3xl text-white text-center">
                    <Zap className="mx-auto mb-2 text-yellow-400" />
                    <p className="font-bold text-xs uppercase tracking-tight">LED Intensity</p>
                  </div>
                  <div className="bg-[#1b4d2c] p-6 rounded-3xl text-white text-center border-t-4 border-emerald-500">
                    <Waves className="mx-auto mb-2 text-blue-400" />
                    <p className="font-bold text-xs uppercase tracking-tight">Water Irrigation</p>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-3xl text-white text-center">
                    <Settings className="mx-auto mb-2 text-orange-400" />
                    <p className="font-bold text-xs uppercase tracking-tight">Servo Angle</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Visi Proyek</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                    "Membangun ekosistem pertanian modern yang mandiri, cerdas, dan efisien untuk mendukung ketahanan pangan di era industri 4.0."
                  </p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                    <Microscope size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Misi Utama</h3>
                  <ul className="text-sm text-slate-500 space-y-3 font-medium">
                    <li className="flex items-start gap-2 italic">• Integrasi IoT untuk monitoring 24/7.</li>
                    <li className="flex items-start gap-2 italic">• Automasi presisi berbasis logika kendali cerdas.</li>
                    <li className="flex items-start gap-2 italic">• Optimasi penggunaan sumber daya (Air & Cahaya).</li>
                  </ul>
                </div>
              </div>
              <div className="bg-emerald-50 p-10 rounded-[3rem] flex items-center gap-6 border border-emerald-100">
                 <ShieldCheck className="text-emerald-600 shrink-0" size={40} />
                 <p className="text-sm font-bold text-emerald-800 tracking-tight italic uppercase">Abraseed V2: Optimized for Stability and Performance.</p>
              </div>
            </div>
          )}

          {/* TAB: DESIGN */}
          {activeTab === 'design' && (
            <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center animate-in fade-in duration-500">
              <div className="p-6 bg-slate-50 rounded-full mb-6">
                <PencilRuler size={48} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">System Blueprint</h3>
              <p className="text-slate-400 text-sm font-medium">CAD Designs & Schematic Files are currently under final documentation.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}