import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { Card, CardItem } from '../../../models/card.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../../../models/device';
import { Sensor } from '../../../models/sensor';

@Component({
  selector: 'app-edit-card-modal',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
  ],
  templateUrl: './edit-card-modal.html',
  styleUrl: './edit-card-modal.scss',
})
export class EditCardModal implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditCardModal>);
  private data = inject<{ card: Card; devices: Device[] | Sensor[] }>(MAT_DIALOG_DATA);

  allEntities = signal<CardItem[]>([]);
  items = signal<CardItem[]>([]);

  form = this.fb.group({
    title: [''],
    selectedEntity: [null],
  });

  ngOnInit(): void {
    this.form.patchValue({
      title: this.data.card.title,
    });

    this.items.set([...this.data.card.items]);

    this.allEntities.set(this.data.devices);
  }

  addEntity(): void {
    const entity = this.form.value.selectedEntity;
    if (entity) {
      this.items.set([...this.items(), entity]);
      this.form.patchValue({ selectedEntity: null });
    }
  }
  removeEntity(idx: number): void {
    const updated = [...this.items()];
    updated.splice(idx, 1);
    this.items.set(updated);
  }
  submit() {
    this.dialogRef.close({
      title: this.form.value.title,
      items: this.items(),
    });
  }
  close(): void {
    this.dialogRef.close();
  }
}
