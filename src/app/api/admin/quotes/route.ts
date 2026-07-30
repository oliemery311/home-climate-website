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
ORDER BY created_at DESC
LIMIT 100
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