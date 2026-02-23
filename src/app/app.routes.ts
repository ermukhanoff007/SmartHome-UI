import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginPage } from './layout/login/login';
import { NotFound } from './layout/not-found/not-found';
import { Sidebar } from './layout/sidebar/sidebar';
import { dashboardResolver } from './dashboard.resolver';

export const routes: Routes = [
  { path: 'login', component: LoginPage },

  {
    path: 'dashboard',
    component: Sidebar,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        resolve: { routeData: dashboardResolver },

        loadComponent: () => import('./layout/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: ':dashboardId',
        resolve: { routeData: dashboardResolver },
        loadComponent: () => import('./layout/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: ':dashboardId/:tabId',
        resolve: { routeData: dashboardResolver },
        loadComponent: () => import('./layout/dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', component: NotFound },
];
