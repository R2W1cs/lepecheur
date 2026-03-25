import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, date, time } = body;

    if (!name || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await redis.lpush('reservations', JSON.stringify({
      ...body,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      status: 'pending',
    }));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
  }
}
