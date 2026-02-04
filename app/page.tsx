"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Sun, Activity, Zap, RefreshCcw, CheckCircle2, 
  Settings2, X, Waves, History 
} from 'lucide-react';

export default function MainDashboard() {
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
      // Ambil 5 data terbaru dari tabel monitoring sesuai struktur database kamu
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

      // Ambil config tanaman
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
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
          <div>
            <h2 className="text-3xl font-black text-[#1b4d2c] flex items-center gap-3">
              {plantConfig.name} <span className="text-slate-300 font-light">|</span> Dashboard
            </h2>
            <p className="text-slate-500 text-sm font-medium">Monitoring Sistem IoT Real-time</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsModalOpen(true)} className="bg-white border border-slate-200 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-50 shadow-sm">
              <Settings2 size={14} /> Settings
            </button>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 font-bold text-[10px] text-slate-500">
              <RefreshCcw size={14} className={isUpdating ? 'animate-spin text-emerald-500' : ''} />
              {isUpdating ? 'SYNCING' : `LAST UPDATE: ${lastSeen ? lastSeen.toLocaleTimeString() : '--'}`}
            </div>
          </div>
        </div>

        {/* UTAMA: 3 CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border-l-4 border-blue-500 shadow-sm">
             <Waves className="text-blue-500 mb-2" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tinggi Air</p>
             <h3 className="text-3xl font-black text-slate-800">{sensor.tinggi_air} cm</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border-l-4 border-amber-400 shadow-sm">
             <Sun className="text-amber-500 mb-2" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cahaya</p>
             <h3 className="text-3xl font-black text-slate-800">{sensor.intensitas_cahaya} Lux</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border-l-4 border-emerald-500 shadow-sm">
             <Activity className="text-emerald-500 mb-2" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Umur Tanaman</p>
             <h3 className="text-3xl font-black text-slate-800">{calculateAge(plantConfig.date)} Hari</h3>
          </div>
        </div>

        {/* STATUS POMPA & LOG */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <History size={18} className="text-slate-400" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Riwayat 5 Data Terakhir</span>
               </div>
               <div className={`px-4 py-1 rounded-full text-[10px] font-black ${sensor.kondisi_pompa === 'HIDUP' ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                 POMPA: {sensor.kondisi_pompa}
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-slate-400 font-black uppercase text-[9px] border-b border-slate-50">
                    <th className="pb-4">Waktu</th>
                    <th className="pb-4">Lux</th>
                    <th className="pb-4">Air</th>
                    <th className="pb-4">Pompa</th>
                  </tr>
                </thead>
                <tbody className="font-bold text-slate-600">
                  {logs.map((log, i) => (
                    <tr key={i} className="border-b border-slate-50/50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-slate-400 font-mono">{new Date(log.created_at).toLocaleTimeString()}</td>
                      <td className="py-4">{log.intensitas_cahaya} lx</td>
                      <td className="py-4">{log.tinggi_air} cm</td>
                      <td className="py-4">
                        <span className={log.kondisi_pompa === 'HIDUP' ? 'text-blue-500' : 'text-slate-300'}>{log.kondisi_pompa}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODAL CONFIG */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400"><X size={20} /></button>
              <h2 className="text-xl font-black text-slate-800 mb-6 uppercase italic tracking-tighter">Edit Config</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Nama Tanaman" className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100 font-bold" onChange={(e) => setNewPlantName(e.target.value)} />
                <input type="date" className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100 font-bold" onChange={(e) => setNewPlantDate(e.target.value)} />
                <button onClick={handleSaveConfig} className="w-full py-4 bg-[#1b4d2c] text-white rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg">Update</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}