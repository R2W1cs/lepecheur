import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

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
    const raw = await redis.lrange('reservations', 0, -1);
    const all = raw.map((r) => { try { return JSON.parse(r); } catch { return r; } });
    const remaining = all.filter((r: any) => r.id !== id);

    await redis.del('reservations');
    for (const r of [...remaining].reverse()) {
      await redis.lpush('reservations', JSON.stringify(r));
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Redis error', message: err.message }, { status: 500 });
  }
}
