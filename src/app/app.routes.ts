import { Routes } from '@angular/router';
import { ElevatorListComponent } from './components/elevator-list/elevator-list.component';
import { ElevatorDetailComponent } from './components/elevator-detail/elevator-detail.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './guards/auth.guard';
import { MaintenanceListComponent } from './components/maintenance-list/maintenance-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'elevators',
    component: ElevatorListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'maintenance',
    component: MaintenanceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'elevators/:id',
    component: ElevatorDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'elevators/:id/print',
    component: ElevatorDetailComponent,
    canActivate: [AuthGuard],
    data: { print: true },
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
