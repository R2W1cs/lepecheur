import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (!process.env.ADMIN_PASSWORD || key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const raw = await redis.lrange('reservations', 0, -1);
    const reservations = raw.map((r) => {
      try { return JSON.parse(r); }
      catch { return r; }
    });
    reservations.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ reservations });
  } catch (err: any) {
    console.error('Redis Error:', err);
    return NextResponse.json({ reservations: [], error: err.message }, { status: 503 });
  }
}
