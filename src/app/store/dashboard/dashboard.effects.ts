import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import * as DashboardActions from './dashboard.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class DashboardEffects {
  actions$ = inject(Actions);
  api = inject(ApiService);

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
}
