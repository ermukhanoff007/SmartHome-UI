import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectSelectedDashboard = createSelector(
  selectDashboardState,
  (dashboardState: DashboardState) => dashboardState.selectedDashboard,
);
export const selectSelectedTab = createSelector(
  selectDashboardState,
  (dashboardState: DashboardState) => {
    if (!dashboardState.selectedDashboard || !dashboardState.selectedTabId) return null;
    return (
      dashboardState.selectedDashboard.tabs.find(
        (tab) => tab.id === dashboardState.selectedTabId,
      ) ?? dashboardState.selectedDashboard.tabs[0]
    );
  },
);
