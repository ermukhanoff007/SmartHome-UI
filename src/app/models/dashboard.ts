import { Tab } from './tab';

export interface IDashboards {
  id: string;
  title: string;
  icon: string;
  tabs: Tab[];
}
