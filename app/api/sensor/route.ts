import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Memasukkan data lengkap sesuai desain ABRASEED
    const { error } = await supabase
      .from('log_sensor')
      .insert([
        { 
          light_intensity: body.light_intensity,
          plant_height: body.plant_height,
          plant_age: body.plant_age,
          soil_moisture: body.soil_moisture,
          pump_status: body.pump_status,
          system_status: body.system_status
        }
      ]);

    if (error) throw error;
    return NextResponse.json({ message: "Data ABRASEED Berhasil Masuk!" });
  } catch (err) {
    return NextResponse.json({ error: "Gagal simpan" }, { status: 500 });
  }
}

export async function GET() {
  const { data } = await supabase
    .from('log_sensor')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);
  return NextResponse.json(data ? data[0] : {});
}