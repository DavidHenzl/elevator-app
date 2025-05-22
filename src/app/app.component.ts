import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { User } from './models/userModel';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { UserService } from './services/user.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, ToastModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loggedUser: User | undefined = undefined;
  printMode: boolean = true;

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.loggedUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User | undefined) => {
        this.loggedUser = user;
      });

    // Detect when navigation ends to re-check route data
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const currentRoute = this.getChildRoute(this.route);
        const print = currentRoute.snapshot.data['print'];
        this.printMode = print ?? false;
      });
  }

  // Helper to get the deepest activated route
  private getChildRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
