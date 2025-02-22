import styled from 'styled-components'
import { Blue, PrimaryBlue, White } from '../../../const/V2/stylingVariables'

export const Flex = styled.div`
  width: 100%;
  overflow: auto;

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
  height: 300px;
  width: 60px;
  background-color: ${PrimaryBlue};
  border-bottom-left-radius: 10px;
`
export const DetailBox = styled.div`
  height: 380px;
  width: 100%;
  background-color: white;
  padding: 20px 20px;
  border-radius: 0px 10px 10px 0px;
`

export const FormContainerV2 = styled.div`
  margin: 30px;
  border-radius: 20px;
  background: ${White};
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 12px;
  }
`

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Prevents wrapping to keep items in a single row */
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  overflow-x: auto;
  align-items: center;

  & > * {
    flex: 1; /* Ensures all items take equal space */
    min-width: 150px; /* Sets a minimum width for dropdowns to avoid shrinking too much */
  }

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Allows wrapping for smaller screens */
    gap: 15px;
  }
`

export const SmallContainer = styled.div`
  min-width: 200px;
  padding: 10px;
`

export const ContentRow = styled.div`
  display: flex;
  align-items: start; /* Vertically centers the content */
  gap: 10px; /* Adds spacing between heading and text */
`

export const Text = styled.p`
  font-size: 24px;
  font-family: DM Sans;
  color: #666;
  line-height: 1.2; /* Matches line height with heading for alignment */

  @media (max-width: 768px) {
    font-size: 14px; /* Adjusts font size for smaller screens to match heading */
  }
`
export const MenuBar = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
`
export const Heading = styled.h2`
  font-size: 24px;
  font-weight: 700;
  font-family: DM Sans;
  color: ${Blue};
  line-height: 1.2; /* Ensures consistent vertical spacing */

  @media (max-width: 768px) {
    font-size: 14px; /* Adjusts font size for smaller screens */
  }
`

export const FlexContainerOne = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1450px) {
    display: block;
  }
`
