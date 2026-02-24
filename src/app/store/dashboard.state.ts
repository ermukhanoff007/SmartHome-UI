import { IDashboards } from '../models/dashboard';

export interface DashboardState {
  selectedDashboard: IDashboards | null;
  selectedTabId: string | null;
  error: string | null;
  loading: boolean;
  snapshot: IDashboards | null;
}

export const initialState: DashboardState = {
  selectedDashboard: null,
  selectedTabId: null,
  error: null,
  loading: false,
  snapshot: null,
};
