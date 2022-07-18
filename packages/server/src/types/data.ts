import { User } from '@prisma/client';

export type UserWithoutSecretFields = Omit<User, 'hashedPass' | 'tokenVersion'>;

export type UserJWTPayload = Omit<
  User,
  'createdAt' | 'updatedAt' | 'name' | 'hashedPass'
> & { accessTokens?: { google: string } };

export * from "@prisma/client";
