import { validateRequired } from '../../../../helpers/V2/formValidation'
import {
  CreateTopicProps,
  FinalpayloadCreateTopic
} from '../../../../utils/types'

const CreateTopicValidation = (
  values: CreateTopicProps,
  errors: Record<string, string>,
  field?: {
    type: FinalpayloadCreateTopic
    value: string
  }
): Record<string, string> => {
  let formErrors: Record<string, string> = { ...errors }
  const { name, chapterId, sequence } = values

  switch (field?.type) {
    case name:
      formErrors['name'] = validateRequired(field.value)
      break
    case chapterId:
      formErrors['chapterId'] = validateRequired(field.value)
      break
    case sequence:
      formErrors['sequence'] = validateRequired(field.value)
      break
    default:
      formErrors['name'] = validateRequired(name)
      formErrors['chapterId'] = validateRequired(chapterId)
      formErrors['sequence'] = validateRequired(sequence)
  }
  return formErrors
}

export default CreateTopicValidation
