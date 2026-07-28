import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareEnv } from "@/lib/db";

export async function POST(
    request: NextRequest
) {
    try {

        const formData =
            await request.formData();

        const file =
            formData.get("file");

        const reference =
            formData.get("reference");

        const quoteId =
            formData.get("quoteId");

        if (
            !(file instanceof File)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No file provided"
                },
                {
                    status: 400
                }
            );
        }

        const { env } =
            getCloudflareContext();
        const cfEnv =
            env as unknown as CloudflareEnv;
        const extension =
            file.name.split(".").pop();

        const key =
            `quote-uploads/${reference}/${crypto.randomUUID()}.${extension}`;

        await cfEnv.UPLOADS.put(
            key,
            await file.arrayBuffer(),
            {
                httpMetadata: {
                    contentType: file.type
                }
            }
        );

        return NextResponse.json({
            success: true,
            key,
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            quoteId
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: "Upload failed"
            },
            {
                status: 500
            }
        );

    }
}