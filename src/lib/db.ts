/// <reference types="@cloudflare/workers-types" />
import { getCloudflareContext } from "@opennextjs/cloudflare";


declare global {
  interface CloudflareEnv {
    DB: D1Database;
    UPLOADS: R2Bucket;
  }
}

export {};


function getEnv(): CloudflareEnv {

  const { env } = getCloudflareContext();

  return env;

}


export function getDB() {

  return getEnv().DB;

}


export function getUploadsBucket() {

  return getEnv().UPLOADS;

}