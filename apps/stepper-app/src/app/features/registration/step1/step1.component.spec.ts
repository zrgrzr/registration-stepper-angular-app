import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step1Component } from './step1.component';
import { Router } from '@angular/router';

import { FormProgressService } from '../../../core/services/form-progress.service';

const routerMock = {
  navigate: jest.fn()
};

const validFormValue = {
  email: 'test@example.com',
  password: '123456',
  confirmPassword: '123456'
};

const invalidFormValue = {
  email: '',
  password: '123',
  confirmPassword: '456'
};

describe('Step1Component', () => {
  let component: Step1Component;
  let fixture: ComponentFixture<Step1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1Component],
      providers: [
        { provide: Router, useValue: routerMock },
        FormProgressService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Step1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formGroup with controls', () => {
    const form = component.formGroup;

    expect(form.get('email')).toBeTruthy();
    expect(form.get('password')).toBeTruthy();
    expect(form.get('confirmPassword')).toBeTruthy();
  });

  it('should add passwordsMismatch error if passwords do not match', () => {
    component.formGroup.setValue(invalidFormValue);
    component.formGroup.get('confirmPassword')?.markAsTouched();
    const error = component.formGroup.get('confirmPassword')?.errors;

    expect(error?.['passwordsMismatch']).toBe(true);
  });

  it('should not navigate if form is invalid', () => {
    component.formGroup.setValue(invalidFormValue);
    component.goToStep2();

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to step-2 if form is valid', () => {
    component.formGroup.setValue(validFormValue);
    component.goToStep2();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/register/step-2']);
  });
});
