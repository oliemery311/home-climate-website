"use client";

import { useState } from "react";

export default function CheckStatusPage() {
    const [reference, setReference] = useState("");
    const [postcode, setPostcode] = useState("");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

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

    async function uploadFiles() {
        if (!result) {
            return;
        }

        setUploading(true);

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("reference", result.quote.reference_number);
                formData.append("quoteId", String(result.quote.id));

                const response = await fetch("/api/uploads", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Upload failed");
                }
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Unable to upload files");
        } finally {
            setUploading(false);
        }
    }

    const STATUS_STEPS = [
        "NEW",
        "CONTACTED",
        "SITE_VISIT_BOOKED",
        "SITE_VISIT_COMPLETE",
        "QUOTED",
        "INSTALLATION_BOOKED",
        "COMPLETE",
    ];

    const STATUS_LABELS: Record<string, string> = {
        NEW: "Request Received",
        CONTACTED: "Contacted",
        SITE_VISIT_BOOKED: "Site Visit Booked",
        SITE_VISIT_COMPLETE: "Site Visit Complete",
        QUOTED: "Quote Issued",
        INSTALLATION_BOOKED: "Installation Booked",
        COMPLETE: "Installation Complete",
    };

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
                                <strong>Rooms:</strong>{" "}
                                {JSON.parse(
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

                    <div className="mt-8 rounded border p-6">
                        <h2 className="text-xl font-semibold">
                            Upload More Photos
                        </h2>

                        <p className="mt-2 text-sm text-slate-600">
                            Send additional photos if anything has changed or you would like us to review something else.
                        </p>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="mt-4"
                            onChange={(e) =>
                                setFiles(
                                    Array.from(
                                        e.target.files ?? []
                                    )
                                )
                            }
                        />

                        <button
                            onClick={uploadFiles}
                            disabled={
                                uploading ||
                                files.length === 0
                            }
                            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                        >
                            {uploading
                                ? "Uploading..."
                                : "Upload Photos"}
                        </button>
                    </div>

                    <div className="mt-8 rounded border p-6">
                        <h2 className="text-xl font-semibold">
                            Uploaded Photos
                        </h2>

                        {result.uploads?.length === 0 ? (
                            <p className="mt-4 text-slate-500">
                                No photos uploaded.
                            </p>
                        ) : (
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                                {result.uploads?.map(
                                    (upload: any) => (
                                        <img
                                            key={upload.id}
                                            src={`/api/admin/image/${upload.id}`}
                                            alt={upload.filename}
                                            className="rounded border"
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 rounded border p-6">
                        <h2 className="text-xl font-semibold">
                            Progress
                        </h2>

                        <div className="mt-4 space-y-3">
                            {STATUS_STEPS.map((status) => {
                                const currentIndex =
                                    STATUS_STEPS.indexOf(
                                        result.quote.status
                                    );

                                const thisIndex =
                                    STATUS_STEPS.indexOf(
                                        status
                                    );

                                const completed =
                                    thisIndex <= currentIndex;

                                return (
                                    <div
                                        key={status}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className={`h-6 w-6 rounded-full text-center text-sm leading-6 ${
                                                completed
                                                    ? "bg-green-600 text-white"
                                                    : "bg-slate-200"
                                            }`}
                                        >
                                            {completed ? "✓" : ""}
                                        </div>

                                        <span>
                                            {STATUS_LABELS[status]}
                                        </span>
                                    </div>
                                );
                            })}
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