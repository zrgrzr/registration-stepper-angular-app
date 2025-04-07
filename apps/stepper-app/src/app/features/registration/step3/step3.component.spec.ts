import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step3Component } from './step3.component';
import { Router } from '@angular/router';

import { FormProgressService } from '../../../core/services/form-progress.service';

describe('Step3Component', () => {
  let component: Step3Component;
  let fixture: ComponentFixture<Step3Component>;
  const routerMock = { navigate: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3Component],
      providers: [
        { provide: Router, useValue: routerMock },
        FormProgressService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Step3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    routerMock.navigate.mockClear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formGroup with "aboutUs" control', () => {
    expect(component.formGroup.get('aboutUs')).toBeTruthy();
  });

  it('should NOT navigate if form is invalid', () => {
    component.formGroup.setValue({ aboutUs: '' });
    component.onFinish();

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back to step-2 on "Back" button', () => {
    component.onBack();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/register/step-2']);
  });
});
