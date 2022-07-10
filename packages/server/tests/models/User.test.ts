import { User } from "@prisma/client";
import { v4 } from "uuid";
import { UniqueConstraintViolationError } from "../../src/ApiError";
import { registerUser } from "../../src/models";
import { RegisterUserPayload } from "../../src/types";
import { getError } from "../helpers/errors";
import { expectUserResponse } from "../helpers/user";


// test this user for login, registration
let activeUser: User;
const userPassword = 'Secret123$';

beforeAll(async () => {
  activeUser = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: `${v4()}1`,
    name: "John Doe"
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