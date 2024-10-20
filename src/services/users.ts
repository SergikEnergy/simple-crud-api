import { User, UserRequestType } from '../types/server';
import { v4 as idGenerate } from 'uuid';

const users: User[] = [];

export const getAllUsers = async () => users;

export const getUserById = async (id: string) =>
  users.find((user) => user.id === id) ?? null;

export const deleteUserById = async (id: string) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return false;
  }
  users.splice(userIndex, 1);
  return true;
};

export const createUser = async (userInfo: UserRequestType) => {
  const user = { id: idGenerate(), ...userInfo };
  users.push(user);
  return user;
};

export const updateUserById = async (userInfo: UserRequestType, id: string) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null;
  }

  users.splice(userIndex, 1, { ...userInfo, id });
  return { ...userInfo, id };
};
