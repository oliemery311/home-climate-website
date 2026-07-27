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
        data.name.trim().length < 2 ||
        data.name.length > 100
    ) {
        errors.push("Please enter a valid name.");
    }


    if (
        typeof data.email !== "string" ||
        data.email.length > 255
    ) {
        errors.push("Please enter a valid email address.");
    }


    if (
        typeof data.email === "string" &&
        !data.email.includes("@")
    )
        errors.push("Invalid email");

    if (
        data.phone &&
        typeof data.phone === "string" &&
        data.phone.length > 30
    ) {
        errors.push("Phone number is too long.");
    }

    if (
        data.postcode &&
        typeof data.postcode === "string" &&
        data.postcode.length > 20
    ) {
        errors.push("Postcode is too long.");
    }

    if (
        data.address &&
        typeof data.address === "string" &&
        data.address.length > 255
    ) {
        errors.push("Address is too long.");
    }

    if (
        data.notes &&
        typeof data.notes === "string" &&
        data.notes.length > 2000
    ) {
        errors.push(
            "Notes must be under 2000 characters."
        );
    }

    return {
        valid: errors.length === 0,
        errors
    };

}