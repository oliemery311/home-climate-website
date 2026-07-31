import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const db = getDB();

    const quote =
        await db
            .prepare(
                `
SELECT *
FROM quote_requests
WHERE id = ?
`
            )
            .bind(id)
            .first();

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
            .bind(id)
            .all();

    return NextResponse.json({
        quote,
        uploads: uploads.results
    });

}