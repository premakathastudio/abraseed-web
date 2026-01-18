'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Sun, 
  Activity, 
  Zap,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Settings2,
  X,
  Waves
} from 'lucide-react';

export default function DashboardV2() {
  const [sensor, setSensor] = useState({
    intensitas_cahaya: 0,
    tinggi_air: 0,
    kondisi_pompa: 'MATI',
    system_status: 'STANDBY'
  });
  
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
      // 1. Ambil data sensor terbaru dari tabel monitoring
      const { data: sensorData, error: sError } = await supabase
        .from('monitoring') 
        .select('tinggi_air, intensitas_cahaya, kondisi_pompa, created_at')
        .order('created_at', { ascending: false })
        .limit(1);

      if (sError) throw sError;

      if (sensorData && sensorData.length > 0) {
        setSensor({
          tinggi_air: sensorData[0].tinggi_air || 0,
          intensitas_cahaya: sensorData[0].intensitas_cahaya || 0,
          kondisi_pompa: sensorData[0].kondisi_pompa || 'MATI',
          system_status: 'RUNNING'
        });
        
        // Perbaikan Last Update: Konversi string ke objek Date
        if (sensorData[0].created_at) {
          setLastSeen(new Date(sensorData[0].created_at));
        }
      }

      // 2. Ambil data Konfigurasi Tanaman
      const { data: configData } = await supabase
        .from('plant_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (configData) {
        setPlantConfig({ name: configData.plant_name, date: configData.planting_date });
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setTimeout(() => setIsUpdating(false), 800);
    }
  };

  const handleSaveConfig = async () => {
    const { error } = await supabase
      .from('plant_settings')
      .update({ 
        plant_name: newPlantName || plantConfig.name, 
        planting_date: newPlantDate || plantConfig.date 
      })
      .eq('id', 1);

    if (!error) {
      alert("✅ Konfigurasi berhasil diperbarui!");
      setIsModalOpen(false);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: 'Tinggi Air', value: `${sensor.tinggi_air} cm`, icon: <Waves className="text-blue-500" />, color: 'border-l-blue-500' },
    { label: 'Intensitas Cahaya', value: `${sensor.intensitas_cahaya} Lux`, icon: <Sun className="text-yellow-500" />, color: 'border-l-yellow-500' },
    { label: 'Umur Tanaman', value: `${calculateAge(plantConfig.date)} Hari`, icon: <Activity className="text-green-500" />, color: 'border-l-green-500' },
  ];

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#1b4d2c] flex items-center gap-3">
            {plantConfig.name} <span className="text-slate-300 font-light">|</span> V2 Monitoring
          </h2>
          <p className="text-slate-500 text-sm italic font-medium">Real-time update via Supabase Cloud.</p>
        </div>
        
        <div className="flex gap-3">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all shadow-sm">
              <Settings2 size={16} /> Configure
            </button>

            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
              <RefreshCcw size={16} className={`text-green-600 ${isUpdating ? 'animate-spin' : ''}`} />
              <span className="text-xs font-bold text-slate-600">
                {isUpdating ? 'Syncing...' : `Update: ${lastSeen ? lastSeen.toLocaleTimeString('id-ID') : '--:--'}`}
              </span>
            </div>
        </div>
      </div>

      {/* SENSOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className={`bg-white p-6 rounded-3xl shadow-sm border-l-4 ${card.color} hover:shadow-md transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl">{card.icon}</div>
              <Activity size={14} className="text-slate-300" />
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{card.label}</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* STATUS & PUMP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className={`p-4 rounded-2xl ${sensor.kondisi_pompa === 'HIDUP' || sensor.kondisi_pompa === 'ON' ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
              <Zap size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pump Status</p>
              <h4 className="text-2xl font-black text-slate-800">{sensor.kondisi_pompa}</h4>
            </div>
          </div>
          <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${sensor.kondisi_pompa === 'HIDUP' || sensor.kondisi_pompa === 'ON' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
            {sensor.kondisi_pompa === 'HIDUP' || sensor.kondisi_pompa === 'ON' ? 'Active' : 'Standby'}
          </div>
        </div>

        <div className="bg-[#1b4d2c] p-8 rounded-[2rem] shadow-lg flex items-center justify-between text-white text-center">
           <div className="flex items-center gap-5">
            <div className="p-4 bg-white/10 rounded-2xl"><CheckCircle2 size={24} className="text-emerald-400" /></div>
            <div className="text-left">
              <p className="text-[10px] font-black text-green-200/60 uppercase tracking-widest">System</p>
              <h4 className="text-2xl font-black tracking-tight uppercase">{sensor.system_status}</h4>
            </div>
          </div>
          <Activity size={24} className="opacity-20" />
        </div>
      </div>

      {/* CONFIG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-800 mb-6">Settings</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Plant Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold" onChange={(e) => setNewPlantName(e.target.value)} />
              <input type="date" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold" onChange={(e) => setNewPlantDate(e.target.value)} />
              <button onClick={handleSaveConfig} className="w-full py-4 bg-[#1b4d2c] text-white rounded-2xl font-bold">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}