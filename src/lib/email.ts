export type SendEmailPayload = {
  name: string;
  email: string;
  reason: string;
  message: string;
  additionalMessage?: string;
};

export async function sendContactEmail(payload: SendEmailPayload) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'delivered@resend.dev';
  const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'; // Resend's default allowed sender if unverified

  if (!RESEND_API_KEY) {
    console.warn("No RESEND_API_KEY found, skipping actual email send but simulating success.");
    return true;
  }

  const html = `
    <h2>New portfolio message from ${payload.name}</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
    <p><strong>Reason:</strong> ${payload.reason}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${payload.message}</p>
    ${
      payload.additionalMessage
        ? `<p><strong>Additional Message:</strong></p><p style="white-space: pre-wrap;">${payload.additionalMessage}</p>`
        : ''
    }
    <p><small>Submitted at: ${new Date().toISOString()}</small></p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      subject: `New portfolio message from ${payload.name}`,
      reply_to: payload.email,
      html: html,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to send email via Resend');
  }

  return true;
}
