import { prisma } from '@discente/server/dist/config';
import { Prisma } from '@discente/server/dist/types';
import { hashPassword } from '@discente/server/dist/utils';
import { constants } from '@discente/shared';
import { faker } from '@faker-js/faker';
import colors from 'colors';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

const MILLISECONDS_IN_YEAR = 365 * 24 * 60 * 60 * 1000;
const MILLISECONDS_IN_MONTH = 30 * 24 * 60 * 60 * 1000;

type UserCreateData = {
  user: Required<Prisma.UserCreateManyInput>;
  password: string;
};

type CourseCreateData = Prisma.CourseCreateManyInput;

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
      role: faker.datatype.boolean() ? 'learner' : 'instructor',
      tokenVersion: 0,
      avatar: faker.datatype.boolean() ? faker.internet.avatar() : null,
      status: faker.helpers.arrayElement(constants.Status)
    },
    password
  };
}

export function generateCourseCreateData(
  author: UserCreateData
): CourseCreateData {
  const createdAt = faker.date.between(
    new Date(author.user.createdAt).getTime() + MILLISECONDS_IN_MONTH,
    new Date(author.user.createdAt).getTime() + MILLISECONDS_IN_YEAR
  );
  const updatedAt = faker.date.between(
    new Date(createdAt).getTime() + MILLISECONDS_IN_MONTH,
    new Date(createdAt).getTime() + MILLISECONDS_IN_YEAR
  );
  return {
    description: faker.lorem.paragraph(
      faker.datatype.number({
        min: 10,
        max: 25
      })
    ),
    briefDescription: faker.lorem.paragraph(
      faker.datatype.number({
        min: 1,
        max: 3
      })
    ),
    image: faker.image.abstract(),
    price: faker.datatype.boolean()
      ? 0
      : faker.helpers.arrayElement([5, 10, 15, 25, 50]),
    title: faker.lorem.lines(1),
    createdBy: author.user.id,
    createdAt,
    updatedAt,
    status: faker.helpers.arrayElement(constants.Status),
    category: faker.helpers.arrayElement(constants.Course.category),
    language: faker.helpers.arrayElement(constants.Course.language),
    level: faker.helpers.arrayElement(constants.Course.level),
    subtitle: faker.datatype.boolean()
      ? faker.helpers.arrayElement(constants.Course.language)
      : null,
    tags: new Array(
      faker.datatype.number({
        min: 1,
        max: 5
      })
    )
      .fill('')
      .map(() => faker.lorem.word())
  };
}

const TOTAL_USERS = 50;
const MIN_COURSE_PER_USER = 3;
const MAX_COURSE_PER_USER = 10;

async function main() {
  const usersCreateData: UserCreateData[] = [];

  for (let index = 0; index < TOTAL_USERS; index += 1) {
    usersCreateData.push(await generateUserCreateData());
  }

  await prisma.user.createMany({
    data: usersCreateData.map((userCreateData) => userCreateData.user)
  });

  const instructors = usersCreateData.filter(
    (userCreateData) => userCreateData.user.role === 'instructor'
  );

  const coursesCreateData: CourseCreateData[] = [];

  instructors.forEach((instructor) => {
    const courseCount = faker.datatype.number({
      max: MAX_COURSE_PER_USER,
      min: MIN_COURSE_PER_USER
    });
    for (let index = 0; index < courseCount; index += 1) {
      coursesCreateData.push(generateCourseCreateData(instructor));
    }
  });

  await prisma.course.createMany({
    data: coursesCreateData
  });

  console.log(colors.green(`Created ${TOTAL_USERS} users`));
  console.log(colors.green(`Created ${coursesCreateData.length} courses`));

  fs.writeFileSync(
    path.join(__dirname, 'users.json'),
    JSON.stringify(
      usersCreateData.map((userCreateData) => ({
        username: userCreateData.user.username,
        email: userCreateData.user.email,
        password: userCreateData.password,
        role: userCreateData.user.role
      }))
    )
  );
}

main();
