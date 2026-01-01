'use client';

import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export default function TeamPage() {
  const team = [
    {
      name: "Adhitya", // Ganti dengan nama lengkapmu
      role: "IoT Engineer & Lead Developer",
      desc: "Responsible for hardware integration, Supabase architecture, and Next.js frontend development.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adhitya", // Bisa ganti foto asli nanti
      github: "#",
      linkedin: "#"
    },
    {
      name: "Team Member 2",
      role: "UI/UX Designer",
      desc: "Focused on creating a seamless and intuitive user experience for the ABRASEED dashboard.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      github: "#",
      linkedin: "#"
    },
    // Tambah anggota lain di sini jika ada
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-black text-[#1b4d2c] mb-4">Meet Our Team</h2>
        <p className="text-slate-500 font-medium">
          The minds behind ABRASEED. We combine IoT technology with modern web development to revolutionize urban farming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {team.map((member, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-green-100 rounded-full mb-6 overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">{member.name}</h3>
              <p className="text-green-600 font-bold text-sm mb-4 uppercase tracking-widest">{member.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {member.desc}
              </p>
              
              <div className="flex gap-4">
                <a href={member.github} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-[#1b4d2c] hover:text-white transition-all">
                  <Github size={20} />
                </a>
                <a href={member.linkedin} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-[#1b4d2c] hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}