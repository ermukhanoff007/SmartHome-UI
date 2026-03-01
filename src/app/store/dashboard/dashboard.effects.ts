import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import * as DashboardActions from './dashboard.actions';
import { catchError, EMPTY, map, of, switchMap, withLatestFrom } from 'rxjs';
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
          map((dashboard) => DashboardActions.loadDashboardSuccess({ dashboard })),
          catchError((error) => of(DashboardActions.loadDashboardFailure({ error }))),
        ),
      ),
    ),
  );

  saveDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.saveChanges),
      withLatestFrom(this.store.select(selectSelectedDashboard)),
      switchMap(([_, dashboard]) => {
        if (!dashboard) return EMPTY;
        return this.api.updateDashboard(dashboard.id, dashboard).pipe(
          map(() => DashboardActions.exitEditMode()),
          catchError((error) => of(DashboardActions.loadDashboardFailure({ error }))),
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
}
