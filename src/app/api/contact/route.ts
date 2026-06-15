import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nome, email, assunto, mensagem } = body as Record<string, string>;

  // Server-side validation
  if (!nome?.trim() || !email?.trim() || !assunto?.trim() || !mensagem?.trim()) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.CONTACT_EMAIL;

  if (!apiKey || !destination) {
    console.error("Missing RESEND_API_KEY or CONTACT_EMAIL in environment variables.");
    return NextResponse.json(
      { error: "not_configured" },
      { status: 503 }
    );
  }

  const html = `
    <h2 style="color:#543286">Nova mensagem — Ponto Fly</h2>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong></p>
    <p style="white-space:pre-wrap">${mensagem}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ponto Fly <onboarding@resend.dev>",
      to: [destination],
      reply_to: email,
      subject: `[Ponto Fly] ${assunto}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => res.text());
    console.error("Resend error:", JSON.stringify(err));
    return NextResponse.json(
      { error: "Não foi possível enviar a mensagem. Tenta novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
