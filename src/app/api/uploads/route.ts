import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid file type",
                },
                { status: 400 }
            );
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                {
                    success: false,
                    error: "File too large",
                },
                { status: 400 }
            );
        }
        const { env } =
            getCloudflareContext();
        const cfEnv = env;
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

        await cfEnv.DB
            .prepare(
                `
INSERT INTO file_uploads
(
quote_id,
filename,
r2_key,
mime_type,
file_size
)
VALUES
(
?,
?,
?,
?,
?
)
`
            )
            .bind(
                Number(quoteId),
                file.name,
                key,
                file.type,
                file.size
            )
            .run();

        return NextResponse.json({
            success: true
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