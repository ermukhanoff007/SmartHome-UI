import { Component } from '@angular/core';
import { Sidebar } from './layout/sidebar/sidebar';

/* eslint-disable @typescript-eslint/no-extraneous-class */
@Component({
  selector: 'app-root',
  imports: [Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
/* eslint-enable @typescript-eslint/no-extraneous-class */
