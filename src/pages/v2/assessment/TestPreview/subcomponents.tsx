import styled from 'styled-components'
import {
  White,
  Blue,
  SecondaryGray600,
  PrimaryBlue,
  QuestionContainerBG,
  SelectedQuestionBG,
  SelectedQuestion,
  SecondaryGray
} from '../../../../const/V2/stylingVariables'
import { getThemeDetails } from '../../../../helpers/V2/getThemeDetails'
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
export const IconFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const SearchIconDiv = styled.div`
  margin: 0 5px;
`

export const Image = styled.img`
  width: 32px;
  height: 32px;
  margin: 0 10px;
`
export const SmallImage = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 10px;
`
export const SmallLabel = styled.p`
  margin: 0 5px !important;
  color: ${Blue};
  font-size: 14px;
  font-weight: 700;
`
export const OrSymbole = styled.div`
  width: 2px;
  height: 36px;
  border-radius: 25px;
  margin-left: 10px;
  background: rgba(163, 174, 208, 0.49);
`
export const SearchContainer = styled.div`
  width: 25%;
  height: 45px;
  background-color: ${White};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-items: center;
  border-radius: 30px;

  box-shadow: 0px 0px 15px 9px rgba(112, 144, 176, 0.08);
`

export const InnerSearchContainer = styled.div`
  margin: 4%;
  width: 97%;
  height: 30px;
  background-color: #f4f7fe;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 5px;
`
export const InputWrapper = styled.input`
  background-color: #f4f7fe;
  border-width: 0px;
  color: #8f9bba;
  width: 100%;
  font-family: DM Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
  outline: none;
`
export const InputCheckbox = styled.input`
  background-color: #f4f7fe;
  margin-right: 10px;
`
export const FormContainerV2Inner = styled.div`
  padding: 20px 10px;
  border-radius: 20px;
  background: ${White};
  border: 1px solid lightgray;
  display: flex;
  height: 100%;
  flex-direction: column;
`
export const FormContainerV2InnerSelect = styled.div`
  padding: 20px;
  padding-left: 0px;
  padding-bottom: 0px;
  border-radius: 15px;
  background: ${White};
  border: 1px solid lightgray;
  display: flex;
  align-items: start;
  height: 100%;
  flex-direction: row;
  box-shadow: 0 0 5px 5px rgba(112, 144, 176, 0.08);
  // margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 10px;
  }
`
export const HeadingTitle = styled.h1`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px; /* 171.429% */
  letter-spacing: -0.2px;
`
export const HeadingSubTitle = styled.h1`
  color: ${SecondaryGray600};
  font-family: DM Sans;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px; /* 171.429% */
  letter-spacing: -2%;
  //   margin-bottom: 10px;
`
export const HeadingCheckboxSubTitle = styled.h1`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px; /* 171.429% */
  letter-spacing: -0.2px;
  margin-bottom: 0px;
`

// Second part
export const QuestionsContainer = styled.div`
  border-radius: 6px;
  //   border: 1px solid rgba(163, 174, 208, 0.51);
  background: ${QuestionContainerBG};
  padding: 10px 0 15px 20px;
  width: 100%;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    padding: 0px;
  }
`
export const MarksButton = styled.button`
  border: 1px solid ${PrimaryBlue};
  color: ${getThemeDetails().primaryColor};
  background: ${White};
  border-radius: 12px;
  padding: 10px 8px 10px 8px;
  font-family: DM Sans;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: -0.02em;
  text-align: center;
`
export const QuestionAddButton = styled.button`
  margin-right: 10px;
  border: none;
  background: inherit;
`

export const AddQuestionHeading = styled.h1`
  color: #2b3674;

  font-family: DM Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.48px;
`
export const OptionContainer = styled.div`
  //   display: flex;
  //   justify-content: start;
`
export const OptionHeadingText = styled.h4`
  color: ${Blue};
  //   text-align: right;
  font-family: DM Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.36px;
  margin-top: 10px;
`

export const QuestionsListContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
`
export const QuestionText = styled.h2`
  font-family: DM Sans;
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${Blue};
  margin-bottom: 0px;

  td {
    font-size: 16px;
  }
  & p,
  div {
    display: inline;
  }
`
export const QuestionInnerContainer = styled.div`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 166.667% */
  letter-spacing: -0.36px;
  width: 70%;
`
export const IconsContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const CircleBackground = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ddf1ff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const QuestionButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 5px;
`
export const ButtonContainer = styled.button<{ selected: boolean }>`
  width: 230px;
  min-height: 57px;
  display: flex;
  border: 1px solid #a3aed054;
  display: flex;
  justify-content: start;
  align-items: center;
  background: ${({ selected }) => (selected ? SelectedQuestionBG : White)};
  margin-right: 10px;
  border-radius: 16px;
  padding: 10px;
  font-family: DM Sans;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${Blue};
  cursor: auto;
  border: 1px solid
    ${({ selected }) => (selected ? SelectedQuestion : SecondaryGray600)};

  mjx-container[jax='CHTML'][display='true'] {
    margin: 0px !important;
  }
`

export const OptionHeading = styled.h1`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.3px;
  padding: 0px 0px 0px 33px;
  width: 70%;
`

export const AutoSaveParentButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`
export const AutoSaveButtonContainer = styled.div`
  display: inline-flex;
  padding: 20px;
  text-align: end;
  width: max-content;
  gap: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0px 18px 40px 0px #7090b01f;
`
export const AutoSavePara = styled.p`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 175% */
  letter-spacing: -0.32px;
`
export const AutoSaveLogo = styled.img`
  width: 30px;
  height: 30px;
`
export const SectionName = styled.div`
  color: ${Blue};
  width: 100%;
  text-align: center;
  font-family: DM Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  padding-left: 20px;
`
