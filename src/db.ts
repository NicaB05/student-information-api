import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';
import { config } from 'dotenv';

const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'src', '.env'),
  fileURLToPath(new URL('./.env', import.meta.url)),
  fileURLToPath(new URL('../.env', import.meta.url)),
];

const envPath = envCandidates.find((candidate) => fs.existsSync(candidate));
if (envPath) {
  config({ path: envPath });
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing. Check your .env file.');
}

export const pool = new Pool({ connectionString: databaseUrl });