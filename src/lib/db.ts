import { getCloudflareContext } from "@opennextjs/cloudflare";


export interface CloudflareEnv {
  DB: D1Database;
  UPLOADS: R2Bucket;
}


function getEnv(): CloudflareEnv {

  const { env } = getCloudflareContext();

  return env as unknown as CloudflareEnv;

}


export function getDB() {

  return getEnv().DB;

}


export function getUploadsBucket() {

  return getEnv().UPLOADS;

}