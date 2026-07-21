export interface QuoteRequest {

    name: string;
    email: string;
    phone?: string;

    postcode?: string;
    address?: string;

    propertyType?: string;

    roomTypes?: string[];

    roomDimensions?: string;

    numberOfUnits?: number;

    existingAc?: string;

    preferredManufacturer?: string;

    budgetRange?: string;

    timeframe?: string;

    notes?: string;

}


export function validateQuote(
    data: Record<string, unknown>
) {

    const errors: string[] = [];


    if (
        typeof data.name !== "string" ||
        data.name.trim().length === 0
    )
        errors.push("Name is required");


    if (
        typeof data.email !== "string" ||
        data.email.trim().length === 0
    )
        errors.push("Email is required");


    if (
        typeof data.email === "string" &&
        !data.email.includes("@")
    )
        errors.push("Invalid email");


    if (
        typeof data.postcode !== "string" ||
        data.postcode.trim().length === 0
    )
        errors.push("Postcode is required");


    return {
        valid: errors.length === 0,
        errors
    };

}