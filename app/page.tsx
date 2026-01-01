import Link from 'next/link';
// Jika kamu punya komponen grafik, pastikan import-nya benar di sini
// import SensorChart from '@/components/SensorChart'; 

export const revalidate = 0;

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F0F4F0] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-green-800 tracking-tighter">
              ABRASEED <span className="text-green-500 text-xl">v1.0</span>
            </h1>
            <p className="text-slate-500 font-medium">Smart Farming Monitoring System</p>
          </div>

          {/* TOMBOL MENU KE HISTORY (Ini yang tadi kita cari) */}
          <div className="flex gap-3">
            <Link 
              href="/history" 
              className="bg-white border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-sm flex items-center gap-2"
            >
              📊 Riwayat Data
            </Link>
          </div>
        </header>

        {/* --- RINGKASAN DATA (REAL-TIME) --- */}
        {/* Di sini nanti kamu panggil data Supabase atau Grafik kamu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-green-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Suhu Udara</p>
            <h2 className="text-4xl font-black text-green-700">28.5<span className="text-lg">°C</span></h2>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-green-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Kelembapan Udara</p>
            <h2 className="text-4xl font-black text-green-700">65<span className="text-lg">%</span></h2>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-green-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Kelembapan Tanah</p>
            <h2 className="text-4xl font-black text-green-700">72<span className="text-lg">%</span></h2>
          </div>
        </div>

        {/* --- AREA GRAFIK (Hanya Placeholder) --- */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-green-900/5 border border-white min-h-[400px] flex flex-col items-center justify-center text-center">
           <div className="bg-green-50 p-4 rounded-full mb-4">
              <span className="text-4xl">📈</span>
           </div>
           <h3 className="text-xl font-bold text-slate-800">Grafik Monitoring Real-time</h3>
           <p className="text-slate-500 max-w-xs mx-auto mt-2 text-sm">
             Data sensor akan divisualisasikan secara langsung melalui grafik di area ini.
           </p>
           {/* Masukkan komponen SensorChart kamu di sini jika sudah ada */}
        </div>

        {/* --- FOOTER --- */}
        <footer className="mt-12 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            System Status: <span className="text-green-500 underline underline-offset-4">Active & Secured</span>
          </p>
        </footer>

      </div>
    </main>
  );
}