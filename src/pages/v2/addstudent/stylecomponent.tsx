import styled from 'styled-components'
import { PrimaryBlue, White } from '../../../const/V2/stylingVariables'

export const Heading = styled.p`
  font-weight: 700;
  font-family: 'DM Sans';
  font-size: 20px;
  line-height: 32px;
  letter-spacing: -2%;
  color: rgba(43, 54, 116, 1);
  padding: 25px;
`
export const InputBar = styled.div`
  padding: 15px;
  background: ${White};
  gap: 10px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;

  @media (max-width: 992px) {
    padding: 6px;
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

export const HeaderImage = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  gap: 50px;
  color: rgba(43, 54, 116, 1);
  font-family: 'DM Sans';
  height: 120px;
`
export const ImageViewer = styled.div`
  display: flex;
  border: 5px;

  background-color: rgba(28, 92, 153, 1);
  border-radius: 50%;
  margin-left: 20px;
  width: 93.71px;
  height: 93.71px;

  align-items: center;
  justify-content: center;
  @media (max-width: 1620px) {
    width: 25%;
  }
  @media (max-width: 1450px) {
    width: 35%;
  }
  @media (max-width: 1400px) {
    width: 40%;
  }
  @media (max-width: 1450px) {
    width: 50%;
  }
`
export const ImageContainer = styled.div`
  display: flex;
  border: 5px;

  background-color: #ffff;
  border-radius: 50%;
  gap: 100px;
  width: 70px;
  height: 70px;

  gap: 20px;

  align-items: center;
  justify-content: center;
`
export const ImagePicker = styled.input`
  gap: 10px;
`
export const Labels = styled.label``
export const PopupViewer = styled.div`
  z-index: 1000;

  position: absolute;

  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`
export const DoubleInput = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  flex-direction: row;
  gap: 8px;
  position: relative;
`
export const DoubleInputV2 = styled.div`
  display: flex;
  justify-content: space-between;
`

export const BoxOne = styled.div`
  height: 20px;
  width: 80px;
  background-color: ${PrimaryBlue};
  border-radius: 10px 0px 0px 10px;
`
export const BoxTwo = styled.div`
  height: 20px;
  width: 60px;
  background-color: ${PrimaryBlue};
  background-image: radial-gradient(
    circle at 0%,
    #f4f4fc 10px,
    ${PrimaryBlue} 10px
  );
`
export const BoxThree = styled.div`
  height: 20px;
  width: 70px;
  background-color: ${PrimaryBlue};
  border-radius: 10px 0px 0px 10px;
`
export const FinalBox = styled.div`
  height: 500px;
  width: 60px;
  background-color: ${PrimaryBlue};
  border-bottom-left-radius: 10px;
`
export const DetailBox = styled.div`
  height: 580px;
  width: 450px;
  background-color: white;
  padding: 20px 30px;
  border-radius: 0px 10px 10px 0px;
  overflow-y: auto;
`
export const DetailText = styled.h6`
  color: ${PrimaryBlue};
  font-family: DM Sans;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 992px) {
    font-size: 16px;
  }
`
