import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export const dynamic = 'force-dynamic';

const BLOB_KEY = 'reservations.json';

async function readReservations(): Promise<any[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length === 0) return [];
    const res = await fetch(blobs[0].url);
    return await res.json();
  } catch {
    return [];
  }
}

async function writeReservations(data: any[]) {
  await put(BLOB_KEY, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, date, time } = body;

    if (!name || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const all = await readReservations();
    all.unshift({
      ...body,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      status: 'pending',
    });

    await writeReservations(all);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
  }
}
