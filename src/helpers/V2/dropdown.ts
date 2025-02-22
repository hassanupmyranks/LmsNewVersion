import { DropdownOptionData } from '../../components/V2/Form/types'

export const getDropDownOptions = <T>(
  data: T[],
  id: keyof T,
  label: keyof T
): Array<DropdownOptionData<T>> => {
  return data.map((item) => ({
    id: item[id],
    label: item[label],
    value: item
  }))
}
