import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardDetail, IDashboards } from '../models/dashboard';
import { Device } from '../models/device';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = 'http://localhost:3004';

  login(userName: string, password: string) {
    return this.http.post<{ token: string }>(`${this.base}/user/login`, { userName, password });
  }

  profile() {
    return this.http.get<{
      fullName: string;
      initials: string;
    }>(`${this.base}/user/profile`);
  }

  getDashboards() {
    return this.http.get<IDashboards[]>(`${this.base}/dashboards`);
  }

  getDashboard(id: string) {
    return this.http.get<DashboardDetail>(`${this.base}/dashboards/${id}`);
  }

  updateDashboard(id: string, data: DashboardDetail) {
    return this.http.put<DashboardDetail>(`${this.base}/dashboards/${id}`, data);
  }

  deleteDashboard(id: string) {
    return this.http.delete(`${this.base}/dashboards/${id}`);
  }
  getDevices() {
    return this.http.get<Device[]>(`${this.base}/devices`);
  }

  patchDevice(id: string, state: boolean) {
    return this.http.patch<Device>(`${this.base}/devices/${id}`, { state });
  }
}
