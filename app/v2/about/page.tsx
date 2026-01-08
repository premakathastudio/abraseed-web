"use client";

import React, { useState } from 'react';
import { LayoutGrid, Box, BrainCircuit, GitBranch, PencilRuler } from 'lucide-react';

// Import komponen yang baru dibuat
import GeneralTab from './components/GeneralTab';
import PartsTab from './components/PartsTab';
import FuzzyTab from './components/FuzzyTab';
import FlowchartTab from './components/FlowchartTab';
import DesignTab from './components/DesignTab';

export default function AboutProject() {
  const [activeTab, setActiveTab] = useState('parts');

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
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight uppercase">About <span className="text-emerald-600">ABRASEED</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed font-medium">Integrasi teknologi IoT dan Sistem Kendali Cerdas.</p>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap justify-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300
                  ${activeTab === tab.id ? 'bg-[#1b4d2c] text-white' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RENDER CONTENT SECARA DINAMIS */}
        <div className="mt-8">
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