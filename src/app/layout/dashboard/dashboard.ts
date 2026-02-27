import { Component, inject, OnInit, signal } from '@angular/core';
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
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTabModal } from '../../feature/modals/add-tab-modal/add-tab-modal';

@Component({
  selector: 'app-dashboard',
  imports: [Tabs, CardList, AsyncPipe, MatIcon, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  editMode = signal(false);

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

  enterEdit() {
    this.store.dispatch(DashboardActions.enterEditMode());
    this.editMode.set(true);
  }

  save() {
    this.store.dispatch(DashboardActions.saveChanges());
    this.editMode.set(false);
  }

  discard() {
    this.store.dispatch(DashboardActions.discardChange());
    this.editMode.set(false);
  }

  openAddTabDialog() {
    const dialogRef = this.dialog.open(AddTabModal, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((title) => {
      if (!title) return;

      this.store.dispatch(DashboardActions.addTab({ title }));
    });
  }

  removeTab(tabId: string) {
    this.store.dispatch(DashboardActions.removeTab({ tabId }));
  }
  renameTab({ tabId, newTitle }: { tabId: string; newTitle: string }) {
    this.store.dispatch(DashboardActions.renameTab({ tabId, newTitle }));
  }
  moveTab({ tabId, direction }: { tabId: string; direction: 'left' | 'right' }) {
    this.store.dispatch(DashboardActions.reorderTab({ tabId, direction }));
  }
}
