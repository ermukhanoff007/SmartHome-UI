import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginPage } from './layout/login/login';
import { NotFound } from './layout/not-found/not-found';
import { Sidebar } from './layout/sidebar/sidebar';

export const routes: Routes = [
  { path: 'login', component: LoginPage },

  {
    path: 'dashboard',
    component: Sidebar,
    canActivate: [authGuard],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', component: NotFound },
];
