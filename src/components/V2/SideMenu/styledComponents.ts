import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Blue, CoolGray20 } from '../../../const/V2/stylingVariables'

export const MenuWrapper = styled.div`
  width: 230px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 0px 20px 20px 0px;
  max-height: 100vh;
  position: sticky;
  top: 0;
  @media (max-width: 992px) {
    position: fixed;
    inset: 0px;
    z-index: 1200;
    overflow-x: hidden;
    transition: width 0.25s ease-in-out 0s;
  }
`

export const UserName = styled.p`
  color: ${Blue};
  font-family: GT Walsheim, sans-serif;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  border-bottom: 1px solid ${CoolGray20};
`
export const BatchName = styled.p`
  color: ${Blue};
  font-family: GT Walsheim, sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`
export const ItemsContainer = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 75vh;
  overflow-y: auto;
`

export const MenuItem = styled(Link)<{ active?: boolean }>`
  all: unset;

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 6px 18px 6px 22px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
        &::after {
            content: '';
            position: absolute;
            inset: 0 0 0 auto;
            width: 4px;
            border-radius: 2px;
            background-color: #1377b9;
        }   
      `}
`
export const ImageContainer = styled.div`
  max-width: 24px;
  aspect-ratio: 1;
  margin-right: 12px;
`
export const ChildImageContainer = styled.div<{ active?: boolean }>`
  max-width: 24px;
  aspect-ratio: 1;
  opacity: ${({ active }) => (active ? 1 : 0.4)};
`

export const MenuLabel = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? Blue : '#8693ba')};
  font-weight: ${({ active }) => (active ? 700 : 500)};
  letter-spacing: -0.32px;
`
export const ChildMenuLabel = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#1376B9' : '#8693ba')};
  font-weight: 700;
  letter-spacing: -0.32px;
  margin-left: 37px;
`
export const ChildMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const MainLogo = styled.div`
  width: 150px;
  height: 50px;
  background: linear-gradient(#d93d3d, #c31212);
  // border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Section = styled(Link)<{
  isActive: boolean
}>`
  all: unset;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  width: -webkit-fill-available;
  height: 60px;
  display: flex;
  padding-right: 20px;
  gap: 16px;
  justify-content: start;
  align-items: center;
  border-radius: 0 8px 8px 0;
  font-size: 18px;
  line-height: 20px;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  background-color: ${({ isActive }) => (isActive ? '#EDF3FE' : '')};
  color: ${({ isActive }) => (isActive ? '#0A0A0A' : '#333')};
  &:hover {
    color: #333;
  }
  &::before {
    content: '';
    width: 16px;
    height: 100%;
  }
  ${({ isActive }) =>
    isActive &&
    `&::before{
       border-radius:8px 0 0 8px ;
       background-color:${Blue};
  }`};
`

export const LoginContainer = styled(Link)`
  all: unset;
  font-size: 18px;
  cursor: pointer;
  font-weight: 500;
  position: absolute;
  bottom: 5%;
  left: 25%;
  color: #333;
  &:hover {
    color: #333;
  }
`
export const Flex = styled.div`
  display: flex;
  align-items: center;
`
export const ProfileImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-bottom: 12px;
  border: 3px solid #1376b9;
`
export const LogoNameContainer = styled.div`
  margin: 30px 0px 10px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  span {
    color: ${Blue};
    font-family: GT Walsheim, sans-serif;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
`
export const Count = styled.div`
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  height: 18px;
  font-size: 12px;
  width: auto;
  color: white;
  border-radius: 5px;
  background: linear-gradient(90deg, #62a6d1, #0564a3);
  padding: 4px;
  font-weight: bold;
`
