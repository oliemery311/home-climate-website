import { NextResponse } from "next/server";

import { getDB } from "@/lib/db";

export async function GET() {

    try {

        const db =
            getDB();

        const result =
            await db
                .prepare(
                    `
SELECT *
FROM quote_requests
ORDER BY
CASE status
    WHEN 'NEW' THEN 1
    WHEN 'CONTACTED' THEN 2
    WHEN 'SITE_VISIT_BOOKED' THEN 3
    WHEN 'SITE_VISIT_COMPLETE' THEN 4
    WHEN 'QUOTED' THEN 5
    WHEN 'WAITING_FOR_CUSTOMER' THEN 6
    WHEN 'WON' THEN 7
    WHEN 'LOST' THEN 8
    WHEN 'CLOSED' THEN 9
    ELSE 99
END,
created_at DESC
`
                )
                .all();

        return NextResponse.json(
            result.results
        );

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error:
                    "Unable to load quotes"
            },
            {
                status: 500
            }
        );

    }

}