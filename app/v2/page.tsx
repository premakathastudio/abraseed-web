"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Sun, Activity, Zap, RefreshCcw, CheckCircle2, 
  Settings2, X, Waves, History 
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
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-[#1b4d2c] flex items-center gap-3 lowercase italic tracking-tighter">
            {plantConfig.name} <span className="text-slate-200 not-italic">/</span> v2
          </h2>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">Sistem Monitoring Terpusat</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-slate-600 font-bold text-xs hover:shadow-md transition-all">
            <Settings2 size={16} /> Config
          </button>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 font-bold text-[10px] text-slate-400">
            <RefreshCcw size={16} className={`text-green-600 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'SYNCING' : `LAST: ${lastSeen ? lastSeen.toLocaleTimeString() : '--'}`}
          </div>
        </div>
      </div>

      {/* SENSOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-blue-500 shadow-sm">
          <Waves className="text-blue-500 mb-4" size={32} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ketinggian Air</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{sensor.tinggi_air} <span className="text-lg font-medium text-slate-300">cm</span></h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-yellow-400 shadow-sm">
          <Sun className="text-yellow-500 mb-4" size={32} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Intensitas Cahaya</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{sensor.intensitas_cahaya} <span className="text-lg font-medium text-slate-300">Lux</span></h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-green-500 shadow-sm">
          <Activity className="text-green-500 mb-4" size={32} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Umur Tanam</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{calculateAge(plantConfig.date)} <span className="text-lg font-medium text-slate-300">Hari</span></h3>
        </div>
      </div>

      {/* TABLE HISTORY */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center gap-3">
          <History size={20} className="text-slate-400" />
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Recent Activity Logs</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="p-6">Time</th>
                <th className="p-6">Light</th>
                <th className="p-6">Water</th>
                <th className="p-6">Pump Status</th>
              </tr>
            </thead>
            <tbody className="font-bold text-slate-600">
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-slate-50/50 hover:bg-slate-50/80 transition-all">
                  <td className="p-6 text-slate-400 font-mono">{new Date(log.created_at).toLocaleTimeString()}</td>
                  <td className="p-6">{log.intensitas_cahaya} lx</td>
                  <td className="p-6">{log.tinggi_air} cm</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] ${log.kondisi_pompa === 'HIDUP' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
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
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-3xl font-black text-slate-800 mb-8 italic uppercase tracking-tighter">Device Settings</h2>
            <div className="space-y-6">
              <input type="text" placeholder="Nama Tanaman" className="w-full p-5 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold focus:ring-2 ring-emerald-100 transition-all" onChange={(e) => setNewPlantName(e.target.value)} />
              <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold focus:ring-2 ring-emerald-100 transition-all" onChange={(e) => setNewPlantDate(e.target.value)} />
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