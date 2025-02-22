import styled from 'styled-components'
import { Gray, White } from '../../../const/V2/stylingVariables'
import { getThemeDetails } from '../../../helpers/V2/getThemeDetails'
import { ReactComponent as BackIcon } from '../../../assets/svg/back-arrow-white.svg'

const BackButton = ({ clickHandler }: { clickHandler: () => void }) => {
  return (
    <Button onClick={clickHandler}>
      <BackIcon />
    </Button>
  )
}

export default BackButton

export const Button = styled.button`
  all: unset;
  background-color: ${getThemeDetails().primaryColor};
  padding: 4px 4px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.28px;

  &:hover {
    color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
    background-color: ${(props) => (props.disabled ? Gray : '#2d9de9')};
  }
`
