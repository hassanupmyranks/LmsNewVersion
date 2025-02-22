import { CSSProperties } from 'react'

export interface DropdownOptionData<T> {
  value: T
  label: T[keyof T]
  id: T[keyof T]
}
export interface DropdownProps<T> {
  label: string
  placeholder: string
  required?: boolean
  style?: CSSProperties
  options: DropdownOptionData<T>[]
  fullWidth?: boolean
  onSelect: (_: DropdownOptionData<T>) => void
  selectedValue?: DropdownOptionData<T>
  error?: string
  isLoading?: boolean
  total?: number | any
  length?: number | any
  handleScrollInfinite?: (d: number, b: number) => void
}
export interface SmallDropdownOptionData<T> {
  value?: T
  label: T[keyof T]
  id?: T[keyof T]
}

export interface SearchableDropdownOptionData {
  value?: string
  label: string
  id?: number | string
  url?: string
  isSelected?: number
  type?: string
  isLab?: boolean
}
