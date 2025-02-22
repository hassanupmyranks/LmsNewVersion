import styled from 'styled-components'
import {
  Blue,
  PrimaryBlue,
  White
} from './../../../../const/V2/stylingVariables'

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
  padding: 0px;
  border-radius: 20px;
  background: ${White};
  display: flex;
  height: 18%;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`
export const ContentRow = styled.div`
  display: flex;
  align-items: start; /* Vertically centers the content */
  gap: 10px; /* Adds spacing between heading and text */
`
export const ButtonWrapper = styled.div`
  justify-content: center;
`
export const Flexs = styled.div`
  display: flex;
`

export const DateWrapper = styled.div`
  margin-left: auto;
  width: 300px;
`

export const StyledContainer = styled.div`
  width: 100%;
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
`

export const Flex1 = styled.div<{
  gap?: string
  justifyContent?: string
  alignItems?: string
  direction?: 'row' | 'column'
  wrap?: boolean
}>`
  display: flex;

  ${({ direction }) => `flex-direction: ${direction};`}

  ${({ wrap }) => wrap && `flex-wrap: wrap;`}

  gap: ${({ gap }) => gap};
  align-items: ${({ alignItems }) => alignItems ?? 'center'};
  justify-content: ${({ justifyContent }) => justifyContent};
`

export const SmallContainer = styled.div`
  padding: 10px;
  flex-wrap: nowrap; /* Keeps items in a single row unless wrapping is allowed */
  justify-content: center;
  align-items: center;
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
