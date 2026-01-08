"use client";

import React from 'react';
import { 
  Cpu, 
  Settings, 
  Zap, 
  Droplets, 
  Sun, 
  MoveUp, 
  Waves,
  Maximize
} from 'lucide-react';

export default function AboutProject() {
  const mainParts = [
    {
      category: "Brain & Controller",
      name: "ESP32 Microcontroller",
      desc: "Otak utama sistem yang menangani konektivitas IoT, pembacaan sensor secara real-time, dan eksekusi algoritma Fuzzy Logic.",
      icon: <Cpu className="text-emerald-600" size={32} />,
      color: "bg-emerald-50"
    },
    {
      category: "Sensor Suite",
      name: "Monitoring Sensors",
      desc: "Terdiri dari Sensor Lux (Intensitas Cahaya), TOF (Ketinggian Air), dan Ultrasonik (Tinggi Tanaman) untuk data presisi.",
      icon: <Maximize className="text-blue-600" size={32} />,
      color: "bg-blue-50"
    },
    {
      category: "Actuators",
      name: "Dynamic Actuators",
      desc: "DC Pump untuk sirkulasi air, Servo Motor untuk penyesuaian tinggi mekanik, dan Lampu Growth untuk fotosintesis.",
      icon: <Zap className="text-orange-600" size={32} />,
      color: "bg-orange-50"
    }
  ];

  const subParts = [
    "Lampu Growth (1-6 Strip)", "DC Motor", "Power Supply Unit", "Modul Relay", "Hydroponic Structure"
  ];

  return (
    <div className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-emerald-600 font-black tracking-[0.2em] uppercase text-xs mb-3">Project Architecture</h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">Inside <span className="text-emerald-600">ABRASEED</span></h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Abraseed mengintegrasikan teknologi IoT dengan Sistem Kendali Cerdas untuk menciptakan ekosistem hidroponik yang sepenuhnya otomatis dan adaptif.
          </p>
        </div>

        {/* Main Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainParts.map((part, index) => (
            <div key={index} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
              <div className={`w-20 h-20 ${part.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {part.icon}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{part.category}</span>
              <h3 className="text-2xl font-black text-slate-800 mt-2 mb-4">{part.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {part.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Simplified Support Parts */}
        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <h4 className="text-xl font-black text-slate-800 mb-2">Supporting Components</h4>
              <p className="text-sm text-slate-500">Infrastruktur tambahan yang menjaga stabilitas performa sistem Abraseed.</p>
            </div>
            <div className="md:w-2/3 flex flex-wrap gap-3">
              {subParts.map((item, i) => (
                <span key={i} className="px-5 py-3 bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl border border-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Logic Insight (Optional - Based on your Flowchart) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl"><Sun size={24}/></div>
            <div>
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Fuzzy Logic A</p>
              <h5 className="font-bold">Intensitas Lux → Strip Lampu</h5>
            </div>
          </div>
          <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl"><MoveUp size={24}/></div>
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">Fuzzy Logic B</p>
              <h5 className="font-bold">Tinggi Tanaman → Sudut Servo</h5>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}