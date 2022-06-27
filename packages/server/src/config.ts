import { PrismaClient } from '@prisma/client';
import { Algorithm } from 'jsonwebtoken';

export const prisma = new PrismaClient();

export const SERVER_PORT = process.env.SERVER_PORT!;
export const DB_URL = process.env.DB_URL!;
export const SERVER_URL = process.env.SERVER_URL!;
export const CLIENT_URL = process.env.CLIENT_URL!;
export const PASSWORD_SALT = process.env.PASSWORD_SALT!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const NODE_ENV = process.env.NODE_ENV as "development" | "test" | "production";
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM as Algorithm;
export const COOKIE_NAME = process.env.COOKIE_NAME!;
