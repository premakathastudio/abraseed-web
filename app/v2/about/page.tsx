'use client';

import { useState } from 'react';

export default function AboutProject() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'flowchart', label: 'Flowchart' },
    { id: 'fuzzy', label: 'Fuzzy Logic' },
    { id: 'parts', label: 'Parts / Komponen' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <header>
        <h1 className="text-4xl font-black text-[#1b4d2c]">About Project</h1>
        <p className="text-slate-500 font-medium">Dokumentasi teknis dan arsitektur sistem Abraseed.</p>
      </header>

      {/* SUB-NAVIGATION BAR (TABS) */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 inline-flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#1b4d2c] text-white shadow-md'
                : 'text-slate-400 hover:text-[#1b4d2c] hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA BASED ON ACTIVE TAB */}
      <div className="mt-6">
        {activeTab === 'general' && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Deskripsi Proyek</h2>
            <p className="text-slate-600 leading-relaxed">
              Abraseed V2 adalah sistem irigasi cerdas yang mengintegrasikan IoT dengan kecerdasan buatan 
              untuk optimasi penggunaan air pada tanaman.
            </p>
          </div>
        )}

        {activeTab === 'flowchart' && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="w-full h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
              [Tempat Gambar Flowchart Anda]
            </div>
          </div>
        )}

        {activeTab === 'fuzzy' && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Logika Fuzzy Mamdani</h2>
            <p className="text-slate-600">
              Sistem ini menggunakan input dari sensor kelembapan tanah dan suhu udara untuk menentukan 
              durasi penyiraman yang presisi melalui proses Fuzzyfikasi, Inferensi, dan Defuzzyfikasi.
            </p>
          </div>
        )}

        {activeTab === 'parts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pakai list komponen yang kita buat sebelumnya di sini */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800">ESP32 DevKit V1</h3>
              <p className="text-sm text-slate-500 uppercase font-black">Main Controller</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800">DHT22</h3>
              <p className="text-sm text-slate-500 uppercase font-black">Environment Sensor</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}