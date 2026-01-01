// 1. IMPORT LIBRARY (Pastikan sudah npm install @supabase/supabase-js)
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// 2. KONEKSI DATABASE (Langsung di sini agar tidak error path)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 3. SETTING NEXT.JS (Agar data selalu refresh tiap dibuka)
export const revalidate = 0;

// 4. DEFINISI TIPE DATA (Penting agar variabel 'log' tidak merah)
interface SensorLog {
  id: number;
  created_at: string;
  suhu: number;
  kelembapan: number;
  light_intensity: number;
  soil_moisture: number;
  pump_status: string;
  system_status: string;
}

export default async function HistoryPage() {
  // 5. AMBIL DATA DARI SUPABASE
  const { data: logs, error } = await supabase
    .from('log_sensor')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-10 text-red-500">
        Gagal mengambil data: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#166534] tracking-tight">ABRASEED</h1>
            <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">Data Logging Report</p>
          </div>
          <Link 
            href="/" 
            className="mt-4 md:mt-0 bg-[#166534] hover:bg-[#15803d] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-green-200 flex items-center gap-2"
          >
            <span className="text-xl">←</span> DASHBOARD
          </Link>
        </div>

        {/* TABEL AREA */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F1F5F9] text-[#475569] uppercase text-[11px] font-extrabold tracking-[0.15em]">
                  <th className="px-8 py-5">Timestamp</th>
                  <th className="px-8 py-5">Suhu (°C)</th>
                  <th className="px-8 py-5">Kelembapan (%)</th>
                  <th className="px-8 py-5">Cahaya (Lux)</th>
                  <th className="px-8 py-5">Tanah (%)</th>
                  <th className="px-8 py-5 text-center">Pompa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs && logs.length > 0 ? (
                  logs.map((log: SensorLog) => (
                    <tr key={log.id} className="hover:bg-green-50/40 transition-colors group">
                      <td className="px-8 py-4 text-sm text-slate-500 font-medium">
                        {new Date(log.created_at).toLocaleString('id-ID', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit', second: '2-digit'
                        })}
                      </td>
                      <td className="px-8 py-4 text-sm font-bold text-slate-800 group-hover:text-green-700 transition-colors">
                        {log.suhu}
                      </td>
                      <td className="px-8 py-4 text-sm text-slate-600 font-medium">{log.kelembapan}</td>
                      <td className="px-8 py-4 text-sm text-slate-600 font-medium">{log.light_intensity}</td>
                      <td className="px-8 py-4 text-sm text-slate-600 font-medium">{log.soil_moisture}</td>
                      <td className="px-8 py-4 text-center">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border-2 ${
                          log.pump_status === 'ON' 
                            ? 'bg-blue-50 text-blue-600 border-blue-100' 
                            : 'bg-slate-50 text-slate-400 border-slate-100'
                        }`}>
                          {log.pump_status || 'OFF'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center opacity-30">
                        <div className="text-6xl mb-4">📥</div>
                        <p className="text-slate-900 font-bold uppercase tracking-widest">Database Kosong</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <p>© 2026 ABRASEED SMART FARMING</p>
          <p>Status: <span className="text-green-500">Connected to Supabase</span></p>
        </div>

      </div>
    </div>
  );
}