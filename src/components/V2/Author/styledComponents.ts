import styled from 'styled-components'
import { White } from '../../../const/V2/stylingVariables'

export const PageContainer = styled.div`
  width: 100%;
  // height: 314px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid rgba(163, 174, 208, 0.51);
  background: ${White};
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
`
export const AuthorHeading = styled.h1`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.48px;
`
export const DropDownContainer = styled.div`
  width: 300px;

  @media (max-width: 500px) {
    width: 245px;
  }
`
