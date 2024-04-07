import { emailFormat } from '@/helpers'

interface UseValidationTypes {
  validate: (value: string) => boolean | string
}

export const useValidation = (): UseValidationTypes => {
  const validate = (value: string): boolean | string =>
    emailFormat.test(value) || 'email format is not valid.'

  return {
    validate
  }
}
