import { BrainCircuit, Activity, Zap, Settings2, Lightbulb, ArrowUpDown } from 'lucide-react';

export default function FuzzyTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* HEADER LOGIKA FUZZY */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
            <BrainCircuit size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Fuzzy Logic Controller</h2>
        </div>
        <p className="text-slate-500 font-medium leading-relaxed italic">
          Sistem ini secara cerdas menjaga intensitas cahaya ideal dengan mengatur status lampu dan ketinggian lampu melalui motor servo secara otomatis[cite: 3, 4].
        </p>
      </div>

      {/* INPUT VARIABLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input 1: Lux */}
        <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
          <div className="flex items-center gap-3 mb-4 text-amber-700">
            <Zap size={20} />
            <h3 className="font-black uppercase text-xs tracking-widest">Input 1: Intensitas Cahaya</h3>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-amber-400 uppercase">Range: 0 – 10000 Lux </p>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Gelap (Kurang)</span>
                <span className="text-amber-600">0 – 3000 Lux </span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Redup (Sedang)</span>
                <span className="text-amber-600">2500 – 5000 Lux </span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Terang (Berlebih)</span>
                <span className="text-amber-600">4500 – 8000+ Lux </span>
              </div>
            </div>
          </div>
        </div>

        {/* Input 2: Ultrasonik */}
        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
          <div className="flex items-center gap-3 mb-4 text-blue-700">
            <Activity size={20} />
            <h3 className="font-black uppercase text-xs tracking-widest">Input 2: Jarak Lampu</h3>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-blue-400 uppercase">Range: 0 – 30 cm [cite: 19]</p>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Dekat (Risiko Panas)</span>
                <span className="text-blue-600">0 – 10 cm </span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Sedang (Aman)</span>
                <span className="text-blue-600">10 – 20 cm </span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Jauh (Cahaya Lemah)</span>
                <span className="text-blue-600">20 – 30 cm </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OUTPUT EXPLANATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Lightbulb size={20} />
            <h3 className="font-black uppercase text-xs tracking-widest">Output 1: Lampu</h3>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Mengontrol 2 baris lampu LED untuk menambah intensitas cahaya.</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-purple-600">
            <ArrowUpDown size={20} />
            <h3 className="font-black uppercase text-xs tracking-widest">Output 2: Servo</h3>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Mengatur ketinggian mekanik lampu dengan rentang sudut 0° – 180°[cite: 9, 31].</p>
        </div>
      </div>

      {/* RULE BASE GABUNGAN */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <Settings2 size={20} className="text-purple-400" />
          <h3 className="font-black uppercase text-xs tracking-widest">Fuzzy Rule Base (Sample)</h3>
        </div>
        <div className="space-y-3 relative z-10 font-mono text-[10px] md:text-[11px]">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
            <p><span className="text-blue-400">Jarak: Dekat</span> + <span className="text-amber-400">Lux: Terang</span></p>
            <p className="text-emerald-400 font-bold">Lampu: MATI | Servo: NAIK [cite: 43]</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
            <p><span className="text-blue-400">Jarak: Jauh</span> + <span className="text-amber-400">Lux: Gelap</span></p>
            <p className="text-emerald-400 font-bold">Lampu: TERANG | Servo: TURUN [cite: 43]</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
            <p><span className="text-blue-400">Jarak: Sedang</span> + <span className="text-amber-400">Lux: Cukup</span></p>
            <p className="text-emerald-400 font-bold">Lampu: REDUP | Servo: TETAP [cite: 43]</p>
          </div>
        </div>
        
        {/* LOGIKA UTAMA FOOTER */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[9px] font-black uppercase tracking-tighter">
          <div className="text-blue-300">Cahaya Kurang = Lampu Dekat [cite: 45]</div>
          <div className="text-amber-300">Cahaya Lebih = Lampu Jauh [cite: 46]</div>
          <div className="text-emerald-300">Cahaya Cukup = Stabil [cite: 47]</div>
        </div>
      </div>
    </div>
  );
}