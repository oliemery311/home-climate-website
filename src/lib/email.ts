import { Resend } from "resend";

export async function sendQuoteEmails(
  reference: string,
  quote: {
    name?: string;
    email?: string;
    phone?: string;
    postcode?: string;
    propertyType?: string;
    budgetRange?: string;
    timeframe?: string;
    notes?: string;
  },
) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY missing");
  }

  const resend = new Resend(apiKey);

  // Customer confirmation

  if (quote.email) {
    await resend.emails.send({
      from: "Home Climate Systems <info@homeclimatesystems.co.uk>",
      to: quote.email,
      subject: `Quote request received - ${reference}`,
      html: `
        <h2>Thank you for contacting Home Climate Systems</h2>

        <p>We've received your enquiry.</p>

        <p>
          <strong>Reference:</strong>
          ${reference}
        </p>

        <p>
          We'll review your request and get back to you shortly.
        </p>

        <p>
          Home Climate Systems<br />
          Leicester & Midlands
        </p>
      `,
    });
  }

  // Business notification

  await resend.emails.send({
    from: "Home Climate Systems <info@homeclimatesystems.co.uk>",
    to: "info@homeclimatesystems.co.uk",
    subject: `New Quote Request - ${reference}`,
    html: `
      <h2>New Quote Request</h2>

      <p><strong>Reference:</strong> ${reference}</p>

      <p><strong>Name:</strong> ${quote.name ?? ""}</p>
      <p><strong>Email:</strong> ${quote.email ?? ""}</p>
      <p><strong>Phone:</strong> ${quote.phone ?? ""}</p>
      <p><strong>Postcode:</strong> ${quote.postcode ?? ""}</p>

      <hr />

      <p><strong>Property:</strong> ${quote.propertyType ?? ""}</p>
      <p><strong>Budget:</strong> ${quote.budgetRange ?? ""}</p>
      <p><strong>Timeframe:</strong> ${quote.timeframe ?? ""}</p>

      <p><strong>Notes:</strong></p>

      <p>${quote.notes ?? ""}</p>
    `,
  });
}