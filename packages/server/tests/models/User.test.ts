import { User } from "@prisma/client";
import { v4 } from "uuid";
import { IncorrectPasswordError, UniqueConstraintViolationError, UpdateFailedError, UserNotFoundError } from "../../src/ApiError";
import { prisma } from "../../src/config";
import { changePasswordById, loginUser, registerUser } from "../../src/models";
import { RegisterUserPayload } from "../../src/types";
import { hashPassword } from "../../src/utils";
import { getError } from "../helpers/errors";
import { expectUserResponse } from "../helpers/user";

let privateUser: User;

// test this user for login, registration
let activeUser: User;
const userPassword = 'Secret123$';
const differentPassword = 'terces321';

beforeAll(async () => {
  activeUser = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: `${v4()}1`,
    name: "John Doe"
  });

  const userId = v4();
  privateUser = await prisma.user.create({
    data: {
      id: userId,
      email: `${v4()}@gmail.com`,
      hashedPass: await hashPassword(userPassword),
      username: `${v4()}1`,
      name: "John Doe"
    }
  });
});

describe('registerUser', () => {
  it(`Should register user with name`, async () => {
    const registerUserPayload: RegisterUserPayload = {
      email: `${v4()}@gmail.com`,
      password: 'secret123',
      username: v4(),
      name: 'John Doe'
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
        name: 'John Doe 1'
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