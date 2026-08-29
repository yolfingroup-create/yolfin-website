export interface EmailPayload {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}

export async function sendEmailViaBrevo(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "yolfingroup@gmail.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Yolfin Group";

  if (!apiKey) {
    console.warn("[Brevo API] Warning: BREVO_API_KEY not configured. Email will be logged only.");
    console.log("[Brevo Payload]", payload);
    return { success: false, error: "BREVO_API_KEY not configured" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: payload.to,
        subject: payload.subject,
        htmlContent: payload.htmlContent,
        replyTo: payload.replyTo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[Brevo Error]", response.status, errorData);
      return { success: false, error: `Brevo API returned status ${response.status}` };
    }

    const data = await response.json();
    return { success: true, messageId: data.messageId };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("[Brevo Exception]", errorMessage);
    return { success: false, error: errorMessage };
  }
}
