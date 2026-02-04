{/* 3 KARTU UTAMA - High Impact Overlay */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
  {[
    { 
      title: "Water Level", 
      value: sensor.tinggi_air, 
      unit: "cm", 
      bg: "bg-blue-600", 
      shadow: "shadow-blue-600/40",
      icon: <Waves size={120} /> 
    },
    { 
      title: "Light Intensity", 
      value: sensor.intensitas_cahaya, 
      unit: "lx", 
      bg: "bg-amber-400 text-amber-900", 
      shadow: "shadow-amber-400/40",
      icon: <Sun size={120} /> 
    },
    { 
      title: "Planting Age", 
      value: calculateAge(plantConfig.date), 
      unit: "days", 
      bg: "bg-[#1b4d2c]", 
      shadow: "shadow-green-900/40",
      icon: <Activity size={120} /> 
    }
  ].map((card, idx) => (
    <div key={idx} className={`group relative ${card.bg} p-8 rounded-[3rem] shadow-[0_20px_40px_-15px] ${card.shadow} transition-all duration-500 hover:-translate-y-3 overflow-hidden`}>
      {/* Icon Background */}
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
        {card.icon}
      </div>
      
      {/* Card Content */}
      <p className="opacity-60 text-[10px] font-black uppercase tracking-widest mb-1">{card.title}</p>
      <h3 className="text-6xl font-black tracking-tighter">
        {card.value}
        <span className="text-xl ml-2 opacity-40 italic font-light">{card.unit}</span>
      </h3>

      {/* OVERLAY TIPIS SAAT OFFLINE */}
      {!isConnected && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 bg-rose-600 text-white px-4 py-1.5 rounded-full shadow-xl animate-pulse">
              <WifiOff size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Offline</span>
            </div>
            <p className="text-[9px] font-bold text-white/60 tracking-tighter">Last data showing...</p>
          </div>
        </div>
      )}
    </div>
  ))}
</div>