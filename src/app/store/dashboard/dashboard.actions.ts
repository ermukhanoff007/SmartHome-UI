import { createAction, props } from '@ngrx/store';
import { IDashboards } from '../../models/dashboard';

export const loadDashboard = createAction(
  '[Dashboard] Load Dashboard',
  props<{ dashboardId: string }>(),
);

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard success',
  props<{ dashboard: IDashboards }>(),
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard failure',
  props<{ error: string }>(),
);

export const selectTab = createAction('[Dashboard] Select Tab', props<{ tabId: string }>());

export const enterEditMode = createAction('[Dashboard] Enter Edit mode]');
export const exitEditMode = createAction('[Dashboard] Exit Edit Mode');
export const saveChanges = createAction('[Dashboard] Save Changes');
export const discardChange = createAction('[Dashboard] Discard Change');

export const addTab = createAction('[Dashboard] Add Tab', props<{ title: string }>());
export const removeTab = createAction('[Dashboard] Remove Tab', props<{ tabId: string }>());
export const renameTab = createAction(
  '[Dashboard] Rename Tab',
  props<{ tabId: string; newTitle: string }>(),
);
export const reorderTab = createAction(
  '[Dashboard] Reorder Tab',
  props<{ tabId: string; direction: 'left' | 'right' }>(),
);
