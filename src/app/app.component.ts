import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { User } from './models/userModel';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loggedUser: User | undefined = undefined;

  private userSubscribtion: Subscription = Subscription.EMPTY;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscribtion = this.userService.loggedUser$.subscribe(
      (user: User | undefined) => {
        this.loggedUser = user;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
  }
}
