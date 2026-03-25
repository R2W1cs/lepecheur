import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

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
    const raw = await kv.lrange<string>('reservations', 0, -1);
    const all = raw.map((r) => { try { return typeof r === 'string' ? JSON.parse(r) : r; } catch { return r; } });
    const remaining = all.filter((r: any) => r.id !== id);

    await kv.del('reservations');
    for (const r of [...remaining].reverse()) {
      await kv.lpush('reservations', JSON.stringify(r));
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'KV error', message: err.message }, { status: 500 });
  }
}
