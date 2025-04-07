import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormProgressService } from '../../../core/services/form-progress.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './step2.component.html',
})
export class Step2Component {
  private fb = inject(FormBuilder);
  private progress = inject(FormProgressService);
  private router = inject(Router);

  formGroup: FormGroup = this.fb.group({
    industry: [''],
    experienceInYears: [
      '',
      [Validators.required, Validators.min(0), Validators.max(50)],
    ],
    yourRole: [''],
  });

  constructor() {
    const saved = this.progress.step2Data();
    if (saved) {
      this.formGroup.patchValue(saved);
    }

    this.progress.setStep2(this.formGroup);
  }

  onNext() {
    if (this.formGroup.invalid) return;
    this.router.navigate(['/register/step-3']);
  }

  onBack() {
    this.router.navigate(['/register/step-1']);
  }
}
