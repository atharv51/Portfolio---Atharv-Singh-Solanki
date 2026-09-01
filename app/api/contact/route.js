import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const website = typeof body.website === 'string' ? body.website.trim() : ''
    if (website) return NextResponse.json({ ok: true })
    if (name.length < 2 || name.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || message.length < 10 || message.length > 5000) return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
    if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: 'Email delivery is not configured yet.' }, { status: 503 })
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({ from: process.env.CONTACT_FROM_EMAIL || 'Portfolio contact <onboarding@resend.dev>', to: process.env.CONTACT_TO_EMAIL || 'atharv@example.com', replyTo: email, subject: `Portfolio message from ${name}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` })
    if (error) return NextResponse.json({ error: 'Unable to send message.' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
}
