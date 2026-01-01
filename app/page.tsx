import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
    status_system: 'STANDBY'
  };

  // Format Jam WIB (Jam 3 Pagi)
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).replace('.', ':');
  const dateStr = now.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '|');

  return (
    <main className="min-h-screen bg-[#E2F5E9] p-6 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tighter text-[#1b4d2c]">ABRA<span className="text-green-600">SEED</span></h1>
          </div>
          <div className="text-right flex flex-col items-end gap-1">
            <p className="text-xs font-bold text-slate-600">Date: {dateStr}</p>
            <p className="text-xs font-bold text-slate-600">Time: {timeStr}</p>
            <Link href="/history" className="mt-2 bg-[#1b4d2c] hover:scale-105 text-white text-[10px] font-bold py-1.5 px-4 rounded-lg transition-all shadow-md">
              📊 VIEW HISTORY
            </Link>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-[#1b4d2c] text-white px-14 py-3 rounded-full shadow-xl">
            <h2 className="text-2xl font-semibold tracking-widest uppercase">Data Visualization</h2>
          </div>
        </div>

        {/* GRID SENSOR DENGAN EFEK HOVER (ANIMASI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 mb-16 px-4">
          {[
            { label: '☀️ Light Intensity', val: `${sensor.light_intensity} Lux`, col: 'bg-[#447a50]' },
            { label: '🌱 Plant Height', val: `${sensor.plant_height} cm`, col: 'bg-[#447a50]' },
            { label: '📅 Plant Age', val: `${sensor.plant_age} day`, col: 'bg-[#447a50]' },
            { label: '💧 Soil Moisture', val: `${sensor.soil_moisture} %`, col: 'bg-[#447a50]' },
            { label: '🚰 Pump Status', val: sensor.pump_status, col: 'bg-[#447a50]' },
            { label: 'Status System', val: sensor.status_system, col: 'bg-[#facc15]' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 transform transition hover:scale-105">
              <p className="text-sm font-bold text-slate-700 uppercase tracking-tight">{item.label}</p>
              <div className={`${item.col} text-white px-10 py-3 rounded-full min-w-[180px] text-center font-black shadow-lg animate-pulse-slow`}>
                {item.val}
              </div>
            </div>
          ))}
        </div>

        {/* ALERT BOX */}
        <div className="bg-white/90 border-2 border-green-800 p-8 rounded-2xl text-center shadow-2xl max-w-2xl mx-auto">
          <h4 className="font-black text-xl mb-1 italic uppercase tracking-tighter">Alert!!</h4>
          <p className="text-slate-600 italic font-bold">don't mind, sistem is running well.</p>
        </div>

      </div>
    </main>
  );
}