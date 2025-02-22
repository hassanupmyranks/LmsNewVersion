import toast from 'react-hot-toast'
import styled from 'styled-components'
import { ReactComponent as DoubleTickSvg } from '../../../assets/svg/double-tick-icon.svg'
import { ReactComponent as CrossErrorIcon } from '../../../assets/svg/cross-error-icon.svg'

export const CustomToastMessage = (
  text: string,
  status: 'success' | 'error'
) => {
  return toast.custom(
    () => (
      <StyledDiv>
        {status === 'success' ? <DoubleTickSvg /> : <CrossErrorIcon />}
        <p>{text}</p>
      </StyledDiv>
    ),
    {
      duration: 1000
    }
  )
}

const StyledDiv = styled.div`
  width: 250px;
  height: auto;
  padding: 12px;
  border-radius: 16px !important;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #e6f8f1 !important;
  color: #2b3674 !important;
  font-size: 14px;
  font-family: DM Sans !important;
  font-weight: 700;
  border: 1px solid #4f9f80 !important;
  position: fixed;
  top: 60px;
`
