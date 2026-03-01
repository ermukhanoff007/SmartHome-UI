import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { ApiService } from '../../../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Card, CardItem } from '../../../models/card.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  private service = inject(ApiService);
  private dialogRef = inject(MatDialogRef<EditCardModal>);
  private data = inject<Card>(MAT_DIALOG_DATA);

  allEntites = signal<CardItem[]>([]);
  items = signal<CardItem[]>([]);

  form = this.fb.group({
    title: [''],
    selectedEntity: [null],
  });

  ngOnInit(): void {
    this.form.patchValue({
      title: this.data.title,
    });

    this.items.set([...this.data.items]);

    this.service.getDevices().subscribe((devices) => {
      this.allEntites.set(devices);
    });
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
