import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private TOKEN_KEY = 'auth_token';

  get(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  set(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
