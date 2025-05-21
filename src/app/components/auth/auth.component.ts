import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role, User } from '../../models/userModel';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    CardModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  mode: 'register' | 'login' = 'login';
  authForm: FormGroup;
  errorText: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.mode =
      this.route.snapshot.data['mode'] === 'register' ? 'register' : 'login';
  }

  get username() {
    return this.authForm.get('username');
  }

  get password() {
    return this.authForm.get('password');
  }

  onLogin() {
    this.errorText = '';

    setTimeout(() => {
      const user: User | undefined = this.userService
        .getUsers()
        .find((user) => {
          return (
            user.username === this.username?.value &&
            user.password === this.password?.value
          );
        });
      if (user) {
        this.userService.updateLoggedUser(user);
        this.router.navigate(['/elevators']);
      } else {
        this.errorText = 'Kombinace jména a hesla nebyla nalezena';
      }
    }, 500);
  }

  onRegister() {
    this.errorText = '';
    setTimeout(() => {
      const user: User | undefined = this.userService
        .getUsers()
        .find((user) => {
          return user.username === this.username?.value;
        });
      if (!user) {
        const newUser: User = {
          username: this.username?.value,
          password: this.password?.value,
          role: Role.USER,
        };
        this.userService.updateLoggedUser(newUser);
        this.userService.registerUser(newUser);
        this.router.navigate(['/elevators']);
      } else {
        this.errorText = 'Toto uživatelské jméno již existuje';
      }
    }, 500);
  }
}
