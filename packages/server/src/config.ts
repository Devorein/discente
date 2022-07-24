import { PrismaClient } from '@prisma/client';
import { Algorithm } from 'jsonwebtoken';

export const prisma = new PrismaClient();

export const GOOGLE_OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';

export const SERVER_PORT = process.env.SERVER_PORT!;
export const DB_URL = process.env.DB_URL!;
export const CLIENT_URL = process.env.CLIENT_URL!;
export const SERVER_URL = process.env.SERVER_URL!;
export const PASSWORD_SALT = process.env.PASSWORD_SALT!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const NODE_ENV = process.env.NODE_ENV as
  | 'development'
  | 'test'
  | 'production';
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM as Algorithm;
export const COOKIE_NAME = process.env.COOKIE_NAME!;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
export const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID!;
export const GOOGLE_OAUTH_CLIENT_SECRET =
  process.env.GOOGLE_OAUTH_CLIENT_SECRET!;

export const API_VERSION = 'v1';

const envVars = {
  SERVER_PORT,
  DB_URL,
  CLIENT_URL,
  SERVER_URL,
  PASSWORD_SALT,
  JWT_SECRET,
  NODE_ENV,
  JWT_ALGORITHM,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  COOKIE_NAME
} as { [key: string]: string };

const missingEnvConstants = Object.keys(envVars).filter((val) => !envVars[val]);

if (missingEnvConstants.length > 0 && NODE_ENV !== 'test')
  throw new Error(
    `Missing Environment Variables: ${missingEnvConstants.join(', ')}`
  );
