'use client';

import { useState } from 'react';

// --- KUMPULAN SUB-KOMPONEN ---

const General = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
    <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
      Project Vision
    </div>
    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Smart Irrigation for Sustainable Farming</h2>
    <p className="text-slate-600 leading-relaxed text-lg">
      Abraseed V2 hadir sebagai solusi manajemen pertanian presisi. Dengan mengintegrasikan sensor 
      kelembaban tanah, suhu, dan intensitas cahaya, sistem ini memastikan setiap tanaman mendapatkan 
      jumlah air yang tepat di waktu yang tepat secara otomatis menggunakan algoritma cerdas.
    </p>
  </div>
);

const Flowchart = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-slate-800">System Logic Flowchart</h2>
      <p className="text-slate-500 text-sm">Visualisasi alur kerja algoritma Mamdani pada sistem Abraseed V2</p>
    </div>
    <div className="relative group overflow-hidden rounded-3xl border border-slate-50 bg-slate-50/50 p-4">
      <img 
        src="/flowchart.png" 
        alt="Abraseed System Flowchart" 
        className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-slate-500 shadow-sm border border-white/50 uppercase">
        Source: /public/flowchart.png
      </div>
    </div>
  </div>
);

const FuzzyLogic = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
    <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Mamdani Inference System</h2>
    <p className="text-slate-600 mb-6 leading-relaxed">Sistem ini memproses data input sensor menjadi keputusan durasi penyiraman melalui tiga tahap utama:</p>
    <div className="space-y-4">
      {[
        { title: 'Fuzzyfikasi', desc: 'Mengubah nilai sensor (suhu, kelembapan) menjadi derajat keanggotaan.' },
        { title: 'Mesin Inferensi', desc: 'Mengevaluasi basis aturan (IF-THEN) untuk menentukan aksi.' },
        { title: 'Defuzzyfikasi', desc: 'Mengubah hasil fuzzy kembali menjadi nilai detik untuk durasi pompa.' }
      ].map((step, i) => (
        <div key={i} className="flex flex-col p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="font-black text-[#1b4d2c] uppercase text-xs mb-1">{step.title}</span>
          <span className="text-slate-500 text-sm">{step.desc}</span>
        </div>
      ))}
    </div>
  </div>
);

const Parts = () => {
  const hardware = [
    { name: 'ESP32 DevKit', type: 'Controller', color: 'border-blue-500' },
    { name: 'DHT22', type: 'Climate Sensor', color: 'border-yellow-500' },
    { name: 'Relay 5V', type: 'Actuator', color: 'border-red-500' },
    { name: 'Soil Moisture v1.2', type: 'Sensor', color: 'border-green-500' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hardware.map((item, i) => (
        <div key={i} className={`bg-white p-6 rounded-[2rem] border-l-8 ${item.color} shadow-sm flex justify-between items-center`}>
          <div>
            <h3 className="font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">{item.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type}</p>
          </div>
          <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full uppercase">Active</div>
        </div>
      ))}
    </div>
  );
};

const Design = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
    <h2 className="text-2xl font-black text-slate-800 mb-2">Visual Identity V2.0</h2>
    <div className="flex gap-4">
      <div className="w-16 h-16 rounded-3xl bg-[#1b4d2c] shadow-lg shadow-green-900/20 flex items-center justify-center text-[10px] font-bold text-white text-center p-2 uppercase italic">Primary Green</div>
      <div className="w-16 h-16 rounded-3xl bg-green-500 shadow-lg shadow-green-500/20 flex items-center justify-center text-[10px] font-bold text-white text-center p-2 uppercase italic">Accent Green</div>
    </div>
    <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100">
      <h4 className="font-bold text-slate-800 mb-2">Typography & Style</h4>
      <p className="text-sm text-slate-500 leading-relaxed">
        Menggunakan sistem font Sans-serif yang bersih dengan variasi "Black" untuk judul utama. 
        Desain kartu menggunakan sudut membulat ekstrem (rounded-3xl) untuk memberikan kesan modern dan ramah lingkungan.
      </p>
    </div>
  </div>
);

// --- HALAMAN UTAMA (MAIN PAGE) ---

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-5xl font-black text-[#1b4d2c] tracking-tighter">About Project</h1>
        <p className="text-slate-500 font-medium mt-2">Dokumentasi sistem cerdas Abraseed versi 2.0</p>
      </header>

      {/* SUB-NAVIGATION BAR */}
      <div className="bg-white/70 backdrop-blur-md p-2 rounded-3xl shadow-sm border border-slate-100 inline-flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#1b4d2c] text-white shadow-lg shadow-green-900/20 translate-y-[-2px]'
                : 'text-slate-400 hover:text-[#1b4d2c] hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* KONTEN UTAMA */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
}