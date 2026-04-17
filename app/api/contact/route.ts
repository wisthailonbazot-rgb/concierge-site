import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, condo, message } = body;

    if (!name || !phone || !condo || !message) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    // If RESEND_API_KEY is configured, send the email
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "site@conciergebrasil.com.br",
          to: ["conciergeconservacao@gmail.com"],
          subject: `Novo orçamento: ${condo} — ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #060D2E; padding: 24px; border-radius: 12px 12px 0 0;">
                <h1 style="color: #F5A800; margin: 0; font-size: 22px;">Nova Solicitação de Orçamento</h1>
                <p style="color: #ffffff80; margin: 8px 0 0; font-size: 14px;">Concierge Brasil — Site Institucional</p>
              </div>
              <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: bold; color: #0F1D5C; width: 140px;">Nome:</td>
                    <td style="padding: 12px 0; color: #374151;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: bold; color: #0F1D5C;">Telefone:</td>
                    <td style="padding: 12px 0; color: #374151;">${phone}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: bold; color: #0F1D5C;">Condomínio:</td>
                    <td style="padding: 12px 0; color: #374151;">${condo}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #0F1D5C; vertical-align: top;">Mensagem:</td>
                    <td style="padding: 12px 0; color: #374151; white-space: pre-wrap;">${message}</td>
                  </tr>
                </table>
                <div style="margin-top: 24px; padding: 16px; background: #FFF8E7; border-left: 4px solid #F5A800; border-radius: 4px;">
                  <p style="margin: 0; color: #92400e; font-size: 13px;">
                    ⚡ Entre em contato com o cliente o mais rápido possível para garantir o fechamento do contrato.
                  </p>
                </div>
              </div>
            </div>
          `,
        }),
      });

      if (!emailRes.ok) {
        console.error("Resend error:", await emailRes.text());
      }
    } else {
      // Log to console if no email service configured
      console.log("New contact form submission:", { name, phone, condo, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
