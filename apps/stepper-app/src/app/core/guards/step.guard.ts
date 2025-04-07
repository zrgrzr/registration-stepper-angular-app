import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { FormProgressService } from '../services/form-progress.service';

/**
 * Route guard that ensures users can only access registration steps sequentially.
 * @param _
 * @param state - current router state
 */
export const StepGuard: CanActivateFn = (_, state) => {
  const router = inject(Router);
  const progress = inject(FormProgressService);

  const isStep1Valid = progress.isStep1Valid();
  const isStep2Valid = progress.isStep2Valid();
  const isStep3Valid = progress.isStep3Valid?.();

  const redirectToStep1 = () => router.parseUrl('/register/step-1');
  const url = state.url;

  const stepRequirements: Record<string, boolean> = {
    'step-2': isStep1Valid,
    'step-3': isStep1Valid && isStep2Valid,
    finish: isStep1Valid && isStep2Valid && isStep3Valid,
  };

  for (const [step, isValid] of Object.entries(stepRequirements)) {
    if (url.includes(step) && !isValid) {
      return redirectToStep1();
    }
  }

  return true;
};
