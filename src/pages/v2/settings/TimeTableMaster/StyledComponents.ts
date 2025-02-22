import styled from 'styled-components'
import {
  White,
  Blue,
  PrimaryBlue,
  SecondaryGray,
  SecondaryGray300
} from '../../../../const/V2/stylingVariables'

export const Container = styled.div`
  // margin: 5px;
  width: 60%;
  overflow: auto;

  @media (max-width: 1024px) {
    margin: 5px;
    min-width: 650px;
    overflow: auto;
  }
  @media (max-width: 425px) {
    min-width: 340px;
    max-height: 300px;
    overflow: auto;
    margin: 5px;
  }
`

export const TableContainer = styled.div`
  width: 100%;
  min-width: 400px; /* Set a maximum height for vertical scrolling */
  overflow-y: auto;
  background: #fff;
  // padding: 16px;
  & thead {
    position: sticky;
    top: -18px;
    height: 52px;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 20px;
  width: 100%;
`

export const Th = styled.th`
  background-color: #1377b9;
  color: white;
  padding: 8px;
  // border-radius: 18px;
  text-align: center;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  // text-transform: uppercase;
  border-bottom: 2px solid #ddd;
`
export const FirstTh = styled.th`
  background-color: #1377b9;
  color: white;
  padding: 8px;
  border-radius: 10px 0 0 10px;
  white-space: nowrap;
  // text-transform: uppercase;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #ddd;
`
export const LastTh = styled.th`
  background-color: #1377b9;
  color: white;
  padding: 8px;
  border-radius: 0 10px 10px 0;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  // text-transform: uppercase;
  border-bottom: 2px solid #ddd;
`

export const Tr = styled.tr`
  background-color: ${SecondaryGray300};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  &:hover {
    background-color: white;
  }
`

export const Td = styled.td`
  text-align: left;
  padding: 8px;
  white-space: nowrap;
  text-align: center;
  padding: 15px;
`
export const EditTd = styled(Td)`
  color: #1377b9;
  cursor: pointer;
  font-weight: bold;
  padding: 15px;
  border-radius: 0 10px 10px 0;
  &:hover {
    text-decoration: underline;
  }
`

export const FirstEditTd = styled(Td)`
  text-align: left;
  padding: 8px;
  white-space: nowrap;
  padding: 15px;
  text-align: center;
  border-radius: 10px 0 0 10px;
`

export const MenuBar = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
`
export const FirstDiv = styled.div`
  width: 25%;
  align-content: start;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`
export const InputFlex = styled.div`
  display: flex;

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }
`
export const Box2 = styled.div`
  display: flex;
  flex: start;
  justify-content: center;
  overflow-y: auto;
  width: 53%;
  height: 100%;
  min-height: 250px;
  border: 1px solid lightgray;
  border-radius: 15px;
  padding: 15px;
  margin: 10px;

  @media (max-width: 992px) {
    min-width: 350px;
  }
`
export const Box = styled.div`
  display: flex;
  flex: start;
  justify-content: start;
  width: 43%;
  height: 100%;
  flex-direction: column;
  min-height: 250px;
  border: 1px solid lightgray;
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
  overflow-y: auto;

  @media (max-width: 992px) {
    font-size: 5px; /* Adjust font size for smaller screens */
    line-height: 1.2; /* Optional: Adjust line height for readability */
    /* padding: 10px; Reduce padding for smaller screens */
    min-width: 350px;
  }

  @media (max-width: 1024px) {
    min-width: 650px;
  }

  @media (max-width: 425px) {
    min-width: 340px;
    max-height: 300px;
  }
`
export const InnerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* overflow: hidden; */
  /* max-height: 98px; */
  gap: 20px;
  align-items: center;
  padding-top: 5px;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 10px;
    margin: 10px;
  }
`

export const Heading = styled.div`
  font-family: 'Poppins', sans-serif; /* Modern, clean font */
  font-size: 22px;
  font-weight: 700;
  color: ${Blue};
  margin-bottom: 15px;
  letter-spacing: 0.5px;

  @media (max-width: 992px) {
    font-size: 16px;
  }

  @media (max-width: 425px) {
    font-size: 24px; /* Adjust font size for smaller screens */
  }
`
export const TimerBox = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  align-items: center;
  padding-top: 25px;

  @media (max-width: 992px) {
    font-size: 16px; /* Adjust font size for smaller screens */
  }

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }
`
export const Line = styled.div`
  width: 100%; /* Full width */
  height: 1px; /* Thin horizontal line */
  background-color: grey; /* Grey color */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow effect */
  border-radius: 1px;
`
export const Text = styled.p`
  font-size: 25px;
  font-family: DM Sans;
  color: #666;
  line-height: 1.2; /* Matches line height with heading for alignment */

  @media (max-width: 768px) {
    font-size: 14px; /* Adjusts font size for smaller screens to match heading */
  }
`
export const PopupOverlay = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  background: #fff; /* White background */

  @media (max-width: 992px) {
    font-size: 16px; /* Adjust font size for smaller screens */
  }
`
export const PopupContent = styled.div`
  padding: 10px;
  width: 550px;
  height: 350px;
  border-radius: 18px;
  box-shadow: 0 4px 6px 4px rgba(0, 0, 0, 0.1);
  position: relative;
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
export const FormContainerV2 = styled.div`
  padding: 30px;
  border-radius: 20px;
  background: ${White};
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 425px) {
    padding: 6px;
  }
`
export const FormContainerV = styled.div`
  padding: 30px;
  border-radius: 20px;

  display: flex;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  gap: 20px;
`
export const StyledContainer = styled.div`
  width: 42%;
  display: flex;
  flex-wrap: nowrap; /* Prevents wrapping to keep items in a single row */
  gap: 20px; /* Adds spacing between items */
  align-items: center;
  justify-content: space-between; /* Ensures spacing between dropdowns */
  padding: 10px; /* Adds inner spacing */
  box-sizing: border-box; /* Includes padding in width/height calculations */

  & > * {
    flex: 1; /* Ensures all items take equal space */
    min-width: 150px; /* Sets a minimum width for dropdowns to avoid shrinking too much */
  }

  @media (max-width: 768px) {
    gap: 15px; /* Adjusts gap for smaller devices */
  }
  @media (max-width: 1024px) {
    gap: 20px; /* Adjusts gap for smaller devices */
    width: 96%;
  }
`
export const StyledContainerT = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap; /* Prevents wrapping to keep items in a single row */
  align-items: center;
  justify-content: space-between; /* Ensures spacing between dropdowns */
  padding: 10px; /* Adds inner spacing */
  box-sizing: border-box; /* Includes padding in width/height calculations */

  & > * {
    flex: 1; /* Ensures all items take equal space */
    min-width: 150px; /* Sets a minimum width for dropdowns to avoid shrinking too much */
  }

  @media (max-width: 768px) {
    gap: 15px; /* Adjusts gap for smaller devices */
  }
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

export const Label = styled.p<{ isActive: boolean }>`
  margin-right: 10px !important;
  color: ${(props) => (props?.isActive ? PrimaryBlue : SecondaryGray)};
  font-size: 18px;
  font-weight: 700;
  margin-left: 5px !important;
`
export const FlexContainer = styled.div`
  //   width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  cursor: pointer;
  //   justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    align-items: start;
    padding-left: 0px;
  }
`
export const FlexContainerV2 = styled.div`
  padding-left: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding-left: 5px;
  }
`
