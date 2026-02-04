"use client";

import React, { useState } from 'react';
import { LayoutGrid, Box, BrainCircuit, GitBranch, PencilRuler } from 'lucide-react';

// SEMUA IMPORT SEKARANG PAKAI './' KARENA ADA DI DALAM FOLDER YANG SAMA
import GeneralTab from './component/GeneralTab'; 
import FuzzyTab from './component/FuzzyTab';
import PartsTab from './component/PartsTab';
import FlowchartTab from './component/FlowchartTab';
import { TechDesign } from './component/TechDesign'; // FIX: Sudah diarahkan ke folder lokal

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
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tighter uppercase italic">
            About <span className="text-emerald-600">ABRASEED</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-[11px] font-black uppercase tracking-[0.3em] leading-relaxed">
            IoT Architecture V2 / <span className="text-slate-800 underline decoration-emerald-500 decoration-2">Cloud Integrated System</span>
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/60 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-white flex flex-wrap justify-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'bg-[#1b4d2c] text-white shadow-lg shadow-green-900/20' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RENDER CONTENT AREA */}
        <div className={`mt-8 mx-auto transition-all duration-500 ${activeTab === 'design' ? 'max-w-6xl' : 'max-w-3xl'}`}>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'general' && <GeneralTab />}
            {activeTab === 'parts' && <PartsTab />}
            {activeTab === 'fuzzy' && <FuzzyTab />}
            {activeTab === 'flowchart' && <FlowchartTab />}
            {activeTab === 'design' && <TechDesign />}
          </div>
        </div>

        {/* BOTTOM TAG */}
        <div className="mt-20 flex justify-center opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-400 italic">Engineering Excellence</p>
        </div>

      </div>
    </div>
  );
}