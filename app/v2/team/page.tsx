"use client";

import React from 'react';

const teamMembers = [
  {
    name: "AMIRUDIN HUSNUL HIDAYAT",
    id: "231113008",
    role: "Project Leader & Coordinator",
    image: "/team/amir.jpg", 
    color: "from-emerald-400 to-emerald-600",
    shadow: "shadow-emerald-200"
  },
  {
    name: "MUHAMAD ADHITYA SAPUTRA",
    id: "231113015",
    role: "UI/UX & Frontend Developer",
    image: "/team/adhit.jpg",
    color: "from-cyan-400 to-cyan-600",
    shadow: "shadow-cyan-200"
  },
  {
    name: "BAYU MUNAJAH",
    id: "231113019",
    role: "Fuzzy Logic Programmer",
    image: "/team/bayu.jpg",
    color: "from-green-400 to-green-600",
    shadow: "shadow-green-200"
  },
  {
    name: "RIO ARDIANSYAH",
    id: "231113006",
    role: "Hardware & Electrical Engineer",
    image: "/team/rio.jpg",
    color: "from-teal-400 to-teal-600",
    shadow: "shadow-teal-200"
  }
];

export default function TeamSection() {
  return (
    <div className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-emerald-600 font-bold tracking-[0.3em] uppercase text-sm mb-3">Abraseed V2</h2>
          <h1 className="text-5xl font-black text-slate-800 mb-6">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">THE TEAM</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg italic">
            "Sinergi keahlian untuk masa depan pertanian yang cerdas dan berkelanjutan."
          </p>
          <div className="flex justify-center mt-6">
            <span className="inline-block w-20 h-1.5 bg-emerald-500 rounded-full"></span>
            <span className="inline-block w-4 h-1.5 bg-emerald-200 rounded-full mx-2"></span>
            <span className="inline-block w-2 h-1.5 bg-emerald-100 rounded-full"></span>
          </div>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              {/* Background Card */}
              <div className={`absolute inset-0 bg-white rounded-[2.5rem] shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:${member.shadow} group-hover:-rotate-2`}></div>
              
              <div className="relative p-8 flex flex-col items-center">
                {/* Profile Image Container */}
                <div className="relative mb-6">
                  <div className={`w-44 h-44 rounded-full bg-gradient-to-tr ${member.color} p-1.5 transition-transform duration-500 group-hover:scale-105`}>
                    <div className="w-full h-full rounded-full bg-white overflow-hidden border-4 border-white shadow-inner">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name}&background=10b981&color=fff`;
                        }}
                      />
                    </div>
                  </div>
                  {/* Badge NIM */}
                  <div className="absolute -bottom-2 bg-slate-800 text-white text-[10px] font-bold py-1 px-3 rounded-full border-2 border-white shadow-lg">
                    {member.id}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center mt-2">
                  <h3 className="text-xl font-extrabold text-slate-800 leading-tight mb-2 uppercase tracking-tight">
                    {member.name.split(' ').slice(0, 2).join(' ')}
                    <span className="block text-slate-400 font-medium text-sm lowercase mt-0.5">
                      {member.name.split(' ').slice(2).join(' ')}
                    </span>
                  </h3>
                  
                  <div className="h-0.5 w-10 bg-slate-200 mx-auto my-4 transition-all duration-500 group-hover:w-20 group-hover:bg-emerald-400"></div>
                  
                  <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-4 h-10 flex items-center justify-center">
                    {member.role}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">Active Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}