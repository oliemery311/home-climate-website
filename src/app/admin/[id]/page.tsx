"use client";

import { useEffect, useState } from "react";

type QuoteUpdate = {
    id: number;
    status: string;
    note: string;
    customer_visible: number;
    created_at: string;
};

function statusClass(status: string) {

    switch (status) {

        case "NEW":
            return "bg-red-100 text-red-800";

        case "CONTACTED":
            return "bg-[var(--hcs-orange-light)]/30 text-[var(--hcs-orange)]";

        case "SITE_VISIT_BOOKED":
            return "bg-yellow-100 text-yellow-800";

        case "SITE_VISIT_COMPLETE":
            return "bg-[var(--hcs-blue-light)]/20 text-[var(--hcs-blue)]";

        case "QUOTED":
            return "bg-indigo-100 text-indigo-800";

        case "WAITING_FOR_CUSTOMER":
            return "bg-purple-100 text-purple-800";

        case "WON":
            return "bg-green-100 text-green-800";

        case "LOST":
            return "bg-slate-200 text-slate-700";

        case "CLOSED":
            return "bg-slate-300 text-slate-800";

        default:
            return "bg-slate-100 text-slate-700";

    }

}

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

    const [updates, setUpdates] =
        useState<QuoteUpdate[]>([]);

    const [status, setStatus] =
        useState("CONTACTED");

    const [note, setNote] =
        useState("");

    const [customerVisible, setCustomerVisible] =
        useState(false);

    async function load() {

        const { id } =
            await params;

        const quoteResponse =
            await fetch(
                `/api/admin/quotes/${id}`
            );

        const quoteData = await quoteResponse.json() as {
            quote: any;
            uploads: any[];
        };

        setQuote(
            quoteData.quote
        );

        setUploads(
            quoteData.uploads
        );

        const updatesResponse =
            await fetch(
                `/api/admin/quotes/${id}/updates`
            );

        const updatesData =
            await updatesResponse.json() as QuoteUpdate[];

        setUpdates(
            updatesData
        );

    }

    useEffect(() => {
        load();
    }, []);

    async function addUpdate() {

        const { id } =
            await params;

        await fetch(
            `/api/admin/quotes/${id}/updates`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    status,
                    note,
                    customerVisible
                })
            }
        );

        setNote("");

        await load();

    }

    if (!quote) {

        return (
            <div className="p-8">
                Loading...
            </div>
        );

    }

    return (

        <main className="mx-auto max-w-6xl p-8">

            <h1 className="text-3xl font-bold">
                {quote.reference_number}
            </h1>

            <p className="mt-2 text-slate-600">
                Current status:
                {" "}
                <strong>
                    <span
                        className={`rounded px-2 py-1 text-sm font-medium ${statusClass(
                            quote.status
                        )}`}
                    >
                        {quote.status}
                    </span>
                </strong>
            </p>

            <div className="mt-8">

                <h2 className="text-xl font-semibold">
                    Customer
                </h2>

                <div className="mt-4 rounded border p-4">

                    <p>
                        <strong>Name:</strong> {quote.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {quote.email}
                    </p>

                    <p>
                        <strong>Phone:</strong> {quote.phone || "-"}
                    </p>

                    <p>
                        <strong>Postcode:</strong> {quote.postcode || "-"}
                    </p>

                    <p>
                        <strong>Address:</strong> {quote.address || "-"}
                    </p>

                </div>

            </div>

            <div className="mt-10">

                <h2 className="text-xl font-semibold">
                    Installation Requirements
                </h2>

                <div className="mt-4 rounded border p-4 space-y-2">

                    <p>
                        <strong>Property Type:</strong>{" "}
                        {quote.property_type || "-"}
                    </p>

                    <p>
                        <strong>Rooms:</strong>{" "}
                        {quote.room_types
                            ? JSON.parse(quote.room_types).join(", ")
                            : "-"}
                    </p>

                    <p>
                        <strong>Number of Units:</strong>{" "}
                        {quote.number_of_units || "-"}
                    </p>

                    <p>
                        <strong>Room Dimensions:</strong>{" "}
                        {quote.room_dimensions || "-"}
                    </p>

                    <p>
                        <strong>Existing AC:</strong>{" "}
                        {quote.existing_ac || "No"}
                    </p>

                    <p>
                        <strong>Preferred Manufacturer:</strong>{" "}
                        {quote.preferred_manufacturer || "-"}
                    </p>

                    <p>
                        <strong>Budget:</strong>{" "}
                        {quote.budget_range || "-"}
                    </p>

                    <p>
                        <strong>Timeframe:</strong>{" "}
                        {quote.timeframe || "-"}
                    </p>

                    <p>
                        <strong>Lead Score:</strong>{" "}
                        {quote.lead_score}
                    </p>

                    <p>
                        <strong>Lead Temperature:</strong>{" "}
                        {quote.lead_temperature}
                    </p>

                    <div className="pt-2">

                        <strong>Customer Notes:</strong>

                        <div className="mt-2 rounded bg-slate-50 p-3 whitespace-pre-wrap">
                            {quote.notes || "No notes provided"}
                        </div>

                    </div>

                </div>

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

            <div className="mt-10">

                <h2 className="text-xl font-semibold">
                    Add Update
                </h2>

                <select
                    className="mt-4 w-full rounded border p-3"
                    value={status}
                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }
                >

                    <option>NEW</option>
                    <option>CONTACTED</option>
                    <option>SITE_VISIT_BOOKED</option>
                    <option>SITE_VISIT_COMPLETE</option>
                    <option>QUOTED</option>
                    <option>WAITING_FOR_CUSTOMER</option>
                    <option>WON</option>
                    <option>LOST</option>
                    <option>CLOSED</option>

                </select>

                <textarea
                    className="mt-4 w-full rounded border p-3"
                    rows={5}
                    value={note}
                    onChange={(e) =>
                        setNote(
                            e.target.value
                        )
                    }
                    placeholder="Add note..."
                />

                <label className="mt-4 flex items-center gap-2">

                    <input
                        type="checkbox"
                        checked={customerVisible}
                        onChange={(e) =>
                            setCustomerVisible(
                                e.target.checked
                            )
                        }
                    />

                    Visible to customer

                </label>

                <button
                    onClick={addUpdate}
                    className="mt-4 rounded bg-blue-600 px-5 py-3 text-white"
                >
                    Add Update
                </button>

            </div>

            <div className="mt-10">

                <h2 className="text-xl font-semibold">
                    Timeline
                </h2>

                <div className="mt-4 space-y-4">

                    {updates.map((update) => (

                        <div
                            key={update.id}
                            className="rounded border p-4"
                        >

                            <div className="flex justify-between">

                                <strong>
                                    {update.status}
                                </strong>

                                <span className="text-sm text-slate-500">
                                    {update.created_at}
                                </span>

                            </div>

                            {update.note && (

                                <p className="mt-2">
                                    {update.note}
                                </p>

                            )}

                            {update.customer_visible === 1 && (

                                <div className="mt-2 text-sm text-green-600">
                                    Visible to customer
                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </main>

    );

}