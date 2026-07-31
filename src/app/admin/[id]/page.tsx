"use client";

import { useEffect, useState } from "react";

export default function QuotePage(
    {
        params
    }: {
        params: Promise<{ id: string }>
    }
) {

    const [quote, setQuote] =
        useState<any>(null);

    const [uploads, setUploads] =
        useState<any[]>([]);

    useEffect(() => {

        async function load() {

            const { id } =
                await params;

            const response =
                await fetch(
                    `/api/admin/quotes/${id}`
                );

            const data = await response.json() as {
                quote: any;
                uploads: any[];
            };

            setQuote(data.quote);
            setUploads(data.uploads);

        }

        load();

    }, [params]);

    if (!quote) {

        return (
            <div className="p-8">
                Loading...
            </div>
        );

    }

    return (

        <main className="mx-auto max-w-5xl p-8">

            <h1 className="text-3xl font-bold">

                {quote.reference_number}

            </h1>

            <div className="mt-8">

                <h2 className="font-semibold">
                    Customer
                </h2>

                <p>{quote.name}</p>
                <p>{quote.email}</p>
                <p>{quote.phone}</p>

            </div>
            <div className="mt-10">

                <h2 className="text-xl font-semibold">
                    Uploaded Photos
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">

                    {uploads.map((upload) => (

                        <a
                            key={upload.id}
                            href={`/api/admin/image/${upload.id}`}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <img
                                src={`/api/admin/image/${upload.id}`}
                                alt={upload.filename}
                                className="h-40 w-full rounded border object-cover"
                            />

                        </a>

                    ))}

                </div>

            </div>
        </main>

    );

}