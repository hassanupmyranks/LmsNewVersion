import styled from 'styled-components'
import { ReactComponent as UpToDownDisableIcon } from '../../../assets/svg/up-to-down-disable.svg'
import { ReactComponent as UpToDownIcon } from '../../../assets/svg/up-to-down.svg'

const DragDownButtonV2 = ({
  isDisabled,
  onClick
}: {
  label?: string
  isDisabled?: boolean
  onClick?: (d: any) => void
}) => {
  return (
    <UpToDownButton
      onClick={onClick}
      {...{
        isDisabled
      }}
    >
      {isDisabled ? <UpToDownDisableIcon /> : <UpToDownIcon />}
    </UpToDownButton>
  )
}

export default DragDownButtonV2

const UpToDownButton = styled.div<{
  isDisabled?: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
`
