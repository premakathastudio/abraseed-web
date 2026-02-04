"use client";

import React, { useMemo } from 'react';
import { 
  Lightbulb, 
  Wrench, 
  Zap, 
  Presentation, 
  TrendingUp, 
  Factory 
} from 'lucide-react';

export default function RoadmapSection() {
  const steps = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth(); 
    const currentYear = now.getFullYear();

    const data = [
      {
        title: "Initiation & Concept Design",
        targetDate: new Date(2025, 11), // Desember 2025
        dateLabel: "Desember 2025",
        desc: "Diskusi awal penentuan spesifikasi alat dan arsitektur IoT ABRASEED.",
        icon: <Lightbulb className="text-yellow-500" />
      },
      {
        title: "System Installation (V1)",
        targetDate: new Date(2026, 0), // Januari 2026
        dateLabel: "Januari 2026",
        desc: "Perakitan hardware awal dan instalasi sensor untuk pengujian konektivitas.",
        icon: <Wrench className="text-blue-500" />
      },
      {
        title: "V2 Optimization & Fuzzy Tuning",
        targetDate: new Date(2026, 0), // Januari 2026 (Tahap Intensif)
        dateLabel: "Januari 2026",
        desc: "Kalibrasi algoritma Fuzzy berdasarkan input 0-10000 Lux dan 0-30cm serta sinkronisasi database.",
        icon: <Zap className="text-emerald-500" />
      },
      {
        title: "Grand Presentation & Expo",
        targetDate: new Date(2026, 1), // Februari 2026 (Sekarang)
        dateLabel: "Februari 2026",
        desc: "Demonstrasi final integrasi sistem kendali cerdas di depan penguji.",
        icon: <Presentation className="text-purple-500" />
      },
      {
        title: "Stability & Feature Expansion",
        targetDate: new Date(2026, 5), // Juni 2026
        dateLabel: "Post-Project 2026",
        desc: "Optimasi daya dan penambahan fitur monitoring mobile jarak jauh.",
        icon: <TrendingUp className="text-orange-500" />
      },
      {
        title: "Mass Production",
        targetDate: new Date(2027, 0), // Masa Depan
        dateLabel: "Future Vision",
        desc: "Transformasi prototipe menjadi produk siap pakai untuk kemandirian pangan.",
        icon: <Factory className="text-slate-500" />
      }
    ];

    return data.map(step => {
      let status = "upcoming";
      if (currentYear > step.targetDate.getFullYear() || 
         (currentYear === step.targetDate.getFullYear() && currentMonth > step.targetDate.getMonth())) {
        status = "completed";
      } else if (currentYear === step.targetDate.getFullYear() && currentMonth === step.targetDate.getMonth()) {
        status = "current";
      }
      return { ...step, status };
    });
  }, []);

  return (
    <section className="py-16 px-4 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-emerald-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3">Project Timeline</h2>
          <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tighter">Roadmap <span className="text-emerald-600">Update</span></h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
            Alur pengembangan sistem dari riset awal (Des 2025) hingga implementasi real-time saat ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group
                ${step.status === 'current' ? 'ring-2 ring-emerald-500 shadow-emerald-100' : 'shadow-sm'}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${step.status === 'completed' ? 'bg-emerald-50' : step.status === 'current' ? 'bg-yellow-50' : 'bg-slate-50'}`}>
                  {step.icon}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full 
                  ${step.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : step.status === 'current' ? 'bg-yellow-400 text-yellow-900 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                  {step.status}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">{step.dateLabel}</span>
                <h3 className="text-lg font-black text-slate-800 mt-1 leading-tight">{step.title}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 rounded-t-full transition-all duration-500 group-hover:w-1/2 
                ${step.status === 'completed' ? 'bg-emerald-500' : step.status === 'current' ? 'bg-yellow-500' : 'bg-slate-300'}`}>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}