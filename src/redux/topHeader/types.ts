import { FunctionComponent, SVGProps } from 'react'

export interface TopHeader {
  topTitle: string
  mainTitle: string
  btnText: string
  btnUrl: string
  tabs?: {
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>
    label: string
    value: number
    link: string
  }[]
}

export const initialState: TopHeader = {
  topTitle: '',
  mainTitle: '',
  btnText: '',
  btnUrl: ''
}
