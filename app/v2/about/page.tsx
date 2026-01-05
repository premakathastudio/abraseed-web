'use client';

import { useState } from 'react';

// --- SUB-COMPONENTS (Semua di dalam satu file agar tidak error import) ---

const General = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
    <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
      Project Vision
    </div>
    <h2 className="text-3xl font-black text-slate-800">Smart Irrigation for Sustainable Farming</h2>
    <p className="text-slate-600 leading-relaxed text-lg">
      Abraseed V2 hadir sebagai solusi manajemen pertanian presisi. Dengan mengintegrasikan sensor 
      kelembaban tanah, suhu, dan intensitas cahaya, sistem ini memastikan setiap tanaman mendapatkan 
      jumlah air yang tepat.
    </p>
  </div>
);

const Flowchart = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center gap-8">
    <h2 className="text-2xl font-bold text-slate-800">System Workflow</h2>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
      <div className="w-40 h-20 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-bold">Sensor Data</div>
      <div className="text-slate-300 text-2xl">→</div>
      <div className="w-40 h-20 bg-[#1b4d2c] text-white rounded-2xl flex items-center justify-center font-bold">Fuzzy Logic</div>
      <div className="text-slate-300 text-2xl">→</div>
      <div className="w-40 h-20 bg-green-500 text-white rounded-2xl flex items-center justify-center font-bold">Water Pump</div>
    </div>
  </div>
);

const FuzzyLogic = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">Mamdani Inference System</h2>
    <ul className="space-y-4">
      <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-700 uppercase text-xs">Fuzzyfikasi</li>
      <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-700 uppercase text-xs">Mesin Inferensi</li>
      <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-700 uppercase text-xs">Defuzzyfikasi</li>
    </ul>
  </div>
);

const Parts = () => {
  const hardware = [
    { name: 'ESP32 DevKit', type: 'Controller', color: 'border-blue-500' },
    { name: 'DHT22', type: 'Climate Sensor', color: 'border-yellow-500' },
    { name: 'Relay 5V', type: 'Actuator', color: 'border-red-500' },
    { name: 'Soil Moisture', type: 'Sensor', color: 'border-green-500' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hardware.map((item, i) => (
        <div key={i} className={`bg-white p-6 rounded-[2rem] border-l-8 ${item.color} shadow-sm flex justify-between items-center`}>
          <div>
            <h3 className="font-black text-slate-800 uppercase tracking-tight">{item.name}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.type}</p>
          </div>
          <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full">ACTIVE</div>
        </div>
      ))}
    </div>
  );
};

const Design = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
    <h2 className="text-2xl font-black text-slate-800 mb-2">Visual Identity</h2>
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-[#1b4d2c] shadow-lg border-2 border-white"></div>
      <div className="w-12 h-12 rounded-full bg-green-500 shadow-lg border-2 border-white"></div>
    </div>
    <p className="text-slate-500 italic text-sm">Design follows the V2.0 aesthetic principles.</p>
  </div>
);

// --- MAIN PAGE ---

export default function AboutProject() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'flowchart', label: 'Flowchart' },
    { id: 'fuzzy', label: 'Fuzzy Logic' },
    { id: 'parts', label: 'Parts' },
    { id: 'design', label: 'Design' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return <General />;
      case 'flowchart': return <Flowchart />;
      case 'fuzzy': return <FuzzyLogic />;
      case 'parts': return <Parts />;
      case 'design': return <Design />;
      default: return <General />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-black text-[#1b4d2c]">About Project</h1>
        <p className="text-slate-500 font-medium tracking-tight">Technical documentation for Abraseed V2.0</p>
      </header>

      {/* SUB-NAVIGATION BAR */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 inline-flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#1b4d2c] text-white shadow-md'
                : 'text-slate-400 hover:text-[#1b4d2c] hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}