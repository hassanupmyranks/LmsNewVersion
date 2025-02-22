import { validateRequired } from '../../../../helpers/V2/formValidation'
import {
  CreateSubTopicProps,
  FinalpayloadCreateSubTopic
} from '../../../../utils/types'

const CreateSubTopicValidation = (
  values: CreateSubTopicProps,
  errors: Record<string, string>,
  field?: {
    type: FinalpayloadCreateSubTopic
    value: string
  }
): Record<string, string> => {
  let formErrors: Record<string, string> = { ...errors }
  const { name, topicId, sequence } = values

  switch (field?.type) {
    case name:
      formErrors['name'] = validateRequired(field.value)
      break
    case topicId:
      formErrors['topicId'] = validateRequired(field.value)
      break
    case sequence:
      formErrors['sequence'] = validateRequired(field.value)
      break
    default:
      formErrors['name'] = validateRequired(name)
      formErrors['topicId'] = validateRequired(topicId)
      formErrors['sequence'] = validateRequired(sequence)
  }
  return formErrors
}

export default CreateSubTopicValidation
