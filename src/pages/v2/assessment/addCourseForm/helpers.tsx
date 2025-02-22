import { validateRequired } from '../../../../helpers/V2/formValidation'
import { AddCourseProps, FinalpayloadAddCourse } from '../../../../utils/types'

const AddCourseValidation = (
  values: AddCourseProps,
  errors: Record<string, string>,
  field?: {
    type: FinalpayloadAddCourse
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

export default AddCourseValidation
