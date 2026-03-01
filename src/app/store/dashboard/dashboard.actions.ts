import { createAction, props } from '@ngrx/store';
import { IDashboards } from '../../models/dashboard';
import { CardLayout } from '../../models/card.model';
import { Device } from '../../models/device';
import { Sensor } from '../../models/sensor';

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

export const createDashboard = createAction(
  '[Dashboard] Create Dashboard',
  props<{ dashboard: IDashboards }>(),
);

export const createDashboardSuccess = createAction(
  '[Dashboard] Create DashboardSuccess',
  props<{ dashboard: IDashboards }>(),
);

export const createDashboardFailure = createAction(
  '[Dashboard] Create Dashboard Failure',
  props<{ error: string }>(),
);

export const deleteDashboard = createAction(
  '[Dashboard] Delete Dashboard',
  props<{ dashboardId: string }>(),
);
export const deleteDashboardSuccess = createAction(
  '[Dashboard API] Delete Dashboard Success',
  props<{ dashboardId: string }>(),
);

export const deleteDashboardFailure = createAction(
  '[Dashboard API] Delete Dashboard Failure',
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

export const addCard = createAction(
  ' Dashboard] Add Card',
  props<{ tabId: string; layout: CardLayout; title: string }>(),
);

export const editCardContent = createAction(
  '[Dashboard] Edit Card',
  props<{ tabId: string; cardId: string; title: string; items: (Device | Sensor)[] }>(),
);

export const reorderCard = createAction(
  '[Dashboard] Reorder Card',
  props<{ tabId: string; cardId: string; newIdx: number }>(),
);

export const toggleDevice = createAction(
  '[Dashboard] Toggle Device',
  props<{ deviceId: string; newState: boolean }>(),
);

export const toggleDeviceSuccess = createAction(
  '[Dashboard] Toggle Device Success',
  props<{ device: Device }>(),
);

export const toggleDeviceFailure = createAction(
  '[Dashboard] Toggle Device Failure',
  props<{ deviceId: string; prevState: boolean }>(),
);
