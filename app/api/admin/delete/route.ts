import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const FILE = path.join(process.cwd(), 'data', 'reservations.json');

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
    const all = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
    const remaining = all.filter((r: any) => r.id !== id);
    fs.writeFileSync(FILE, JSON.stringify(remaining, null, 2));
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'File error', message: err.message }, { status: 500 });
  }
}
