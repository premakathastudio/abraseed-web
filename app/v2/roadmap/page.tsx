'use client';

import { CheckCircle2, Circle, Rocket, Cpu, Globe } from 'lucide-react';

export default function RoadmapPage() {
  const phases = [
    {
      title: "Phase 1: Basic Integration",
      status: "Completed",
      desc: "Building the core IoT infrastructure, connecting sensors to Supabase, and creating the v1.0 Dashboard.",
      icon: <Cpu className="text-green-600" />,
      done: true
    },
    {
      title: "Phase 2: Advanced Dashboard (v2.0)",
      status: "In Progress",
      desc: "Implementing auto-refreshing data, Sidebar navigation, and detailed plant health analytics.",
      icon: <Rocket className="text-blue-600" />,
      done: false
    },
    {
      title: "Phase 3: AI & Automation",
      status: "Upcoming",
      desc: "Integrating Machine Learning to predict harvest time and fully automated irrigation based on weather forecasts.",
      icon: <Globe className="text-purple-600" />,
      done: false
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-black text-[#1b4d2c]">Project Roadmap</h2>
        <p className="text-slate-500 mt-2">The future vision of ABRASEED ecosystem.</p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {phases.map((phase, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon Circle */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 ${phase.done ? 'bg-green-500 text-white' : 'bg-white text-slate-400'} md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
              {phase.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </div>
            {/* Card Content */}
            <div className="w-[calc(100%-4rem)] md:w-[45%] bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-slate-50 rounded-xl">{phase.icon}</div>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${phase.done ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {phase.status}
                </span>
              </div>
              <h4 className="font-black text-slate-800 mb-1">{phase.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{phase.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}