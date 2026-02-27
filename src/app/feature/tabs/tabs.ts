import { Component, inject, input, output } from '@angular/core';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { Tab } from '../../models/tab';
import { MatDialog } from '@angular/material/dialog';
import { AddTabModal } from '../modals/add-tab-modal/add-tab-modal';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-tabs',
  imports: [MatTabGroup, MatTab, MatIcon, MatTabLabel, MatIconButton],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  standalone: true,
})
export class Tabs {
  tabs = input<Tab[]>([]);
  editMode = input<boolean>();
  private dialog = inject(MatDialog);
  renameTab = output<{ tabId: string; newTitle: string }>();
  removeTab = output<string>();
  tabMove = output<{ tabId: string; direction: 'left' | 'right' }>();

  OnChangeTab = output<string>();

  onTabRename(tabId: string, currentTitle: string) {
    const dialogRef = this.dialog.open(AddTabModal);
    dialogRef.componentInstance.setInitialValue(currentTitle);
    dialogRef.afterClosed().subscribe((newTitle: string) => {
      if (newTitle) this.renameTab.emit({ tabId, newTitle });
    });
  }

  onTabChange(index: number) {
    const tab = this.tabs()[index];
    if (tab) {
      this.OnChangeTab.emit(tab.id);
    }
  }

  onTabMove(tabId: string, direction: 'left' | 'right') {
    this.tabMove.emit({ tabId, direction });
  }
}
