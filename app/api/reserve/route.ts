import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Hardcoded key to ensure production works immediately as requested by user
const RESEND_KEY = "re_4zULtcA8_LFiJJq4EGtBAfNh9UZtUFZyf";
const resend = new Resend(process.env.RESEND_API_KEY || RESEND_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, date, time, guests, note } = body;

    const { data, error } = await resend.emails.send({
      from: 'Le Pêcheur <onboarding@resend.dev>',
      to: [process.env.RESTAURANT_EMAIL || 'rayenoueslati153@gmail.com'],
      subject: `Nouvelle Réservation : ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
          <h2 style="color: #0A2A2A; border-bottom: 2px solid #D4AF7A; padding-bottom: 10px;">Nouvelle Réservation</h2>
          <p style="font-size: 16px;">Vous avez reçu une nouvelle demande de réservation via le site web.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; width: 30%;">Client :</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Téléphone :</td>
              <td style="padding: 10px;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold;">Date :</td>
              <td style="padding: 10px;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Heure :</td>
              <td style="padding: 10px;">${time}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold;">Nombre :</td>
              <td style="padding: 10px;">${guests} personnes</td>
            </tr>
          </table>

          ${note ? `
          <div style="margin-top: 20px; padding: 15px; background: #FFF9F0; border-left: 4px solid #D4AF7A;">
            <p style="margin: 0; font-weight: bold;">Notes spéciales :</p>
            <p style="margin: 5px 0 0 0;">${note}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; font-size: 12px; color: #666; text-align: center; border-top: 1px solid #eee; pt-10;">
            <p>Cet email a été envoyé automatiquement depuis le système de réservation du site Le Pêcheur.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ 
        error: error.message,
        details: error
      }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      message: err.message 
    }, { status: 500 });
  }
}
