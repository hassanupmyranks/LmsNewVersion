import styled from 'styled-components'
import { ReactComponent as FireLogoSvg } from '../../../../assets/svg/firelogo.svg'
import { ReactComponent as ClockLogoSvg } from '../../../../assets/svg/clocklogo.svg'
import {
  PrimaryBlue,
  SecondaryGray600,
  White
} from '../../../../const/V2/stylingVariables'

export const MenuBar = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
`
export const Test = styled.div`
  border-radius: 20px;
  background: #ffff;
  width: 40%;
  padding: 18px;
  color: #2b3674;
  margin: 0px 10px 10px 20px;
  height: 300px;

  @media (max-width: 1450px) {
    width: 100%;
    margin-left: 0px;
  }
`
export const Content1 = styled.p`
  color: #2b3674;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 34px;
  line-height: 38px;

  @media (max-width: 580px) {
    font-size: 24px;
    line-height: 28px;
  }
`
export const GraphInfo = styled.div`
  margin-left: 10px;
  min-width: 103px;

  @media (max-width: 580px) {
    min-width: auto;
  }
`

export const Content2 = styled.p`
  color: #a3aed0;
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 14px;

  @media (max-width: 580px) {
    font-size: 10px;
  }
`

export const Content3 = styled.p`
  color: #05cd99;
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 12px;

  @media (max-width: 580px) {
    font-size: 10px;
  }
`
export const Content2New = styled.p`
  color: #a3aed0;
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 14px;
`

export const Content3New = styled.p`
  color: #05cd99;
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 12px;
`

export const Graph = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 10px;
`
export const Testbutton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f7fe;
  border-radius: 8px;
  border: none;
  font-family: 'DM Sans';
  color: #a3aed0;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
`
export const Course = styled.div`
  background: #ffff;
  color: #480fe4;
  border-radius: 20px;
  width: 40%;
  margin: 0px 10px 10px 10px;
  height: 300px;
  padding: 18px;

  @media (max-width: 1450px) {
    width: 100%;
    margin-left: 0px;
  }
`
export const Barheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const Barheadtext = styled.p`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 24px;

  @media (max-width: 550px) {
    font-size: 16px;
  }
`
export const Barheadtext1 = styled.span`
  color: #a3aed0;
  font-family: 'DM Sans';
  font-weight: 500;
  padding: 10px;
  font-size: 14px;
`
export const Utest = styled.div`
  background: #ffff;
  border-radius: 20px;
  margin: 10px 10px 10px 0px;
  width: 100%;
  height: 300px;
  padding: 18px 26px;
`
export const Daily = styled.div`
  background: #ffff;
  color: #ce0b83;
  border-radius: 20px;
  margin: 10px;
  width: 50%;
  height: 400px;
  padding: 18px;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0px;
  }
`
export const Batch = styled.div`
  background: #ffff;
  color: #ce0b83;
  border-radius: 20px;
  margin: 10px;
  height: 300px;
  padding: 18px;
  width: 60%;
  @media (max-width: 600px) {
    width: 100%;
  }

  @media (max-width: 1350px) {
    margin-left: 0px;
  }
`
export const Question = styled.div`
  background: #ffff;
  color: #ce0b83;
  border-radius: 20px;
  margin: 10px 10px 0px 0px;
  width: 50%;
  height: 300px;

  @media (max-width: 600px) {
    width: 100%;
  }
`
export const Teachers = styled.div`
  background: #ffff;
  color: #ce0b83;
  border-radius: 20px;
  margin: 10px 10px 0px 10px;
  width: 50%;
  height: 300px;
  padding: 18px 0px;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0px;
  }
`
export const Institute = styled.div`
  background: #ffff;
  color: #ce0b83;
  border-radius: 20px;
  /* margin: 10px 10px 0px 10px; */
  margin: 0px 10px 10px 20px;
  width: 50%;
  height: 300px;
  padding: 18px 0px;

  @media (max-width: 1350px) {
    margin-left: 0px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`

export const Component = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: #ffff;
  flex-direction: column;
  border-radius: 6px;
`
export const Cardtitle = styled.div`
  align-items: center;
  justify-content: space-between;
  background-color: red;
`

export const Table = styled.table`
  min-width: 480px;
  background-color: #ffff;
  width: 100%;
`
export const TableRowHead = styled.tr`
  color: #a3aed0;
  font-weight: 500;
  font-size: 14px;
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
`

export const TableRowBody = styled.tr`
  color: #2b3674;
  height: 40px;
`
export const TableHeader = styled.thead`
  font-family: 'DM Sans';
`
export const Heading12700 = styled.p`
  color: #a3aed0;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 12px;
`
export const FireLogoContainer = styled.div`
  background-color: #feefee;
  height: 45px;
  width: 45px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`
export const FireLogo = styled(FireLogoSvg)`
  height: 22px;
  width: 22px;
`
export const MyFlex = styled.div`
  display: flex;
  align-items: center;
`
export const Heading20700 = styled.p`
  color: #2b3674;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  padding: 22px 0px 11px 0px;
  height: 120px;
  overflow-y: auto;
  scrollbar-width: none;
`
export const ClockLogo = styled(ClockLogoSvg)`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`
export const Heading14700 = styled.p`
  color: #2b3674;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 14px;
`
export const WhiteBackground = styled.div`
  background-color: #ffff;
  height: 175px;
  padding: 18px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
export const DimBackground = styled.div`
  background-color: #fafcfe;
  height: 125px;
  padding: 18px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`
export const Icons = styled.button`
  background-color: #f4f7fe;
  border-radius: 10px;
  border: none;
  padding: 6px;
  font-family: 'DM Sans';
  color: #a3aed0;
`
export const ViewButton = styled.div`
  font-family: 'DM Sans';
  color: #197bbd;
  padding: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`
export const Flex = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 1450px) {
    display: block;
  }
`
export const Flex2 = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 600px) {
    display: block;
  }
`

export const GraphValue = styled.div`
  margin: 16px 0px;
`
export const AlignGraphOne = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const Create = styled.div`
  height: 3px;
  width: 25px;
  border-radius: 2px;
  background-color: #1377b9;
`
export const AlignCreateSubmit = styled.div`
  width: 100%;
  display: flex;
  margin-left: 5px;
  align-items: center;
`
export const Submit = styled.div`
  height: 3px;
  width: 25px;
  border-radius: 2px;
  background-color: #6ad2ff;
`
export const TD = styled.td`
  text-align: left;
  font-weight: 700;
  font-size: 14px;
`
export const TableWrapper = styled.div`
  height: 210px;
  overflow: scroll;
  scrollbar-width: 2px;
`
export const Pending = styled.div`
  height: 27px;
  width: 90px;
  background-color: #fcf4f4;
  color: #ff8f6b;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13.5px;
`
export const Completed = styled.div`
  height: 27px;
  width: 100px;
  background-color: #e4fcf4;
  color: #01b574;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13.5px;
`

export const CardContainer = styled.div`
  background: ${White};
  border-radius: 20px;
  width: 50%;
  height: 300px;
  margin: 10px;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0px;
  }
`

export const InstituteImage = styled.img`
  border-radius: 20px;
  position: relative;
  top: 14px;
  left: 14px;
  width: 91%;
  height: 150px;
`

export const LogoContainer = styled.div`
  background: white;
  border-radius: 50%;
  text-align: center;
  position: relative;
  top: -12px;
  width: 52px;
  height: 52px;
  margin-left: 25px;
`
export const LogoImage = styled.img`
  text-align: center;
  border-style: solid;
  border-width: 5px;
  border-color: ${PrimaryBlue};
  border-radius: 50%;
  width: 42px;
  height: 42px;
  margin: 5px;
`
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`
export const Heading = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #2b3674;
  font-family: 'DM Sans';
  font-style: normal;
  letter-spacing: -0.48px;
  margin-bottom: 3px;
`

export const Para = styled.p`
  color: ${SecondaryGray600};
  font-size: 12px;
`

export const IconContainer = styled.div`
  width: 25px;
  height: 30px;
`
export const LogoCountsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`
export const Count = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  background: #ffff;
  padding: 18px;
  height: 140px;
  width: 100%;
  margin: 0px 10px 10px 0px;
`
export const Count2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  background: #ffff;
  padding: 18px;
  height: 140px;
  width: 100%;
  margin: 20px 10px 0px 0px;

  @media (max-width: 1450px) {
    margin: 0px;
  }
`
export const CountValue = styled.p`
  color: #6ad2ff;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 45px;
  line-height: 48px;
`
export const CountsWrapper = styled.div`
  width: 30%;
  margin: 10px 0px 10px 0px;

  @media (max-width: 1450px) {
    display: flex;
    width: 100%;
  }
`
export const TopPerformersContainer = styled.div`
  height: 250px;
  overflow-y: auto;
`

export const TabContainer = styled.div`
  height: 42px;
  width: 100%;
  display: flex;
  gap: 10px;
  /* background: #fde7e7; */
  border-radius: 10px;
  padding: 5px;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const Tab = styled.button<{ active?: boolean }>`
  width: 45%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `background-color: ${PrimaryBlue};
    color: ${White};`}

  &:hover {
    background-color: ${PrimaryBlue};
    color: ${White};
  }

  @media (max-width: 1450px) {
    padding-top: 10px;
    overflow: auto;
    scrollbar-width: none;
  }

  @media (max-width: 775px) {
    padding-top: 30px;
    overflow: auto;
    scrollbar-width: none;
  }
`
