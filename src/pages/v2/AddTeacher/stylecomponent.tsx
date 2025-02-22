import styled from 'styled-components'
import { PrimaryBlue } from '../../../const/V2/stylingVariables'

export const CourseContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  color: rgba(43, 54, 116, 1);
  border: 1px solid #e3dfe7;
  cursor: pointer;
  border-radius: 16px;
  font-family: DM Sans;
  letter-spacing: -0.68px;
  font-size: 16px;
  font-weight: 700;
  gap: 15px;
  padding: 15px 15px;
`
export const SubjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  color: rgba(43, 54, 116, 1);
  border: 1px solid #e3dfe7;
  cursor: pointer;
  border-radius: 16px;
  font-family: DM Sans;
  letter-spacing: -0.68px;
  font-size: 16px;
  font-weight: 700;
  gap: 15px;
  padding: 15px 15px;
  margin-left: 10%;
`
export const SelectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-top: 15px;
  gap: 10px;
`

export const SelectedSections = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e5f2;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  font-family: DM Sans;
  letter-spacing: -0.68px;
  color: #2b3674;
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
  height: 600px;
  width: 60px;
  background-color: ${PrimaryBlue};
  border-bottom-left-radius: 10px;
`
export const DetailBox = styled.div`
  height: 680px;
  width: 450px;
  background-color: white;
  padding: 20px 30px;
  border-radius: 0px 10px 10px 0px;
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
