"use client";

import { useState } from "react";

export default function CheckStatusPage() {
    const [reference, setReference] = useState("");
    const [postcode, setPostcode] = useState("");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    async function lookup() {
        setError("");

        const response = await fetch("/api/customer/lookup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reference,
                postcode,
            }),
        });

        if (!response.ok) {
            setError("Quote not found.");
            return;
        }

        const data = await response.json();
        setResult(data);
    }

    return (
        <main className="mx-auto max-w-4xl p-8">
            <h1 className="text-3xl font-bold">Check Quote Status</h1>

            {!result && (
                <div className="mt-6 space-y-4">
                    <input
                        className="w-full rounded border p-3"
                        placeholder="HCS-000012"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                    />

                    <input
                        className="w-full rounded border p-3"
                        placeholder="Postcode"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />

                    <button
                        onClick={lookup}
                        className="rounded bg-blue-600 px-5 py-3 text-white"
                    >
                        Check Status
                    </button>
                </div>
            )}

            {error && <p className="mt-6 text-red-600">{error}</p>}

            {result && (
                <>
                    <div className="mt-8 rounded border p-6">
                        <h2 className="text-xl font-semibold">Your Details</h2>

                        <div className="mt-4 space-y-2">
                            <p>
                                <strong>Name:</strong> {result.quote.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {result.quote.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {result.quote.phone || "-"}
                            </p>
                            <p>
                                <strong>Address:</strong> {result.quote.address || "-"}
                            </p>
                            <p>
                                <strong>Postcode:</strong> {result.quote.postcode || "-"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 rounded border p-6">
                        <h2 className="text-xl font-semibold">
                            Installation Requirements
                        </h2>

                        <div className="mt-4 space-y-2">
                            <p>
                                <strong>Property Type:</strong> {result.quote.property_type}
                            </p>
                            <p>
                                <strong>Rooms:</strong> {JSON.parse(
                                    result.quote.room_types || "[]"
                                ).join(", ")}
                            </p>
                            <p>
                                <strong>Indoor Units:</strong> {result.quote.number_of_units}
                            </p>
                            <p>
                                <strong>Dimensions:</strong> {result.quote.room_dimensions}
                            </p>
                            <p>
                                <strong>Budget:</strong> {result.quote.budget_range}
                            </p>
                            <p>
                                <strong>Timeframe:</strong> {result.quote.timeframe}
                            </p>
                            <p>
                                <strong>Existing AC:</strong>{" "}
                                {result.quote.existing_ac || "No"}
                            </p>
                            <p>
                                <strong>Notes:</strong>
                            </p>
                            <div className="rounded bg-slate-50 p-3 whitespace-pre-wrap">
                                {result.quote.notes || "None"}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold">
                            {result.quote.reference_number}
                        </h2>

                        <p className="mt-2">
                            Status: <strong>{result.quote.status}</strong>
                        </p>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold">Updates</h3>

                            {result.updates.map((update: any) => (
                                <div
                                    key={update.id}
                                    className="mt-4 rounded border p-4"
                                >
                                    <div className="font-medium">{update.status}</div>
                                    <div className="text-sm text-slate-500">
                                        {update.created_at}
                                    </div>
                                    {update.note && <p className="mt-2">{update.note}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}