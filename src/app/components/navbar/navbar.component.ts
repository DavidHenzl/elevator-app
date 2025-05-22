import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Role, User } from '../../models/userModel';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, CommonModule, ButtonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input() loggedUser: User | undefined = undefined;

  items: MenuItem[] | undefined;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.updateNavbarItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loggedUser']) {
      this.updateNavbarItems();
    }
  }

  updateNavbarItems(): void {
    this.items = [
      {
        label: 'Úvod',
        routerLink: '/',
      },
      {
        label: 'Výtahy',
        routerLink: '/elevators',
        visible: !!this.loggedUser,
      },
      {
        label: 'Seznam techniků',
        routerLink: '/maintenance',
        visible: this.loggedUser?.role === Role.ADMIN,
      },
    ];

    // You can add conditional logic here to update items based on loggedUser
    if (this.loggedUser) {
      // Add or remove items based on loggedUser
    }
  }

  logout() {
    this.userService.updateLoggedUser(undefined);
    this.router.navigate(['/']);
  }
}
