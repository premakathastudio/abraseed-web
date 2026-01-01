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
  AlertCircle
} from 'lucide-react';

export default function DashboardV2() {
  const [sensor, setSensor] = useState({
    light_intensity: 0,
    plant_height: 0,
    plant_age: 0,
    soil_moisture: 0,
    pump_status: 'OFF',
    system_status: 'STANDBY'
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  const fetchData = async () => {
    setIsUpdating(true);
    const { data } = await supabase
      .from('log_sensor')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      setSensor(data[0]);
      setLastSeen(new Date());
    }
    setTimeout(() => setIsUpdating(false), 800);
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
    { label: 'Plant Age', value: `${sensor.plant_age} Days`, icon: <Calendar className="text-purple-500" />, color: 'border-l-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#1b4d2c]">Real-time Monitoring</h2>
          <p className="text-slate-500 text-sm">Monitor your plant growth parameters in real-time.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
          <RefreshCcw size={16} className={`text-green-600 ${isUpdating ? 'animate-spin' : ''}`} />
          <span className="text-xs font-bold text-slate-600">
            {isUpdating ? 'Updating...' : `Last update: ${lastSeen?.toLocaleTimeString('id-ID') || '--:--'}`}
          </span>
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

      {/* FOOTER INFO */}
      <div className="bg-green-50 border border-green-100 p-6 rounded-3xl flex items-center gap-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        <p className="text-xs font-bold text-green-800">System is optimized. All sensors are reporting normal values.</p>
      </div>
    </div>
  );
}