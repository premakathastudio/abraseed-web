"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Sun, Activity, RefreshCcw, 
  Settings2, X, Waves, History, Power, Info, Wifi, WifiOff
} from 'lucide-react';

export default function DashboardV2() {
  const [sensor, setSensor] = useState({
    intensitas_cahaya: 0,
    tinggi_air: 0,
    kondisi_pompa: 'MATI',
  });
  
  const [logs, setLogs] = useState<any[]>([]);
  const [plantConfig, setPlantConfig] = useState({ name: 'Loading...', date: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlantName, setNewPlantName] = useState("");
  const [newPlantDate, setNewPlantDate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(false);

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
        const latestData = sensorData[0];
        const dataTime = new Date(latestData.created_at).getTime();
        const now = new Date().getTime();
        
        // Heartbeat: 15 detik telat = Offline
        const diffSeconds = (now - dataTime) / 1000;
        setIsConnected(diffSeconds < 15); 

        setSensor({
          tinggi_air: latestData.tinggi_air || 0,
          intensitas_cahaya: latestData.intensitas_cahaya || 0,
          kondisi_pompa: latestData.kondisi_pompa || 'MATI',
        });
        setLogs(sensorData);
        setLastSeen(new Date(latestData.created_at));
      }

      const { data: configData } = await supabase.from('plant_settings').select('*').eq('id', 1).single();
      if (configData) setPlantConfig({ name: configData.plant_name, date: configData.planting_date });
    } catch (err) {
      console.error(err);
      setIsConnected(false);
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
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter italic">
            {plantConfig.name} <span className="text-slate-300 not-italic font-light text-2xl">/ start. grow. eat.</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
             <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-2">
               System: 
               <span className={isConnected ? 'text-emerald-600' : 'text-rose-600'}>
                 {isConnected ? 'LIVE CONNECTED' : 'DISCONNECTED'}
               </span>
               {isConnected ? <Wifi size={12} className="text-emerald-500" /> : <WifiOff size={12} className="text-rose-500" />}
             </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <RefreshCcw size={18} className={`${isUpdating ? 'animate-spin text-emerald-600' : 'text-slate-300'}`} />
            <div className="flex flex-col leading-none">
                <span className="text-[9px] font-black text-slate-400 uppercase mb-1">Last Data In</span>
                <span className="text-xs font-bold text-slate-600 font-mono italic">{lastSeen ? lastSeen.toLocaleTimeString() : '--:--:--'}</span>
            </div>
          </div>

          <div className="relative group/btn">
            <button onClick={() => setIsModalOpen(true)} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition-all">
              <Settings2 size={24} className="text-slate-500" />
            </button>
            <div className="absolute bottom-full mb-3 right-0 w-48 bg-slate-800 text-white text-[10px] p-3 rounded-xl opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-opacity shadow-xl z-20">
              <div className="flex gap-2 items-start text-left">
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
        {[
          { title: "Water Level", value: sensor.tinggi_air, unit: "cm", bg: "bg-blue-600", shadow: "shadow-blue-600/40", icon: <Waves size={120} /> },
          { title: "Light Lux", value: sensor.intensitas_cahaya, unit: "lx", bg: "bg-amber-400 text-amber-900", shadow: "shadow-amber-400/40", icon: <Sun size={120} /> },
          { title: "Planting Age", value: calculateAge(plantConfig.date), unit: "days", bg: "bg-[#1b4d2c]", shadow: "shadow-green-900/40", icon: <Activity size={120} /> }
        ].map((card, idx) => (
          <div key={idx} className={`group relative ${card.bg} p-8 rounded-[3rem] shadow-[0_20px_40px_-15px] ${card.shadow} transition-all duration-500 hover:-translate-y-3 overflow-hidden`}>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">{card.icon}</div>
            <p className="opacity-60 text-[10px] font-black uppercase tracking-widest mb-1">{card.title}</p>
            <h3 className="text-6xl font-black tracking-tighter">{card.value}<span className="text-xl ml-2 opacity-40 italic font-light">{card.unit}</span></h3>
            
            {!isConnected && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 bg-rose-600 text-white px-4 py-1.5 rounded-full animate-pulse shadow-lg">
                    <WifiOff size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Offline</span>
                  </div>
                  <p className="text-[9px] font-bold text-white/60 tracking-tighter italic">Showing last seen data</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION: PUMP & LOGS */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        <div className={`w-full xl:w-72 p-8 rounded-[2.5rem] border-2 transition-all duration-500 shadow-2xl ${
          sensor.kondisi_pompa === 'HIDUP' && isConnected ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-100'
        }`}>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
            sensor.kondisi_pompa === 'HIDUP' && isConnected ? 'bg-emerald-500 text-white animate-bounce shadow-lg' : 'bg-rose-500 text-white grayscale opacity-50'
          }`}>
            <Power size={28} />
          </div>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${sensor.kondisi_pompa === 'HIDUP' && isConnected ? 'text-emerald-600' : 'text-rose-400'}`}>Pump Unit</p>
          <h4 className={`text-4xl font-black tracking-tighter ${sensor.kondisi_pompa === 'HIDUP' && isConnected ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isConnected ? sensor.kondisi_pompa : 'OFFLINE'}
          </h4>
        </div>

        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50 flex justify-between bg-slate-50/30 items-center">
             <div className="flex items-center gap-3">
                <History size={16} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Recent Logs</span>
             </div>
             {!isConnected && <span className="text-[9px] font-black text-rose-500 animate-pulse uppercase tracking-tighter">Connection Lost</span>}
          </div>
          <table className="w-full text-left">
            <thead className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
              <tr>
                <th className="px-8 py-4">Time</th>
                <th className="px-8 py-4">Pump Status</th>
                <th className="px-8 py-4 text-right">Data In</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-bold">
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-3 text-slate-400 font-mono italic">{new Date(log.created_at).toLocaleTimeString()}</td>
                  <td className="px-8 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${log.kondisi_pompa === 'HIDUP' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[999] flex items-center justify-center p-4 text-slate-800">
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-black"><X size={24} /></button>
            <h2 className="text-3xl font-black mb-8 italic lowercase tracking-tighter">Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Plant Name</label>
                <input type="text" placeholder={plantConfig.name} className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none" onChange={(e) => setNewPlantName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Start Date</label>
                <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none" onChange={(e) => setNewPlantDate(e.target.value)} />
              </div>
              <button onClick={async () => {
                const { error } = await supabase.from('plant_settings').update({ plant_name: newPlantName || plantConfig.name, planting_date: newPlantDate || plantConfig.date }).eq('id', 1);
                if (!error) { setIsModalOpen(false); fetchData(); }
              }} className="w-full py-5 bg-[#1b4d2c] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Apply Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}