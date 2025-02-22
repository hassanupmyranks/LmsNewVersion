import { Dispatch } from 'react'

export interface TabsProp {
  index: number
  name: string
  icon: string
  isActive: boolean
  id?: string
  totalQuestions?: number
}

export interface ActionBarActionProp {
  index: number
  caption: string
  url: string
}

export interface ActionBarProps {
  tabs: TabsProp[]
  actions: ActionBarActionProp[]
  handleSelectionTab: Dispatch<TabsProp>
  handleAction: Dispatch<ActionBarActionProp>
}

export interface StatisticsProps {
  index: number
  name: string
  icon: string
  isClickable: boolean
  isHoverable: boolean
  hoverText: string
  isSelected: boolean
}

export interface QuestionStatisticsProps {
  search: string
  handleSearchChange: Dispatch<string>
  statistics: StatisticsProps[]
  handleOnClick: Dispatch<StatisticsProps>
  startTime: Date
  endTime: Date
  totalMarks: number
  totalTestQuestion: number
}

export interface ActionsBarIconsProps {
  [Physics: string]: string
  Chemistry: string
  Maths: string
  physics: string
  chemistry: string
  maths: string
}
