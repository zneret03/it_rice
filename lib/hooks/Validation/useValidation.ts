import { emailFormat } from '@/helpers'

interface UseValidationTypes {
  validation: (value: string) => string | boolean
}

export const useValidation = (): UseValidationTypes => {
  const validation = (value: string): string | boolean =>
    emailFormat.test(value) || 'This email is not correct format.'

  return {
    validation
  }
}
