import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private api = inject(ApiService);
  dashboards$ = this.api.getDashboards();

  selectedDashboardId$ = new BehaviorSubject<string>('overview');

  selectedDashboard$ = this.selectedDashboardId$.pipe(
    switchMap((dashboardId: string) => {
      return this.api.getDashboard(dashboardId);
    }),
  );
  selectDashboard(id: string) {
    this.selectedDashboardId$.next(id);
  }
}
