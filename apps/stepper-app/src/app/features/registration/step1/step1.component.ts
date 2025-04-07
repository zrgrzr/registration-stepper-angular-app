import { Component, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormProgressService } from '../../../core/services/form-progress.service';
import { passwordsMatchValidator } from '../../../core/validators/passwords-match.validator';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './step1.component.html',
})
export class Step1Component {
  private fb = inject(FormBuilder);
  private progress = inject(FormProgressService);
  private router = inject(Router);

  formGroup: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [passwordsMatchValidator],
    }
  );

  constructor() {
    const saved = this.progress.step1Data();
    if (saved) {
      this.formGroup.patchValue(saved);
    }
    this.progress.setStep1(this.formGroup);
  }

  private _hidePassword = signal(true);
  hidePassword = computed(() => this._hidePassword());

  togglePassword() {
    this._hidePassword.update((v) => !v);
  }

  passwordMismatch() {
    return (
      this.formGroup.hasError('passwordsMismatch') &&
      this.formGroup.get('confirmPassword')?.touched
    );
  }

  goToStep2() {
    if (this.formGroup.valid && !this.passwordMismatch()) {
      this.router.navigate(['/register/step-2']);
    }
  }
}
