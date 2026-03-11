import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-add-tab-modal',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './add-tab-modal.html',
  styleUrl: './add-tab-modal.scss',
})
export class AddTabModal {
  private fb = inject(FormBuilder);
  private dialofRef = inject(MatDialogRef<AddTabModal>);

  form = this.fb.group({
    title: ['', [Validators.required]],
  });

  setInitialValue(title: string) {
    this.form.patchValue({ title });
  }

  submit() {
    if (this.form.invalid) return;

    this.dialofRef.close(this.form.value.title);
  }

  close() {
    this.dialofRef.close();
  }
}
