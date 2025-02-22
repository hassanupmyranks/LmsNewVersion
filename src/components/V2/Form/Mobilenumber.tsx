import styled from 'styled-components'
import {
  Blue,
  RequiredRed,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { CSSProperties, InputHTMLAttributes } from 'react'
import { Required } from './styledComponents'
import { Grid, GridItem } from '../styledComponents'

interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  style?: CSSProperties
  required?: boolean
  full?: boolean
  error?: string
}

const InputMobile = ({
  label,
  style,
  required,
  full,
  error,
  ...inputProps
}: InputV2Props) => {
  return (
    <>
      <InputContainer style={style} full={full}>
        <InputLabel>
          {label}
          {required ? <Required>*</Required> : ''}
        </InputLabel>

        <Grid columns={12} gap="10px">
          <GridItem columnSpan={2}>
            <InputNew
              value="+91"
              placeholder="+91"
              style={{
                width: '100%',
                padding: '12px 0px',
                textAlign: 'center',
                position: 'relative'
              }}
            ></InputNew>
          </GridItem>
          <GridItem columnSpan={10}>
            <InputNew
              maxLength={10}
              minLength={10}
              error={error}
              style={{
                width: '97%',
                padding: '12px 0px 12px 10px',
                position: 'relative'
              }}
              {...inputProps}
            ></InputNew>
            {error && <RequiredError> {error}</RequiredError>}
          </GridItem>
        </Grid>
      </InputContainer>
    </>
  )
}

export default InputMobile

const InputLabel = styled.p`
  color: ${Blue};

  user-select: none;

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

const InputContainer = styled.label<{ full?: boolean }>`
  display: flex;
  width: 100%;
  ${({ full }) => !full && 'max-width: 500px;'}
  flex-direction: column;
  gap: 12px;
  position: relative;
`
const InputNew = styled.input<{ error?: string }>`
  all: unset;
  font-size: 14px;
  font-style: normal;
  letter-spacing: -0.28px;

  ${({ maxLength }) => maxLength && `max-length: ${maxLength};`}
  display: flex;
  background-color: red;
  border: 1px solid ${SecondaryGray};
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  background: ${White};
  color: ${Blue};
  cursor: text;
  ${({ error }) =>
    error
      ? `border: 1px solid ${RequiredRed};`
      : `border: 1px solid ${SecondaryGray};`}
  &::placeholder {
    color: ${SecondaryGray600};
    padding-left: 5px;
  }
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
export const RequiredError = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${RequiredRed};
  user-select: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
  margin-right: 10px;
`
