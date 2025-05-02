export async function onRequestPost({ request, env }: { request: Request; env: Record<string, string> }) {
  const { message, contact } = await request.json();

  if (!message || message.length < 4) {
    return new Response("Message too short", { status: 400 });
  }

  const subject = `New Feedback from tylerwoodfin.com`;
  const emailBody = `
Message:
${message}

Contact Info:
${contact || "Not provided"}
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FEEDBACK_EMAIL_FROM,
      to: env.FEEDBACK_EMAIL_TO,
      subject,
      text: emailBody,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Resend error:", error);
    return new Response("Failed to send email", { status: 500 });
  }

  return new Response("Feedback received", { status: 200 });
}
