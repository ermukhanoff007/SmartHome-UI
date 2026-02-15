import { Component, signal, inject, DestroyRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatIcon,
    MatNavList,
    MatListItem,
    MatSidenavContent,
    MatIconButton,
    Dashboard,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  public isMobile = signal(false);
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  constructor() {
    this.breakpointObserver
      .observe('(max-width: 800px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.isMobile.set(value.matches);
      });
  }
}
