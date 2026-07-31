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

        </main>

    );

}