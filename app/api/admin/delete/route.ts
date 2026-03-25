import { NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

export const dynamic = 'force-dynamic';

const BLOB_KEY = 'reservations.json';

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id, key } = body;

  if (!process.env.ADMIN_PASSWORD || key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing reservation id' }, { status: 400 });
  }

  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length === 0) return NextResponse.json({ success: true });

    const res = await fetch(blobs[0].url);
    const all = await res.json();
    const remaining = all.filter((r: any) => r.id !== id);

    await put(BLOB_KEY, JSON.stringify(remaining), {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Blob error', message: err.message }, { status: 500 });
  }
}
