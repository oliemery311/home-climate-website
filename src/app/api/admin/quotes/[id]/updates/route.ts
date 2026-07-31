import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const db = getDB();

    const updates =
        await db
            .prepare(
                `
SELECT *
FROM quote_updates
WHERE quote_id = ?
ORDER BY created_at DESC
`
            )
            .bind(id)
            .all();

    return NextResponse.json(
        updates.results
    );

}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const body = await request.json() as {
        status: string;
        note: string;
        customerVisible: boolean;
    };

    const db = getDB();

    await db
        .prepare(
            `
INSERT INTO quote_updates
(
quote_id,
status,
note,
customer_visible
)
VALUES
(
?,
?,
?,
?
)
`
        )
        .bind(
            id,
            body.status,
            body.note,
            body.customerVisible ? 1 : 0
        )
        .run();

    await db
        .prepare(
            `
UPDATE quote_requests
SET
status = ?,
updated_at = CURRENT_TIMESTAMP
WHERE id = ?
`
        )
        .bind(
            body.status,
            id
        )
        .run();

    return NextResponse.json({
        success: true
    });

}