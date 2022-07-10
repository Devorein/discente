import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { JWT_ALGORITHM, JWT_SECRET } from "../config";
import { UserJWTPayload } from "../types";

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
 * Gets token based on user information
 * @param user the user
 * @returns the signed token
 */
export function getUserToken(user: User) {
  const { id, username, email, role, tokenVersion } = user;
  return signToken<UserJWTPayload>({
    id,
    username,
    email,
    role,
    tokenVersion
  });
}
