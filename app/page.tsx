"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Dashboard() {
  // 1. State untuk menyimpan data dari sensor
  const [data, setData] = useState({
    light_intensity: 0,
    plant_height: 0,
    plant_age: 0,
    soil_moisture: 0,
    pump_status: "OFF",
    system_status: "IDLE"
  });

  // 2. Fungsi untuk mengambil data terbaru dari API
  const ambilData = async () => {
    try {
      const res = await fetch("/api/sensor");
      const hasil = await res.json();
      // Validasi agar tidak error jika data kosong
      if (hasil && hasil.system_status) {
        setData(hasil);
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  // 3. Jalankan pengambilan data secara otomatis setiap 2 detik
  useEffect(() => {
    ambilData();
    const interval = setInterval(ambilData, 2000);
    return () => clearInterval(interval);
  }, []);

  // 4. State untuk jam dan tanggal real-time
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Konfigurasi untuk Progress Bar (label, nilai, satuan, batas maksimal)
  const sensorConfigs = [
    { label: "Light Intensity", value: data.light_intensity, unit: "Lux", max: 1000, icon: "☀️" },
    { label: "Plant Height", value: data.plant_height, unit: "cm", max: 50, icon: "🌱" },
    { label: "Plant Age", value: data.plant_age, unit: "day", max: 30, icon: "📅" },
    { label: "Soil Moisture", value: data.soil_moisture, unit: "%", max: 100, icon: "💧" },
  ];

  return (
    <div className="min-h-screen bg-[#E2F1E7] p-6 md:p-12 font-sans text-[#1B4332] selection:bg-[#2D6A4F] selection:text-white">
      
      {/* Header Area */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex flex-col">
          {/* Ganti 'logo-abraseed.png' dengan nama file asli kamu */}
         <img 
            src="/logo-abraseed.png.png" 
            alt="Logo Abraseed" 
            className="h-40 w-auto object-contain" 
           />
        </div>
        
        <div className="text-right font-bold text-sm bg-white/30 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
          <p>Date: {time.toLocaleDateString('id-ID')}</p>
          <p>Time: {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      {/* Letakkan ini di bawah Header atau di atas Grafik */}
      <div className="flex justify-end mb-4">
        <Link 
          href="/history" 
          className="bg-white text-green-700 border-2 border-green-600 hover:bg-green-600 hover:text-white px-6 py-2 rounded-xl font-bold transition-all duration-300 shadow-md flex items-center gap-2 group"
        >
         <span>📊 Lihat Riwayat Data</span>
         <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Judul Utama */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#1B4332] text-white px-16 py-4 rounded-full text-3xl font-bold shadow-[0_10px_20px_rgba(27,67,50,0.3)] border-b-4 border-[#081c15]">
          Data Visualization
        </div>
      </div>

      {/* Grid Sensor Utama */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 mb-20">
        
        {sensorConfigs.map((item, index) => (
          <div key={index} className="flex flex-col items-center group">
            <div className="flex items-center gap-2 mb-3 font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">
              <span>{item.icon}</span> {item.label}
            </div>
            
            {/* Kapsul Progress Bar */}
            <div className="relative w-full h-16 bg-white rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border-2 border-white">
              {/* Isian Hijau (Progress) */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#2D6A4F] transition-all duration-1000 ease-out shadow-[4px_0_10px_rgba(0,0,0,0.2)]"
                style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
              />
              {/* Angka & Satuan */}
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-black z-10 mix-blend-difference text-white">
                {item.value} <span className="text-sm ml-1 font-medium opacity-80">{item.unit}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Pump Status (Custom Color) */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">
            🚰 Pump Status
          </div>
          <div className={`w-full h-16 rounded-full flex items-center justify-center text-2xl font-black shadow-lg transition-colors duration-500 border-2 border-white
            ${data.pump_status === 'ON' ? 'bg-[#2D6A4F] text-white' : 'bg-gray-300 text-gray-500'}`}>
            {data.pump_status}
          </div>
        </div>

        {/* System Status (Yellow Highlight) */}
        <div className="flex flex-col items-center">
          <div className="mb-3 font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">
            Status System
          </div>
          <div className={`w-full h-16 rounded-full flex items-center justify-center text-2xl font-black shadow-lg border-2 border-white transition-all
            ${data.system_status === 'RUNNING' ? 'bg-[#FFD60A] text-[#1B4332] scale-105 shadow-[#FFD60A]/30' : 'bg-gray-300 text-gray-500'}`}>
            {data.system_status}
          </div>
        </div>

      </div>

      {/* Area Alert (Deskripsi & Alert Box) */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 mt-10">
        
        {/* Deskripsi Kanan (Sesuai Desain) */}
        <div className="flex-1 text-right md:order-2">
          <p className="text-sm leading-relaxed text-[#1B4332]/70 font-medium max-w-sm ml-auto">
            An intelligent microgreen cultivation system that automates light and growing conditions using sensors and smart logic.
          </p>
        </div>

        {/* Alert Box Kiri (Sesuai Desain) */}
        <div className="flex-[2] w-full md:order-1">
          <div className="bg-white border-2 border-[#1B4332] rounded-2xl p-8 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-shadow">
            {/* Dekorasi garis di dalam box */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#1B4332]"></div>
            <h3 className="text-center text-2xl font-black italic mb-2 tracking-tight">Alert!!</h3>
            <p className="text-center italic text-gray-500 font-medium">
              don't mind, sistem is running well.
            </p>
          </div>
        </div>

      </div>

      {/* Dekorasi Awan (Footer) */}
      <div className="fixed bottom-6 left-6 text-4xl opacity-40 animate-bounce cursor-default">
        ☁️
      </div>

      {/* Tambahan Dekorasi Garis Bawah Desain */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#1B4332,#1B4332_10px,#E2F1E7_10px,#E2F1E7_20px)] opacity-30"></div>
    </div>
  );
}