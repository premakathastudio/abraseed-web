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
    system_status: 'STANDBY'
  };

  // Format Jam WIB (Asia/Jakarta)
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).replace('.', ':');
  const dateStr = now.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/');

  return (
    <main className="min-h-screen bg-[#E2F5E9] p-6 font-sans text-slate-800 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-black tracking-tighter text-[#1b4d2c]">ABRA<span className="text-green-600">SEED</span></h1>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-sm font-bold text-slate-700">Date: {dateStr}</p>
            <p className="text-sm font-bold text-slate-700">Time: {timeStr}</p>
            <Link href="/history" className="mt-2 bg-[#1b4d2c] hover:bg-green-900 text-white text-[10px] font-bold py-2 px-5 rounded-lg transition-all shadow-lg active:scale-95">
              📊 VIEW HISTORY
            </Link>
          </div>
        </div>

        {/* TITLE */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#1b4d2c] text-white px-16 py-4 rounded-full shadow-2xl border-4 border-white/20">
            <h2 className="text-3xl font-bold tracking-widest uppercase">Data Visualization</h2>
          </div>
        </div>

        {/* GRID SENSOR DENGAN ANIMASI PULSE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-12 mb-20">
          {[
            { label: '☀️ Light Intensity', val: `${sensor.light_intensity} Lux`, col: 'bg-[#447a50]' },
            { label: '🌱 Plant Height', val: `${sensor.plant_height} cm`, col: 'bg-[#447a50]' },
            { label: '📅 Plant Age', val: `${sensor.plant_age} day`, col: 'bg-[#447a50]' },
            { label: '💧 Soil Moisture', val: `${sensor.soil_moisture} %`, col: 'bg-[#447a50]' },
            { label: '🚰 Pump Status', val: sensor.pump_status, col: 'bg-[#447a50]' },
            { label: 'Status System', val: sensor.system_status, col: 'bg-[#facc15]' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 transition-transform hover:scale-105">
              <p className="text-md font-extrabold text-slate-700 uppercase tracking-tight">{item.label}</p>
              {/* Animasi pulse ditambahkan pada class di bawah ini */}
              <div className={`${item.col} text-white px-12 py-3 rounded-full min-w-[200px] text-center font-black text-xl shadow-xl animate-pulse`}>
                {item.val}
              </div>
            </div>
          ))}
        </div>

        {/* ALERT BOX */}
        <div className="bg-white/80 border-2 border-green-700 p-10 rounded-3xl text-center shadow-sm max-w-3xl mx-auto backdrop-blur-sm">
          <h4 className="font-black text-2xl mb-2 italic tracking-tighter uppercase">Alert!!</h4>
          <p className="text-slate-600 italic font-bold text-lg">don't mind, sistem is running well.</p>
        </div>

        {/* DEKORASI AWAN */}
        <div className="fixed bottom-4 left-4 text-7xl opacity-80 filter drop-shadow-md">☁️</div>
      </div>
    </main>
  );
}