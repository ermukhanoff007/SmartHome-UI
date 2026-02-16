import { Component, inject } from '@angular/core';

import { Tabs } from '../../feature/tabs/tabs';
import { CardList } from '../../components/card-list/card-list';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject, EMPTY, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Tabs, CardList, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private tabsService = inject(ApiService);
  protected tabs$ = this.tabsService.getDashboards();

  protected activeTabId$ = new BehaviorSubject<string | null>(null);

  protected activeDashboards$ = this.activeTabId$.pipe(
    switchMap((tabId) => {
      if (!tabId) return EMPTY;
      return this.tabsService.getDashboard(tabId);
    }),
  );

  onChange(id: string) {
    this.activeTabId$.next(id);
  }
}
