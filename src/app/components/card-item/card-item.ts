import { Component, computed, inject, input, output } from '@angular/core';
import { Card } from '../../models/card.model';
import { Device } from '../../models/device';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { SensorComponent } from '../sensor/sensor';
import { DeviceComponent } from '../device/device';
import { ActiveHighlight } from '../../directives/active-highlight';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';

@Component({
  selector: 'app-card-item',
  imports: [MatSlideToggle, SensorComponent, DeviceComponent, ActiveHighlight, MatIcon],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss',
})
export class CardItem {
  public card = input.required<Card>();
  private store = inject(Store);
  tabId = input.required<string>();
  editModeActive = input.required<boolean>();
  index = input.required<number>();
  total = input.required<number>();

  edit = output<{ tabId: string; card: Card }>();
  reorder = output<{ tabId: string; cardId: string; newIdx: number }>();

  devices = computed<Device[]>(
    () => this.card()?.items.filter((i) => i.type === 'device') as Device[],
  );
  hasGroupToggle = computed(() => this.devices().length >= 2);

  groupState = computed(() => this.devices().some((d) => d.state));

  toggleAll(value: boolean) {
    this.devices().forEach((device) => {
      this.store.dispatch(DashboardActions.toggleDevice({ deviceId: device.id, newState: value }));
    });
  }

  updateDevice(device: Device, state: boolean): void {
    this.store.dispatch(DashboardActions.toggleDevice({ deviceId: device.id, newState: state }));
  }

  onEdit() {
    this.edit.emit({
      tabId: this.tabId(),
      card: this.card(),
    });
  }
  moveLeft() {
    if (this.index() === 0) return;

    this.reorder.emit({
      tabId: this.tabId(),
      cardId: this.card().id,
      newIdx: this.index() - 1,
    });
  }

  moveRight() {
    if (this.index() === this.total()) return;

    this.reorder.emit({
      tabId: this.tabId(),
      cardId: this.card().id,
      newIdx: this.index() + 1,
    });
  }
}
