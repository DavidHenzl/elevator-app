export interface User {
  username: string;
  password?: string;
  role: Role;
  email?: string;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
