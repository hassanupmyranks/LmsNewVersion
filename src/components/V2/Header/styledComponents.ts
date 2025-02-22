import styled from 'styled-components'
import { Blue, White } from '../../../const/V2/stylingVariables'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem 0;

  @media (max-width: 992px) {
    padding: 1rem 1rem 0;
  }
`

export const PageName = styled.p`
  color: #707eae;
  font-size: 14px;
  font-weight: 500;
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
    text-align: center;
  }
`
export const UserTab = styled.div`
  border-radius: 30px;
  background: ${White};
  padding: 10px;
  box-shadow: 14px 17px 40px 4px rgba(112, 144, 176, 0.08);

  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 110px;
  justify-content: space-around;

  @media (max-width: 520px) {
    display: none;
  }
`
export const NotificationAlter = styled.div`
  width: 7px;
  aspect-ratio: 1/1;
  background-color: #c91f1f;
  border-radius: 999px;
  position: absolute;
  right: -1px;
  top: 2px;
`

export const PageTitle2 = styled.h6`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.68px;
  margin-top: 50px;
  margin-bottom: 0px;
  margin-right: 6px;
  text-align: center;

  @media (max-width: 992px) {
    font-size: 14px;
  }
`
