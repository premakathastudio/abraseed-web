import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function HistoryPage() {
  // 1. Update Query: Memanggil tabel 'monitoring' dan kolom baru
  const { data: logs } = await supabase
    .from('monitoring')
    .select('created_at, intensitas_cahaya, tinggi_air, kondisi_pompa')
    .order('created_at', { ascending: false })
    .limit(30);

  return (
    <main className="min-h-screen bg-[#E2F5E9] p-6 text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-[#1b4d2c] font-bold hover:underline">
            ⬅ BACK TO DASHBOARD
          </Link>
          <h1 className="text-2xl font-black text-[#1b4d2c] uppercase">Abraseed History Logs</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-green-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1b4d2c] text-white text-xs uppercase">
                  <th className="p-4">Time (WIB)</th>
                  <th className="p-4">Light (Lux)</th>
                  <th className="p-4">Water Level (cm)</th>
                  <th className="p-4">Pump Status</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium divide-y divide-gray-100">
                {logs?.map((log, i) => (
                  <tr key={i} className="hover:bg-green-50">
                    <td className="p-4">
                      {new Date(log.created_at).toLocaleTimeString('id-ID', { 
                        timeZone: 'Asia/Jakarta',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </td>
                    <td className="p-4 text-green-700 font-bold">
                      {log.intensitas_cahaya} Lux
                    </td>
                    <td className="p-4 text-blue-600 font-bold">
                      {log.tinggi_air} cm
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded font-bold ${
                        log.kondisi_pompa === 'ON' || log.kondisi_pompa === 'HIDUP' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                      }`}>
                        {log.kondisi_pompa}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}