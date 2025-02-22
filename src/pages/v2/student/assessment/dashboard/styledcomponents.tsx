import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Gray } from '../../../../../const/V2/stylingVariables'

export const AssesmentContainerWrapper = styled.div`
  padding: 25px 20px 18px 20px;
  height: 400px;
  position: relative;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 7px 21px 0px #0000001a;

  @media (max-width: 768px) {
    width: 100% !important;
  }
`

export const AssesmentTableTabWrapper = styled.button<{ active?: any }>`
  display: flex;
  justify-content: center;
  width: 50%;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? '#1376B9' : 'transparent')};
  padding: 10px 0;
  border: 1px solid lightgrey;
  color: ${({ active }) => (active ? '#fff' : '#000')};
`
export const AssessmentFlex = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const TwoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const Button = styled(Link)`
  all: unset;
  width: fit-content;
  padding: 16px 32px;
  border-radius: 17px;
  border: transparent;
  background: ${(props) =>
    props['aria-disabled']
      ? Gray
      : `linear-gradient(183.93deg, #4190f3 0.31%, #69d1f9 106.24%)`};
  cursor: ${(props) => (props['aria-disabled'] ? 'not-allowed' : 'pointer')};
  color: #ffffff;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  :hover {
    color: #ffffff;
  }
`
