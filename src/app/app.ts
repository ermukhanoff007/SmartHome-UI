import { Component, inject } from '@angular/core';
import { Sidebar } from './layout/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  auth = inject(AuthService);

  constructor() {
    this.auth.init();
  }
}
