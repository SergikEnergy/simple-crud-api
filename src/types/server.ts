export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type UsersResponseType = User[];

export type UserRequestType = Omit<User, 'id'>;
