"use client";

import MonitoringSection from './v2/monitoring/component/MonitoringSection'; // Sesuaikan path ini
import Navbar from './v2/components/Navbar'; // Gunakan Navbar v2

export default function MainDashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar /> 
      <div className="pt-20">
        <MonitoringSection />
      </div>
    </main>
  );
}