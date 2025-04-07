// Industry type for Step 2
export type Industry = 'marketing' | 'it' | 'financial_services';

// Role type for Step 2
export type Role = 'developer' | 'manager' | 'designer';

// User registration data model
export interface RegistrationData {
  step1: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  step2: {
    industry: Industry;
    yourRole: Role;
    experienceInYears: null | number;
  };
  step3: {
    aboutUs: string;
  };
}
