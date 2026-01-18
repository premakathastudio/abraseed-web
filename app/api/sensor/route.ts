import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Sesuaikan variabel dengan nama baru: tinggi_air, intensitas_cahaya, kondisi_pompa
    const { error } = await supabase
      .from('monitoring') // Pastikan nama tabel adalah 'monitoring' sesuai langkah Supabase tadi
      .insert([
        { 
          tinggi_air: body.tinggi_air,
          intensitas_cahaya: body.intensitas_cahaya,
          kondisi_pompa: body.kondisi_pompa
          // Hapus kolom lama yang tidak digunakan agar tidak terjadi error 404
        }
      ]);

    if (error) throw error;
    return NextResponse.json({ message: "Data Baru ABRASEED Berhasil Masuk!" });
  } catch (err) {
    console.error(err); // Menambahkan log error agar mudah di-debug di Vercel
    return NextResponse.json({ error: "Gagal simpan ke database" }, { status: 500 });
  }
}

export async function GET() {
  const { data } = await supabase
    .from('monitoring') // Sesuaikan nama tabel
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);
  return NextResponse.json(data ? data[0] : {});
}