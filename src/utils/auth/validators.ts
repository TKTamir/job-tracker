interface ValidationErrors {
  email?: string;
  password?: string;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

export const validateAuthForm = (email: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isStrongPassword(password)) {
    errors.password = "Password must be at least 8 characters, include upper and lowercase letters, a number, and a special character.";
  }

  return errors;
};