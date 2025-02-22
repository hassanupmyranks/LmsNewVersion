import styled from 'styled-components'
import { White } from '../../../const/V2/stylingVariables'
import { getThemeDetails } from '../../../helpers/V2/getThemeDetails'

const SelectButtonV2 = ({
  label,
  isSelected,
  onClick
}: {
  label?: string
  isSelected?: boolean | any
  onClick?: (d: any) => void
}) => {
  return (
    <QuestionButtonV2 onClick={onClick} bgColor={isSelected ? '' : `${White}`}>
      {label}
    </QuestionButtonV2>
  )
}

export default SelectButtonV2

const QuestionButtonV2 = styled.button<{
  filled?: boolean
  width?: string
  bgColor?: string
}>`
  all: unset;
  border-radius: 12px;
  width: 80px;
  padding: 6px 8px 5px 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  text-align: center;

  ${({ bgColor }) =>
    bgColor
      ? ` background: ${bgColor};`
      : `background: ${getThemeDetails().primaryColor};`}
  color: ${({ bgColor }) => (bgColor ? 'rgba(25, 123, 189, 1)' : White)};
  ${({ bgColor }) =>
    bgColor ? `border: 1px solid rgba(25, 123, 189, 1);` : ''};
  letter-spacing: -0.28px;
  ${({ width }) => width && `min-width: ${width};`};

  &:hover {
    color: ${White};
    background-color: rgba(25, 123, 189, 1);
  }
`
