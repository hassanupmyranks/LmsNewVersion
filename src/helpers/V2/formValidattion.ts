export const isValidNumber = (num: any): boolean => {
  return typeof num === 'number' && !isNaN(num)
}

export const validateRequired = (
  value: any[] | number | string,
  error: string = 'error'
): string => {
  if (Array.isArray(value)) {
    if (value.length) {
      return ''
    }
  } else {
    if (isValidNumber(value) && value) {
      return ''
    } else if (typeof value === 'string' && value.trim()) {
      return ''
    }
  }

  return error
}

export const hasAnyErrors = (errorObj: Record<string, string>): boolean => {
  return Object.values(errorObj).some((item) => item)
}

export const validateNumberToPositive = (num: number): number => {
  return num > 0 ? num : 0
}

export const validateNumberToNaturalNumber = (num: number): number => {
  return num > 0 ? num : 1
}
