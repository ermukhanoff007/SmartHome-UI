import { Component, signal, inject, DestroyRef, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDashboardModal } from '../../feature/modals/add-dashboard-modal/add-dashboard-modal';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';
import { Store } from '@ngrx/store';
import { selectAllDashboards } from '../../store/dashboard/dashboard.selector';

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
export class Sidebar implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  authService = inject(AuthService);
  private dialog = inject(MatDialog);
  dashboards$ = this.store.select(selectAllDashboards);

  ngOnInit() {
    this.store.dispatch(DashboardActions.loadDashboards());
  }

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
        this.router.navigate(['/dashboard', dashboard.id]);
      }
    });
  }
}
