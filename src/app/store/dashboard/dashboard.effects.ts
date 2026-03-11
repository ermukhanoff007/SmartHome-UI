import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import * as DashboardActions from './dashboard.actions';
import { catchError, EMPTY, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedDashboard } from './dashboard.selector';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private api = inject(ApiService);
  private store = inject(Store);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      switchMap(({ dashboardId }) =>
        this.api.getDashboard(dashboardId).pipe(
          map((dashboard) => {
            return DashboardActions.loadDashboardSuccess({ dashboard });
          }),
          catchError((error) => of(DashboardActions.loadDashboardFailure({ error }))),
        ),
      ),
    ),
  );

  saveDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.saveChanges),
      withLatestFrom(this.store.select(selectSelectedDashboard)),
      switchMap(([action, dashboard]) => {
        if (!dashboard) return EMPTY;
        const id = action.dashboardId;
        return this.api.updateDashboard(id, dashboard).pipe(
          map((updatedDashboard) =>
            DashboardActions.saveChangesSuccess({ dashboard: updatedDashboard }),
          ),
          catchError((error) => of(DashboardActions.saveChangesFailure({ error: error.message }))),
        );
      }),
    ),
  );

  toggleDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.toggleDevice),
      switchMap(({ deviceId, newState }) =>
        this.api.patchDevice(deviceId, newState).pipe(
          map((device) => DashboardActions.toggleDeviceSuccess({ device })),
          catchError(() =>
            of(DashboardActions.toggleDeviceFailure({ deviceId, prevState: !newState })),
          ),
        ),
      ),
    ),
  );

  createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.createDashboard),
      switchMap(({ dashboard }) =>
        this.api.createDashboard(dashboard).pipe(
          map((dashboard) => DashboardActions.createDashboardSuccess({ dashboard })),
          catchError((error) => of(DashboardActions.createDashboardFailure({ error }))),
        ),
      ),
    ),
  );

  deleteDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.deleteDashboard),
      switchMap(({ dashboardId }) =>
        this.api.deleteDashboard(dashboardId).pipe(
          map(() => DashboardActions.deleteDashboardSuccess({ dashboardId })),
          catchError(() => of(DashboardActions.deleteDashboardFailure({ error: 'Delete failed' }))),
        ),
      ),
    ),
  );

  loadDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboards),
      mergeMap(() =>
        this.api.getDashboards().pipe(
          map((dashboards) => DashboardActions.loadDashboardsSuccess({ dashboards })),
          catchError((error) => of(DashboardActions.loadDashboardsFailure({ error }))),
        ),
      ),
    ),
  );
}
