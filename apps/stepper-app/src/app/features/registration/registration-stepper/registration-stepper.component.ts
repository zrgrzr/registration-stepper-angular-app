import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { FormProgressService } from '../../../core/services/form-progress.service';

@Component({
  selector: 'app-registration-stepper',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatStepperModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registration-stepper.component.html',
  styleUrls: ['./registration-stepper.component.scss'],
})
export class RegistrationStepperComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private progress = inject(FormProgressService);

  selectedIndex = signal(0);

  ngOnInit() {
    this.setStepIndex(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setStepIndex(event.urlAfterRedirects);
      }
    });
  }

  setStepIndex(url: string) {
    if (url.includes('step-1')) this.selectedIndex.set(0);
    else if (url.includes('step-2')) this.selectedIndex.set(1);
    else if (url.includes('step-3')) this.selectedIndex.set(2);
    else this.selectedIndex.set(0);
  }

  onStepChange(event: StepperSelectionEvent) {
    const targetIndex = event.selectedIndex;

    if (targetIndex === 1 && !this.progress.isStep1Valid()) return;
    if (
      targetIndex === 2 &&
      (!this.progress.isStep1Valid() || !this.progress.isStep2Valid())
    )
      return;

    const routes = ['/register/step-1', '/register/step-2', '/register/step-3'];
    this.router.navigate([routes[targetIndex]]);
  }

  get step1Control(): FormGroup {
    return this.progress.getStep1Form() ?? this.fb.group({});
  }

  get step2Control(): FormGroup {
    return this.progress.getStep2Form() ?? this.fb.group({});
  }

  get step3Control(): FormGroup {
    return this.progress.getStep3Form() ?? this.fb.group({});
  }
}
