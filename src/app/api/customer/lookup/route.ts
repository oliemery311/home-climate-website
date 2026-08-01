import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(
    request: NextRequest
) {

    const body: {
        reference: string;
        postcode: string;
    } = await request.json();

    const db = getDB();

    const quote =
        await db
            .prepare(
                `
SELECT *
FROM quote_requests
WHERE reference_number = ?
AND postcode = ?
`
            )
            .bind(
                body.reference.trim(),
                body.postcode.trim()
            )
            .first();

    if (!quote) {

        return NextResponse.json(
            {
                success: false
            },
            {
                status: 404
            }
        );

    }

    const uploads =
        await db
            .prepare(
                `
SELECT *
FROM file_uploads
WHERE quote_id = ?
ORDER BY uploaded_at DESC
`
            )
            .bind(quote.id)
            .all();

    const updates =
        await db
            .prepare(
                `
SELECT *
FROM quote_updates
WHERE quote_id = ?
AND customer_visible = 1
ORDER BY created_at DESC
`
            )
            .bind(quote.id)
            .all();

    return NextResponse.json({
        success: true,
        quote,
        uploads: uploads.results,
        updates: updates.results
    });

}