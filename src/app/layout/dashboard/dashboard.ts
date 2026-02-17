import { Component, inject, OnInit } from '@angular/core';
import { Tabs } from '../../feature/tabs/tabs';
import { CardList } from '../../components/card-list/card-list';
import { AsyncPipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DashboardRouteData } from '../../dashboard.resolver';

@Component({
  selector: 'app-dashboard',
  imports: [Tabs, CardList, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  dashboardService = inject(DashboardService);
  private route = inject(ActivatedRoute);
  selectedTabId$ = new BehaviorSubject<string | null>(null);

  isEmpty$ = this.route.data.pipe(
    map((data) => {
      const routeData = data['routeData'] as DashboardRouteData;
      return !routeData?.dashboardId;
    }),
  );

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const routeData = data['routeData'] as DashboardRouteData;
      if (!routeData?.dashboardId) return;

      this.dashboardService.setFromRoute(routeData.dashboardId);
      this.selectedTabId$.next(routeData.tabId ?? null);
    });
  }

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
