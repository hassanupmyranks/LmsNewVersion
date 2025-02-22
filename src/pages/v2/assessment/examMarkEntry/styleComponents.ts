import styled from 'styled-components'
import {
  Blue,
  Gray,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../../const/V2/stylingVariables'
import { getThemeDetails } from '../../../../helpers/V2/getThemeDetails'

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  padding: 0px 20px;
  margin-top: 20px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  & thead {
    position: sticky;
    top: -22px;
    background-color: #f4f7fe;
    height: 52px;
  }

  @media (max-width: 992px) {
    overflow: visible;
  }
`
export const UploadAssignment = styled.div`
  height: auto;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${SecondaryGray};
  margin: 20px 0px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const WordTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  font-family: 'DM Sans';
  color: ${Blue};
  line-height: 24px;
`
export const Format = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Blue};
  line-height: 24px;
`
export const AlignFiles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Anchor = styled.a`
  text-decoration: none;
`
export const Files = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 30px;
`

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 10px;
`
export const FileType = styled.div`
  font-size: 16px;
  font-family: 'DM Sans';
  font-weight: 400;
  color: ${SecondaryGray600};
  margin-left: 25px;
`

export const Block = styled.div`
  display: block;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`
export const UploadUI = styled.div`
  background-color: white;
  border-radius: 15px;
  // min-height: 400px;
  height: fit-content;
  width: 875px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
  // margin: 20px 0px 20px 20px;
`
export const TableRow = styled.tr`
  height: 50px;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
`
export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0px 20px;
  width: 100%;
`
export const TableRowFirst = styled.td`
  background-color: white;
  border-radius: 15px 0px 0px 15px;
`

export const TableRowLast = styled.td`
  background-color: white;
  border-radius: 0px 15px 15px 0px;
`
export const Uploaded = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  border-radius: 18px;
  background-color: #01b574;
  color: white;
  font-size: 14px;
`
export const Pending = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  border-radius: 18px;
  background-color: #fcf6e9;
  color: #e0a922;
  font-size: 14px;
`
export const PageWrapper = styled.div`
  display: flex;
  height: calc(100vh - 77px);
  overflow-y: auto;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const MainMessage = styled.p`
  color: #40ad40;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`
export const SuccessfulUploadMessage = styled.div`
  color: #40ad40;
  text-align: center;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`
export const FileCircle = styled.img`
  border-radius: 50%;
  background-color: #ddf1ff;
  width: 50px;
  height: 50px;
  margin-top: 10px;
`
export const FormContainerV2 = styled.div`
  margin: 20px;
  border-radius: 20px;
  background: ${White};
  flex-direction: column;
  display: flex;

  @media (max-width: 768px) {
    padding: 12px;
  }
`

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Prevents wrapping to keep items in a single row */
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  align-items: center;
  gap: 30px;

  /* & > * {
    flex: 1; 
    min-width: 150px;
  } */

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Allows wrapping for smaller screens */
    gap: 15px;
  }
`

// const BFlex = styled.div`
//   border-radius: 20px;
//   color: white;
//   font-family: 'DM Sans';
//   font-weight: 500;
//   font-size: 14px;
//   background-color: #6c64d8;
//   display: flex;
//   justify-content: center;
//   align-self: last baseline;
//   align-items: center;
//   gap: 11px;
//   width: 170px;
//   min-width: 60px;
//   cursor: pointer;
//   margin-right: 20px;
// `

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Add spacing between columns */
`

export const SmallContainer = styled.div`
  /* min-width: 200px; */
  padding: 10px;
`

export const ContentRow = styled.div`
  display: flex;
  align-items: start; /* Vertically centers the content */
  gap: 10px; /* Adds spacing between heading and text */
`

export const Text = styled.p`
  font-size: 18px;
  font-family: DM Sans;
  color: #666;
  line-height: 1.2; /* Matches line height with heading for alignment */

  @media (max-width: 768px) {
    font-size: 14px; /* Adjusts font size for smaller screens to match heading */
  }
`

export const Heading = styled.h2`
  font-size: 18px;
  font-weight: 700;
  font-family: DM Sans;
  color: ${Blue};
  line-height: 1.2; /* Ensures consistent vertical spacing */

  @media (max-width: 768px) {
    font-size: 14px; /* Adjusts font size for smaller screens */
  }
`

export const DropdownButtonStyled = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
`

export const ButtonV2 = styled.button<{
  filled?: boolean
  width?: string
  disabled?: boolean
}>`
  all: unset;
  background-color: ${(props) =>
    props.disabled ? Gray : getThemeDetails().primaryColor};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;

  &:hover {
    color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
    background-color: ${(props) => (props.disabled ? Gray : '#2d9de9')};
  }
`

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: max-content;
`
interface DropdownMenuProps {
  show: boolean
}

export const DropdownMenu = styled.div<DropdownMenuProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 8px;
  z-index: 1000;
  width: 100%;
  padding: 8px 0;
`

export const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: #f2f2f2;
  }
`
