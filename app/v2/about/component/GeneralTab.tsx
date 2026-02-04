import { ShieldCheck, Target, Zap, Leaf } from 'lucide-react';

export default function GeneralTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* SECTION: TAGLINE & OVERVIEW */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
            <Leaf size={28} />
          </div>
          <div>
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em]">Smart Soil-less Farming</h2>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter">ABRASEED V2.0</h1>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed font-medium italic">
          "Sistem Smart Farming guna mengoptimalkan pertumbuhan Microgreen untuk konsumsi rumah tangga melalui pendekatan teknologi IoT dan Kendali Cerdas."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SECTION: MANFAAT */}
        <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-xl shadow-emerald-900/10">
          <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3">
            <Target size={20} className="text-emerald-300" /> Manfaat Utama
          </h3>
          <ul className="space-y-3 text-sm font-medium text-emerald-50/80">
            <li className="flex items-start gap-2">• Monitoring Lingkungan Terintegrasi secara Real-time</li>
            <li className="flex items-start gap-2">• Sistem Berbasis Internet of Things (IoT) yang Presisi</li>
            <li className="flex items-start gap-2">• Pencatatan Umur Tanaman secara Otomatis</li>
            <li className="flex items-start gap-2">• Kontrol Pompa & Irigasi Terjadwal</li>
            <li className="flex items-start gap-2">• Analisis Data Pertumbuhan Berbasis Cloud</li>
          </ul>
        </div>

        {/* SECTION: FITUR */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3">
            <Zap size={20} className="text-yellow-500" /> Fitur Unggulan
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              "Peningkatan Efisiensi Tanam",
              "Optimalisasi Pertumbuhan Cerdas",
              "Kendali & Monitoring Mobile-Ready",
              "Analisis Data & Pelaporan Akurat"
            ].map((fitur, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                {fitur}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER BADGE */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <ShieldCheck className="text-emerald-400" size={32} />
          <div className="text-left">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Powered By</p>
            <p className="text-sm font-bold text-white">TEKNIK ELEKTRO UNU YOGYAKARTA</p>
          </div>
        </div>
        <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20">
          <span className="text-white text-[10px] font-black tracking-[0.2em] uppercase">Start • Grow • Eat</span>
        </div>
      </div>
    </div>
  );
}