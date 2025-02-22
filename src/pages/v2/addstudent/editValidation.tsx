import { useState } from 'react'

interface EditValidationProps {
  formData: Record<string, string>
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const EditFormValidator = ({ formData, setFormData }: EditValidationProps) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    firstName: '',
    lastName: '',
    mobile: '',
    fatherName: '',
    motherName: '',
    aadharNo: '',
    address: '',
    admissionNo: '',
    statsNo: '',
    parentMobile: ''
  })

  const EdithandleInputChange = (name: string, value: string) => {
    let errorMessage = ''

    if (value.trim() === '') {
      errorMessage = `${nameToLabel(name)} is required`
    } else {
      errorMessage = ''
    }

    switch (name) {
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

    setFormData((prevState: Record<string, string>) => ({
      ...prevState,
      [name]: value
    }))
  }
  const validateMobileNumber = (value: string) => {
    return /^\d{10}$/.test(value) ? '' : 'Invalid mobile number'
  }

  const validateAadharNumber = (value: string) => {
    return /^\d{12}$/.test(value) ? '' : 'Invalid Aadhar number.'
  }

  const EdithandleContinue = () => {
    const errors: Record<string, string> = {}
    Object.keys(formErrors).forEach((key) => {
      const value = formData[key]
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
    EdithandleInputChange,
    EdithandleContinue
  }
}

export default EditFormValidator
