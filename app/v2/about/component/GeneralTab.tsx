import { Target, Microscope, ChevronRight, ShieldCheck } from 'lucide-react';

export default function GeneralTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:border-emerald-200 transition-colors">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
            <Target size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight uppercase text-xs">Visi Proyek</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
            "Mengembangkan sistem otomasi presisi untuk manajemen sumber daya air dan pencahayaan cerdas guna memaksimalkan pertumbuhan Abraseed."
          </p>
        </div>
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:border-blue-200 transition-colors">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
            <Microscope size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight uppercase text-xs">Misi Utama V2</h3>
          <ul className="text-sm text-slate-500 space-y-4 font-medium italic">
            {/* Mengarahkan misi ke variabel baru kita */}
            <li className="flex items-center gap-3"><ChevronRight size={14} className="text-blue-500" /> Monitoring Level Air & Intensitas Cahaya Real-time.</li>
            <li className="flex items-center gap-3"><ChevronRight size={14} className="text-blue-500" /> Kontrol Pompa Otomatis Berbasis Data Sensor.</li>
            <li className="flex items-center gap-3"><ChevronRight size={14} className="text-blue-500" /> Efisiensi Energi dan Penggunaan Air.</li>
          </ul>
        </div>
      </div>
      <div className="bg-[#1b4d2c] p-8 rounded-[2.5rem] flex items-center justify-center gap-6 shadow-xl shadow-green-900/10 text-white">
         <ShieldCheck className="text-emerald-400 shrink-0" size={32} />
         <p className="text-xs font-black tracking-widest uppercase text-center">Abraseed V2: Optimized Monitoring & Control Performance.</p>
      </div>
    </div>
  );
}