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

const fieldClass =
    "mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-[var(--hcs-blue)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--hcs-blue)]/20";

const reviewCardClass =
    "rounded-2xl border border-slate-200 bg-slate-50 p-4";

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
                className="scroll-mt-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20"
            >

                <div className="mx-auto max-w-3xl px-4">

                    <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_-28px_rgba(35,79,147,0.35)]">

                        <h2 className="text-3xl font-bold">
                            Thank you for your request
                        </h2>


                        <p className="mt-4 text-slate-600">
                            We have received your air conditioning enquiry.
                        </p>


                        <p className="mt-6">
                            Your reference number is:
                        </p>


                        <div className="mt-3 rounded-lg bg-slate-100 p-4 text-2xl font-bold text-[var(--hcs-blue)]">

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
            className="scroll-mt-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20"
        >

            <div className="mx-auto max-w-4xl px-4">


                <div className="text-center">
                    <p className="inline-flex rounded-full bg-[var(--hcs-orange)]/10 px-3 py-1 text-sm font-semibold text-[var(--hcs-blue)]">
                        Free consultation
                    </p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Request a Free Quote
                    </h2>
                </div>


                <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
                    Tell us about your home and we will
                    recommend the right air conditioning solution.
                </p>


                <div className="mt-8 flex gap-2">

                    {steps.map(
                        (_, index) => (

                            <div
                                key={index}
                                className={`h-2 flex-1 rounded-full ${index + 1 <= step
                                    ? "bg-[var(--hcs-blue)]"
                                    : "bg-slate-200"
                                    }`}
                            />

                        )
                    )}

                </div>



                <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-28px_rgba(35,79,147,0.35)] md:p-8">


                    {step === 1 && (

                        <div>

                            <h3 className="text-xl font-semibold">
                                About your home
                            </h3>


                            <label className="mt-6 block text-sm font-medium text-slate-700">
                                Property type

                                <select
                                    className={fieldClass}
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



                            <label className="mt-4 block text-sm font-medium text-slate-700">

                                Room type

                                <select
                                    className={fieldClass}
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


                            <label className="mt-6 block text-sm font-medium text-slate-700">

                                Number of indoor units

                                <input
                                    type="number"
                                    min="1"
                                    className={fieldClass}
                                    value={formData.numberOfUnits}
                                    onChange={(e) =>
                                        updateField(
                                            "numberOfUnits",
                                            Number(e.target.value)
                                        )
                                    }
                                />

                            </label>



                            <label className="mt-4 block text-sm font-medium text-slate-700">

                                Room dimensions

                                <input
                                    className={fieldClass}
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


                            <label className="mt-4 block text-sm font-medium text-slate-700">

                                Budget

                                <select
                                    className={fieldClass}
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



                            <label className="mt-4 block text-sm font-medium text-slate-700">

                                Timescale

                                <select
                                    className={fieldClass}
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
                            <label className="mt-4 block text-sm font-medium text-slate-700">

                                Photos

                                <input
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp"
                                    className={fieldClass}
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

                                <div className="mt-3 rounded-xl bg-[var(--hcs-blue)]/5 p-3 text-sm text-slate-700">

                                    {files.length} photo(s) selected

                                </div>

                            )}
                            <label className="mt-4 block text-sm font-medium text-slate-700">

                                Existing AC System

                                <select
                                    className={fieldClass}
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


                            <label className="mt-4 block text-sm font-medium text-slate-700">

                                Preferred Manufacturer

                                <select
                                    className={fieldClass}
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


                            <label className="mt-4 block text-sm font-medium text-slate-700">

                                Additional Information

                                <textarea
                                    rows={5}
                                    className={`${fieldClass} resize-none`}
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
                                    className={`${fieldClass} mt-4`}
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

                            <div className="mt-6 grid gap-4 md:grid-cols-2">

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Property Type:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.propertyType}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Room Type:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.roomType}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Indoor Units:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.numberOfUnits}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Room Dimensions:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.roomDimensions || "Not provided"}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Budget:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.budgetRange}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Timeframe:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.timeframe}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Name:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.name}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Email:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.email}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Phone:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.phone || "Not provided"}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Postcode:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.postcode}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Address:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{formData.address || "Not provided"}</div>
                                </div>

                                <div className={reviewCardClass}>
                                    <strong className="text-slate-900">Photos:</strong>{" "}
                                    <div className="mt-1 text-slate-600">{files.length}</div>
                                </div>

                                {formData.notes && (

                                    <div className={`${reviewCardClass} md:col-span-2`}>

                                        <strong className="text-slate-900">Additional Notes:</strong>

                                        <div className="mt-2 rounded-xl bg-white p-3 text-slate-600">

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
                                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-[var(--hcs-blue)] hover:text-[var(--hcs-blue)]"
                            >
                                Back
                            </button>

                        ) : <span />}



                        {step < 4 ? (

                            <button
                                onClick={nextStep}
                                className="rounded-xl bg-[var(--hcs-blue)] px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
                            >
                                Continue
                            </button>

                        ) : (

                            <button
                                disabled={loading || !verified}
                                onClick={submitQuote}
                                className="rounded-xl bg-[var(--hcs-blue)] px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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