import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
    const raw = await kv.lrange('reservations', 0, -1);
    const all = (raw as string[]).map((r) => {
      try { return typeof r === 'string' ? JSON.parse(r) : r; }
      catch { return r; }
    });

    const remaining = all.filter((r: any) => r.id !== id);

    await kv.del('reservations');
    if (remaining.length > 0) {
      // rpush keeps newest-first order consistent with lpush on insert
      for (const r of [...remaining].reverse()) {
        await kv.lpush('reservations', JSON.stringify(r));
      }
    }

    return NextResponse.json({ success: true, remaining: remaining.length });
  } catch (err: any) {
    console.error('Delete Error:', err);
    return NextResponse.json({ error: 'Database error', message: err.message }, { status: 500 });
  }
}
