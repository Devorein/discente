import { User } from "@prisma/client";
import { CookieOptions, Response } from "express";
import { sign } from "jsonwebtoken";
import { CLIENT_URL, COOKIE_NAME, JWT_ALGORITHM, JWT_SECRET, NODE_ENV } from "../config";
import { UserJWTPayload } from "../types";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict',
  domain: new URL(CLIENT_URL as string).hostname as string
};

/**
 * Signs token based on given payload
 * @param payload to sign
 * @returns the signed token
 */
export function signToken<Payload extends Record<string, any>>(
  payload: Payload
) {
  return sign(payload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: '1d'
  });
}

/**
 * Adds user authenticated cookie to response
 * @param res Express Response
 * @param user User
 * @param remember Session cookie or long lasting cookie
 */
export const addUserAuthCookieToResponse = (
  res: Response,
  user: User,
  remember?: boolean
) => {
  const { id, username, email, role, tokenVersion } = user;
  const token = signToken<UserJWTPayload>({
    id,
    username,
    email,
    role,
    tokenVersion
  });
  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    expires: remember ? new Date(Date.now() + 24 * 60 * 60 * 1000) : undefined // 1 day from now
  });
};