"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Sun, Activity, RefreshCcw, 
  Settings2, X, Waves, History, Power
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
          system_status: 'RUNNING'
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter italic">
            {plantConfig.name} <span className="text-slate-300 not-italic font-light text-2xl">/ start. grow. eat.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-green-600 mt-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Live: {sensor.kondisi_pompa === 'HIDUP' ? 'Irrigation Active' : 'Standby Mode'}
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <Settings2 size={20} className="text-slate-400" />
        </button>
      </div>

      {/* 3 KARTU UTAMA - High Impact Animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        {/* Water */}
        <div className="group relative bg-blue-600 p-8 rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.5)] overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Waves size={120} />
          </div>
          <p className="text-blue-100/60 text-[10px] font-black uppercase tracking-widest mb-1">Water Level</p>
          <h3 className="text-6xl font-black tracking-tighter">{sensor.tinggi_air}<span className="text-xl ml-2 opacity-40 italic font-light text-white">cm</span></h3>
        </div>

        {/* Light */}
        <div className="group relative bg-amber-400 p-8 rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(251,191,36,0.4)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(251,191,36,0.5)] overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform">
            <Sun size={120} />
          </div>
          <p className="text-amber-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Light Intensity</p>
          <h3 className="text-6xl font-black tracking-tighter text-amber-900">{sensor.intensitas_cahaya}<span className="text-xl ml-2 opacity-40 italic font-light">lx</span></h3>
        </div>

        {/* Age */}
        <div className="group relative bg-[#1b4d2c] p-8 rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(27,77,44,0.4)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(27,77,44,0.5)] overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
            <Activity size={120} />
          </div>
          <p className="text-green-200/40 text-[10px] font-black uppercase tracking-widest mb-1">Planting Age</p>
          <h3 className="text-6xl font-black tracking-tighter">{calculateAge(plantConfig.date)}<span className="text-xl ml-2 opacity-40 italic font-light">days</span></h3>
        </div>
      </div>

      {/* BARIS BAWAH: POMPA & LOGS */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Kartu Pompa (Sekarang di Samping) */}
        <div className={`w-full xl:w-72 p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-white border-blue-500 shadow-xl' : 'bg-slate-50 border-slate-100'}`}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-blue-500 text-white shadow-lg animate-bounce' : 'bg-slate-200 text-slate-400'}`}>
            <Power size={24} />
          </div>
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Pump Unit</p>
          <h4 className={`text-3xl font-black tracking-tighter ${sensor.kondisi_pompa === 'HIDUP' ? 'text-blue-600' : 'text-slate-400'}`}>
            {sensor.kondisi_pompa}
          </h4>
          <p className="text-[9px] mt-2 font-bold text-slate-300 uppercase tracking-tighter">
            {sensor.kondisi_pompa === 'HIDUP' ? 'Watering in progress...' : 'System iddle'}
          </p>
        </div>

        {/* Table Logs (Compact) */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div className="flex items-center gap-3">
               <History size={16} className="text-slate-400" />
               <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Recent Activity</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Sync: {lastSeen?.toLocaleTimeString()}</span>
          </div>
          <table className="w-full text-left">
            <thead className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
              <tr>
                <th className="px-8 py-4">Time</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Raw Data</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-bold text-slate-500">
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-3 text-slate-400 font-mono">{new Date(log.created_at).toLocaleTimeString()}</td>
                  <td className="px-8 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${log.kondisi_pompa === 'HIDUP' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      {log.kondisi_pompa}
                    </span>
                  </td>
                  <td className="px-8 py-3 text-right text-[10px] font-black text-slate-700">
                    {log.intensitas_cahaya}lx / {log.tinggi_air}cm
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
            <h2 className="text-3xl font-black text-slate-800 mb-8 italic lowercase tracking-tighter">Settings</h2>
            <div className="space-y-6">
              <input type="text" placeholder="Plant Name" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none" onChange={(e) => setNewPlantName(e.target.value)} />
              <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none" onChange={(e) => setNewPlantDate(e.target.value)} />
              <button onClick={async () => {
                const { error } = await supabase.from('plant_settings').update({ plant_name: newPlantName || plantConfig.name, planting_date: newPlantDate || plantConfig.date }).eq('id', 1);
                if (!error) { setIsModalOpen(false); fetchData(); }
              }} className="w-full py-5 bg-[#1b4d2c] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}