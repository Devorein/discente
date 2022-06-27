import { verify } from 'argon2';
import { IncorrectPasswordError } from '../ApiError';

export default async function verifyPassword(hashedPass: string, password: string) {
  const isCorrectPassword = await verify(hashedPass, password);
  if (!isCorrectPassword) throw new IncorrectPasswordError();
}