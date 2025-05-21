import { Routes } from '@angular/router';
import { ElevatorListComponent } from './components/elevator-list/elevator-list.component';
import { ElevatorDetailComponent } from './components/elevator-detail/elevator-detail.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'elevators',
    component: ElevatorListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'elevators/:id',
    component: ElevatorDetailComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: AuthComponent,
    data: { mode: 'login' },
  },
  {
    path: 'register',
    component: AuthComponent,
    data: { mode: 'register' },
  },
];
