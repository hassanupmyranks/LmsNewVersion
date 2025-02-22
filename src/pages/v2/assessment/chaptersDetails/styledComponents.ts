import { ReactComponent as DotsIconSvg } from '../../../../assets/svg/three-vertical-dots.svg'
import styled from 'styled-components'
import {
  Blue,
  CoolGray20,
  CoolGray10,
  SecondaryGray600,
  White,
  BlueButton,
  Gray
} from '../../../../const/V2/stylingVariables'

export const AllAddCourse2 = styled.div`
  height: auto;
  display: flex;
  /* height: 100%; */
  overflow-y: auto;
  width: 40%;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
`
export const CreateCourseWrapper = styled.div`
  height: 400px;
  width: 100%;
  background-color: ${White};
  border-radius: 1rem;
  padding: 25px;

  @media (max-width: 1280px) {
    width: 48%;
    padding: 14px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`
export const NewlyAddedSubjects = styled.div`
  height: 580px;
  width: 42%;
  background-color: ${White};
  margin-left: 15px;
  border-radius: 1rem;
  padding: 25px 10px 15px 0px;

  @media (max-width: 1280px) {
    width: 48%;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
  }
`
export const ListWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${Blue};
`
export const Heading = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${Blue};
  margin-bottom: 15px;
`
export const LabelH4 = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${Blue};
  margin-bottom: 15px;
`
export const Span = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${Gray};
  margin-bottom: 15px;
`

export const BigCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${White};
  margin-right: 30px;
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
  background-color: ${White};
`
export const AlignCircle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`
export const NewSubHeading = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${Blue};
  margin: 0px 0px 20px 25px;

  @media (max-width: 768px) {
    margin: 0px 0px 20px 10px;
  }
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
export const DotsIcon = styled(DotsIconSvg)`
  cursor: pointer;
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 10px;
`
export const SubjectList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  border-radius: 1rem;
  margin: 10px 20px;
  padding: 14px;
  &:hover {
    box-shadow: 0px 6px 25px rgba(110, 110, 110, 0.1);
  }

  @media (max-width: 768px) {
    margin: 10px 0px;
  }
`
export const SubjectName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Blue};
`
export const CourseInfo = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${Blue};
`
export const SubjectDate = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${SecondaryGray600};
  margin: 0px 15px;
`
export const SubLogoAllign = styled.div`
  display: flex;
  align-items: center;
`
export const SubjectLogo = styled.img`
  height: 60px;
  width: 60px;
  margin-right: 15px;
  border-radius: 14px;
`

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const DateIconWrap = styled.div`
  display: flex;
  align-items: center;
`
export const SubjectListWrapper = styled.div`
  overflow-y: auto;
  height: 85%;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${CoolGray20};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${CoolGray10};
    border-radius: 2px;
  }
`
export const LoaderAlign = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;

  div {
    width: 30px !important;
    height: 30px !important;
    border: 4px solid #e0e0e0 !important;
    border-right-color: ${BlueButton} !important;
  }
`
export const ListLoader = styled.div`
  margin-top: 10%;
`
export const TopicListContainer = styled.div`
  padding: 15px;
  background: ${White};
  gap: 10px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  width: 40%;
  min-height: 380px;
`

export const TopicListWrapper = styled.div`
  overflow-y: auto;
  height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${CoolGray20};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${CoolGray10};
    border-radius: 2px;
  }
`

export const TopicName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Blue};
`

export const Table = styled.table`
  width: 100%;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
`

export const TableHead = styled.thead`
  background-color: #f4f4f4;
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Stripe effect */
  }
`

export const TableHeader = styled.th`
  color: black;
  text-align: center;
  font-size: 20px;
  border-bottom: none;
`

export const TableCell = styled.td`
  text-align: center;
  font-size: 16px;
`

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  height: 100%;
  overflow: auto;
  border-radius: 20px;
`
export const GradeSubjectContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
