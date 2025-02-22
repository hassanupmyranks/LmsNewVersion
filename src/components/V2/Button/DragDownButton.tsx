import styled from 'styled-components'
import { ReactComponent as DownToUpDisableIcon } from '../../../assets/svg/down-to-up-disable.svg'
import { ReactComponent as DownToUpIcon } from '../../../assets/svg/down-to-up.svg'

const DragUpButtonV2 = ({
  isDisabled,
  onClick
}: {
  label?: string
  isDisabled?: boolean
  onClick?: (d: any) => void
}) => {
  return (
    <DownToUpButton
      onClick={onClick}
      {...{
        isDisabled
      }}
    >
      {isDisabled ? <DownToUpDisableIcon /> : <DownToUpIcon />}
    </DownToUpButton>
  )
}

export default DragUpButtonV2

const DownToUpButton = styled.div<{
  isDisabled?: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
`
