export interface SensorValue {
  amount: number;
  unit: string;
}

export interface Sensor {
  type: 'sensor';
  icon: string;
  label: string;
  value: SensorValue;
  id: string;
}
