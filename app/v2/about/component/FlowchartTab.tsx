import { GitBranch, Share2, Database, Monitor } from 'lucide-react';

export default function FlowchartTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <GitBranch size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Sistem Alur Kerja</h2>
        <p className="text-sm text-slate-500 font-medium">Visualisasi integrasi Hardware, Cloud, dan Dashboard Monitoring.</p>
      </div>

      {/* FLOWCHART IMAGE CONTAINER */}
      <div className="bg-white p-4 rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden group">
        <div className="relative aspect-video bg-slate-50 rounded-[2rem] overflow-hidden border border-dashed border-slate-200 flex items-center justify-center">
          {/* Ganti src="/flowchart.png" dengan path file flowchart aslimu di folder public */}
          <img 
            src="/flowchart.png" 
            alt="Flowchart Abraseed" 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/f8fafc/64748b?text=Foto+Flowchart+Belum+Ada";
            }}
          />
        </div>
      </div>

      {/* KETERANGAN ALUR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-6 bg-white rounded-[2rem] border border-slate-100">
          <Share2 className="mx-auto mb-3 text-blue-500" size={20} />
          <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">Step 1</h4>
          <p className="text-[11px] font-bold text-slate-700">Sensor Reading & Fuzzy Logic (ESP32)</p>
        </div>
        <div className="p-6 bg-white rounded-[2rem] border border-slate-100">
          <Database className="mx-auto mb-3 text-emerald-500" size={20} />
          <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">Step 2</h4>
          <p className="text-[11px] font-bold text-slate-700">Data Upload via REST API to Supabase</p>
        </div>
        <div className="p-6 bg-white rounded-[2rem] border border-slate-100">
          <Monitor className="mx-auto mb-3 text-purple-500" size={20} />
          <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">Step 3</h4>
          <p className="text-[11px] font-bold text-slate-700">Real-time Visualization on Dashboard</p>
        </div>
      </div>
    </div>
  );
}