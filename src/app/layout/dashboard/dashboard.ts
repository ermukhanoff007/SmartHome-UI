import { Component, inject, OnInit } from '@angular/core';
import { Tabs } from '../../feature/tabs/tabs';
import { CardList } from '../../components/card-list/card-list';
import { AsyncPipe } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectSelectedDashboard,
  selectSelectedTab,
} from '../../store/dashboard/dashboard.selector';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  imports: [Tabs, CardList, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  dashboard$ = this.store.select(selectSelectedDashboard);
  tab$ = this.store.select(selectSelectedTab);

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const dashboardId = param.get('dashboardId');
      const tabId = param.get('tabId');

      if (!dashboardId) return;

      this.store.dispatch(DashboardActions.loadDashboard({ dashboardId }));

      if (tabId) {
        this.store.dispatch(DashboardActions.selectTab({ tabId }));
      }
    });
  }

  onChangeTab(tabId: string) {
    this.store.dispatch(DashboardActions.selectTab({ tabId }));
  }
}
