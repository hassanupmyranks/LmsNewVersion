import styled from 'styled-components'
import {
  Blue,
  PrimaryBlue,
  SecondaryGray600
} from '../../../../../const/V2/stylingVariables'

export const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px 20px 16px;
  height: 100%;

  width: 35%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const ContainerImg = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px 20px 16px;
`

export const P = styled.p<{
  fontSize?: number
}>`
  color: ${Blue};
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.48px;
  font-size: ${({ fontSize }) => fontSize ?? 18}px;
`

export const Div = styled.div`
  padding-left: 16px;
  color: ${Blue};
  font-size: 14px;
  line-height: 26px;
  letter-spacing: -0.28px;
`

export const UploadDiv = styled.div`
  background: linear-gradient(
    0deg,
    #111c44 -31.39%,
    rgba(17, 28, 68, 0) 96.52%
  );
  border-radius: 20px;
  padding: 20px 0px;
  text-align: center;
  position: relative;
  margin-bottom: 36px;
  cursor: pointer;
`

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 14px;
  font-weight: 700;
  padding: 11px 20px;
  color: white;
  :disabled {
    background-color: rgba(163, 174, 208, 0.53);
  }
  background-color: ${PrimaryBlue};
  :hover:not(:disabled) {
    background-color: #2d9de9;
  }
`

export const BranchesDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  border-radius: 16px;
`

export const Image = styled.img`
  border-radius: 8px;
`

export const BranchBtn = styled.button`
  all: unset;
`

export const OptionalText = styled.span<{
  fontSize?: number
}>`
  color: ${SecondaryGray600};
  font-size: ${({ fontSize }) => fontSize ?? 18}px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.38px;
`
