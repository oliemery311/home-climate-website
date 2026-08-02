import { Resend } from "resend";

export async function sendQuoteEmails(
    reference: string,
    quote: {
        name?: string;
        email?: string;
        phone?: string;
        postcode?: string;
        address?: string;

        propertyType?: string;
        roomType?: string;

        numberOfUnits?: number;

        roomDimensions?: string;

        existingAc?: string;

        preferredManufacturer?: string;

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
          We'll review your request and get back to you shortly. You can check on the status of your request by visiting the following link: https://homeclimatesystems.co.uk/check-status and entering your reference number and postcode.
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

<hr>

<h3>Customer Details</h3>

<p><strong>Name:</strong> ${quote.name ?? "Not supplied"}</p>
<p><strong>Email:</strong> ${quote.email ?? "Not supplied"}</p>
<p><strong>Phone:</strong> ${quote.phone ?? "Not supplied"}</p>
<p><strong>Postcode:</strong> ${quote.postcode ?? "Not supplied"}</p>
<p><strong>Address:</strong> ${quote.address ?? "Not supplied"}</p>

<hr>

<h3>Installation Details</h3>

<p><strong>Property Type:</strong> ${quote.propertyType ?? "Not supplied"}</p>

<p><strong>Room Type:</strong> ${quote.roomType ?? "Not supplied"}</p>

<p><strong>Indoor Units:</strong> ${quote.numberOfUnits ?? "Not supplied"}</p>

<p><strong>Room Dimensions:</strong> ${quote.roomDimensions ?? "Not supplied"}</p>

<p><strong>Existing AC:</strong> ${quote.existingAc ?? "Not supplied"}</p>

<p><strong>Preferred Manufacturer:</strong> ${quote.preferredManufacturer ?? "Not supplied"}</p>

<hr>

<h3>Budget & Timing</h3>

<p><strong>Budget:</strong> ${quote.budgetRange ?? "Not supplied"}</p>

<p><strong>Timeframe:</strong> ${quote.timeframe ?? "Not supplied"}</p>

<hr>

<h3>Notes</h3>

<p>${quote.notes ?? "No notes provided"}</p>
`,
    });
}