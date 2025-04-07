import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { FormProgressService } from './form-progress.service';

let fb: FormBuilder;

const createStep1Form = (): FormGroup =>
  fb.group({
    email: ['test@example.com'],
    password: ['123'],
    confirmPassword: ['123'],
  });

const createStep2Form = (): FormGroup =>
  fb.group({
    industry: ['it'],
    yourRole: ['developer'],
    experienceInYears: [5],
  });

const createStep3Form = (): FormGroup =>
  fb.group({
    aboutUs: ['Some text'],
  });

describe('FormProgressService', () => {
  let service: FormProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormProgressService],
    });

    service = TestBed.inject(FormProgressService);
    fb = new FormBuilder();
  });

  it('should set and return step1 form', () => {
    const form = createStep1Form();
    service.setStep1(form);

    expect(service.getStep1Form()).toBe(form);
  });

  it('should set and return step2 form', () => {
    const form = createStep2Form();
    service.setStep2(form);

    expect(service.getStep2Form()).toBe(form);
  });

  it('should set and return step3 form', () => {
    const form = createStep3Form();
    service.setStep3(form);

    expect(service.getStep3Form()).toBe(form);
  });
});
