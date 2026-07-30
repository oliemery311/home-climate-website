"use client";

import { useState } from "react";
import type { QuoteFormData } from "@/types/quote";
import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_SITE_KEY } from "@/lib/env";

const initialData: QuoteFormData = {
    propertyType: "",
    roomType: "",
    numberOfUnits: 1,
    existingAcSystem: "",

    roomDimensions: "",
    manufacturer: "",
    budgetRange: "",
    timeframe: "",
    notes: "",

    name: "",
    email: "",
    phone: "",
    postcode: "",
    address: "",
};

const steps = [
    "Property",
    "Installation",
    "Contact",
    "Review",
];


export default function QuoteWizard() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] =
        useState<QuoteFormData>(initialData);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [reference, setReference] =
        useState<string | null>(null);

    const [files, setFiles] =
        useState<File[]>([]);

    const [turnstileToken, setTurnstileToken] =
        useState("");

    const [verified, setVerified] =
        useState(false);

    function updateField(
        field: keyof QuoteFormData,
        value: string | number,
    ) {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));
    }


    function nextStep() {

        setError("");

        if (step === 1) {

            if (
                !formData.propertyType ||
                !formData.roomType
            ) {
                setError(
                    "Please complete your property details."
                );
                return;
            }
        }


        if (step === 2) {

            if (
                !formData.budgetRange ||
                !formData.timeframe
            ) {
                setError(
                    "Please tell us your preferred budget and timeframe."
                );
                return;
            }
        }


        if (step < 4) {
            setStep(step + 1);
        }
    }


    function previousStep() {

        setError("");

        if (step > 1) {
            setStep(step - 1);
        }
    }


    async function submitQuote() {

        setError("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.postcode
        ) {
            setError(
                "Please complete your contact details."
            );
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailRegex.test(formData.email)
        ) {
            setError(
                "Please enter a valid email address."
            );
            return;
        }

        const postcodeRegex =
            /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;

        if (
            !postcodeRegex.test(
                formData.postcode
            )
        ) {
            setError(
                "Please enter a valid UK postcode."
            );
            return;
        }

        setLoading(true);

        try {

            const response =
                await fetch("/api/quotes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        turnstileToken
                    }),
                });


            const data = await response.json() as {
                reference?: string;
                quoteId?: number;
                error?: string;
            };


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Unable to submit request."
                );

            }


            const quoteReference =
                data.reference ?? "";

            const quoteId =
                data.quoteId;

            for (const file of files) {

                const uploadForm =
                    new FormData();

                uploadForm.append(
                    "file",
                    file
                );

                uploadForm.append(
                    "reference",
                    quoteReference
                );

                uploadForm.append(
                    "quoteId",
                    String(quoteId)
                );

                const uploadResponse =
                    await fetch(
                        "/api/uploads",
                        {
                            method: "POST",
                            body: uploadForm
                        }
                    );

                if (!uploadResponse.ok) {

                    throw new Error(
                        "Photo upload failed."
                    );

                }

            }

            setReference(
                quoteReference
            );

        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    }


    if (reference) {

        return (
            <section
                id="quote"
                className="scroll-mt-20 bg-slate-50 py-20"
            >

                <div className="mx-auto max-w-3xl px-4">

                    <div className="rounded-xl bg-white p-8 text-center shadow">

                        <h2 className="text-3xl font-bold">
                            Thank you for your request
                        </h2>


                        <p className="mt-4 text-slate-600">
                            We have received your air conditioning enquiry.
                        </p>


                        <p className="mt-6">
                            Your reference number is:
                        </p>


                        <div className="mt-3 rounded-lg bg-slate-100 p-4 text-2xl font-bold text-blue-700">

                            {reference}

                        </div>


                        <p className="mt-6 text-sm text-slate-500">
                            Keep this reference if you need to contact us.
                        </p>

                    </div>

                </div>

            </section>
        );
    }


    return (

        <section
            id="quote"
            className="scroll-mt-20 bg-slate-50 py-20"
        >

            <div className="mx-auto max-w-3xl px-4">


                <h2 className="text-3xl font-bold">
                    Request a Free Quote
                </h2>


                <p className="mt-3 text-slate-600">
                    Tell us about your home and we will
                    recommend the right air conditioning solution.
                </p>


                <div className="mt-8 flex gap-2">

                    {steps.map(
                        (_, index) => (

                            <div
                                key={index}
                                className={`h-2 flex-1 rounded ${index + 1 <= step
                                    ? "bg-blue-600"
                                    : "bg-slate-200"
                                    }`}
                            />

                        )
                    )}

                </div>



                <div className="mt-8 rounded-xl bg-white p-6 shadow">


                    {step === 1 && (

                        <div>

                            <h3 className="text-xl font-semibold">
                                About your home
                            </h3>


                            <label className="mt-6 block">
                                Property type

                                <select
                                    className="mt-2 w-full rounded border p-3"
                                    value={formData.propertyType}
                                    onChange={(e) =>
                                        updateField(
                                            "propertyType",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option>Detached</option>
                                    <option>Semi-detached</option>
                                    <option>Terraced</option>
                                    <option>Flat</option>
                                    <option>Bungalow</option>
                                    <option>Static Caravan</option>
                                    <option>Other</option>

                                </select>

                            </label>



                            <label className="mt-4 block">

                                Room type

                                <select
                                    className="mt-2 w-full rounded border p-3"
                                    value={formData.roomType}
                                    onChange={(e) =>
                                        updateField(
                                            "roomType",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option>Bedroom</option>
                                    <option>Home office</option>
                                    <option>Lounge</option>
                                    <option>Conservatory</option>
                                    <option>Multiple rooms</option>
                                    <option>Other</option>

                                </select>

                            </label>


                        </div>

                    )}



                    {step === 2 && (

                        <div>

                            <h3 className="text-xl font-semibold">
                                Installation requirements
                            </h3>


                            <label className="mt-6 block">

                                Number of indoor units

                                <input
                                    type="number"
                                    min="1"
                                    className="mt-2 w-full rounded border p-3"
                                    value={formData.numberOfUnits}
                                    onChange={(e) =>
                                        updateField(
                                            "numberOfUnits",
                                            Number(e.target.value)
                                        )
                                    }
                                />

                            </label>



                            <label className="mt-4 block">

                                Room dimensions

                                <input
                                    className="mt-2 w-full rounded border p-3"
                                    placeholder="Example: 5m x 4m x 2.4m"
                                    value={formData.roomDimensions}
                                    onChange={(e) =>
                                        updateField(
                                            "roomDimensions",
                                            e.target.value
                                        )
                                    }
                                />

                            </label>


                            <label className="mt-4 block">

                                Budget

                                <select
                                    className="mt-2 w-full rounded border p-3"
                                    value={formData.budgetRange}
                                    onChange={(e) =>
                                        updateField(
                                            "budgetRange",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option>Under £1,500</option>
                                    <option>£1,500–£2,500</option>
                                    <option>£2,500–£4,000</option>
                                    <option>£4,000+</option>

                                </select>

                            </label>



                            <label className="mt-4 block">

                                Timescale

                                <select
                                    className="mt-2 w-full rounded border p-3"
                                    value={formData.timeframe}
                                    onChange={(e) =>
                                        updateField(
                                            "timeframe",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option>ASAP</option>
                                    <option>Within 1 month</option>
                                    <option>Within 3 months</option>
                                    <option>Just researching</option>

                                </select>

                            </label>
                            <label className="mt-4 block">

                                Photos

                                <input
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp"
                                    className="mt-2 w-full rounded border p-3"
                                    onChange={(e) => {

                                        const selected =
                                            Array.from(
                                                e.target.files ?? []
                                            );

                                        setFiles(selected);

                                    }}
                                />

                            </label>

                            {files.length > 0 && (

                                <div className="mt-3 rounded bg-slate-100 p-3 text-sm">

                                    {files.length} photo(s) selected

                                </div>

                            )}
                            <label className="mt-4 block">

                                Existing AC System

                                <select
                                    className="mt-2 w-full rounded border p-3"
                                    value={formData.existingAcSystem}
                                    onChange={(e) =>
                                        updateField(
                                            "existingAcSystem",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        No existing system
                                    </option>

                                    <option>
                                        Existing AC installed
                                    </option>

                                </select>

                            </label>


                            <label className="mt-4 block">

                                Preferred Manufacturer

                                <select
                                    className="mt-2 w-full rounded border p-3"
                                    value={formData.manufacturer}
                                    onChange={(e) =>
                                        updateField(
                                            "manufacturer",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        No preference
                                    </option>

                                    <option>
                                        Mitsubishi Electric
                                    </option>

                                    <option>
                                        Daikin
                                    </option>

                                    <option>
                                        Fujitsu
                                    </option>

                                    <option>
                                        Panasonic
                                    </option>

                                </select>

                            </label>


                            <label className="mt-4 block">

                                Additional Information

                                <textarea
                                    rows={5}
                                    className="mt-2 w-full rounded border p-3"
                                    placeholder="Tell us anything useful about your project..."
                                    value={formData.notes}
                                    onChange={(e) =>
                                        updateField(
                                            "notes",
                                            e.target.value
                                        )
                                    }
                                />

                            </label>

                        </div>

                    )}



                    {step === 3 && (

                        <div>

                            <h3 className="text-xl font-semibold">
                                Your details
                            </h3>


                            {[
                                ["name", "Name"],
                                ["email", "Email"],
                                ["phone", "Phone"],
                                ["postcode", "Postcode"],
                                ["address", "Address"],
                            ].map(([field, label]) => (

                                <input
                                    key={field}
                                    className="mt-4 w-full rounded border p-3"
                                    placeholder={label}
                                    value={
                                        formData[
                                        field as keyof QuoteFormData
                                        ] as string
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            field as keyof QuoteFormData,
                                            e.target.value
                                        )
                                    }
                                />

                            ))}

                        </div>

                    )}



                    {step === 4 && (

                        <div>

                            <h3 className="text-xl font-semibold">
                                Check your details
                            </h3>
                            <div className="mt-6">
                                <Turnstile
                                    siteKey={TURNSTILE_SITE_KEY}
                                    onSuccess={(token) => {
                                        setTurnstileToken(token);
                                        setVerified(true);
                                    }}
                                    onExpire={() => {
                                        setVerified(false);
                                        setTurnstileToken("");
                                    }}
                                />
                            </div>

                            <div className="mt-6 space-y-4">

                                <div>
                                    <strong>Property Type:</strong>{" "}
                                    {formData.propertyType}
                                </div>

                                <div>
                                    <strong>Room Type:</strong>{" "}
                                    {formData.roomType}
                                </div>

                                <div>
                                    <strong>Indoor Units:</strong>{" "}
                                    {formData.numberOfUnits}
                                </div>

                                <div>
                                    <strong>Room Dimensions:</strong>{" "}
                                    {formData.roomDimensions || "Not provided"}
                                </div>

                                <div>
                                    <strong>Budget:</strong>{" "}
                                    {formData.budgetRange}
                                </div>

                                <div>
                                    <strong>Timeframe:</strong>{" "}
                                    {formData.timeframe}
                                </div>

                                <div>
                                    <strong>Name:</strong>{" "}
                                    {formData.name}
                                </div>

                                <div>
                                    <strong>Email:</strong>{" "}
                                    {formData.email}
                                </div>

                                <div>
                                    <strong>Phone:</strong>{" "}
                                    {formData.phone || "Not provided"}
                                </div>

                                <div>
                                    <strong>Postcode:</strong>{" "}
                                    {formData.postcode}
                                </div>

                                <div>
                                    <strong>Address:</strong>{" "}
                                    {formData.address || "Not provided"}
                                </div>

                                <div>
                                    <strong>Photos:</strong>{" "}
                                    {files.length}
                                </div>

                                {formData.notes && (

                                    <div>

                                        <strong>Additional Notes:</strong>

                                        <div className="mt-2 rounded bg-slate-100 p-3">

                                            {formData.notes}

                                        </div>

                                    </div>

                                )}

                            </div>


                        </div>

                    )}



                    {error && (

                        <p className="mt-6 text-red-600">
                            {error}
                        </p>

                    )}



                    <div className="mt-8 flex justify-between">


                        {step > 1 ? (

                            <button
                                onClick={previousStep}
                                className="rounded border px-5 py-3"
                            >
                                Back
                            </button>

                        ) : <span />}



                        {step < 4 ? (

                            <button
                                onClick={nextStep}
                                className="rounded bg-blue-600 px-5 py-3 text-white"
                            >
                                Continue
                            </button>

                        ) : (

                            <button
                                disabled={loading || !verified}
                                onClick={submitQuote}
                                className="rounded bg-green-600 px-5 py-3 text-white"
                            >

                                {
                                    loading
                                        ? "Sending..."
                                        : !verified
                                            ? "Complete Verification"
                                            : "Submit Request"
                                }

                            </button>

                        )}

                    </div>


                </div>

            </div>

        </section>

    );
}