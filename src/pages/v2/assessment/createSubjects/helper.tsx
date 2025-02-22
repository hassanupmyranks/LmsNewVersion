import { validateRequired } from '../../../../helpers/V2/formValidation'
import {
  CreateSubjectProps,
  FinalpayloadCreateSubject
} from '../../../../utils/types'

const CreateSubjectValidation = (
  values: CreateSubjectProps,
  errors: Record<string, string>,
  field?: {
    type: FinalpayloadCreateSubject
    value: string
  }
): Record<string, string> => {
  let formErrors: Record<string, string> = { ...errors }
  const { name, courseId } = values

  switch (field?.type) {
    case name:
      formErrors['name'] = validateRequired(field.value)
      break
    case courseId:
      formErrors['courseId'] = validateRequired(field.value)
      break
    default:
      formErrors['name'] = validateRequired(name)
      formErrors['courseId'] = validateRequired(courseId)
  }
  return formErrors
}

export default CreateSubjectValidation
