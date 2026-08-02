"use client";

import {
    useEffect,
    useState
} from "react";
import Link from "next/link";

interface Quote {

    id: number;

    reference_number: string;

    status: string;

    lead_score: number;

    lead_temperature: string;

    name: string;

    email: string;

    postcode: string;

    created_at: string;

}

export default function AdminPage() {

    const [quotes, setQuotes] =
        useState<Quote[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function loadQuotes() {

        try {

            const response =
                await fetch(
                    "/api/admin/quotes"
                );

            const data =
                await response.json();

            setQuotes(data as Quote[]);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadQuotes();

    }, []);

    return (

        <main className="mx-auto max-w-7xl p-6">

            <h1 className="mb-8 text-3xl font-bold">

                Quote Dashboard

            </h1>

            {loading && (

                <p>
                    Loading...
                </p>

            )}

            {!loading && (

                <div className="overflow-x-auto rounded-xl border">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="p-3 text-left">
                                    Reference
                                </th>

                                <th className="p-3 text-left">
                                    Name
                                </th>

                                <th className="p-3 text-left">
                                    Postcode
                                </th>

                                <th className="p-3 text-left">
                                    Score
                                </th>

                                <th className="p-3 text-left">
                                    Status
                                </th>

                                <th className="p-3 text-left">
                                    Created
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {quotes.map(
                                (quote) => (

                                    <tr
                                        key={quote.id}
                                        className="border-t"
                                    >

                                        <td className="p-3 font-medium">

                                            <Link
                                                href={`/admin/${quote.id}`}
                                                className="text-[var(--hcs-blue)] hover:underline"
                                            >
                                                {quote.reference_number}
                                            </Link>

                                        </td>

                                        <td className="p-3">
                                            {quote.name}
                                        </td>

                                        <td className="p-3">
                                            {quote.postcode}
                                        </td>

                                        <td className="p-3">

                                            <span
                                                className="rounded bg-[var(--hcs-blue-light)]/20 px-2 py-1 text-sm text-[var(--hcs-blue)]"
                                            >
                                                {quote.lead_score}
                                            </span>

                                        </td>

                                        <td className="p-3">

                                            <span
                                                className="rounded bg-green-100 px-2 py-1 text-sm"
                                            >
                                                {quote.status}
                                            </span>

                                        </td>

                                        <td className="p-3 text-sm text-slate-500">
                                            {
                                                new Date(
                                                    quote.created_at
                                                ).toLocaleDateString(
                                                    "en-GB"
                                                )
                                            }
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </main>

    );

}