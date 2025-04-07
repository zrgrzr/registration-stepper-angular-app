import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationStepperComponent } from './registration-stepper.component';
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';

import { FormProgressService } from '../../../core/services/form-progress.service';

describe('RegistrationStepperComponent', () => {
  let component: RegistrationStepperComponent;
  let fixture: ComponentFixture<RegistrationStepperComponent>;
  const routerMock = {
    url: '/register/step-1',
    navigate: jest.fn(),
    events: of(new NavigationEnd(1, '/register/step-1', '/register/step-1')),
  };

  const progressMock = {
    isStep1Valid: jest.fn(),
    isStep2Valid: jest.fn(),
    getStep1Form: jest.fn(),
    getStep2Form: jest.fn(),
    getStep3Form: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationStepperComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: FormProgressService, useValue: progressMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedIndex based on URL', () => {
    component.setStepIndex('/register/step-1');
    expect(component.selectedIndex()).toBe(0);

    component.setStepIndex('/register/step-2');
    expect(component.selectedIndex()).toBe(1);

    component.setStepIndex('/register/step-3');
    expect(component.selectedIndex()).toBe(2);
  });
});
