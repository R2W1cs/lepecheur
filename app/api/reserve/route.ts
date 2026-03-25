import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const FILE = path.join(process.cwd(), 'data', 'reservations.json');

function readAll() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf-8')); }
  catch { return []; }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, date, time } = body;

    if (!name || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const reservation = {
      ...body,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    const all = readAll();
    all.unshift(reservation);
    fs.writeFileSync(FILE, JSON.stringify(all, null, 2));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
  }
}
