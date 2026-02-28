import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CardLayout } from '../../../models/card.model';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-card-modal',
  imports: [MatButton, MatFormField, MatLabel, MatInput, ReactiveFormsModule],
  templateUrl: './add-card-modal.html',
  styleUrl: './add-card-modal.scss',
})
export class AddCardModal {
  private dialogRef = inject(MatDialogRef<AddCardModal>);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: [''],
  });
  selectedLayout: CardLayout | null = null;

  select(layout: CardLayout) {
    this.selectedLayout = layout;
  }
  save() {
    if (!this.selectedLayout) return;

    this.dialogRef.close({
      layout: this.selectedLayout,
      title: this.form.value.title || null,
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
