import styled from 'styled-components'
import { Blue } from '../../../const/V2/stylingVariables'

export const MenuBar = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
`

export const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1450px) {
    display: block;
  }
`

export const PageTitle = styled.h6`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.68px;
  margin-bottom: 0px;
  margin-right: 6px;

  @media (max-width: 992px) {
    font-size: 20px;
  }
`
