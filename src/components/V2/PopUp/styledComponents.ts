import styled from 'styled-components'
import { Blue } from '../../../const/V2/stylingVariables'
import { ReactComponent as RemoveIconSvg } from '../../../assets/svg/close-page.svg'

export const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  background: rgba(104, 104, 104, 0.4);
`

export const PopUpBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
  width: 500px;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;
  gap: 10px;
`
export const Heading = styled.div`
  color: ${Blue};
  user-select: none;
  font-size: 18px;
  font-weight: 700;
  font-family: DM Sans;
  letter-spacing: -0.28px;
`

export const HeadingH2 = styled.div`
  color: ${Blue};
  user-select: none;
  font-size: 22px;
  font-weight: 700;
  font-family: DM Sans;
  letter-spacing: -0.28px;
`
export const RemoveIcon = styled(RemoveIconSvg)`
  cursor: pointer;
  height: 20px;
  width: 20px;
`

export const AlignHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0px 15px 0px;
`
export const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  align-self: center;
  gap: 10px;
`
export const SearchInputWrapper = styled.div`
  // margin-bottom: 8px;
`
export const BatchPopUpBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 230px;
  width: 360px;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;
`
export const WarningPopUpBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: auto;
  width: 360px;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 16px 12px;

  p {
    color: ${Blue};
    user-select: none;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.28px;
  }
`
