export function sanitizeText(
  value: unknown,
): string | null {

  if (
    typeof value !== "string"
  ) {
    return null;
  }

  return value
    .replace(
      /[\x00-\x08\x0B\x0C\x0E-\x1F]/g,
      "",
    )
    .trim();
}