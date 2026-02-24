import { createAction, props } from '@ngrx/store';
import { IDashboards } from '../models/dashboard';

export const loadDashboard = createAction(
  '[Dashboard] Load Dashboard',
  props<{ dashboardId: string }>(),
);

export const loadDasboardSucces = createAction(
  '[Dashboard] Load Dahboard Succes',
  props<{ dashboard: IDashboards }>(),
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dahboard Failure',
  props<{ error: string }>(),
);

export const enterEditMode = createAction('[Dashboard] Enter EditMode');

export const exitEditMode = createAction('[Dashboard] Exit EditMode');

export const discardChanges = createAction('[Dashboard] Discard Changes');

export const selectTab = createAction('[Dashboard] Select Tab', props<{ tabId: string }>());
