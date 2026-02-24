import { IDashboards } from '../../models/dashboard';

export interface DashboardState {
  selectedDashboard: IDashboards | null;
  selectedTabId: string | null;
  snapshot: IDashboards | null;
  loading: boolean;
  error: string | null;
}

export const initialState: DashboardState = {
  selectedDashboard: null,
  selectedTabId: null,
  snapshot: null,
  loading: false,
  error: null,
};
