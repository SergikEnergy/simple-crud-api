import { User, UserRequestType } from '../types/server';

export const testUsers: User[] = [];

export const testUserCreate: UserRequestType = {
  username: 'test user',
  age: 33,
  hobbies: ['reading', 'swimming'],
};

export const testUserUpdate: UserRequestType = {
  username: 'test user updated',
  age: 30,
  hobbies: ['swimming'],
};
