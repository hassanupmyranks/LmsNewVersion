export interface DropdownOptionData<T> {
  value: T
  label: T[keyof T]
  id: T[keyof T]
}

export interface SearchableDropdownOptionData {
  value: string
  label: string
  id: number
  url: string
}
