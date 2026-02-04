"use client";

import React, { useState } from 'react';
import { LayoutGrid, Box, BrainCircuit, GitBranch, PencilRuler } from 'lucide-react';

// IMPORT SEMUA TAB DARI FOLDER COMPONENT (TANPA 'S')
import GeneralTab from './component/GeneralTab'; 
import FuzzyTab from './component/FuzzyTab';
import PartsTab from './component/PartsTab';
import FlowchartTab from './component/FlowchartTab';
import { TechDesign } from '@/component/TechDesign'; 

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
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <h1 className="text-5xl font-black text-slate-800 mb-4 tracking-tighter italic uppercase">
            About <span className="text-emerald-600">ABRASEED</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-[11px] font-black uppercase tracking-[0.3em] leading-relaxed">
            Engineering the future of <span className="text-slate-800">Smart Urban Farming</span> / V2.0 Stable
          </p>
        </div>

        {/* NAVIGATION TAB - GLASSMORPHISM STYLE */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/40 backdrop-blur-xl p-2 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white/60 flex flex-wrap justify-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500
                  ${activeTab === tab.id 
                    ? 'bg-[#1b4d2c] text-white shadow-lg shadow-green-900/40 scale-105' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT RENDER AREA */}
        <div className={`mt-8 mx-auto transition-all duration-700 ease-in-out`}>
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {activeTab === 'general' && (
              <div className="max-w-4xl mx-auto">
                <GeneralTab />
              </div>
            )}

            {activeTab === 'parts' && (
              <div className="max-w-4xl mx-auto">
                <PartsTab />
              </div>
            )}

            {activeTab === 'fuzzy' && (
              <div className="max-w-5xl mx-auto">
                <FuzzyTab />
              </div>
            )}

            {activeTab === 'flowchart' && (
              <div className="max-w-4xl mx-auto">
                <FlowchartTab />
              </div>
            )}

            {activeTab === 'design' && (
              <div className="max-w-6xl mx-auto">
                <TechDesign />
              </div>
            )}
          </div>

        </div>

        {/* FOOTER INFO */}
        <div className="mt-24 text-center">
           <div className="inline-flex items-center gap-2 bg-slate-100 px-6 py-2 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                System Status: Optimized for Growth
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}