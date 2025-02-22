import styled from 'styled-components'
import { ReactComponent as CameraIconSvg } from '../../../assets/svg/camera.svg'
import { LightWhite } from '../../../const/V2/stylingVariables'

export const BigCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${LightWhite};
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`
export const SmallCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  background: linear-gradient(#1c5c99, #5798d6);
`
export const IconCircle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: ${LightWhite};
`
export const CameraIcon = styled(CameraIconSvg)`
  cursor: pointer;
  height: 14px;
  width: 14px;
`
export const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  object-fit: cover;
`
export const ButtonWrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`
