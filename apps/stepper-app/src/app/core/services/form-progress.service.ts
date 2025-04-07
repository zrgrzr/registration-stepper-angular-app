import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RegistrationData } from '../model/registration.model';

@Injectable({ providedIn: 'root' })
export class FormProgressService {
  private step1Form = signal<FormGroup | null>(null);
  private step2Form = signal<FormGroup | null>(null);
  private step3Form = signal<FormGroup | null>(null);

  step1Data = signal<RegistrationData['step1'] | null>(null);
  step2Data = signal<RegistrationData['step2'] | null>(null);
  step3Data = signal<RegistrationData['step3'] | null>(null);

  setStep1(form: FormGroup) {
    this.step1Form.set(form);
    form.valueChanges.subscribe((value) => {
      this.step1Data.set(value);
    });
  }

  setStep2(form: FormGroup) {
    this.step2Form.set(form);
    form.valueChanges.subscribe((value) => {
      this.step2Data.set(value);
    });
  }

  setStep3(form: FormGroup) {
    this.step3Form.set(form);
    form.valueChanges.subscribe((value) => {
      this.step3Data.set(value);
    });
  }

  getFinalData() {
    const step1 = this.step1Data();
    const step2 = this.step2Data();
    const step3 = this.step3Data();

    const { password, ...safeStep1 } = step1 || {};
    return { ...safeStep1, ...step2, ...step3 };
  }

  isStep1Valid(): boolean {
    return this.step1Form()?.valid ?? false;
  }

  isStep2Valid(): boolean {
    return this.step2Form()?.valid ?? false;
  }

  isStep3Valid(): boolean {
    return this.step3Form()?.valid ?? false;
  }

  getStep1Form(): FormGroup | null {
    return this.step1Form();
  }
  getStep2Form(): FormGroup | null {
    return this.step2Form();
  }
  getStep3Form(): FormGroup | null {
    return this.step3Form();
  }
}
