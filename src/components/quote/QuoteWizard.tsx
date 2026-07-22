"use client";

import { useState } from "react";
import type { QuoteFormData } from "@/types/quote";

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

        setLoading(true);
        setError("");

        try {

            const response =
                await fetch("/api/quotes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });


            const data = await response.json() as {
                reference?: string;
                error?: string;
            };


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Unable to submit request."
                );

            }


            setReference(
                data.reference ?? ""
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


                            <pre className="mt-6 overflow-auto rounded bg-slate-100 p-4 text-sm">
                                {JSON.stringify(
                                    formData,
                                    null,
                                    2
                                )}
                            </pre>


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
                                disabled={loading}
                                onClick={submitQuote}
                                className="rounded bg-green-600 px-5 py-3 text-white"
                            >

                                {loading
                                    ? "Sending..."
                                    : "Submit Request"}

                            </button>

                        )}

                    </div>


                </div>

            </div>

        </section>

    );
}