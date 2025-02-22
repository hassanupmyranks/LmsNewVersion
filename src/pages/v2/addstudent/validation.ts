import { useState } from 'react'

interface ValidationProps {
  finalData: Record<string, string>
  setFinalData: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const FormValidator = ({ finalData, setFinalData }: ValidationProps) => {
  const [formErrors, setFormErrors] =
    useState<Record<string, string>>(finalData)

  const handleInputChange = (name: string, value: string) => {
    let errorMessage = ''

    if (value.trim() === '') {
      errorMessage = `${nameToLabel(name)} is required`
    } else {
      errorMessage = ''
    }

    switch (name) {
      case 'userName':
        errorMessage = validateUserName(value)
        break
      case 'password':
        errorMessage = ''
        break
      case 'parentMobile':
      case 'mobile':
        errorMessage = validateMobileNumber(value)
        break
      case 'aadharNo':
        errorMessage = validateAadharNumber(value)
        break
      case 'dob':
        errorMessage = ''
        break
      case 'admissionDate':
        errorMessage = ''
        break
      default:
        errorMessage = ''
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage
    }))

    setFinalData((prevState: Record<string, string>) => ({
      ...prevState,
      [name]: value
    }))
  }

  const validateUserName = (value: string) => {
    return /\s/.test(value) ? 'Username cannot contain spaces' : ''
  }

  // const validatePassword = (value: string) => {
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  //   return passwordRegex.test(value)
  //     ? ''
  //     : 'Password must contain minimum 6 characters with at least one lowercase letter, one uppercase letter, one digit, and one special character'
  // }

  const validateMobileNumber = (value: string) => {
    return /^\d{10}$/.test(value) ? '' : 'Invalid mobile number'
  }

  const validateAadharNumber = (value: string) => {
    return /^\d{12}$/.test(value) ? '' : 'Invalid Aadhar number.'
  }

  const handleContinue = () => {
    const errors: Record<string, string> = {}
    Object.keys(formErrors).forEach((key) => {
      const value = finalData[key]
      errors[key] = value ? '' : `${nameToLabel(key)} is required`
    })
    setFormErrors(errors)

    if (Object.values(errors).every((error) => !error)) {
      return true
    } else {
      return false
    }
  }

  const nameToLabel = (name: string) => {
    return name
      .split(/(?=[A-Z])/)
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return {
    formErrors,
    handleInputChange,
    handleContinue
  }
}

export default FormValidator
