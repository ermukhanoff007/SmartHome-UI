import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Sensor } from '../../models/sensor';
import { FormatValue } from '../../pipes/formatSensorPipe';
import { CardLayout } from '../../models/card.model';

@Component({
  selector: 'app-sensor',
  imports: [MatIcon, FormatValue],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class SensorComponent {
  public sensor = input.required<Sensor>();
  public layout = input.required<CardLayout>();
}
