import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'genovese.edo4rdo@gmail.com',
    subject: `New message from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #111">New portfolio message</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <hr style="border: 1px solid #eee; margin: 20px 0" />
        <p style="color: #444; line-height: 1.6">${message.replace(/\n/g, '<br>')}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0" />
        <p style="color: #999; font-size: 12px">Sent from your portfolio contact form</p>
      </div>
    `,
    replyTo: email,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
