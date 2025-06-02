export interface PasswordValidation {
  isValid: boolean
  errors: string[]
}

export const validatePassword = (password: string): PasswordValidation => {
  const errors: string[] = []

  if (password.length < 6) {
    errors.push('Slaptažodis turi būti bent 6 simbolių')
  }

  if (!/\d/.test(password)) {
    errors.push('Slaptažodis turi turėti bent vieną skaičių')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword
} 