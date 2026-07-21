export interface CloudflareEnv {
  DB: D1Database;
  UPLOADS: R2Bucket;
}


export function getDatabase(env: CloudflareEnv) {
  return env.DB;
}