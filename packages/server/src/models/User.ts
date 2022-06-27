import { User } from "@prisma/client";
import { v4 } from "uuid";
import ApiError, { UniqueConstraintViolationError } from "../ApiError";
import { prisma } from "../config";
import { RegisterUserPayload } from "../types";
import { hashPassword } from "../utils";

export async function registerUser(
  payload: RegisterUserPayload
): Promise<User> {
  const hashedPassword = await hashPassword(payload.password);
  try {
    const id = v4();
    const user = await prisma.user.create({
      data: {
        id,
        name: payload.name ?? null,
        hashedPass: hashedPassword,
        email: payload.email,
        username: payload.username,
      }
    });
    return user as User;
  } catch (err) {
    if (err.code === 'P2002') {
      const target = err.meta.target[0];
      throw new UniqueConstraintViolationError('user', target);
    }

    throw new ApiError();
  }
}