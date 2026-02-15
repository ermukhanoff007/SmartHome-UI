import { Component, computed, signal } from '@angular/core';
import { Tab } from '../../models/tab';
import { MOCK_DATA } from '../../mocks/mock.data';
import { Tabs } from '../../feature/tabs/tabs';
import { CardList } from '../../components/card-list/card-list';

@Component({
  selector: 'app-dashboard',
  imports: [Tabs, CardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected tabs = signal<Tab[]>(MOCK_DATA);
  protected activeTabId = signal(this.tabs()[0].id);

  activeTab = computed(() => this.tabs().find((tab) => tab.id === this.activeTabId()));

  onChange(id: string) {
    this.activeTabId.set(id);
  }
}
