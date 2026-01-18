"use client";

import React from 'react';
import { 
  Lightbulb, 
  Wrench, 
  Zap, 
  Presentation, 
  TrendingUp, 
  Factory 
} from 'lucide-react';

const steps = [
  {
    title: "Initiation & Concept Design",
    date: "Desember 2024",
    desc: "Diskusi multidisiplin untuk menentukan spesifikasi alat, perancangan sistem mekanik, dan desain arsitektur IoT sebagai solusi pertanian cerdas.",
    status: "completed",
    icon: <Lightbulb className="text-yellow-500" />
  },
  {
    title: "System Installation (V1)",
    date: "Awal Januari 2025",
    desc: "Perakitan perangkat keras awal dan instalasi sensor dasar untuk pengujian konektivitas infrastruktur hidroponik.",
    status: "completed",
    icon: <Wrench className="text-blue-500" />
  },
  {
    title: "V2 Optimization & Fuzzy Tuning",
    date: "Januari 2025",
    desc: "Transisi ke variabel baru (Tinggi Air & Cahaya), kalibrasi algoritma Fuzzy Logic untuk kontrol pompa, dan sinkronisasi database Supabase.",
    status: "current",
    icon: <Zap className="text-emerald-500" />
  },
  {
    title: "Grand Presentation",
    date: "Akhir Januari 2025",
    desc: "Demonstrasi final proyek integrasi lintas mata kuliah (IoT, Otomasi Industri, Kendali Cerdas, dan Web) di depan penguji dengan data V2.",
    status: "upcoming",
    icon: <Presentation className="text-purple-500" />
  },
  {
    title: "Stability & Feature Expansion",
    date: "Post-Project 2025",
    desc: "Pengembangan versi mandiri, optimasi konsumsi daya, dan penambahan fitur monitoring jarak jauh berbasis mobile yang lebih komprehensif.",
    status: "upcoming",
    icon: <TrendingUp className="text-orange-500" />
  },
  {
    title: "Mass Production",
    date: "Future Vision",
    desc: "Transformasi prototipe menjadi produk siap pakai untuk mendukung kemandirian pangan melalui teknologi Smart Farming.",
    status: "upcoming",
    icon: <Factory className="text-slate-500" />
  }
];

export default function RoadmapSection() {
  return (
    <section className="py-16 px-4 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-emerald-600 font-bold tracking-[0.3em] uppercase text-xs mb-3">Our Journey</h2>
          <h1 className="text-5xl font-black text-slate-800 mb-6">Project <span className="text-emerald-600">Roadmap</span></h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Abraseed V2: Evolusi monitoring cerdas untuk optimasi sumber daya air dan cahaya secara real-time.
          </p>
          <div className="w-24 h-2 bg-emerald-500 mx-auto mt-8 rounded-full shadow-lg shadow-emerald-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group
                ${step.status === 'current' ? 'ring-2 ring-emerald-500 shadow-emerald-100' : 'shadow-sm'}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${step.status === 'completed' ? 'bg-emerald-50' : step.status === 'current' ? 'bg-yellow-50' : 'bg-slate-50'} transition-colors`}>
                  {step.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full 
                  ${step.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : step.status === 'current' ? 'bg-yellow-100 text-yellow-700 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                  {step.status}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold text-emerald-600/60 uppercase tracking-widest">{step.date}</span>
                <h3 className="text-xl font-black text-slate-800 mt-1 leading-tight">{step.title}</h3>
              </div>
              
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {step.desc}
              </p>

              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 rounded-t-full transition-all duration-500 group-hover:w-1/2 
                ${step.status === 'completed' ? 'bg-emerald-500' : step.status === 'current' ? 'bg-yellow-500' : 'bg-slate-300'}`}>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-[3rem] bg-[#1b4d2c] text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Factory size={120} />
          </div>
          <h3 className="text-2xl font-black mb-4 relative z-10 uppercase tracking-tight">Visi Masa Depan</h3>
          <p className="max-w-3xl mx-auto text-green-100/80 leading-relaxed italic relative z-10 font-medium">
            "Menjadikan Abraseed sebagai standar baru dalam otomasi pertanian presisi yang terjangkau, andal, dan siap mendukung ketahanan pangan global."
          </p>
        </div>
      </div>
    </section>
  );
}