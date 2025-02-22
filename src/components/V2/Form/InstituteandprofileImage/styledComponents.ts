import styled from 'styled-components'
import { ReactComponent as CameraIconSvg } from '../../../../assets/svg/camera.svg'
import { ReactComponent as UplodeInstituteSvg } from '../../../../assets/svg/uplodeInstitute.svg'
import { LightWhite } from '../../../../const/V2/stylingVariables'

export const BigCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${LightWhite};
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

  position: absolute;
  bottom: 1px;
  left: -28px;

  transform: translate(50%, 50%);
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
export const InsIcon = styled(UplodeInstituteSvg)`
  width: '100%';
  height: '200px';
  cursor: pointer;
`
export const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  object-fit: cover;
`
export const InstituteImage = styled.img`
  width: '350px';
  height: '200px';
  overflow: hidden;
`
export const ButtonWrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`
export const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px 20px 16px;
  height: 100%;
`
export const UploadDiv = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 200px;

  background: linear-gradient(
    0deg,
    #111c44 -31.39%,
    rgba(17, 28, 68, 0) 96.52%
  );
  border-radius: 20px;

  text-align: center;
  position: relative;

  cursor: pointer;
  position: relative;
`
export const InstituteImageViewer = styled.div`
  position: relative;
  width: 100%;
  height: '200px';
`
