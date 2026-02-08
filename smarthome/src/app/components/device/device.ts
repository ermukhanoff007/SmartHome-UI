import { Component, input, output } from '@angular/core';
import { Device } from '../../models/device';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-device',
  imports: [MatIcon, MatSlideToggle, NgClass],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class DeviceComponent {
  public device = input.required<Device>();

  public changeState = output<boolean>();

  onStateChange() {
    this.changeState.emit(!this.device().state);
  }
}
