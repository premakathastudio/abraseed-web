'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Info, Users, ArrowLeft } from 'lucide-react';

export default function V2Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Monitoring', path: '/v2', icon: <LayoutDashboard size={20} /> },
    { name: 'Roadmap', path: '/v2/roadmap', icon: <Map size={20} /> },
    { name: 'About Project', path: '/v2/about', icon: <Info size={20} /> },
    { name: 'Our Team', path: '/v2/team', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F0F7F2]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1b4d2c] text-white flex flex-col shadow-2xl fixed h-full">
        <div className="p-8">
          <h1 className="text-2xl font-black tracking-tighter">
            ABRA<span className="text-green-400">SEED</span>
            <span className="block text-[10px] tracking-[0.2em] text-green-200 opacity-60 uppercase font-light">Version 2.0</span>
          </h1>
        </div>

        <nav className="flex-1 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'hover:bg-green-800/50 text-green-100'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-green-400 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className="font-bold text-sm tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-green-800">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-green-300 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to v1.0
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}