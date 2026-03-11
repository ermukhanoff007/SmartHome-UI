import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-add-dashboard-modal',
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatButton],
  templateUrl: './add-dashboard-modal.html',
  styleUrl: './add-dashboard-modal.scss',
})
export class AddDashboardModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddDashboardModal>);

  form = this.fb.group({
    id: ['', [Validators.required, Validators.maxLength(30)]],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    icon: ['', [Validators.required]],
  });

  save() {
    this.dialogRef.close({
      id: this.form.value.id,
      title: this.form.value.title,
      icon: this.form.value.icon,
    });
  }
  close(): void {
    this.dialogRef.close();
  }
}
