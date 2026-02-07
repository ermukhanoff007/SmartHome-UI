import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Dashboard } from './layout/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
