"use client";

import React from 'react';

const teamMembers = [
  {
    name: "AMIRUDIN HUSNUL HIDAYAT",
    id: "231113008",
    role: "Project Leader & Coordinator",
    image: "/team/amir.jpg", 
    color: "from-emerald-400 to-emerald-600",
  },
  {
    name: "MUHAMAD ADHITYA SAPUTRA",
    id: "231113015",
    role: "UI/UX & Frontend Developer",
    image: "/team/adhit.jpg",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    name: "BAYU MUNAJAH",
    id: "231113019",
    role: "Fuzzy Logic Programmer",
    image: "/team/bayu.jpg",
    color: "from-green-400 to-green-600",
  },
  {
    name: "RIO ARDIANSYAH",
    id: "231113006",
    role: "Hardware & Electrical Engineer",
    image: "/team/rio.jpg",
    color: "from-teal-400 to-teal-600",
  }
];

export default function TeamSection() {
  return (
    <div className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-emerald-600 font-bold tracking-[0.3em] uppercase text-xs mb-3">Professional Team</h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800">
            Meet <span className="text-emerald-600">THE TEAM</span>
          </h1>
          <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
              
              {/* Profile Image - Fixed Size */}
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr ${member.color} p-1 mb-6 shadow-inner`}>
                <div className="w-full h-full rounded-full bg-white overflow-hidden border-4 border-white">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name}&background=10b981&color=fff`;
                    }}
                  />
                </div>
              </div>

              {/* ID Badge */}
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full mb-4 tracking-widest">
                NIM: {member.id}
              </span>

              {/* Name Area - Fixed Height for alignment */}
              <div className="h-16 flex items-center justify-center mb-2">
                <h3 className="text-lg font-extrabold text-slate-800 text-center leading-tight uppercase tracking-tight overflow-hidden">
                  {member.name}
                </h3>
              </div>

              {/* Divider */}
              <div className="w-12 h-1 bg-slate-100 group-hover:w-20 group-hover:bg-emerald-400 transition-all duration-300 mb-6"></div>

              {/* Role Area - Fixed Height for alignment */}
              <div className="h-12 flex items-start justify-center">
                <p className="text-xs font-bold text-emerald-600 text-center uppercase tracking-wider leading-relaxed">
                  {member.role}
                </p>
              </div>

              {/* Social/Status Bottom */}
              <div className="mt-4 pt-4 border-t border-slate-50 w-full flex justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified Member</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}