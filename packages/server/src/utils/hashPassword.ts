import { hash } from 'argon2';
import { PASSWORD_SALT } from '../config';

/**
 * Hashes password
 * @param password Password to be hashed
 * @returns Hashed password
 */
export default async function hashPassword(password: string) {
  return hash(password, {
    hashLength: 100,
    timeCost: 5,
    salt: Buffer.from(PASSWORD_SALT!, 'utf-8')
  });
}
