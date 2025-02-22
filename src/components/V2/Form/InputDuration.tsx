import styled from 'styled-components'
import { ReactComponent as LeftArrowSvg } from '../../../assets/svg/left-arrow.svg'
import { ReactComponent as RightArrowSvg } from '../../../assets/svg/right-arrow.svg'
import { Label, Required, InputContainer, Container } from './styledComponents'
import {
  SecondaryGray,
  White,
  Blue,
  SecondaryGray600,
  RequiredRed
} from '../../../const/V2/stylingVariables'
import { InputNumberProps } from '../../../utils/types'
import { useEffect, useState } from 'react'

const InputDuration = ({
  label,
  required,
  onChange,
  withHandler,
  value,
  max = Infinity,
  min = 0,
  error,
  ...inputProps
}: InputNumberProps) => {
  const [val, setValue] = useState(value ?? 0)

  const ButtonHandler = (addValue: number) => {
    const newVal = value + addValue
    if (newVal >= 0) {
      if (newVal < min) {
        setValue(min)
        onChange?.(min)
      } else if (newVal > max) {
        setValue(max)
        onChange?.(max)
      } else {
        setValue(newVal)
        onChange?.(newVal)
      }
    }
  }

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <Container>
      <Label>
        {label}
        {required ? <Required>*</Required> : ''}
      </Label>
      <InputContainer>
        {withHandler && (
          <LeftArrowSvg
            style={{ cursor: 'pointer' }}
            onClick={() => ButtonHandler(-1)}
          />
        )}
        <InputDiv error={error}>
          <Input
            value={val}
            type="string"
            {...{ ...inputProps }}
            onChange={(e) => {
              if (!Number.isNaN(+e.target.value)) {
                setValue(+e.target.value)
              }
            }}
            onBlur={(e) => {
              const number = +e.currentTarget.value
              if (!isNaN(number) && number >= 0) {
                if (number < min) {
                  setValue(min)
                  onChange?.(min)
                } else if (number > max) {
                  setValue(max)
                  onChange?.(max)
                } else {
                  setValue(number)
                  onChange?.(number)
                }
              }
            }}
          />
          <p>Min</p>
        </InputDiv>
        {withHandler && (
          <RightArrowSvg
            style={{ cursor: 'pointer' }}
            onClick={() => ButtonHandler(1)}
          />
        )}
      </InputContainer>
    </Container>
  )
}

export default InputDuration

const InputDiv = styled.div<{ error?: string }>`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  display: flex;
  border: 1px solid ${SecondaryGray};
  border-radius: 1rem;
  ${({ error }) =>
    error
      ? `border: 1px solid ${RequiredRed};`
      : `border: 1px solid ${SecondaryGray};`}
  width: 110px;
  height: 55px;
  align-items: center;
  gap: 4px;
  padding: 0 30px 0 10px;
  background: ${White};
  color: ${Blue};

  cursor: text;

  &::placeholder {
    color: ${SecondaryGray600};
    font-weight: 400;
  }
`
const Input = styled.input<{ error?: string }>`
  all: unset;
  width: 36px;
  text-align: end;
`
