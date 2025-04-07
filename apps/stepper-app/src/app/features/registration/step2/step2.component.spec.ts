import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step2Component } from './step2.component';
import { Router } from '@angular/router';

import { FormProgressService } from '../../../core/services/form-progress.service';

const routerMock = {
  navigate: jest.fn(),
};

const validFormData = {
  industry: 'it',
  experienceInYears: 5,
  yourRole: 'developer',
};

const invalidFormData = {
  industry: '',
  experienceInYears: '',
  yourRole: '',
};

describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2Component],
      providers: [
        { provide: Router, useValue: routerMock },
        FormProgressService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Step2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    routerMock.navigate.mockClear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formGroup with controls', () => {
    const form = component.formGroup;

    expect(form.get('industry')).toBeTruthy();
    expect(form.get('experienceInYears')).toBeTruthy();
    expect(form.get('yourRole')).toBeTruthy();
  });

  it('should NOT navigate if form is invalid', () => {
    component.formGroup.setValue(invalidFormData);
    component.onNext();

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to step-3 if form is valid', () => {
    component.formGroup.setValue(validFormData);
    component.onNext();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/register/step-3']);
  });

  it('should navigate to step-1 on back button', () => {
    component.onBack();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/register/step-1']);
  });
});
