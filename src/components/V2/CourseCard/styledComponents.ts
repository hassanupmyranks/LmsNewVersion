import styled from 'styled-components'
import {
  Blue,
  DarkBlue,
  PrimaryBlue,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { ReactComponent as HeartIconSvg } from '../../../assets/svg/Heart-logo.svg'

export const CardContainer = styled.div`
  background: ${White};
  border-radius: 20px;
  width: 300px;
  // margin: 10px;
  padding: 18px;
  height: 330px;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    width: 100%;
  }
`

export const CourseImage = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 170px;
  cursor: pointer;
`

export const LogoContainer = styled.img`
  border-radius: 100px;
  border: 4px solid ${White};
  text-align: center;
  position: relative;
  top: -17%;
  width: 65px;
  height: 65px;
  margin-left: -3%;
  object-fit: cover;
  box-shadow: 1px 1px 4px rgb(0, 0, 0, 0.1);
  background-color: white;
`

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px 0px 8px;
  position: relative;
  top: -15%;
`
export const Heading = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${Blue};
  letter-spacing: -0.48px;
  margin: 0px;
`

export const Para = styled.p`
  color: ${SecondaryGray600};
  font-size: 15px;
`

export const HeartLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 7%;
  left: 84%;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${White};
  cursor: pointer;
`
export const CourseContainer = styled.div`
  position: relative;
`
export const HeartLogo = styled(HeartIconSvg)`
  height: 30px;
  width: 30px;
`
export const RedHeartLogo = styled.img`
  height: 18px;
  width: 18px;
`
export const SubjectLogo1 = styled.img`
  height: 25px;
  width: 25px;
  border-radius: 12.5px;
  border: 1px solid ${PrimaryBlue};
`
export const SubjectLogo2 = styled.img`
  position: relative;
  left: -10%;
  height: 25px;
  width: 25px;
  border-radius: 12.5px;
  border: 1px solid ${PrimaryBlue};
`
export const SubjectLogoMore = styled.div`
  position: relative;
  left: -20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  height: 25px;
  width: 25px;
  border-radius: 12.5px;
  background-color: ${SecondaryGray};
  border: 1px solid ${PrimaryBlue};
  color: ${PrimaryBlue};
`
export const Subjects = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${PrimaryBlue};
  margin-right: 3px;
`

export const Button = styled.button`
  padding: 5px;
  background-color: ${PrimaryBlue};
  color: ${White};
  border-radius: 16px;
  border: 0px solid ${PrimaryBlue};
  width: 135px;
  height: 50px;
`
export const ButtonWrapper = styled.div`
  position: relative;
  top: -8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 8px 0px 8px;
`
export const SubjectIcons = styled.div`
  display: flex;
  position: relative;
  left: 3%;
`
export const SubjectIcon = styled.div`
  margin-right: 8px;
`
export const MoreSubjects = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: auto;
  max-width: 280px;
  position: absolute;
  z-index: 999;
  right: 0px;
  top: 28px;
  background-color: ${White};
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  border-width: 2px;
  border-color: ${PrimaryBlue};
  border-style: solid;
`
export const SubjectsMore = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${DarkBlue};
  line-height: 20px;
  padding: 2px;
  margin-right: 4px;
`
