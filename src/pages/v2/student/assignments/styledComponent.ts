import styled from 'styled-components'
import { Blue } from '../../../../const/V2/stylingVariables'

export const DashedLine = styled.div`
  width: 120px;
  border: 1px dashed #4da4f6;
  position: absolute;
  rotate: 90deg;
  top: 50%;
  left: -14%;
`
export const DashedBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-right: 15px;

  div {
    width: 1px;
    height: 7px;
    background-color: #0681bc;
  }
`
export const Heading = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${Blue};
  margin-bottom: 15px;
`
export const AssignmentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
`

export const CalendarSection = styled.div`
  width: 33%;
`

export const AssignmentsSection = styled.div`
  width: 33%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  p {
    color: #343434;
    font-size: 18px;
    font-weight: 700;
  }
`

export const AssignmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 530px;
  overflow-y: auto;
  padding-right: 5px;
`

export const Assignments = styled.div<{
  color?: string
  active?: boolean
  borderColor?: string
}>`
  width: 95%;
  background-color: ${({ color }) => color};
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  cursor: pointer;
  ${({ active, borderColor }) =>
    active ? `border: 1px dashed ${borderColor};` : ''}
`
export const SubjectDeadline = styled.div`
  p {
    color: #343434;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
  }
`
export const IconSec = styled.div<{ color?: string }>`
  svg {
    background: '#343434';
    path {
      fill: ${({ color }) => color};
    }
  }
`

export const AssignmentDetailsSections = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const OverdueReviewedSpan = styled.button`
  all: unset;
  background-color: #ffcfd4e6;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 5px 15px;
  border: 1px solid #ffcfd4e6;
  border-radius: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #f71717;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`
export const GoodReviewedSpan = styled.span`
  all: unset;
  background-color: #2f9e3c;
  padding: 5px 15px;
  border: 1px solid #2f9e3c;
  border-radius: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

export const DetailsHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    h3 {
      font-size: 24px;
      font-weight: 700;
    }

    p {
      strong {
        color: black;
      }
      color: gray;
    }
  }
`

export const FileSections = styled.div`
  cursor: pointer;
  p {
    font-size: 18px;
    font-weight: 700;
  }
`
export const ViewFileSections = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
`
export const ViewText = styled.div`
  font-size: 18px;
  font-weight: 700;
`

export const DashedLineSections = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: 700;
  }
`
export const CreatorSections = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 20px;
  padding: 30px;
`
export const CreatedSections = styled.div`
  padding: 15px 30px 10px 30px;
  border: none;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.23) 0px 1px 4px;
`

export const ReviewedSections = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
  gap: 20px;
  /* padding: 30px 30px 20px 30px; */
`

export const ReviewedButton = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
  gap: 10px;
  padding: 10px 0px;
`

export const ReviewedText = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
  color: #858494;
  font-size: 18px;
  gap: 10px;
  padding: 30px 0px;
`
export const ReviewedTitle = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* margin-top: 10px; */
  p {
    color: #0c092a;
    font-weight: 700;
    font-size: 18px;
    /* padding: 0px 30px; */
  }
`
export const ReviewedAttachment = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* margin-top: 10px; */
  color: #0c092a;
  font-weight: 700;
  font-size: 18px;
  /* padding: 0px 30px; */
`

export const DocButton = styled.div`
  color: #0c092a;
  font-weight: 700;
  font-size: 18px;
`

export const CreateName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  p {
    font-size: 18px;
    font-weight: 700;
  }

  span {
    color: #858494;
    font-size: 16px;
    font-weight: 500;
  }
`
export const AddFormSections = styled.div`
  p {
    color: #2c3d7a;
    font-size: 18px;
    font-weight: 700;
  }

  span {
    color: #2c3d7a;
    font-size: 12px;
    font-weight: 700;
  }
`
export const UploadDocumentSec = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 16px;
  border: 1px dashed #87a8dc;
  padding: 30px;
`

export const DocumentSec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #ff7976;
    border-radius: 10px;
  }
`
export const ImageSec = styled.div`
  border-radius: 100px;
  img {
    width: 50px;
    height: 50px;
  }
`

export const AssignmentCountWrapper = styled.div`
  padding: 25px 20px 18px 20px;
  height: 350px;
  position: relative;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 7px 21px 0px #0000001a;
  img {
    object-fit: cover;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 100% !important;
  }
`

export const Font12 = styled.p`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 17px;
  line-height: 19.6px;
  color: #000;
`

export const Font14 = styled.p`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 20px;
  line-height: 19.6px;
  color: #000;
  span {
    font-size: 13px;
    font-weight: 500;
  }
`

export const BlockSpace = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Flex = styled.div`
  display: flex;
  align-items: center;
`

export const TableWrapper = styled.div`
  height: 100%;
  overflow: none;
  overflow-y: auto;
  scrollbar-width: 2px;
`

export const TD = styled.td`
  text-align: center;
  font-weight: 700;
  font-size: 14px;
`
