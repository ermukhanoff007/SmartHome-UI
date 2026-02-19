import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from './services/api.service';

export interface DashboardRouteData {
  dashboardId: string;
  tabId: string | null;
}

export const dashboardResolver: ResolveFn<DashboardRouteData> = (route) => {
  const api = inject(ApiService);
  const router = inject(Router);

  const requestedDashboardId = route.paramMap.get('dashboardId');
  const requestedTabId = route.paramMap.get('tabId') ?? null;

  return api.getDashboards().pipe(
    switchMap((dashboards) => {
      if (!dashboards || dashboards.length === 0) {
        return of({ dashboardId: '', tabId: null });
      }

      const dashboardIds = dashboards.map((d: { id: string }) => d.id);
      const validDashboardId = dashboardIds.includes(requestedDashboardId ?? '')
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          requestedDashboardId!
        : dashboardIds[0];

      if (validDashboardId !== requestedDashboardId) {
        router.navigate(['/dashboard', validDashboardId], { replaceUrl: true });
        return of({ dashboardId: validDashboardId, tabId: null });
      }

      return api.getDashboard(validDashboardId).pipe(
        map((dashboard: { tabs: { id: string }[] } | null) => {
          if (!dashboard || !dashboard.tabs?.length) {
            return { dashboardId: validDashboardId, tabId: null };
          }

          const tabIds = dashboard.tabs.map((t) => t.id);
          const validTabId =
            requestedTabId && tabIds.includes(requestedTabId) ? requestedTabId : tabIds[0];

          if (requestedTabId && validTabId !== requestedTabId) {
            router.navigate(['/dashboard', validDashboardId, validTabId], {
              replaceUrl: true,
            });
          }

          return { dashboardId: validDashboardId, tabId: validTabId };
        }),
      );
    }),
    catchError(() => {
      router.navigate(['/not-found']);
      return of({ dashboardId: '', tabId: null });
    }),
  );
};
