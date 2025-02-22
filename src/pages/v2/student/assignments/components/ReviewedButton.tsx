import React from 'react'
import styled from 'styled-components'

const ReviewedButton = ({
  label,
  onClick
}: {
  label: string
  onClick?: () => void
}) => {
  return <Button onClick={onClick}>{label}</Button>
}

export default ReviewedButton

export const Button = styled.button`
  all: unset;
  background-color: #2f9e3c;
  cursor: 'pointer';
  padding: 5px 10px;
  border: 1px solid rgba(106, 90, 224, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
