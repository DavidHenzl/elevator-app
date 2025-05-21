import { Injectable } from '@angular/core';
import { Role, User } from '../models/userModel';
import { BehaviorSubject } from 'rxjs';
import { users } from '../constants/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = users;

  private loggedUserSubject = new BehaviorSubject<User | undefined>(undefined);
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }

  registerUser(user: User): void {
    this.users.push(user);
  }

  updateLoggedUser(user: User | undefined) {
    this.loggedUserSubject.next(user);
  }

  getLoggedUser(): User | undefined {
    return this.loggedUserSubject.getValue();
  }
}
