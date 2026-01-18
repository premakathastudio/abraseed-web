export default function Design() {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Visual Identity V2</h2>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest">
          Active UI Theme
        </span>
      </div>
      
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-[#1b4d2c] shadow-lg border-2 border-white" title="Primary Green - Brand Identity"></div>
        <div className="w-12 h-12 rounded-full bg-green-500 shadow-lg border-2 border-white" title="Accent Green - Pump Active State"></div>
        <div className="w-12 h-12 rounded-full bg-blue-500 shadow-lg border-2 border-white" title="Water Blue - Level Indicator"></div>
        <div className="w-12 h-12 rounded-full bg-[#F0F7F2] shadow-lg border-2 border-white" title="Background - Contrast Base"></div>
      </div>

      <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-800 mb-2 italic">Abraseed V2 Design Systems</h4>
        <ul className="list-disc list-inside text-sm text-slate-500 space-y-2 font-medium">
          <li>Glassmorphism on Statistics Cards (Water Level & Lux)</li>
          <li>High Contrast Green-on-White for Readability</li>
          <li>Dynamic Status Indicators for Pump & System State</li>
          <li>Responsive Grid for Multi-device Monitoring</li>
        </ul>
      </div>
    </div>
  );
}