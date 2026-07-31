import { NextRequest } from "next/server";
import { getDB } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const db = getDB();

    const file =
        await db
            .prepare(
                `
SELECT *
FROM file_uploads
WHERE id = ?
`
            )
            .bind(id)
            .first();

    if (!file) {

        return new Response(
            "Not found",
            { status: 404 }
        );

    }

    const { env } =
        getCloudflareContext();

    const object =
        await env.UPLOADS.get(
            file.r2_key as string
        );

    if (!object) {

        return new Response(
            "Not found",
            { status: 404 }
        );

    }

    return new Response(
        object.body,
        {
            headers: {
                "Content-Type":
                    file.mime_type as string
            }
        }
    );

}