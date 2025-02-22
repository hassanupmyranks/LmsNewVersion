import styled from 'styled-components'
import {
  Blue,
  BlueButton,
  CompletedButton,
  CoolGray10,
  CoolGray20,
  CoolGray90,
  Gray,
  SecondaryGray300,
  White
} from '../../const/V2/stylingVariables'
import { getThemeDetails } from '../../helpers/V2/getThemeDetails'

export const Grid = styled.div<{
  rows?: number
  columns?: number | string
  gap?: string
}>`
  display: grid;
  gap: ${({ gap }) => gap};
  grid-template-columns: repeat(${({ columns }) => columns ?? 1}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows ?? 1}, 1fr);
`
export const GridItem = styled.div<{
  rowSpan?: number
  columnSpan?: number
  full?: boolean
}>`
  grid-column: span ${({ columnSpan }) => columnSpan ?? 1};
  grid-row: span ${({ rowSpan }) => rowSpan ?? 1};
`

export const Flex = styled.div<{
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

export const PageContainer = styled.div<{ scroll?: boolean }>`
  background-color: ${SecondaryGray300};
  flex: 1 0 0;
  padding: 0.5rem 1.25rem 1.5rem;
  // gap: 0.75rem;
  display: flex;
  flex-direction: column;
  position: relative;

  overflow: ${({ scroll }) => (scroll ? 'auto' : 'hidden')};

  & p {
    margin: 0;
  }

  & * {
    font-family: 'DM Sans', sans-serif;
  }
`

export const WrapperCard = styled.div<{ fullHeight?: boolean }>`
  background-color: ${White};
  border-radius: 20px;

  padding: 20px;

  border-top: 0;

  ${({ fullHeight }) => fullHeight && 'height: 100%;'}
  max-height: 100vh;
  overflow: auto;
  @media (max-width: 767px) {
    padding: 10px !important;
    width: 100% !important;
    margin: 0 0 !important;
  }
`
export const FormHeading = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`

export const SecondaryHeading = styled.h2`
  color: ${CoolGray90};

  font-family: 'DM Sans', sans-serif;
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: 46.2px;
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

export const RemoveBtn = styled.span`
  background: #fde7e7;
  border-radius: 23px;
  align-items: center;
  text-align: center;
  max-width: 122px;
  padding: 2px 8px;
  color: #cc1818;
  font-size: 14px;
  font-weight: 500;
  z-index: 0;
`

export const SuccessButtonV2 = styled.button<{
  filled?: boolean
  width?: string
  disabled?: boolean
}>`
  all: unset;
  background-color: ${(props) => (props.disabled ? Gray : CompletedButton)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 8px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;

  &:hover {
    color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
    background-color: ${(props) => (props.disabled ? Gray : CompletedButton)};
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
export const AverageScore = styled.div`
  display: flex;
  justify-content: space-between;
  height: 98px;
  width: 320px;
  background-image: linear-gradient(to bottom, #e5f3ff, white);
  border-radius: 20px;
`
export const AnalysisScore = styled.div`
  display: flex;
  justify-content: space-between;
  height: 98px;
  width: 320px;
  background-image: linear-gradient(to bottom, #f0f0ff, white);
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  border-radius: 20px;
`
export const ScoreHeading = styled.p`
  font-family: 'DM Sans';
  font-weight: 600;
  font-size: 16px;
  line-height: 19.6px;
  color: #69baf0;
  padding: 20px 0px 0px 20px;
`
export const AnalysHeading = styled.p`
  width: 110px;
  font-family: 'DM Sans';
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #64619f;
  padding: 0px 0px 0px 20px;
`
export const Score = styled.p`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #286996;
  padding: 4px 0px 0px 20px;
`
export const AnalysScore = styled.p`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #8686b8;
  padding: 4px 0px 0px 14px;
`
export const MyFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ListContainer = styled.div`
  padding: 15px;
  background: ${White};
  gap: 10px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  width: 40%;
`
export const ListWrapper = styled.div`
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
export const ItemName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Blue};
`
export const LabelH4 = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${Blue};
  margin: 5px;
  padding: 6px;
`
export const Span = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${Gray};
  margin-bottom: 15px;
`
