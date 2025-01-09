import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/singlestore/driver";

const sql = neon(process.env.NEON_DATA_BASE_URL);
export const db = drizzle({ client: sql });