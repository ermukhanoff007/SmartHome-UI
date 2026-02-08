import { Component, computed, input } from '@angular/core';
import { Card } from '../../models/card.model';
import { Device } from '../../models/device';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { SensorComponent } from '../sensor/sensor';
import { DeviceComponent } from '../device/device';

@Component({
  selector: 'app-card-item',
  imports: [MatSlideToggle, SensorComponent, DeviceComponent],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss',
})
export class CardItem {
  public card = input.required<Card>();

  devices = computed<Device[]>(
    () => this.card()?.items.filter((i) => i.type === 'device') as Device[],
  );
  hasGroupToggle = computed(() => this.devices().length >= 2);

  groupState = computed(() => this.devices().some((d) => d.state));

  toggleAll(value: boolean) {
    this.devices().forEach((device) => {
      device.state = value;
    });
  }

  updateDevice(device: Device, state: boolean): void {
    device.state = state;
  }

  protected readonly onchange = onchange;
}
