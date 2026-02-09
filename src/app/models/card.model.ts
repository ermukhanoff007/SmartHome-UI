import { Device } from './device';
import { Sensor } from './sensor';

export type CardItem = Device | Sensor;

export type CardLayout = 'singleDevice' | 'horizontalLayout' | 'verticalLayout';

export interface Card {
  id: string;
  title: string;
  layout: CardLayout;
  items: CardItem[];
}
