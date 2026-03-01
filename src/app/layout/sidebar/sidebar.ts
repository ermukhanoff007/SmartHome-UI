import { Component, signal, inject, DestroyRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDashboardModal } from '../../feature/modals/add-dashboard-modal/add-dashboard-modal';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';
import { Store } from '@ngrx/store';

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
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    RouterOutlet,
    MatButton,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
})
export class Sidebar {
  dashboardService = inject(DashboardService);
  authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private store = inject(Store);

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

  addDashboard(): void {
    const dialogRef = this.dialog.open(AddDashboardModal);

    dialogRef.afterClosed().subscribe((dashboard) => {
      if (dashboard) {
        this.store.dispatch(DashboardActions.createDashboard({ dashboard }));
      }
    });
  }
}
