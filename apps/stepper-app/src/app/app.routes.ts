import { Route } from '@angular/router';

import { RegistrationStepperComponent } from './features/registration/registration-stepper/registration-stepper.component';
import { Step1Component } from './features/registration/step1/step1.component';
import { Step2Component } from './features/registration/step2/step2.component';
import { Step3Component } from './features/registration/step3/step3.component';
import { FinishComponent } from './features/registration/finish/finish.component';
import { StepGuard } from './core/guards/step.guard';

export const appRoutes: Route[] = [
  {
    path: 'register',
    component: RegistrationStepperComponent,
    children: [
      { path: 'step-1', component: Step1Component },
      { path: 'step-2', component: Step2Component, canActivate: [StepGuard] },
      { path: 'step-3', component: Step3Component, canActivate: [StepGuard] },
      { path: '', redirectTo: 'step-1', pathMatch: 'full' },
    ],
  },
  { path: 'register/finish', component: FinishComponent, canActivate: [StepGuard] },
  { path: '', redirectTo: '/register/step-1', pathMatch: 'full' },
  { path: '**', redirectTo: '/register/step-1' },
];
