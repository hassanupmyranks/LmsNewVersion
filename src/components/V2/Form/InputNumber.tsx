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

const InputNumber = ({
  label,
  required,
  onChange,
  withHandler,
  value,
  max = Infinity,
  min = 0,
  error,
  Update,
  showButtons,
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

  const handleIncrement = () => {
    if (val < max) {
      const newValue = val + 1
      setValue(newValue)
      onChange?.(newValue)
    }
  }

  const handleDecrement = () => {
    if (val > min) {
      const newValue = val - 1
      setValue(newValue)
      onChange?.(newValue)
    }
  }

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
        {label == 'Assigned Marks' ? (
          ''
        ) : showButtons ? (
          <Button onClick={handleIncrement}>+</Button>
        ) : (
          ''
        )}

        <Input
          Update={Update}
          value={val}
          type="string"
          error={error}
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
        {label == 'Assigned Marks' ? (
          ''
        ) : showButtons ? (
          <Button onClick={handleDecrement}>-</Button>
        ) : (
          ''
        )}
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

export default InputNumber

const Input = styled.input<{ error?: string; Update?: boolean }>`
  all: unset;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  border: 1px solid
    ${({ error, Update }) =>
      error ? RequiredRed : Update ? '#0bed07' : SecondaryGray};
  padding: 16px 24px;

  border-radius: 1rem;

  width: 60px;
  text-align: center;

  background: ${White};
  color: ${Blue};

  cursor: text;

  &::placeholder {
    color: ${SecondaryGray600};
    font-weight: 400;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`
const Button = styled.button`
  border: none;
  color: #197bbd;
  font-weight: bolder;
  background: transparent;
  font-size: 20px;
  padding: 0px;
`
