import { createReducer, on } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { initialState } from './dashboard.state';

export const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.loadDashboard, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(dashboardActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    loading: false,
  })),

  on(dashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  on(dashboardActions.selectTab, (state, { tabId }) => ({
    ...state,
    selectedTabId: tabId,
  })),

  on(dashboardActions.enterEditMode, (state) => ({
    ...state,
    snapshot: structuredClone(state.selectedDashboard),
  })),

  on(dashboardActions.exitEditMode, (state) => ({
    ...state,
    snapshot: null,
  })),

  on(dashboardActions.discardChange, (state) => ({
    ...state,
    snapshot: null,
    selectedDashboard: state.snapshot,
  })),
);
