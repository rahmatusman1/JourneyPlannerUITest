import fs from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';
import testData from '../config/testData.json';

const envPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

/**
 * Get environment variable with fallback
 * @param key - Environment variable name
 */

export function getEnv(key: string){
  return process.env[key];
}

/**
 * Get numeric environment variable with fallback
 * @param key - Environment variable name
 */

export function getNumericEnv(key: string): number | undefined {
  const value = process.env[key];
  return value ? parseInt(value, 10) : undefined; // return undefined if the .env variable is not set
}

export const ENV = {
  baseUrl: getEnv('BASE_URL'),
  timeout: getNumericEnv('TIMEOUT'),
  retries: getNumericEnv('RETRIES'),
  testData: testData
};