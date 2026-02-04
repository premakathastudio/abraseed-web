"use client";

import React, { useState } from 'react';
import { LayoutGrid, Box, BrainCircuit, GitBranch, PencilRuler } from 'lucide-react';

// IMPORT KOMPONEN LUAR (Pastikan file-file ini sudah ada di folder component)
import GeneralTab from './component/GeneralTab'; 
// Catatan: Jika tab lain belum kamu pisah filenya, mereka akan tetap menggunakan kodingan internal di bawah ini.

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

        {/* RENDER CONTENT */}
        <div className="mt-8 max-w-3xl mx-auto">
          {/* Bagian ini sekarang memanggil file GeneralTab yang baru kamu edit */}
          {activeTab === 'general' && <GeneralTab />}
          
          {/* Tab lain masih menggunakan placeholder/internal sampai kamu memisahkan filenya */}
          {activeTab === 'parts' && <DefaultPartsTab />}
          {activeTab === 'fuzzy' && <DefaultFuzzyTab />}
          {activeTab === 'flowchart' && <DefaultFlowchartTab />}
          {activeTab === 'design' && <DefaultDesignTab />}
        </div>
      </div>
    </div>
  );
}

// --- PLACEHOLDER COMPONENTS (Agar tidak error sebelum file lain dipisah) ---
// Kamu bisa memindahkan ini ke file terpisah nantinya seperti GeneralTab

const DefaultPartsTab = () => (
  <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-center">
    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Konten Components sedang disiapkan...</p>
  </div>
);

const DefaultFuzzyTab = () => (
  <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-center">
    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Konten Fuzzy Logic sedang disiapkan...</p>
  </div>
);

const DefaultFlowchartTab = () => (
  <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-center">
    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Konten Flowchart sedang disiapkan...</p>
  </div>
);

const DefaultDesignTab = () => (
  <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-center">
    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Konten Design sedang disiapkan...</p>
  </div>
);