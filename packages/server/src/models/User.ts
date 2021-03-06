import { User } from '@prisma/client';
import { v4 } from 'uuid';
import ApiError, {
  DeleteFailedError,
  UniqueConstraintViolationError,
  UpdateFailedError,
  UserNotFoundError
} from '../ApiError';
import { prisma } from '../config';
import { LoginUser, RegisterUser, UpdateUser } from '../types';
import { hashPassword, verifyPassword } from '../utils';

export async function registerUser(payload: RegisterUser['payload']) {
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
        role: payload.role
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

export async function loginUser(payload: LoginUser['payload']) {
  const { password, usernameOrEmail } = payload;
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: usernameOrEmail
        },
        {
          email: usernameOrEmail
        }
      ]
    }
  });
  if (!user) throw new UserNotFoundError();
  await verifyPassword(user.hashedPass as string, password);
  return user;
}

export async function updateUserById(
  id: string,
  data: UpdateUser['payload']
): Promise<User> {
  try {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        status: data.status
      }
    });
    return user;
  } catch (err) {
    if (err.code === 'P2002') {
      const target = err.meta.target[0];
      throw new UniqueConstraintViolationError('user', target);
    } else {
      throw new UpdateFailedError('user');
    }
  }
}

export async function changePasswordById(id: string, password: string) {
  const hashedPass = await hashPassword(password);
  try {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        hashedPass,
        tokenVersion: {
          increment: 1
        }
      }
    });
    return user;
  } catch (err) {
    if (err.code === 'P2025') {
      throw new UserNotFoundError();
    } else {
      throw new UpdateFailedError('password');
    }
  }
}

export async function incrementTokenVersionById(userId: string) {
  try {
    return await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        tokenVersion: {
          increment: 1
        }
      }
    });
  } catch (err) {
    if (err.code === 'P2025') {
      throw new UserNotFoundError();
    } else {
      throw new UpdateFailedError('tokenVersion');
    }
  }
}

export async function deleteUserById(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        id: userId
      }
    });
  } catch (err) {
    if (err.code === 'P2025') {
      throw new UserNotFoundError();
    } else {
      throw new DeleteFailedError('user');
    }
  }
}

export async function createUserUnlessExists(googleUser: Partial<User>) {
  try {
    const id = v4();
    const user = await prisma.user.upsert({
      create: {
        id,
        email: googleUser.email!,
        username: googleUser.username || v4(),
        name: googleUser.name ?? v4(),
        avatar: googleUser.avatar,
        role: 'learner'
      },
      update: {},
      where: {
        email: googleUser.email
      }
    });
    if (user.id === id) {
      return {
        user,
        registered: true
      };
    }
    return {
      user,
      registered: false
    };
  } catch (err) {
    if (err.code === 'P2002') {
      const target = err.meta.target[0];
      throw new UniqueConstraintViolationError('user', target);
    }

    throw new ApiError();
  }
}
