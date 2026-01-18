"use client";

import React, { useState } from 'react';
import { LayoutGrid, Box, BrainCircuit, GitBranch, PencilRuler, Cpu, Waves, Sun, Power, Activity, Database, Cloud } from 'lucide-react';

// --- KOMPONEN INTERNAL (Pengganti file yang terpisah) ---

const GeneralTab = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 animate-in fade-in duration-500">
    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Project V2 Overview</h2>
    <p className="text-slate-500 leading-relaxed font-medium">
      Abraseed V2 adalah sistem otomasi pertanian cerdas yang difokuskan pada pemantauan level air (tinggi air) dan intensitas cahaya secara real-time untuk memastikan pertumbuhan tanaman yang optimal melalui kontrol pompa otomatis.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3 text-blue-700 font-bold text-xs uppercase tracking-widest"><Database size={16}/> Supabase Cloud</div>
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3 text-emerald-700 font-bold text-xs uppercase tracking-widest"><Activity size={16}/> Real-time Monitoring</div>
      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-3 text-purple-700 font-bold text-xs uppercase tracking-widest"><Cloud size={16}/> Next.js Interface</div>
    </div>
  </div>
);

const PartsTab = () => {
  const components = [
    { name: "ESP32 DevKit V1", role: "Main Controller", icon: <Cpu className="text-purple-500" /> },
    { name: "Ultrasonic HC-SR04", role: "Sensor Tinggi Air", icon: <Waves className="text-blue-500" /> },
    { name: "LDR / Photoresistor", role: "Sensor Cahaya", icon: <Sun className="text-yellow-500" /> },
    { name: "Relay & Water Pump", role: "Aktuator Sistem", icon: <Power className="text-emerald-500" /> },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
      {components.map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm hover:border-emerald-300 transition-all">
          <div className="p-4 bg-slate-50 rounded-2xl">{item.icon}</div>
          <div>
            <h4 className="font-black text-slate-800 uppercase text-sm">{item.name}</h4>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{item.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const FuzzyTab = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm animate-in fade-in duration-500">
    <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">Fuzzy Logic Controller</h2>
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
        <div className="w-2 h-12 bg-emerald-500 rounded-full"></div>
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Input Variables</p>
          <p className="font-bold text-slate-700">Tinggi Air (cm) & Intensitas Cahaya (Lux)</p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
        <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Output Variable</p>
          <p className="font-bold text-slate-700">Kondisi Pompa (Hidup/Mati)</p>
        </div>
      </div>
      <p className="text-sm text-slate-500 italic font-medium leading-relaxed">
        Sistem menentukan durasi atau status pompa berdasarkan kombinasi tingkat kekeringan (level air) dan kebutuhan cahaya tanaman.
      </p>
    </div>
  </div>
);

const FlowchartTab = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center animate-in fade-in duration-500">
    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
      <GitBranch size={40} />
    </div>
    <h3 className="font-black text-slate-800 text-xl uppercase tracking-tight">System Workflow</h3>
    <p className="text-slate-500 max-w-sm mx-auto mt-2 text-sm">
      ESP32 Membaca Sensor → Kalkulasi Fuzzy → Kirim JSON ke Supabase API → Dashboard Web Update Real-time.
    </p>
  </div>
);

const DesignTab = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm animate-in fade-in duration-500 space-y-6">
    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Visual Identity</h2>
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-[#1b4d2c] border-4 border-white shadow-lg" title="Primary Green"></div>
      <div className="w-12 h-12 rounded-full bg-emerald-500 border-4 border-white shadow-lg" title="Secondary Green"></div>
      <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white shadow-lg" title="Water Blue"></div>
    </div>
    <div className="p-4 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
      Glassmorphism • High Contrast • Modern Minimalism
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function AboutProject() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <LayoutGrid size={16} /> },
    { id: 'parts', label: 'Components', icon: <Box size={16} /> },
    { id: 'fuzzy', label: 'Fuzzy Logic', icon: <BrainCircuit size={16} /> },
    { id: 'flowchart', label: 'Flowchart', icon: <GitBranch size={16} /> },
    { id: 'design', label: 'Design', icon: <PencilRuler size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-transparent py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight uppercase">
            About <span className="text-emerald-600">ABRASEED</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed font-medium">
            Integrasi teknologi IoT V2 dan Sistem Kendali Cerdas Berbasis Cloud.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap justify-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300
                  ${activeTab === tab.id ? 'bg-[#1b4d2c] text-white shadow-lg shadow-green-900/20' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RENDER CONTENT SECARA DINAMIS */}
        <div className="mt-8 max-w-3xl mx-auto">
          {activeTab === 'general' && <GeneralTab />}
          {activeTab === 'parts' && <PartsTab />}
          {activeTab === 'fuzzy' && <FuzzyTab />}
          {activeTab === 'flowchart' && <FlowchartTab />}
          {activeTab === 'design' && <DesignTab />}
        </div>

      </div>
    </div>
  );
}