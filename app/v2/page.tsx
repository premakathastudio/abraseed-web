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
        .limit(5); // Ambil 5 saja

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

      const { data: configData } = await supabase
        .from('plant_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (configData) setPlantConfig({ name: configData.plant_name, date: configData.planting_date });
    } catch (err) {
      console.error("Fetch Error:", err);
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
    <div className="w-full space-y-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter notranslate lowercase italic">
            {plantConfig.name} <span className="text-slate-300 not-italic ml-2 lowercase text-3xl font-light">/ Start. Grow. Eat.</span>
          </h1>
          <div className="flex items-center gap-3 mt-3">
             <div className={`h-2.5 w-2.5 rounded-full ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-blue-500 animate-ping' : 'bg-slate-300'}`}></div>
             <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
               Live Data Analysis — {sensor.system_status}
             </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <RefreshCcw size={18} className={`${isUpdating ? 'animate-spin text-green-600' : 'text-slate-300'}`} />
            <div className="flex flex-col leading-none">
                <span className="text-[9px] font-black text-slate-400 uppercase mb-1">Last Sync</span>
                <span className="text-xs font-bold text-slate-600 font-mono">{lastSeen ? lastSeen.toLocaleTimeString() : '--:--:--'}</span>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#1b4d2c] text-white p-4 rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95">
            <Settings2 size={20} />
          </button>
        </div>
      </div>

      {/* SENSOR GRID - UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
          <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <Waves className="text-blue-500" size={28} />
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Water Level</p>
          <h3 className="text-5xl font-black text-slate-800 tracking-tighter">{sensor.tinggi_air} <span className="text-xl font-medium text-slate-300">cm</span></h3>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
          <div className="bg-yellow-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <Sun className="text-yellow-500" size={28} />
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Light Intensity</p>
          <h3 className="text-5xl font-black text-slate-800 tracking-tighter">{sensor.intensitas_cahaya} <span className="text-xl font-medium text-slate-300">lx</span></h3>
        </div>

        <div className={`p-8 rounded-[3rem] shadow-sm transition-all border ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-[#1b4d2c] border-[#1b4d2c]' : 'bg-white border-slate-100'}`}>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-white/10' : 'bg-slate-50'}`}>
            <Power className={sensor.kondisi_pompa === 'HIDUP' ? 'text-white' : 'text-slate-300'} size={28} />
          </div>
          <p className={`${sensor.kondisi_pompa === 'HIDUP' ? 'text-green-200' : 'text-slate-400'} text-[10px] font-black uppercase tracking-widest mb-1`}>Pump</p>
          <h3 className={`text-5xl font-black tracking-tighter ${sensor.kondisi_pompa === 'HIDUP' ? 'text-white' : 'text-slate-800'}`}>{sensor.kondisi_pompa}</h3>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
          <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <Activity className="text-green-500" size={28} />
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Plant Age</p>
          <h3 className="text-5xl font-black text-slate-800 tracking-tighter">{calculateAge(plantConfig.date)} <span className="text-xl font-medium text-slate-300">Days</span></h3>
        </div>
      </div>

      {/* COMPACT LOGS - UKURAN LEBIH KECIL */}
      <div className="inline-block min-w-[500px]">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
            <History size={16} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">History Logs (Recent 5)</span>
          </div>
          <div className="p-2">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Sun</th>
                  <th className="px-6 py-4">Water</th>
                  <th className="px-6 py-4 text-right">Pump</th>
                </tr>
              </thead>
              <tbody className="text-[11px] font-bold text-slate-500">
                {logs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 rounded-xl transition-colors">
                    <td className="px-6 py-3 text-slate-400 font-mono">{new Date(log.created_at).toLocaleTimeString()}</td>
                    <td className="px-6 py-3 font-black text-slate-700">{log.intensitas_cahaya} lx</td>
                    <td className="px-6 py-3 font-black text-slate-700">{log.tinggi_air} cm</td>
                    <td className="px-6 py-3 text-right">
                      <span className={`px-2 py-1 rounded-lg text-[8px] font-black ${log.kondisi_pompa === 'HIDUP' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        {log.kondisi_pompa}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL CONFIG (Sama) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl relative border border-white/20">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-black"><X size={24} /></button>
            <h2 className="text-3xl font-black text-slate-800 mb-8 italic lowercase tracking-tighter italic">Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Plant Name</label>
                <input type="text" placeholder={plantConfig.name} className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none" onChange={(e) => setNewPlantName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Planting Date</label>
                <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none" onChange={(e) => setNewPlantDate(e.target.value)} />
              </div>
              <button onClick={async () => {
                const { error } = await supabase.from('plant_settings').update({ plant_name: newPlantName || plantConfig.name, planting_date: newPlantDate || plantConfig.date }).eq('id', 1);
                if (!error) { setIsModalOpen(false); fetchData(); }
              }} className="w-full py-5 bg-[#1b4d2c] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-900/20">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}