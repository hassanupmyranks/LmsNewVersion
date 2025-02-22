import { ReactElement } from 'react'
import { AutoSaveButtonContainer, AutoSavePara } from './subcomponents'

import { ReactComponent as Refresh } from '../../../../assets/svg/refresh.svg'
const AutoSaveButton = (): ReactElement => {
  return (
    <AutoSaveButtonContainer>
      <Refresh />
      <AutoSavePara>Your Progress was Autosaved</AutoSavePara>
    </AutoSaveButtonContainer>
  )
}

export default AutoSaveButton
