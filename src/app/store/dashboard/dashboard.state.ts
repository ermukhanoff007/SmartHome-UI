import { IDashboards } from '../../models/dashboard';

export interface DashboardState {
  dashboards: IDashboards[];
  selectedDashboard: IDashboards | null;
  selectedTabId: string | null;
  snapshot: IDashboards | null;
  loading: boolean;
  error: string | null;
}

export const initialState: DashboardState = {
  dashboards: [],
  selectedDashboard: null,
  selectedTabId: null,
  snapshot: null,
  loading: false,
  error: null,
};
