import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY || "re_4zULtcA8_LFiJJq4EGtBAfNh9UZtUFZyf";
  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, phone, date, time, guests, note } = body;

    if (!name || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Persist in Redis so the staff dashboard can list all reservations
    try {
      await redis.lpush('reservations', JSON.stringify({
        ...body,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
        status: 'pending',
      }));
    } catch (redisError) {
      console.warn('Redis unavailable — reservation stored in email only:', redisError);
    }

    // Email notification to restaurant
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.RESTAURANT_EMAIL || 'rayenoueslati153@gmail.com'],
      subject: `🎣 Nouvelle Réservation — ${name} (${date} à ${time})`,
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#F7F3E8;border-radius:16px;overflow:hidden;">

          <div style="background:#0A2A2A;padding:32px;text-align:center;">
            <h1 style="color:#D4AF7A;margin:0;font-size:24px;letter-spacing:3px;">LE PÊCHEUR</h1>
            <p style="color:rgba(247,243,232,0.55);margin:8px 0 0;font-size:11px;letter-spacing:5px;text-transform:uppercase;">Nouvelle Réservation</p>
          </div>

          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
              <tr style="background:#F7F3E8;">
                <td style="padding:14px 20px;font-weight:700;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;width:35%;">Client</td>
                <td style="padding:14px 20px;font-size:15px;color:#0A2A2A;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:14px 20px;font-weight:700;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Téléphone</td>
                <td style="padding:14px 20px;"><a href="tel:${phone}" style="color:#2C6E5C;font-size:17px;font-weight:700;text-decoration:none;">${phone}</a></td>
              </tr>
              <tr style="background:#F7F3E8;">
                <td style="padding:14px 20px;font-weight:700;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Date</td>
                <td style="padding:14px 20px;font-size:15px;color:#0A2A2A;font-weight:600;">${date}</td>
              </tr>
              <tr>
                <td style="padding:14px 20px;font-weight:700;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Heure</td>
                <td style="padding:14px 20px;font-size:15px;color:#0A2A2A;font-weight:600;">${time}</td>
              </tr>
              <tr style="background:#F7F3E8;">
                <td style="padding:14px 20px;font-weight:700;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Personnes</td>
                <td style="padding:14px 20px;font-size:15px;color:#0A2A2A;font-weight:600;">${guests} personne${parseInt(guests) > 1 ? 's' : ''}</td>
              </tr>
            </table>

            ${note ? `
            <div style="margin-top:20px;padding:18px 20px;background:#FFF9F0;border-left:4px solid #D4AF7A;border-radius:0 8px 8px 0;">
              <p style="margin:0 0 5px;font-weight:700;font-size:12px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Demande spéciale</p>
              <p style="margin:0;color:#0A2A2A;font-size:15px;">${note}</p>
            </div>
            ` : ''}

            <table style="width:100%;margin-top:24px;border-spacing:8px;border-collapse:separate;">
              <tr>
                <td style="width:50%;">
                  <a href="tel:${phone}" style="display:block;text-align:center;background:#0A2A2A;color:white;padding:14px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
                    📞 Appeler ${name}
                  </a>
                </td>
                <td style="width:50%;">
                  <a href="https://wa.me/${phone.replace(/[\s\-\+]/g, '')}" style="display:block;text-align:center;background:#25D366;color:white;padding:14px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
                    💬 WhatsApp
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <div style="padding:18px 32px;background:#0A2A2A;text-align:center;">
            <p style="margin:0;color:rgba(247,243,232,0.35);font-size:11px;">
              Envoyé automatiquement — lepecheur.tn
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
  }
}
