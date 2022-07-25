import Course from './Course';
import User from './User';

export const constants = {
  Course,
  User,
  Status: ['public', 'private', 'protected']
};

export type UserSortableFields = typeof User.sortableFields[number];
export type CourseSortableFields = typeof Course.sortableFields[number];
