import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormProgressService } from '../../../core/services/form-progress.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './step3.component.html',
})
export class Step3Component {
  private fb = inject(FormBuilder);
  private progress = inject(FormProgressService);
  private router = inject(Router);

  formGroup: FormGroup = this.fb.group({
    aboutUs: [''],
  });

  constructor() {
    const saved = this.progress.step3Data();
    if (saved) {
      this.formGroup.patchValue(saved);
    }

    this.progress.setStep3(this.formGroup);
  }

  onFinish() {
    if (this.formGroup.invalid) return;

    const result = this.progress.getFinalData();
    this.router.navigate(['/register/finish'], { state: result });
  }

  onBack() {
    this.router.navigate(['/register/step-2']);
  }
}
