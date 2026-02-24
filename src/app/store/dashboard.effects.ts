import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../services/api.service';
import * as dashboardActions from '../store/dashboard.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class DashboardEffects {
  private actions = inject(Actions);
  private api = inject(ApiService);

  loadDashboard$ = createEffect(() =>
    this.actions.pipe(
      ofType(dashboardActions.loadDashboard),
      switchMap(({ dashboardId }) =>
        this.api.getDashboard(dashboardId).pipe(
          map((dashboard) => dashboardActions.loadDasboardSucces({ dashboard })),
          catchError((error) => of(dashboardActions.loadDashboardFailure({ error }))),
        ),
      ),
    ),
  );
}
