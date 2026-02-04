"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Sun, Activity, RefreshCcw, 
  Settings2, X, Waves, History, Power, Info
} from 'lucide-react';

export default function DashboardV2() {
  const [sensor, setSensor] = useState({
    intensitas_cahaya: 0,
    tinggi_air: 0,
    kondisi_pompa: 'MATI',
    system_status: 'STANDBY'
  });
  
  const [logs, setLogs] = useState<any[]>([]);
  const [plantConfig, setPlantConfig] = useState({ name: 'Loading...', date: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlantName, setNewPlantName] = useState("");
  const [newPlantDate, setNewPlantDate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  const calculateAge = (dateString: string) => {
    if (!dateString) return 0;
    const start = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  };

  const fetchData = async () => {
    setIsUpdating(true);
    try {
      const { data: sensorData, error: sError } = await supabase
        .from('monitoring') 
        .select('tinggi_air, intensitas_cahaya, kondisi_pompa, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (sError) throw sError;

      if (sensorData && sensorData.length > 0) {
        setSensor({
          tinggi_air: sensorData[0].tinggi_air || 0,
          intensitas_cahaya: sensorData[0].intensitas_cahaya || 0,
          kondisi_pompa: sensorData[0].kondisi_pompa || 'MATI',
          system_status: sensorData[0].kondisi_pompa === 'HIDUP' ? 'ACTIVE' : 'STANDBY'
        });
        setLogs(sensorData);
        if (sensorData[0].created_at) setLastSeen(new Date(sensorData[0].created_at));
      }

      const { data: configData } = await supabase.from('plant_settings').select('*').eq('id', 1).single();
      if (configData) setPlantConfig({ name: configData.plant_name, date: configData.planting_date });
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsUpdating(false), 800);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-12">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter italic">
            {plantConfig.name} <span className="text-slate-300 not-italic font-light text-2xl">/ start. grow. eat.</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
             <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
               Live Status: <span className={sensor.kondisi_pompa === 'HIDUP' ? 'text-emerald-600' : 'text-rose-600'}>{sensor.system_status}</span>
             </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* SYNC ANIMATION */}
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group">
            <RefreshCcw size={18} className={`${isUpdating ? 'animate-spin text-emerald-600' : 'text-slate-300'}`} />
            <div className="flex flex-col leading-none">
                <span className="text-[9px] font-black text-slate-400 uppercase mb-1">Last Sync</span>
                <span className="text-xs font-bold text-slate-600 font-mono italic">{lastSeen ? lastSeen.toLocaleTimeString() : '--:--:--'}</span>
            </div>
          </div>

          {/* CONFIGURE BUTTON WITH TOOLTIP */}
          <div className="relative group/btn">
            <button onClick={() => setIsModalOpen(true)} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition-all active:scale-95">
              <Settings2 size={24} className="text-slate-500" />
            </button>
            {/* Simple Help Text */}
            <div className="absolute bottom-full mb-3 right-0 w-48 bg-slate-800 text-white text-[10px] p-3 rounded-xl opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-opacity shadow-xl z-20">
              <div className="flex gap-2 items-start">
                <Info size={14} className="text-emerald-400 shrink-0" />
                <span>Klik untuk ganti nama tanaman atau reset tanggal tanam.</span>
              </div>
              <div className="absolute top-full right-6 border-8 border-transparent border-t-slate-800"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 KARTU UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        <div className="group relative bg-blue-600 p-8 rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] transition-all duration-500 hover:-translate-y-3 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Waves size={120} /></div>
          <p className="text-blue-100/60 text-[10px] font-black uppercase tracking-widest mb-1">Water Level</p>
          <h3 className="text-6xl font-black tracking-tighter">{sensor.tinggi_air}<span className="text-xl ml-2 opacity-40 italic font-light">cm</span></h3>
        </div>

        <div className="group relative bg-amber-400 p-8 rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(251,191,36,0.4)] transition-all duration-500 hover:-translate-y-3 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform"><Sun size={120} /></div>
          <p className="text-amber-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Light Lux</p>
          <h3 className="text-6xl font-black tracking-tighter text-amber-900">{sensor.intensitas_cahaya}<span className="text-xl ml-2 opacity-40 italic font-light">lx</span></h3>
        </div>

        <div className="group relative bg-[#1b4d2c] p-8 rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(27,77,44,0.4)] transition-all duration-500 hover:-translate-y-3 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform"><Activity size={120} /></div>
          <p className="text-green-200/40 text-[10px] font-black uppercase tracking-widest mb-1">Planting Age</p>
          <h3 className="text-6xl font-black tracking-tighter">{calculateAge(plantConfig.date)}<span className="text-xl ml-2 opacity-40 italic font-light">days</span></h3>
        </div>
      </div>

      {/* BAWAH: POMPA & LOGS */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* KARTU POMPA - WARNA DINAMIS */}
        <div className={`w-full xl:w-72 p-8 rounded-[2.5rem] border-2 transition-all duration-500 shadow-2xl ${
          sensor.kondisi_pompa === 'HIDUP' 
          ? 'bg-emerald-50 border-emerald-200 shadow-emerald-200/20' 
          : 'bg-rose-50 border-rose-100 shadow-rose-200/20'
        }`}>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
            sensor.kondisi_pompa === 'HIDUP' 
            ? 'bg-emerald-500 text-white animate-bounce' 
            : 'bg-rose-500 text-white grayscale opacity-50'
          }`}>
            <Power size={28} />
          </div>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${sensor.kondisi_pompa === 'HIDUP' ? 'text-emerald-600' : 'text-rose-400'}`}>
             Pump Notification
          </p>
          <h4 className={`text-4xl font-black tracking-tighter ${sensor.kondisi_pompa === 'HIDUP' ? 'text-emerald-700' : 'text-rose-700'}`}>
            {sensor.kondisi_pompa}
          </h4>
          <p className="text-[10px] mt-3 font-bold opacity-60 italic">
            {sensor.kondisi_pompa === 'HIDUP' ? 'System is watering now...' : 'Pump is currently resting.'}
          </p>
        </div>

        {/* LOGS TABLE - WARNA DINAMIS */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
             <History size={16} className="text-slate-400" />
             <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Activity History</span>
          </div>
          <table className="w-full text-left">
            <thead className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
              <tr>
                <th className="px-8 py-4">Time</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Intensity / Water</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-bold">
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-3 text-slate-400 font-mono italic">{new Date(log.created_at).toLocaleTimeString()}</td>
                  <td className="px-8 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${
                      log.kondisi_pompa === 'HIDUP' 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-rose-100 text-rose-600'
                    }`}>
                      {log.kondisi_pompa}
                    </span>
                  </td>
                  <td className="px-8 py-3 text-right text-[10px] font-black text-slate-700">
                    {log.intensitas_cahaya}lx — {log.tinggi_air}cm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CONFIG */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-black"><X size={24} /></button>
            <h2 className="text-3xl font-black text-slate-800 mb-8 italic tracking-tighter">Configuration</h2>
            <div className="space-y-6 text-slate-800">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Plant Identification</label>
                <input type="text" placeholder={plantConfig.name} className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 ring-[#1b4d2c]/20" onChange={(e) => setNewPlantName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Start Date</label>
                <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 ring-[#1b4d2c]/20" onChange={(e) => setNewPlantDate(e.target.value)} />
              </div>
              <button onClick={async () => {
                const { error } = await supabase.from('plant_settings').update({ plant_name: newPlantName || plantConfig.name, planting_date: newPlantDate || plantConfig.date }).eq('id', 1);
                if (!error) { setIsModalOpen(false); fetchData(); }
              }} className="w-full py-5 bg-[#1b4d2c] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-900/40 hover:scale-[1.02] transition-all">Save Config</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}