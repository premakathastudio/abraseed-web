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
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-8 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-4">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
             <span className={`h-2 w-2 rounded-full animate-pulse ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
               System {sensor.system_status} — Pump: {sensor.kondisi_pompa}
             </p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            {/* Logo Abraseed dengan proteksi double extension */}
            <div className="notranslate">
              <img 
                src="/logo-abraseed.png.png" 
                alt="Abraseed Logo" 
                className="h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                    // Fallback otomatis jika nanti kamu rename filenya jadi normal
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes(".png.png")) {
                        target.src = "/logo-abraseed.png";
                    }
                }}
              />
            </div>
            <span className="text-slate-200 text-3xl font-thin hidden md:block">/</span>
            <h2 className="text-2xl font-black text-[#1b4d2c] lowercase italic tracking-tighter notranslate">
              {plantConfig.name}
            </h2>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-slate-600 font-bold text-xs hover:shadow-md transition-all active:scale-95">
            <Settings2 size={16} /> Config
          </button>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 font-bold text-[10px] text-slate-400 shadow-sm">
            <RefreshCcw size={16} className={`text-green-600 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'SYNCING' : `SYNC: ${lastSeen ? lastSeen.toLocaleTimeString() : '--'}`}
          </div>
        </div>
      </div>

      {/* SENSOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card Air */}
        <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-blue-500 shadow-sm transition-transform hover:scale-[1.02]">
          <Waves className="text-blue-500 mb-4" size={32} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ketinggian Air</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{sensor.tinggi_air} <span className="text-lg font-medium text-slate-300">cm</span></h3>
        </div>

        {/* Card Cahaya */}
        <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-yellow-400 shadow-sm transition-transform hover:scale-[1.02]">
          <Sun className="text-yellow-500 mb-4" size={32} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Intensitas Cahaya</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{sensor.intensitas_cahaya} <span className="text-lg font-medium text-slate-300">Lux</span></h3>
        </div>

        {/* Card Pompa */}
        <div className={`p-8 rounded-[2.5rem] border-l-8 shadow-sm transition-transform hover:scale-[1.02] ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-blue-600 border-blue-400' : 'bg-white border-slate-200'}`}>
          <Power className={`${sensor.kondisi_pompa === 'HIDUP' ? 'text-white animate-pulse' : 'text-slate-300'} mb-4`} size={32} />
          <p className={`${sensor.kondisi_pompa === 'HIDUP' ? 'text-blue-200' : 'text-slate-400'} text-[10px] font-black uppercase tracking-widest`}>Status Pompa</p>
          <h3 className={`text-4xl font-black tracking-tighter ${sensor.kondisi_pompa === 'HIDUP' ? 'text-white' : 'text-slate-800'}`}>{sensor.kondisi_pompa}</h3>
        </div>

        {/* Card Umur */}
        <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-green-500 shadow-sm transition-transform hover:scale-[1.02]">
          <Activity className="text-green-500 mb-4" size={32} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Umur Tanam</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{calculateAge(plantConfig.date)} <span className="text-lg font-medium text-slate-300">Hari</span></h3>
        </div>
      </div>

      {/* TABLE HISTORY */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History size={20} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Recent Activity Logs</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="p-6">Time</th>
                <th className="p-6">Light</th>
                <th className="p-6">Water Level</th>
                <th className="p-6">Pump</th>
              </tr>
            </thead>
            <tbody className="font-bold text-slate-600">
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-slate-50/50 hover:bg-slate-50/80 transition-all">
                  <td className="p-6 text-slate-400 font-mono">{new Date(log.created_at).toLocaleTimeString()}</td>
                  <td className="p-6">{log.intensitas_cahaya} lx</td>
                  <td className="p-6">{log.tinggi_air} cm</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black ${log.kondisi_pompa === 'HIDUP' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      {log.kondisi_pompa}
                    </span>
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
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-3xl font-black text-slate-800 mb-8 italic uppercase tracking-tighter">Device Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Plant Name</label>
                <input type="text" placeholder={plantConfig.name} className="w-full p-5 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold focus:ring-2 ring-emerald-100 transition-all" onChange={(e) => setNewPlantName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Planting Date</label>
                <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold focus:ring-2 ring-emerald-100 transition-all" onChange={(e) => setNewPlantDate(e.target.value)} />
              </div>
              <button onClick={async () => {
                const { error } = await supabase.from('plant_settings').update({ plant_name: newPlantName || plantConfig.name, planting_date: newPlantDate || plantConfig.date }).eq('id', 1);
                if (!error) { setIsModalOpen(false); fetchData(); }
              }} className="w-full py-5 bg-[#1b4d2c] text-white rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-green-900/20 hover:scale-[1.02] transition-all">Update Config</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}