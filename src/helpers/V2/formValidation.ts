import strings from '../../locale/en'

export const hasFormError = (formErrors: Record<string, string>): boolean => {
  return !!Object.keys(formErrors).find((errorkey) => formErrors[errorkey])
}
const { validationMessages } = strings

export const validateRequired = (
  value: string | null | Date | undefined | File
): string => {
  const { required } = validationMessages.field

  if (!value) {
    return required
  } else {
    return ''
  }
}

export const assessmentValidate = (value: string): string => {
  const { numberOnly } = validationMessages.phone
  const { required } = validationMessages.field
  if (!value) {
    return required
  } else if (!value.match(/^[0-9\b]+$/)) {
    return numberOnly
  } else {
    return ''
  }
}

export const validatePhone = (phone: string): string => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const { required, numberOnly, invalid } = validationMessages.phone
  if (!phone) {
    return required
  } else if (!phone.match(/^[0-9\b]+$/)) {
    return numberOnly
  } else if (!phone.match(phoneRegExp) || phone.length !== 10) {
    return invalid
  } else {
    return ''
  }
}

export const validatePasswordifFilled = (password: string) => {
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  const { invalid, required } = validationMessages.password
  if (!password) {
    return required
  } else if (password) {
    if (!password?.match(passwordRegExp)) {
      return invalid
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export const validateEmail = (email: string) => {
  const { required, invalid } = validationMessages.email
  if (!email) {
    return required
  } else {
    let lastAtPos = email.lastIndexOf('@')
    let lastDotPos = email.lastIndexOf('.')
    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf('@@') == -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      return invalid
    } else {
      return ''
    }
  }
}

export const validateMultiSelect = (value: any[]): string => {
  const { required } = validationMessages.field
  if (Array.isArray(value) && value.length > 0) {
    return ''
  } else {
    return required
  }
}
