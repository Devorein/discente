import { User } from '@prisma/client';
import {
  UserWithoutSecretFields
} from '../types';

export function removeSecretUserFields(
  user: User
): UserWithoutSecretFields {
  const { hashedPass, tokenVersion, ...otherFields } = user;
  return otherFields;
}