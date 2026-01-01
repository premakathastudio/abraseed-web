'use client'; // Wajib karena kita pakai State & Effect

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function DashboardPage() {
  const [sensor, setSensor] = useState({
    light_intensity: 0,
    plant_height: 0,
    plant_age: 0,
    soil_moisture: 0,
    pump_status: 'OFF',
    system_status: 'STANDBY'
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Fungsi ambil data dari Supabase
  const fetchData = async () => {
    setIsUpdating(true);
    const { data, error } = await supabase
      .from('log_sensor')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      setSensor(data[0]);
      setLastUpdate(new Date());
    }
    
    // Matikan indikator loading setelah 1 detik agar animasi terlihat
    setTimeout(() => setIsUpdating(false), 1000);
  };

  // Auto-refresh setiap 5 detik
  useEffect(() => {
    fetchData(); // Ambil data saat pertama kali buka
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Format Jam WIB
  const timeStr = lastUpdate.toLocaleTimeString('id-ID', { 
    timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false 
  }).replace('.', ':');
  
  const dateStr = lastUpdate.toLocaleDateString('id-ID', { 
    timeZone: 'Asia/Jakarta', day: '2-digit', month: '2-digit', year: 'numeric' 
  });

  const sensorCards = [
    { label: '☀️ Light Intensity', val: `${sensor.light_intensity} Lux`, col: 'bg-[#447a50]' },
    { label: '🌱 Plant Height', val: `${sensor.plant_height} cm`, col: 'bg-[#447a50]' },
    { label: '📅 Plant Age', val: `${sensor.plant_age} day`, col: 'bg-[#447a50]' },
    { label: '💧 Soil Moisture', val: `${sensor.soil_moisture} %`, col: 'bg-[#447a50]' },
    { label: '🚰 Pump Status', val: sensor.pump_status, col: 'bg-[#447a50]' },
    { label: 'Status System', val: sensor.system_status, col: 'bg-[#facc15]' },
  ];

  return (
    <main className="min-h-screen bg-[#E2F5E9] p-6 text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-[#1b4d2c]">
            ABRA<span className="text-green-600">SEED</span>
          </h1>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-2">
              {/* INDIKATOR KECIL: Berputar saat refresh */}
              <div className={`w-3 h-3 border-2 border-[#1b4d2c] border-t-transparent rounded-full ${isUpdating ? 'animate-spin' : 'opacity-20'}`}></div>
              <p className="text-sm font-bold text-slate-700">Time: {timeStr}</p>
            </div>
            <p className="text-sm font-bold text-slate-700">Date: {dateStr}</p>
            <Link href="/history" className="mt-2 bg-[#1b4d2c] hover:bg-green-900 text-white text-[10px] font-bold py-2 px-5 rounded-lg transition-all shadow-lg">
              📊 VIEW HISTORY
            </Link>
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-[#1b4d2c] text-white px-16 py-4 rounded-full shadow-xl">
            <h2 className="text-2xl font-bold tracking-widest uppercase italic">Data Visualization</h2>
          </div>
        </div>

        {/* GRID SENSOR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {sensorCards.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 transition-transform hover:scale-105">
              <p className="text-md font-extrabold uppercase tracking-tight">{item.label}</p>
              {/* ANIMASI FLASH: Putih tipis saat isUpdating true */}
              <div className={`${item.col} text-white px-12 py-3 rounded-full min-w-[210px] text-center font-black text-xl shadow-lg transition-all duration-500 ${isUpdating ? 'ring-4 ring-white ring-opacity-50' : ''}`}>
                {item.val}
              </div>
            </div>
          ))}
        </div>

        {/* ALERT BOX */}
        <div className="bg-white/80 border-2 border-green-700 p-10 rounded-3xl text-center shadow-sm max-w-3xl mx-auto">
          <h4 className="font-black text-2xl mb-2 italic tracking-tighter uppercase underline decoration-green-500">Alert!!</h4>
          <p className="text-slate-600 italic font-bold">don&apos;t mind, sistem is running well.</p>
        </div>

      </div>
    </main>
  );
}