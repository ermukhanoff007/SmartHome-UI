import { createReducer, on } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { initialState } from './dashboard.state';
import { toKebab } from '../../utils/to-kebab.function';

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
    selectedTabId: dashboard.tabs[0].id ?? null,
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

  on(dashboardActions.addTab, (state, { title }) => {
    if (!state.selectedDashboard) return state;

    const baseId = toKebab(title);

    let uniqueId = baseId;
    let counter = 1;

    while (state.selectedDashboard.tabs.some((tab) => tab.id === uniqueId)) {
      uniqueId = `${baseId}-${counter++}`;
    }

    const newTab = {
      id: uniqueId,
      title,
      cards: [],
    };

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: [...state.selectedDashboard.tabs, newTab],
      },
    };
  }),
);
