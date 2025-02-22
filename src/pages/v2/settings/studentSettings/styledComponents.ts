import styled from 'styled-components'
import { LightBlue } from '../../../../const/V2/stylingVariables'

export const Checkbox = styled.div`
  // background-color: ${LightBlue};
  display: flex;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
  width: fit-content;
`
export const FieldLabel = styled.div`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 600;
  font-size: 16px;
`
export const FieldContainer = styled.div`
  height: 100%;
  padding: 10px;
  border: 1px solid;
  border-radius: 15px;
  border: 1px solid #e0e5f2;
  max-height: 55vh;
  overflow-y: auto;
`
export const SelectContainer = styled.div`
  height: 100%;
  padding: 10px;
  border: 1px solid;
  border-radius: 15px;
  border: 1px solid #e0e5f2;
  max-height: 55vh;
  min-height: 55vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Fields = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const CheckboxContainer = styled.div``
export const HeadingH3 = styled.h3`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 600;
`

export const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
`
export const SelectedFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`
export const SelectedInputField = styled.div`
  border-radius: 15px;
  border: 1px solid #e0e5f2;
  min-width: 220px;
  padding: 10px;
`

export const ProfileField = styled.div`
  border-radius: 100px;
  border: 1px solid #e0e5f2;
  width: 60px;
  height: 60px;
`
export const FirstDiv = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const SecondDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const HeadingH5 = styled.h5`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 600;
`
