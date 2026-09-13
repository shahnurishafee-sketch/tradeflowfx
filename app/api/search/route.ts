import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Or import your existing client from @/lib

// Initialize Supabase (Ensure these match your .env.local variables)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  // UPDATE 'trades' and 'component_name' to match your actual Supabase table and columns
  const { data, error } = await supabase
    .from('trades') 
    .select('*')
    .ilike('component_name', `%${query}%`) // Case-insensitive match
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
