export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,15}$/;
  
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters' };
  }
  
  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
};
