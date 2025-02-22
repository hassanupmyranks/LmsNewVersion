import styled from 'styled-components'
import {
  Blue,
  SecondaryGray600,
  White
} from '../../../../const/V2/stylingVariables'

export const FormContainerV2 = styled.div`
  padding: 12px 0px;
  border-radius: 20px;
  //   background: ${White};

  display: flex;
  height: 100%;
  flex-direction: column;

  overflow-y: auto;

  gap: 5px;
`
export const HeadingTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${Blue};
  /* padding-bottom: 15px; */
`
export const HeadingTitleSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${SecondaryGray600};
`
export const DurationLabel = styled.p`
  color: ${Blue};

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`
export const DurationPickerContainer = styled.div`
  margin-left: -14px;
`
export const MyTimeWrapper = styled.div`
  height: 210px;
  width: 230px;
  background-color: #2d9de9;
  border-radius: 20px;
  margin: 20px 0px 0px 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  font-weight: 700;
  color: #858b9b;
  background-image: linear-gradient(
    #ffffff 90px,
    rgba(255, 255, 255, 0) 90px,
    rgba(255, 255, 255, 0) calc(100% - 84px),
    #ffffff calc(100% - 84px)
  );
`

export const TimeInput = styled.input`
  display: flex;
  justify-content: center;
  height: 40px;
  width: 150px;
  border: 1px solid #1376b9;
  border-radius: 15px;
  font-size: 16px;
  color: #1376b9;
  font-weight: 700;
`
export const Text2 = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Blue};
  line-height: 20px;
`
