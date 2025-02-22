import { validateRequired } from '../../../../helpers/V2/formValidation'
import {
  CreateChapterProps,
  FinalpayloadCreateSubject
} from '../../../../utils/types'

const CreateChapterValidation = (
  values: CreateChapterProps,
  errors: Record<string, string>,
  field?: {
    type: FinalpayloadCreateSubject
    value: string
  }
): Record<string, string> => {
  let formErrors: Record<string, string> = { ...errors }
  const { name, subjectId, sequence } = values

  switch (field?.type) {
    case name:
      formErrors['name'] = validateRequired(field.value)
      break
    case subjectId:
      formErrors['subjectId'] = validateRequired(field.value)
      break
    case sequence:
      formErrors['sequence'] = validateRequired(field.value)
      break
    default:
      formErrors['name'] = validateRequired(name)
      formErrors['subjectId'] = validateRequired(subjectId)
      formErrors['sequence'] = validateRequired(sequence)
  }
  return formErrors
}

export default CreateChapterValidation
