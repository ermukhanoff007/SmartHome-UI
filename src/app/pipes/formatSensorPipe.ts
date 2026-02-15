import { Pipe, PipeTransform } from '@angular/core';
import { Sensor } from '../models/sensor';
@Pipe({
  name: 'formatValue',
  pure: true,
})
export class FormatValue implements PipeTransform {
  transform(obj: Sensor): string {
    return `${obj.value.amount} ${obj.value.unit}`;
  }
}
