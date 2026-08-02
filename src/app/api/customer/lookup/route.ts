import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import crypto from "crypto";

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
    const token = crypto.randomUUID();

    const expires =
        new Date(
            Date.now() + 1000 * 60 * 60
        ).toISOString();


    await db
        .prepare(
            `
        INSERT INTO customer_sessions
        (
            quote_id,
            token,
            expires_at
        )
        VALUES (?, ?, ?)
        `
        )
        .bind(
            quote.id,
            token,
            expires
        )
        .run();
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

    const response =
        NextResponse.json({
            success: true,
            quote,
            uploads: uploads.results,
            updates: updates.results
        });


    response.cookies.set(
        "customer_session",
        token,
        {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60
        }
    );


    return response;

}