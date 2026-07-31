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
SELECT
id,
reference_number,
status,
lead_score,
lead_temperature,
name,
email,
postcode,
created_at
FROM quote_requests
ORDER BY
CASE status
    WHEN 'NEW' THEN 1
    WHEN 'CONTACTED' THEN 2
    WHEN 'SITE VISIT' THEN 3
    WHEN 'QUOTED' THEN 4
    WHEN 'WON' THEN 5
    WHEN 'LOST' THEN 6
    WHEN 'ARCHIVED' THEN 7
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