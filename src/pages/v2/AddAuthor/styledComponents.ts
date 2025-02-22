import styled from 'styled-components'
import {
  Blue,
  BlueButton,
  PrimaryBlue,
  White
} from '../../../const/V2/stylingVariables'
import { ReactComponent as DotsIconSvg } from '../../../assets/svg/three-vertical-dots.svg'

export const PageContainer = styled.div`
  width: 1043px;
  height: 414px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid rgba(163, 174, 208, 0.51);
  background: ${White};
  margin: 10px;
  padding: 20px;
`
export const AuthorHeading = styled.h1`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.48px;
`

export const BasePageContainer = styled.div`
  width: 37%;
  height: 365px;
  border-radius: 20px;
  background-color: ${White};
  padding: 20px;

  @media (max-width: 1280px) {
    width: 48%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`
export const AddAuthorHeading = styled.h1`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.4px;
`

export const AddAuthorDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 60px;
  margin-top: 20px;
`

export const AddAuthorImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`
export const ImageRequirements = styled.div`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const AddAuthorInput = styled.div`
  padding-left: 2%;
  width: 100%;
  margin-left: 20px;
`
export const AddAuthorButton = styled.button`
  background-color: ${PrimaryBlue};
  color: ${White};
  width: 155px;
  height: 50px;
  text-align: center;
  font-family: DM Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.28px;
  border-radius: 10px;
  border-width: 0px;
`
export const AuthorListBaseContainer = styled.div`
  width: 37%;
  height: 550px;
  border-radius: 20px;
  background-color: ${White};
  padding: 10px;

  @media (max-width: 1280px) {
    width: 48%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`
export const AuthorListHeading = styled.h1`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.36px;
  padding-left: 10px;
  padding-top: 5px;
  margin-bottom: 0px;
`
export const ListBaseContainer = styled.div`
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  height: 70px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`
export const ListImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 4px;
  border-radius: 50%;
`
export const ListLabel = styled.h1`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 2px;
`
export const ListPara = styled.p`
  color: #a3aed0;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`
export const ListDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 70%;
`
export const ListDetails = styled.div`
  padding-left: 10px;
`
export const AuthorMainPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 18px;
  height: 80vh;
  // margin-left: 10px;
  overflow-y: auto;
  gap: 18px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const LoaderAlign = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;

  div {
    width: 30px !important;
    height: 30px !important;
    border: 4px solid #e0e0e0 !important;
    border-right-color: ${BlueButton} !important;
  }
`
export const ListLoader = styled.div`
  margin-top: 10%;
`
export const DropdownContainer = styled.div`
  position: relative;
  background: ${White};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const DotsIcon = styled(DotsIconSvg)`
  cursor: pointer;
  height: 16px;
  width: 16px;
  border-radius: 8px;
`
export const DropdownPopup = styled.div`
  position: absolute;
  z-index: 999;
  padding: 10px;
  width: 140px;
  overflow-y: auto;
  top: calc(100% + 6px);
  display: flex;
  right: 18px;
  flex-direction: column;
  gap: 7px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  background-color: ${White};
`
export const DropdownOption = styled.div<{ selected?: string }>`
  all: unset;
  cursor: pointer;
  display: block;
  padding: 10px;
  border-radius: 5px;
  ${({ selected }): any => {
    switch (selected) {
      case 'Edit': {
        return 'color:#5B93FF; background-color:rgba(91, 147, 255, 0.05);'
      }
      case 'Delete': {
        return 'color:#E71D36; background-color:rgba(231, 29, 54, 0.05); '
      }
      case 'Re-Assign': {
        return 'color:#FF8F6B; background-color:rgba(255, 143, 107, 0.05); '
      }
      case 'Download': {
        return `color:${PrimaryBlue}; background-color:rgba(25, 123, 189, 0.05); `
      }
      default: {
        return `color:${Blue}; background-color:rgba(72, 45, 233, 0.05);`
      }
    }
  }}
  font-size: 11px;
  font-weight: 500;
`
export const Flex = styled.div<{
  gap?: string
  justifyContent?: string
  alignItems?: string
  direction?: 'row' | 'column'
  wrap?: boolean
}>`
  display: flex;

  ${({ direction }) => `flex-direction: ${direction};`}

  ${({ wrap }) => wrap && `flex-wrap: wrap;`}
  
    gap: ${({ gap }) => gap};
  align-items: ${({ alignItems }) => alignItems ?? 'center'};
  justify-content: ${({ justifyContent }) => justifyContent};
`
export const AuthorListWrapper = styled.div`
  overflow-y: auto;
  height: 88%;
  padding: 10px 15px 0px 15px;

  @media (max-width: 768px) {
    padding: 0px;
  }
`
