import { Box, Cpu, Gauge, Zap, Wind } from 'lucide-react';

export default function PartsTab() {
  const components = [
    {
      name: "ESP32 DevKit V1",
      spec: "Dual-core 240MHz, WiFi & Bluetooth",
      desc: "Otak utama sistem yang mengolah logika Fuzzy dan mengirim data ke Supabase Cloud.",
      icon: <Cpu className="text-emerald-500" />
    },
    {
      name: "Sensor Intensitas Cahaya (Lux)",
      spec: "Range: 0 – 10000 Lux",
      desc: "Mendeteksi kondisi cahaya (Gelap, Redup, Terang) sebagai input utama logika fuzzy.",
      icon: <Zap className="text-amber-500" />
    },
    {
      name: "Sensor Ultrasonik",
      spec: "Range: 0 – 300 mm",
      desc: "Mengukur jarak antara lampu dan tanaman untuk mencegah risiko panas berlebih.",
      icon: <Gauge className="text-blue-500" />
    },
    {
      name: "Motor Servo MG995",
      spec: "High Torque, 0° – 180°",
      desc: "Penggerak mekanik untuk menaikkan atau menurunkan posisi lampu secara otomatis.",
      icon: <Wind className="text-purple-500" />
    },
    {
      name: "LED Grow Light",
      spec: "2 Baris LED High Intensity",
      desc: "Sumber cahaya buatan yang diatur intensitasnya (Off, 1 Baris, 2 Baris) oleh sistem.",
      icon: <Box className="text-yellow-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in duration-500 pb-10">
      {components.map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start gap-5">
          <div className="p-4 bg-slate-50 rounded-2xl">
            {item.icon}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">{item.name}</h3>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">
              {item.spec}
            </span>
            <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}