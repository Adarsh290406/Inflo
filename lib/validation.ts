export interface LeadFormData {
  name: string;
  email: string;
  budget_range: string;
  message?: string;
}

export interface LeadValidationErrors {
  name?: string;
  email?: string;
  budget_range?: string;
  message?: string;
}

export function validateLead(data: Partial<LeadFormData>): LeadValidationErrors {
  const errors: LeadValidationErrors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Full name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.budget_range || !data.budget_range.trim()) {
    errors.budget_range = 'Please select a project budget range';
  }

  return errors;
}
