import { Role, User } from '../models/userModel';

export const users: User[] = [
  {
    username: 'David',
    password: '123',
    role: Role.ADMIN,
  },
  {
    username: 'Petr',
    password: '123',
    role: Role.USER,
  },
];
