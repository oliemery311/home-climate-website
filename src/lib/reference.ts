export function formatReference(number: number) {

  return `HCS-${number
    .toString()
    .padStart(6, "0")}`;

}