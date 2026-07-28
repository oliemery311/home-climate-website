import { NextRequest, NextResponse } from "next/server";

import { sendQuoteEmails } from "@/lib/email";

import {
    sanitizeText
} from "@/lib/sanitize";

import {
    validateQuote
} from "@/lib/validation";

import {
    createReference
} from "@/lib/reference";

import {
    calculateLeadScore
} from "@/lib/scoring";

import {
    getDB
} from "@/lib/db";



export async function POST(
    request: NextRequest
) {

    try {


        const body =
            await request.json() as Record<string, unknown>;
        const cleanName =
            sanitizeText(body.name);

        const cleanEmail =
            sanitizeText(body.email);

        const cleanPhone =
            sanitizeText(body.phone);

        const cleanPostcode =
            sanitizeText(body.postcode);

        const cleanAddress =
            sanitizeText(body.address);

        const cleanNotes =
            sanitizeText(body.notes);

        const validation =
            validateQuote(body);


        if (!validation.valid) {

            return NextResponse.json(
                {
                    success: false,
                    errors: validation.errors
                },
                {
                    status: 400
                }
            );

        }

        const token =
            typeof body.turnstileToken === "string"
                ? body.turnstileToken
                : "";

        const verifyResponse =
            await fetch(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        secret:
                            process.env.TURNSTILE_SECRET ?? "",
                        response: token
                    })
                }
            );

        const verifyResult =
            await verifyResponse.json() as {
                success?: boolean;
            };

        if (!verifyResult.success) {

            return NextResponse.json(
                {
                    success: false,
                    error: "Verification failed"
                },
                {
                    status: 400
                }
            );

        }

        const reference =
            await createReference();



        const lead =
            calculateLeadScore({

                budget:
                    typeof body.budgetRange === "string"
                        ? body.budgetRange
                        : undefined,

                timeframe:
                    typeof body.timeframe === "string"
                        ? body.timeframe
                        : undefined,

                numberOfUnits:
                    typeof body.numberOfUnits === "number"
                        ? body.numberOfUnits
                        : undefined,

                notes:
                    typeof body.notes === "string"
                        ? body.notes
                        : undefined,

                uploads:
                    typeof body.uploads === "number"
                        ? body.uploads
                        : undefined

            });



        const db =
            getDB();



        const result =
            await db
                .prepare(
                    `
INSERT INTO quote_requests
(
reference_number,
status,
lead_score,
lead_temperature,

name,
email,
phone,

postcode,
address,

property_type,
room_types,
room_dimensions,

number_of_units,

existing_ac,

preferred_manufacturer,

budget_range,

timeframe,

notes
)

VALUES

(
?,
'NEW',
?,
?,

?,
?,
?,

?,
?,

?,
?,
?,

?,

?,

?,

?,
?,

?
)
`
                )
                .bind(

                    reference,

                    lead.score,

                    lead.temperature,

                    cleanName,

                    cleanEmail,

                    cleanPhone ??

                    cleanPostcode ?? null,

                    cleanAddress ?? null,

                    body.propertyType ?? null,

                    JSON.stringify(body.roomTypes ?? []),

                    body.roomDimensions ?? null,

                    body.numberOfUnits ?? null,

                    body.existingAc ?? null,

                    body.preferredManufacturer ?? null,

                    body.budgetRange ?? null,

                    body.timeframe ?? null,

                    cleanNotes ?? null

                )
                .run();
        await sendQuoteEmails(reference, {
            name:
                typeof body.name === "string"
                    ? body.name
                    : undefined,

            email:
                typeof body.email === "string"
                    ? body.email
                    : undefined,

            phone:
                typeof body.phone === "string"
                    ? body.phone
                    : undefined,

            postcode:
                typeof body.postcode === "string"
                    ? body.postcode
                    : undefined,

            propertyType:
                typeof body.propertyType === "string"
                    ? body.propertyType
                    : undefined,

            budgetRange:
                typeof body.budgetRange === "string"
                    ? body.budgetRange
                    : undefined,

            timeframe:
                typeof body.timeframe === "string"
                    ? body.timeframe
                    : undefined,

            notes:
                typeof body.notes === "string"
                    ? body.notes
                    : undefined,
            address:
                typeof body.address === "string"
                    ? body.address
                    : undefined,

            roomType:
                typeof body.roomType === "string"
                    ? body.roomType
                    : undefined,

            roomDimensions:
                typeof body.roomDimensions === "string"
                    ? body.roomDimensions
                    : undefined,

            existingAc:
                typeof body.existingAcSystem === "string"
                    ? body.existingAcSystem
                    : undefined,

            preferredManufacturer:
                typeof body.manufacturer === "string"
                    ? body.manufacturer
                    : undefined,

            numberOfUnits:
                typeof body.numberOfUnits === "number"
                    ? body.numberOfUnits
                    : undefined,
        });

        return NextResponse.json({

            success: true,

            reference,

            quoteId: result.meta.last_row_id

        });



    }
    catch (error) {

        console.error(error);


        return NextResponse.json(
            {
                success: false,
                error: "Unable to submit quote"
            },
            {
                status: 500
            }
        );

    }

}