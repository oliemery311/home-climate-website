import { getDB } from "./db";


export async function createReference(){

  const db = getDB();


  const result =
    await db
      .prepare(
        `
        UPDATE settings
        SET value = CAST(value AS INTEGER) + 1
        WHERE key='quote_reference_counter'
        RETURNING value;
        `
      )
      .first<{value:string}>();


  const number =
    Number(result?.value ?? 1);


  return `HCS-${number
    .toString()
    .padStart(6,"0")}`;

}