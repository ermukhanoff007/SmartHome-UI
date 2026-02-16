import { Component, inject } from '@angular/core';
import { Tabs } from '../../feature/tabs/tabs';
import { CardList } from '../../components/card-list/card-list';
import { AsyncPipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [Tabs, CardList, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  dashboardService = inject(DashboardService);
  selectedTabId$ = new BehaviorSubject<string | null>(null);

  selectedTab$ = combineLatest([
    this.dashboardService.selectedDashboard$,
    this.selectedTabId$,
  ]).pipe(
    map(([dashboard, tabId]) => {
      if (!dashboard) return null;

      if (!tabId) {
        return dashboard.tabs[0];
      }
      return dashboard.tabs.find((tab) => tab.id === tabId) ?? dashboard.tabs[0];
    }),
  );

  onChangeTab(tabId: string) {
    this.selectedTabId$.next(tabId);
  }
}
