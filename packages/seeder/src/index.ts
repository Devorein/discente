import { prisma } from '@discente/server/dist/config';
import { Prisma } from '@discente/server/dist/types';
import { hashPassword } from '@discente/server/dist/utils';
import { faker } from '@faker-js/faker';
import colors from 'colors';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

const MILLISECONDS_IN_YEAR = 365 * 24 * 60 * 60 * 1000;
const MILLISECONDS_IN_MONTH = 30 * 24 * 60 * 60 * 1000;

type UserCreateData = {
  user: Prisma.UserCreateArgs['data'];
  password: string;
};

export async function generateUserCreateData(): Promise<UserCreateData> {
  const currentDate = new Date();
  const lastYearDate = new Date(Date.now() - MILLISECONDS_IN_YEAR);

  const createdAt = faker.date.between(lastYearDate, currentDate);
  const updatedAtMinDate = new Date(
    createdAt.getTime() + MILLISECONDS_IN_MONTH
  );
  const updatedAtMaxDate = new Date(
    updatedAtMinDate.getTime() + MILLISECONDS_IN_MONTH
  );
  const updatedAt = faker.date.between(updatedAtMinDate, updatedAtMaxDate);
  const userId = v4();
  const password = `${faker.helpers.arrayElement([
    '$',
    '~',
    '@',
    '!',
    '_'
  ])}${faker.internet.password(10)}${faker.datatype.number({
    min: 0,
    max: 9
  })}`;
  return {
    user: {
      id: userId,
      name: faker.name.findName(),
      username: faker.internet
        .userName(faker.name.firstName(), faker.name.lastName())
        .toLowerCase(),
      email: faker.internet.email(),
      hashedPass: await hashPassword(password),
      createdAt,
      updatedAt,
      role: 'user'
    },
    password
  };
}

const TOTAL_USERS = 500;

async function main() {
  const usersCreateData: UserCreateData[] = [];

  for (let index = 0; index < TOTAL_USERS; index += 1) {
    usersCreateData.push(await generateUserCreateData());
  }

  await prisma.user.createMany({
    data: usersCreateData.map((userCreateData) => userCreateData.user)
  });

  console.log(colors.green(`Created ${TOTAL_USERS} users`));
  fs.writeFileSync(
    path.join(__dirname, 'users.json'),
    JSON.stringify(
      usersCreateData.map((userCreateData) => ({
        username: userCreateData.user.username,
        email: userCreateData.user.email,
        password: userCreateData.password
      }))
    )
  );
}

main();
