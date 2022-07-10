import { User } from "@prisma/client";
import { CookieOptions, Response } from "express";
import { CLIENT_URL, COOKIE_NAME, NODE_ENV } from "../config";
import { UserJWTPayload } from "../types";
import { signToken } from "./token";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict',
  domain: new URL(CLIENT_URL as string).hostname as string
};

/**
 * Adds user authenticated cookie to response
 * @param res Express Response
 * @param user User
 * @param remember Session cookie or long lasting cookie
 */
export const addCookieToResponse = (
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

/**
 * Removes user authenticated cookies from response
 * @param res Express Response
 */
export const removeCookieFromResponse = (res: Response) =>
  res.clearCookie(COOKIE_NAME, cookieOptions);