import styled from 'styled-components'
import { White } from '../../../const/V2/stylingVariables'
import VeiewEyeImage from '../../../assets/images/view-eye-image.jpeg'

const ViewEyeButton = ({
  clickHandler,
  disabled
}: {
  clickHandler: () => void
  disabled?: boolean
}) => {
  return (
    <Button onClick={clickHandler} disabled={disabled}>
      <img src={VeiewEyeImage} alt="" height="30px" width="30px" />
    </Button>
  )
}

export default ViewEyeButton

export const Button = styled.button`
  all: unset;
  background-color: White;
  padding: 12px 0px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
