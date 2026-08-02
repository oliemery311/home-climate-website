import { NextRequest } from "next/server";
import { getDB } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const token =
        request.cookies.get(
            "customer_session"
        )?.value;

    if (!token) {
        return new Response(
            "Unauthorized",
            {
                status: 401
            }
        );
    }

    const db = getDB();

    const session =
        await db
            .prepare(
                `
                SELECT *
                FROM customer_sessions
                WHERE token = ?
                AND expires_at > datetime('now')
                `
            )
            .bind(token)
            .first();

    if (!session) {
        return new Response(
            "Unauthorized",
            {
                status: 401
            }
        );
    }

    const file =
        await db
            .prepare(
                `
                SELECT *
                FROM file_uploads
                WHERE id = ?
                AND quote_id = ?
                `
            )
            .bind(
                id,
                session.quote_id
            )
            .first();

    if (!file) {
        return new Response(
            "Not found",
            {
                status: 404
            }
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
            {
                status: 404
            }
        );
    }

    return new Response(
        object.body,
        {
            headers: {
                "Content-Type":
                    file.mime_type as string,

                "Cache-Control":
                    "private, max-age=300"
            }
        }
    );
}