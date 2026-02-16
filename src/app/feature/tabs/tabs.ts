import { Component, input, output } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { IDashboards } from '../../models/dashboard';

@Component({
  selector: 'app-tabs',
  imports: [MatTabGroup, MatTab],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  tabs = input<IDashboards[]>([]);
  OnChangeTab = output<string>();

  onTabChange(index: number) {
    const tab = this.tabs()[index];
    if (tab) {
      this.OnChangeTab.emit(tab.id);
    }
  }
}
