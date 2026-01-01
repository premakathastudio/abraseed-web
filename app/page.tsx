import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Koneksi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const revalidate = 0;

export default async function DashboardPage() {
  // Mengambil data terbaru (limit 1) untuk ditampilkan di kartu atas
  const { data: latestData } = await supabase
    .from('log_sensor')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  const data = latestData?.[0] || {
    suhu: 0,
    kelembapan: 0,
    soil_moisture: 0,
    light_intensity: 0,
    pump_status: 'OFF'
  };

  return (
    <main className="min-h-screen bg-[#F0F7F0] p-6 md:p-12 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-green-900 tracking-tighter">ABRASEED</h1>
            <p className="text-green-700/60 font-bold text-sm uppercase tracking-widest">Smart Farming System</p>
          </div>
          <Link 
            href="/history" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-green-200 flex items-center gap-2"
          >
            📊 RIWAYAT DATA
          </Link>
        </header>

        {/* DATA CARDS (ANGKA REALTIME) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-green-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Suhu Udara</p>
            <h2 className="text-4xl font-black text-green-800">{data.suhu}<span className="text-lg">°C</span></h2>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-green-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Kelembapan</p>
            <h2 className="text-4xl font-black text-green-800">{data.kelembapan}<span className="text-lg">%</span></h2>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-green-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Lembap Tanah</p>
            <h2 className="text-4xl font-black text-green-800">{data.soil_moisture}<span className="text-lg">%</span></h2>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-green-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Cahaya</p>
            <h2 className="text-4xl font-black text-green-800">{data.light_intensity}<span className="text-sm ml-1 text-slate-400 font-medium">LUX</span></h2>
          </div>
        </div>

        {/* AREA GRAFIK / STATUS UTAMA */}
        <div className="bg-white p-10 rounded-[3.5rem] shadow-xl shadow-green-900/5 border border-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-slate-800 mb-2">Status Sistem</h3>
            <div className="flex items-center gap-2 mb-8">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-green-600 uppercase tracking-widest">Sistem Berjalan Normal</span>
            </div>
            
            {/* Box Status Pompa */}
            <div className="inline-block bg-slate-50 border border-slate-100 p-6 rounded-3xl">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Status Pompa Air</p>
               <span className={`text-2xl font-black ${data.pump_status === 'ON' ? 'text-blue-600' : 'text-slate-300'}`}>
                {data.pump_status || 'OFF'}
               </span>
            </div>
          </div>
          
          {/* Dekorasi Daun */}
          <div className="absolute -right-10 -bottom-10 text-[150px] opacity-[0.03] grayscale">🌿</div>
        </div>

      </div>
    </main>
  );
}