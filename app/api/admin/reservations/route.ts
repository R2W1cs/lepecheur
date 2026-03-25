import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const dynamic = 'force-dynamic';

const BLOB_KEY = 'reservations.json';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (!process.env.ADMIN_PASSWORD || key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length === 0) return NextResponse.json({ reservations: [] });

    const res = await fetch(blobs[0].url);
    const reservations = await res.json();
    return NextResponse.json({ reservations });
  } catch (err: any) {
    return NextResponse.json({ reservations: [], error: err.message }, { status: 503 });
  }
}
