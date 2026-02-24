import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');
export const selectSelectedDashboard = createSelector(
  selectDashboardState,
  (dashboardState) => dashboardState.selectedDashboard,
);
export const selectSelectedTab = createSelector(selectDashboardState, (dashboardState) => {
  if (!dashboardState.selectedTabId || !dashboardState.selectedTabId) return null;
  return (
    dashboardState.selectedDashboard?.tabs.find((t) => t.id === dashboardState.selectedTabId) ??
    dashboardState.selectedDashboard?.tabs[0]
  );
});
