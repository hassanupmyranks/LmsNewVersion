import { validateRequired } from '../../../helpers/V2/formValidation'
import { AddAuthorProps, FinalPayloadField } from '../../../utils/types'

const AddAuthorValidation = (
  values: AddAuthorProps,
  errors: Record<string, string>,
  field?: {
    type: FinalPayloadField
    value: string
  }
): Record<string, string> => {
  let formErrors: Record<string, string> = { ...errors }
  const { name } = values

  switch (field?.type) {
    case name:
      formErrors['name'] = validateRequired(field.value)
      break
    default:
      formErrors['name'] = validateRequired(name)
  }
  return formErrors
}

export default AddAuthorValidation
