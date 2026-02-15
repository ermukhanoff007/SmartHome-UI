import { Component, input, output } from '@angular/core';
import { Tab } from '../../models/tab';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-tabs',
  imports: [MatTabGroup, MatTab],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  tabs = input<Tab[]>([]);
  OnChangeTab = output<string>();

  onTabChange(index: number) {
    const tab = this.tabs()[index];
    if (tab) {
      this.OnChangeTab.emit(tab.id);
    }
  }
}
