import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectSelectedDashboard = createSelector(
  selectDashboardState,
  (dashboardState) => dashboardState.selectedDashboard,
);

export const selectAllDashboards = createSelector(
  selectDashboardState,
  (dashboardState) => dashboardState.dashboards,
);

export const selectSelectedTab = createSelector(selectDashboardState, (state) => {
  if (!state.selectedDashboard) return null;

  return state.selectedDashboard.tabs?.find((tab) => tab.id === state.selectedTabId) ?? null;
});
