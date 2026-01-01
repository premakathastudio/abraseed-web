import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function DashboardPage() {
  const { data } = await supabase
    .from('log_sensor')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  const sensor = data?.[0] || {
    light_intensity: 0,
    plant_height: 0,
    plant_age: 0,
    soil_moisture: 0,
    pump_status: 'OFF',
    system_status: 'STANDBY'
  };

  // Jam WIB (Asia/Jakarta)
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).replace('.', ':');
  const dateStr = now.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/');

  const sensorCards = [
    { label: '☀️ Light Intensity', val: `${sensor.light_intensity} Lux`, col: 'bg-[#447a50]' },
    { label: '🌱 Plant Height', val: `${sensor.plant_height} cm`, col: 'bg-[#447a50]' },
    { label: '📅 Plant Age', val: `${sensor.plant_age} day`, col: 'bg-[#447a50]' },
    { label: '💧 Soil Moisture', val: `${sensor.soil_moisture} %`, col: 'bg-[#447a50]' },
    { label: '🚰 Pump Status', val: sensor.pump_status, col: 'bg-[#447a50]' },
    { label: 'Status System', val: sensor.system_status, col: 'bg-[#facc15]' },
  ];

  return (
    <main className="min-h-screen bg-[#E2F5E9] p-6 text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-[#1b4d2c]">ABRA<span className="text-green-600">SEED</span></h1>
          <div className="text-right">
            <p className="text-sm font-bold">Date: {dateStr}</p>
            <p className="text-sm font-bold">Time: {timeStr}</p>
            <Link href="/history" className="mt-2 inline-block bg-[#1b4d2c] text-white text-[10px] font-bold py-2 px-5 rounded-lg hover:bg-green-900 transition-all">
              📊 VIEW HISTORY
            </Link>
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-[#1b4d2c] text-white px-16 py-4 rounded-full shadow-xl">
            <h2 className="text-2xl font-bold tracking-widest uppercase">Data Visualization</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {sensorCards.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 transition-transform hover:scale-105">
              <p className="text-md font-extrabold uppercase tracking-tight">{item.label}</p>
              <div className={`${item.col} text-white px-12 py-3 rounded-full min-w-[200px] text-center font-black text-xl shadow-lg animate-pulse`}>
                {item.val}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/80 border-2 border-green-700 p-10 rounded-3xl text-center shadow-sm max-w-3xl mx-auto">
          <h4 className="font-black text-2xl mb-2 italic uppercase">Alert!!</h4>
          <p className="text-slate-600 italic font-bold">don't mind, sistem is running well.</p>
        </div>
      </div>
    </main>
  );
}