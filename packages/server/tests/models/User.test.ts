import { User } from "@prisma/client";
import { v4 } from "uuid";
import { DeleteFailedError, IncorrectPasswordError, UniqueConstraintViolationError, UpdateFailedError, UserNotFoundError } from "../../src/ApiError";
import { prisma } from "../../src/config";
import { changePasswordById, createUserUnlessExists, deleteUserById, loginUser, registerUser, updateUserById } from "../../src/models";
import { RegisterUser } from "../../src/types";
import { hashPassword } from "../../src/utils";
import { getError } from "../helpers/errors";
import { expectUserResponse } from "../helpers/user";

let privateUser: User;
// user to test delete
let deletedUser: User;
// test this user for login, registration
let activeUser: User;
let activeUser2: User;
const userPassword = 'Secret123$';
const differentPassword = 'terces321';

beforeAll(async () => {
  activeUser = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: `${v4()}1`,
    name: "John Doe",
    role: "learner"
  });

  activeUser2 = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().split("-")[0],
    name: "John Doe",
    role: "learner"
  });

  const userId = v4();
  privateUser = await prisma.user.create({
    data: {
      id: userId,
      email: `${v4()}@gmail.com`,
      hashedPass: await hashPassword(userPassword),
      username: `${v4()}1`,
      name: "John Doe",
      role: "learner"
    }
  });

  deletedUser = (await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: `${v4().slice(10, 20)}1`,
    name: "John Doe",
    role: "learner"
  }));
});

describe('registerUser', () => {
  it(`Should register user with name`, async () => {
    const registerUserPayload: RegisterUser['payload'] = {
      email: `${v4()}@gmail.com`,
      password: 'secret123',
      username: v4(),
      name: 'John Doe',
      role: "learner"
    };
    const registeredUser = await registerUser(registerUserPayload);
    expectUserResponse(registerUserPayload, registeredUser);
    expect(registeredUser).not.toHaveProperty('password');
  });

  it(`Should throw error if username already exists`, async () => {
    const error = await getError(async () =>
      registerUser({
        email: 'john.doe1@gmail.com',
        password: 'secret123',
        username: activeUser.username,
        name: 'John Doe 1',
        role: "learner"
      })
    );
    expect(error.message).toBe(UniqueConstraintViolationError.messageConstructor('user', 'username'));
    expect(error.statusCode).toBe(UniqueConstraintViolationError.statusCode);
  });
});

describe('loginUser', () => {
  it(`Should login correctly with email`, async () => {
    const loggedUser = await loginUser({
      usernameOrEmail: activeUser.username,
      password: userPassword
    });
    expectUserResponse(activeUser, loggedUser);
    expect(loggedUser).not.toHaveProperty('password');
  });

  it(`Should throw error on incorrect password`, async () => {
    const error = await getError(async () =>
      loginUser({
        usernameOrEmail: activeUser.email,
        password: 'wrong_password'
      })
    );
    expect(error.message).toBe(IncorrectPasswordError.message);
    expect(error.statusCode).toBe(IncorrectPasswordError.statusCode);
  });

  it(`Should throw error if username or email or both doesn't match/exist`, async () => {
    const error = await getError(async () =>
      loginUser({
        usernameOrEmail: 'john.doe1@gmail.com',
        password: 'secret123'
      })
    );
    expect(error.message).toBe(UserNotFoundError.message);
    expect(error.statusCode).toBe(UserNotFoundError.statusCode);
  });
});

describe('changePasswordById', () => {
  it('should throw error on invalid id', async () => {
    const error = await getError(async () =>
      changePasswordById(activeUser.id.substring(8), differentPassword)
    );
    expect(error.message).toBe(
      UpdateFailedError.messageConstructor('password')
    );
    expect(error.statusCode).toBe(UpdateFailedError.statusCode);
  });

  it(`should throw error if user doesn't exist`, async () => {
    const error = await getError(async () =>
      changePasswordById(v4(), differentPassword)
    );
    expect(error.message).toBe(UserNotFoundError.message);
    expect(error.statusCode).toBe(UserNotFoundError.statusCode);
  });

  it('should update password properly', async () => {
    const updatedUser = await changePasswordById(
      privateUser.id,
      differentPassword
    );

    expect(updatedUser.tokenVersion).toBe(privateUser.tokenVersion + 1);
  });
});

describe('createUserUnlessExists', () => {
  it(`Should create user if it doesn't exist`, async () => {
    const avatar = 'avatar';
    const email = 'email';
    const username = 'username';

    const { registered, user } = await createUserUnlessExists({
      email,
      username,
      avatar
    });

    expect(user.username).toBe(username);
    expect(registered).toBe(true);
  });

  it(`Should not create user if it exist`, async () => {
    const { registered, user } = await createUserUnlessExists({
      email: activeUser.email,
      username: activeUser.username,
      avatar: activeUser.avatar
    });

    expect(user.username).toBe(activeUser.username);
    expect(registered).toBe(false);
  });
});

describe('deleteUserById', () => {
  it('should throw error on invalid id', async () => {
    const error = await getError(async () => deleteUserById('123'));
    expect(error.message).toBe(DeleteFailedError.messageConstructor('user'));
    expect(error.statusCode).toBe(DeleteFailedError.statusCode);
  });

  it(`should throw error if user doesn't exist`, async () => {
    const error = await getError(async () => deleteUserById(v4()));
    expect(error.message).toBe(UserNotFoundError.message);
    expect(error.statusCode).toBe(UserNotFoundError.statusCode);
  });

  it('should delete user', async () => {
    await expect(deleteUserById(deletedUser.id)).resolves.not.toThrowError();
  });
});


describe('updateUserById', () => {
  it(`should not work if user doesn't exist`, async () => {
    const error = await getError(async () =>
      updateUserById(v4(), {
        username: activeUser.username,
        email: activeUser.email,
        name: 'updated name',
        status: activeUser.status
      })
    );

    expect(error.message).toBe(UpdateFailedError.messageConstructor('user'));
    expect(error.statusCode).toBe(UpdateFailedError.statusCode);
  });

  it('should fail if a user with username already exists', async () => {
    const error = await getError(async () =>
      updateUserById(activeUser.id, {
        username: activeUser2.username,
        email: activeUser.email,
        name: 'updated name',
        status: activeUser.status
      })
    );

    expect(error.message).toBe(
      UniqueConstraintViolationError.messageConstructor('user', 'username')
    );
    expect(error.statusCode).toBe(UniqueConstraintViolationError.statusCode);
  });

  it('should update user properly on valid id', async () => {
    const user = await updateUserById(activeUser2.id, {
      username: activeUser2.username,
      email: activeUser2.email,
      name: 'updated name',
      status: activeUser2.status
    });
    expectUserResponse(
      { ...activeUser2, name: 'updated name' },
      user
    );
  });
});