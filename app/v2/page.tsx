'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Droplets, 
  Sun, 
  Ruler, 
  Calendar, 
  Activity, 
  Zap,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Settings2,
  X
} from 'lucide-react';

export default function DashboardV2() {
  const [sensor, setSensor] = useState({
    light_intensity: 0,
    plant_height: 0,
    soil_moisture: 0,
    pump_status: 'OFF',
    system_status: 'STANDBY'
  });
  
  // State Baru untuk Konfigurasi Tanaman
  const [plantConfig, setPlantConfig] = useState({ name: 'Loading...', date: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlantName, setNewPlantName] = useState("");
  const [newPlantDate, setNewPlantDate] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  // Fungsi Menghitung Umur Tanaman
  const calculateAge = (dateString: string) => {
    if (!dateString) return 0;
    const start = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  };

  const fetchData = async () => {
    setIsUpdating(true);
    
    // 1. Ambil data Sensor
    const { data: sensorData } = await supabase
      .from('log_sensor')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    // 2. Ambil data Konfigurasi Tanaman (tabel plant_settings)
    const { data: configData } = await supabase
      .from('plant_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (sensorData && sensorData.length > 0) {
      setSensor(sensorData[0]);
      setLastSeen(new Date());
    }

    if (configData) {
      setPlantConfig({ name: configData.plant_name, date: configData.planting_date });
    }

    setTimeout(() => setIsUpdating(false), 800);
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
      fetchData(); // Refresh data tanpa reload halaman
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: 'Soil Moisture', value: `${sensor.soil_moisture}%`, icon: <Droplets className="text-blue-500" />, color: 'border-l-blue-500' },
    { label: 'Light Intensity', value: `${sensor.light_intensity} Lux`, icon: <Sun className="text-yellow-500" />, color: 'border-l-yellow-500' },
    { label: 'Plant Height', value: `${sensor.plant_height} cm`, icon: <Ruler className="text-green-500" />, color: 'border-l-green-500' },
    { label: 'Plant Age', value: `${calculateAge(plantConfig.date)} Days`, icon: <Calendar className="text-purple-500" />, color: 'border-l-purple-500' },
  ];

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#1b4d2c] flex items-center gap-3">
            {plantConfig.name} <span className="text-slate-300 font-light">|</span> Monitoring
          </h2>
          <p className="text-slate-500 text-sm">Monitor your plant growth parameters in real-time.</p>
        </div>
        
        <div className="flex gap-3">
            {/* Tombol Pengaturan */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all shadow-sm"
            >
              <Settings2 size={16} />
              Configure
            </button>

            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
              <RefreshCcw size={16} className={`text-green-600 ${isUpdating ? 'animate-spin' : ''}`} />
              <span className="text-xs font-bold text-slate-600">
                {isUpdating ? 'Updating...' : `Last seen: ${lastSeen?.toLocaleTimeString('id-ID') || '--:--'}`}
              </span>
            </div>
        </div>
      </div>

      {/* MAIN SENSOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className={`bg-white p-6 rounded-3xl shadow-sm border-l-4 ${card.color} transition-all hover:shadow-md group`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <Activity size={14} className="text-slate-300" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{card.label}</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* SYSTEM STATUS & PUMP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className={`p-4 rounded-2xl ${sensor.pump_status === 'ON' ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
              <Zap size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase">Water Pump</p>
              <h4 className="text-xl font-black text-slate-800">{sensor.pump_status}</h4>
            </div>
          </div>
          <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${sensor.pump_status === 'ON' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
            {sensor.pump_status === 'ON' ? 'Active' : 'Standby'}
          </div>
        </div>

        <div className="bg-[#1b4d2c] p-8 rounded-[2rem] shadow-lg flex items-center justify-between text-white">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-green-200/60 uppercase">System Status</p>
              <h4 className="text-xl font-black tracking-tight">{sensor.system_status}</h4>
            </div>
          </div>
          {sensor.system_status === 'RUNNING' ? <CheckCircle2 className="text-green-400" /> : <AlertCircle className="text-yellow-400" />}
        </div>
      </div>

      {/* CONFIGURATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
            
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-800">Configuration</h2>
              <p className="text-slate-500 text-sm mt-1">Set your plant identity and planting date.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plant Name</label>
                <input 
                  type="text" 
                  defaultValue={plantConfig.name}
                  placeholder="e.g. Red Lettuce"
                  className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-semibold"
                  onChange={(e) => setNewPlantName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Planting Date</label>
                <input 
                  type="date" 
                  defaultValue={plantConfig.date}
                  className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-semibold text-slate-700"
                  onChange={(e) => setNewPlantDate(e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveConfig}
                  className="flex-1 py-4 bg-[#1b4d2c] text-white rounded-2xl font-bold shadow-xl shadow-green-900/20 hover:bg-green-950 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER INFO */}
      <div className="bg-green-50 border border-green-100 p-6 rounded-3xl flex items-center gap-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        <p className="text-xs font-bold text-green-800">System is optimized. All sensors are reporting normal values.</p>
      </div>
    </div>
  );
}