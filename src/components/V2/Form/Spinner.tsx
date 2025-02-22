import styled, { keyframes } from 'styled-components'
import { PrimaryBlue } from '../../../const/V2/stylingVariables'

const LoadingSpinner = () => {
  return <SpinnerLoader />
}

export default LoadingSpinner

const RotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerLoader = styled.div`
  width: 16px;
  height: 16px;
  margin: 4px;
  border: 4px solid ${PrimaryBlue};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${RotateAnimation} 1s linear infinite;
`
