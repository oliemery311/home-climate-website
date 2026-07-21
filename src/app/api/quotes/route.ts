import { NextRequest, NextResponse } from "next/server";

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

                body.name,

                body.email,

                body.phone ?? null,

                body.postcode ?? null,

                body.address ?? null,

                body.propertyType ?? null,

                JSON.stringify(body.roomTypes ?? []),

                body.roomDimensions ?? null,

                body.numberOfUnits ?? null,

                body.existingAc ?? null,

                body.preferredManufacturer ?? null,

                body.budgetRange ?? null,

                body.timeframe ?? null,

                body.notes ?? null

            )
            .run();



        return NextResponse.json({

            success: true,

            reference

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