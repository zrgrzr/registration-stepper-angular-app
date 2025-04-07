import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator that checks if the `password` and `confirmPassword` fields match.
 */
export const passwordsMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password');
  const confirm = group.get('confirmPassword');
  if (!password || !confirm) return null;

  const mismatch = password.value !== confirm.value;
  const errors = confirm.errors ?? {};

  if (mismatch) {
    confirm.setErrors({ ...errors, passwordsMismatch: true });
  } else {
    delete errors['passwordsMismatch'];
    confirm.setErrors(Object.keys(errors).length ? errors : null);
  }

  return null;
};
