import { Component, inject, OnInit } from '@angular/core';
import { Tabs } from '../../feature/tabs/tabs';
import { CardList } from '../../components/card-list/card-list';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSelectedDashboard, selectSelectedTab } from '../../store/dashboard.selectors';
import * as dashboardActions from '../../store/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  imports: [Tabs, CardList, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  dashboard$ = this.store.select(selectSelectedDashboard);
  tab$ = this.store.select(selectSelectedTab);

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const dashboardId = paramMap.get('dashboardId');
      const tabId = paramMap.get('tabId');

      if (!dashboardId) return;

      this.store.dispatch(dashboardActions.loadDashboard({ dashboardId }));

      if (tabId) {
        this.store.dispatch(dashboardActions.selectTab({ tabId }));
      }
    });
  }

  onChangeTab(tabId: string) {
    this.store.dispatch(dashboardActions.selectTab({ tabId }));
  }
}
