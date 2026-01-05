export default function Design() {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
      <h2 className="text-2xl font-black text-slate-800 mb-2">Visual Identity</h2>
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-[#1b4d2c] shadow-lg border-2 border-white" title="Primary Green"></div>
        <div className="w-12 h-12 rounded-full bg-green-500 shadow-lg border-2 border-white" title="Accent Green"></div>
        <div className="w-12 h-12 rounded-full bg-[#F0F7F2] shadow-lg border-2 border-white" title="Background"></div>
      </div>
      <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-800 mb-2">Design Principles</h4>
        <ul className="list-disc list-inside text-sm text-slate-500 space-y-2">
          <li>Glassmorphism on Statistics Cards</li>
          <li>High Contrast Green-on-White for Readability</li>
          <li>Gradient Accents for Dynamic Feeling</li>
        </ul>
      </div>
    </div>
  );
}