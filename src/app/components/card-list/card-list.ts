import { Component, input } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardItem } from '../card-item/card-item';

@Component({
  selector: 'app-card-list',
  imports: [CardItem],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  public cards = input.required<Card[]>();
}
