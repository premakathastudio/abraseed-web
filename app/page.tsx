import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// 1. Koneksi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const revalidate = 0;

export default async function DashboardPage() {
  // 2. Ambil data terbaru dari database
  const { data: latestData } = await supabase
    .from('log_sensor')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  const sensor = latestData?.[0] || {
    light_intensity: 0,
    soil_moisture: 0,
    pump_status: 'OFF'
  };

  return (
    <main className="min-h-screen bg-[#E2F5E9] p-4 md:p-10 font-sans text-slate-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP SECTION: Logo & Date/Time */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tighter text-[#1b4d2c]">
              ABRA<span className="text-green-600">SEED</span>
            </h1>
            <span className="text-[8px] leading-tight text-gray-500 uppercase">Start. Grow. Eat.</span>
          </div>

          {/* Bagian Tanggal & Tombol History */}
          <div className="text-right flex flex-col items-end">
            <p className="text-[11px] font-medium text-slate-600">Date: {new Date().toLocaleDateString('id-ID')}</p>
            <p className="text-[11px] font-medium text-slate-600">Time: {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
            
            {/* TOMBOL HISTORY SESUAI REVISI */}
            <Link 
              href="/history" 
              className="mt-2 bg-[#1b4d2c] hover:bg-green-900 text-white text-[10px] font-bold py-1.5 px-4 rounded-lg transition-all shadow-sm"
            >
              📊 VIEW HISTORY
            </Link>
          </div>
        </div>

        {/* TITLE SECTION */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#1b4d2c] text-white px-12 py-3 rounded-full shadow-lg">
            <h2 className="text-2xl font-medium tracking-wide">Data Visualization</h2>
          </div>
        </div>

        {/* MAIN SENSOR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 mb-16 max-w-4xl mx-auto">
          
          {/* Light Intensity */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">☀️ Light Intensity</p>
            <div className="bg-[#447a50] text-white px-10 py-2 rounded-full min-w-[160px] text-center font-bold">
              {sensor.light_intensity} Lux
            </div>
          </div>

          {/* Plant Height (Statis) */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">🌱 Plant Height</p>
            <div className="bg-[#447a50] text-white px-10 py-2 rounded-full min-w-[160px] text-center font-bold">
              11 cm
            </div>
          </div>

          {/* Plant Age (Statis) */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">📅 Plant Age</p>
            <div className="bg-[#447a50] text-white px-10 py-2 rounded-full min-w-[160px] text-center font-bold">
              8 day
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">💧 Soil Moisture</p>
            <div className="bg-[#447a50] text-white px-10 py-2 rounded-full min-w-[160px] text-center font-bold">
              {sensor.soil_moisture} %
            </div>
          </div>

          {/* Pump Status */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">🚰 Pump Status</p>
            <div className="bg-[#447a50] text-white px-10 py-2 rounded-full min-w-[160px] text-center font-bold uppercase">
              {sensor.pump_status || 'OFF'}
            </div>
          </div>

          {/* System Status */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-slate-600">Status System</p>
            <div className="bg-[#facc15] text-white px-10 py-2 rounded-full min-w-[160px] text-center font-black tracking-widest shadow-md">
              RUNNING
            </div>
          </div>
        </div>

        {/* INFO BOX & ALERT */}
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="flex-1">
            <div className="bg-white/80 border border-green-200 p-8 rounded-2xl text-center shadow-sm">
              <h4 className="font-bold text-lg mb-1 italic">Alert!!</h4>
              <p className="text-gray-600 italic text-sm font-medium">don't mind, sistem is running well.</p>
            </div>
          </div>
          
          <div className="flex-1 text-right md:text-right text-center">
            <p className="text-sm text-slate-700 font-medium italic leading-relaxed">
              An intelligent microgreen cultivation system that automates light and growing conditions using sensors and smart logic.
            </p>
          </div>
        </div>

        {/* CLOUD DECORATION */}
        <div className="fixed bottom-[-20px] left-[-20px] text-8xl opacity-90">☁️</div>
        <div className="fixed bottom-0 left-0 w-full h-1 border-b-4 border-dashed border-black"></div>

      </div>
    </main>
  );
}