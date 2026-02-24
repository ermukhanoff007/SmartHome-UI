import { createReducer, on } from '@ngrx/store';
import { initialState } from './dashboard.state';
import * as dashboardActions from './dashboard.actions';

export const DashboardReducer = createReducer(
  initialState,
  on(dashboardActions.loadDashboard, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(dashboardActions.loadDasboardSucces, (state, { dashboard }) => ({
    ...state,
    loading: false,
    selectedDashboard: dashboard,
  })),

  on(dashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  on(dashboardActions.enterEditMode, (state) => ({
    ...state,
    snapshot: structuredClone(state.selectedDashboard),
  })),

  on(dashboardActions.exitEditMode, (state) => ({
    ...state,
    snapshot: null,
  })),

  on(dashboardActions.discardChanges, (state) => ({
    ...state,
    selectedDashboard: state.snapshot,
  })),

  on(dashboardActions.selectTab, (state, { tabId }) => ({
    ...state,
    selectedTabId: tabId,
  })),
);
