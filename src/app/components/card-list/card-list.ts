import { Component, input, output } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardItem } from '../card-item/card-item';

@Component({
  selector: 'app-card-list',
  imports: [CardItem],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
  standalone: true,
})
export class CardList {
  public cards = input.required<Card[]>();
  tabId = input.required<string>();
  editMode = input.required<boolean>();

  moveCard = output<{ tabId: string; cardId: string; newIdx: number }>();

  edit = output<{ tabId: string; card: Card }>();

  onEdit(event: { tabId: string; card: Card }) {
    this.edit.emit(event);
  }

  onMove(event: { tabId: string; cardId: string; newIdx: number }) {
    this.moveCard.emit(event);
  }
}
