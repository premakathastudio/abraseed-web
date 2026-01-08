"use client";

import React, { useState } from 'react';
import { 
  Cpu, Zap, Maximize, Sun, MoveUp, 
  LayoutGrid, GitBranch, Box, PencilRuler, 
  ChevronRight, Droplets, Waves, Settings,
  Target, ShieldCheck, Microscope, BrainCircuit
} from 'lucide-react';

export default function AboutProject() {
  const [activeTab, setActiveTab] = useState('parts');

  const tabs = [
    { id: 'general', label: 'General', icon: <LayoutGrid size={16} /> },
    { id: 'parts', label: 'Components', icon: <Box size={16} /> },
    { id: 'fuzzy', label: 'Fuzzy Logic', icon: <BrainCircuit size={16} /> },
    { id: 'flowchart', label: 'Flowchart', icon: <GitBranch size={16} /> },
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
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight uppercase">About <span className="text-emerald-600">ABRASEED</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed font-medium">
            Integrasi teknologi IoT dan Sistem Kendali Cerdas untuk optimasi pertanian hidroponik masa depan.
          </p>
        </div>

        {/* NAVIGATION BAR */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap justify-center gap-1">
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
                  <h4 className="text-lg font-black text-slate-800 mb-1 tracking-tight">Supporting Parts</h4>
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
            </div>
          )}

          {/* TAB: FUZZY LOGIC */}
          {activeTab === 'fuzzy' && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="bg-[#1b4d2c] p-10 rounded-[3rem] text-white overflow-hidden relative shadow-xl shadow-green-900/10">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <BrainCircuit className="text-emerald-400" /> Fuzzy Inference System
                  </h3>
                  <p className="text-emerald-100/70 text-sm leading-relaxed max-w-2xl font-medium">
                    Sistem menggunakan metode Mamdani untuk menghasilkan keputusan yang adaptif. Berbeda dengan sistem ON/OFF biasa, Fuzzy memungkinkan aktuator bekerja secara proporsional sesuai kebutuhan riil tanaman.
                  </p>
                </div>
                <Zap className="absolute right-[-20px] top-1/2 -translate-y-1/2 text-white/5" size={200} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-yellow-50 rounded-2xl text-yellow-600"><Sun size={20}/></div>
                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Logic A: Lighting</h4>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-medium text-slate-600 leading-relaxed italic border-l-4 border-l-yellow-400">
                    "Semakin rendah intensitas cahaya matahari yang terdeteksi, maka sistem akan menambah jumlah LED Strip yang aktif (1-6) secara otomatis."
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><MoveUp size={20}/></div>
                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Logic B: Elevation</h4>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-medium text-slate-600 leading-relaxed italic border-l-4 border-l-blue-400">
                    "Jika jarak tanaman ke sensor mengecil (tanaman bertambah tinggi), servo akan berputar untuk menyesuaikan ketinggian lampu secara otomatis."
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FLOWCHART (GAMBAR DARI PUBLIC) */}
          {activeTab === 'flowchart' && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-2 flex items-center gap-3 tracking-tight uppercase">
                    <GitBranch className="text-emerald-400" /> System Flowchart
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-medium italic">
                    Visualisasi alur logika program dan transmisi data sistem Abraseed yang dirancang oleh tim teknis.
                  </p>
                </div>
              </div>

              {/* Box Pemanggil Gambar */}
              <div className="bg-white p-4 md:p-8 rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden flex justify-center">
                <div className="relative w-full group">
                  <img 
                    src="/flowchart.png" 
                    alt="Abraseed System Flowchart" 
                    className="w-full h-auto rounded-3xl shadow-md group-hover:scale-[1.01] transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/1200x800?text=Flowchart+Image+Not+Found+in+Public+Folder";
                    }}
                  />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/5 pointer-events-none"></div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                  Dokumentasi Teknis Integrasi IoT & Kendali Cerdas
                </p>
              </div>
            </div>
          )}

          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:border-emerald-200 transition-colors">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight uppercase text-xs">Visi Proyek</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                    "Membangun ekosistem pertanian modern yang mandiri, cerdas, dan efisien untuk mendukung ketahanan pangan di era industri 4.0."
                  </p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                    <Microscope size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight uppercase text-xs">Misi Utama</h3>
                  <ul className="text-sm text-slate-500 space-y-4 font-medium italic">
                    <li className="flex items-center gap-3"><ChevronRight size={14} className="text-blue-500" /> Monitoring 24/7 via IoT.</li>
                    <li className="flex items-center gap-3"><ChevronRight size={14} className="text-blue-500" /> Automasi Presisi berbasis Fuzzy.</li>
                    <li className="flex items-center gap-3"><ChevronRight size={14} className="text-blue-500" /> Optimasi Sumber Daya.</li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#1b4d2c] p-8 rounded-[2.5rem] flex items-center justify-center gap-6 shadow-xl shadow-green-900/10">
                 <ShieldCheck className="text-emerald-400 shrink-0" size={32} />
                 <p className="text-xs font-black text-white tracking-widest uppercase">Abraseed V2: Standard Performance Certified.</p>
              </div>
            </div>
          )}

          {/* TAB: DESIGN */}
          {activeTab === 'design' && (
            <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center animate-in fade-in duration-500">
              <div className="p-8 bg-slate-50 rounded-full mb-8">
                <PencilRuler size={48} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tighter">Technical Blueprint</h3>
              <p className="text-slate-400 text-sm font-medium italic italic">CAD Designs & Electronic Schematics are being finalized.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}