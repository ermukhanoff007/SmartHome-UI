import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  private authSubject = new BehaviorSubject<boolean>(false);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.init();
  }

  init() {
    const token = this.tokenService.get();

    if (!token) {
      this.authSubject.next(false);
      return;
    }
    this.api.profile().subscribe({
      next: (profile) => {
        this.userSubject.next(profile);
        this.authSubject.next(true);
      },
      error: () => {
        this.logout();
      },
    });
  }

  login(username: string, password: string) {
    this.api.login(username, password).subscribe({
      next: (res) => {
        this.tokenService.set(res.token);
        this.api.profile().subscribe({
          next: (profile) => {
            this.userSubject.next(profile);
            this.authSubject.next(true);
            this.router.navigate(['/dashboard']);
          },
        });
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Invalid login or password.');
        } else {
          alert('Unknown error.');
        }
      },
    });
  }

  logout() {
    this.tokenService.clear();
    this.userSubject.next(null);
    this.authSubject.next(false);
    this.router.navigate(['/login']);
  }
}
