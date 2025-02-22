import styled from 'styled-components'

export const MenuBar = styled.div`
  width: auto;
  height: 100vh;
  overflow: auto;
  margin: 16px;
`
export const Flex = styled.div`
  display: flex;
`
export const Flex1 = styled.div`
  display: flex;

  @media (max-width: 1300px) {
    display: block;
  }
`

export const Flex2 = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 1500px) {
    display: block;
  }
`

export const Flex3 = styled.div`
  display: flex;
  width: 50%;

  @media (max-width: 1500px) {
    width: 100%;
  }

  @media (max-width: 750px) {
    display: block;
    width: 100%;
  }
`

export const Test = styled.div`
  border-radius: 20px;
  background: #ffff;
  width: 48%;
  padding: 18px 26px;
  color: #2b3674;
  margin: 0px 10px 10px 0px;
  height: 400px;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);

  @media (max-width: 1300px) {
    width: 96%;
  }
`
export const Test2 = styled.div`
  border-radius: 20px;
  background: #ffff;
  width: 48%;
  padding: 18px 26px;
  color: #2b3674;
  margin: 0px 10px 10px 0px;
  height: 310px;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);

  @media (max-width: 1300px) {
    width: 96%;
    margin-left: 16px;
  }
`

export const SmallCom = styled.div`
  /* overflow-y: scroll; */
  border-radius: 20px;
  background: #ffff;
  width: 30%;
  padding: 18px 26px;
  color: #2b3674;
  margin: 10px 16px 16px 0px;
  height: 400px;

  @media (max-width: 1300px) {
    width: 100%;
    margin: 0px;
  }
`
export const SmallCom1 = styled.div`
  /* overflow-y: scroll; */
  border-radius: 20px;
  background: #ffff;
  width: 48%;
  padding: 18px 26px;
  color: #2b3674;
  margin: 10px 16px 16px 0px;
  height: 400px;

  @media (max-width: 750px) {
    width: 96%;
  }
`

export const SmallCom3 = styled.div`
  /* overflow-y: scroll; */
  border-radius: 20px;
  background: #ffff;
  width: 48%;
  padding: 18px 26px;
  color: #2b3674;
  margin: 10px 16px 16px 0px;
  height: 400px;

  @media (max-width: 750px) {
    margin-left: 16px;
    width: 96%;
  }
`

export const SmallCom2 = styled.div`
  /* overflow-y: scroll; */
  border-radius: 20px;
  background: #ffff;
  width: 48%;
  padding: 18px 26px;
  color: #2b3674;
  margin: 10px 16px 16px 0px;
  height: 400px;

  @media (max-width: 1500px) {
    margin-left: 16px;
  }

  @media (max-width: 750px) {
    width: 96%;
  }
`

export const Icons = styled.button`
  background-color: #f4f7fe;
  border-radius: 10px;
  border: none;
  padding: 6px;
  font-family: 'DM Sans';
  color: #a3aed0;
`
export const TableTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const TableTitleText = styled.p`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 24px;
`
export const TableWrapper = styled.div`
  height: 240px;
  width: 100%;
  overflow: scroll;
  scrollbar-width: 2px;
`
export const Table = styled.table`
  min-width: 550px;
  border-collapse: collapse;
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
  font-family: 'DM Sans';
`
export const TableRowBody = styled.tr`
  color: #2b3674;
  height: 40px;
`
export const TD = styled.td`
  text-align: left;
  font-weight: 700;
  font-size: 14px;
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
export const TestTitle = styled.p`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 18px;
`
export const NoData = styled.p`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 18px;
  text-align: 'center';
`
export const LatestTest = styled.div`
  height: auto;
  width: 100%;
  background-color: #edf3fe;
  border-radius: 20px;
  margin-top: 10px;
  padding: 8px 16px;
`
export const TestName = styled.p`
  color: #343434;
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 16px;
`
export const Marks = styled.p`
  color: #3f83ff;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
`
export const AvgScore = styled.p`
  color: #7a86a1;
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 14px;
`
export const UpcomingTest = styled.div`
  background-color: #f2f7f7;
  border-radius: 20px;
  height: auto;
  width: 100%;
  padding: 8px 16px;
  margin-bottom: 15px;
`
export const TestTime = styled.p`
  color: #35bba3;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 21px;
`
export const ComingTestName = styled.p`
  color: #343434;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 16px;
`
export const ComingTestDate = styled.p`
  color: #343434;
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 14px;
`
export const ComingTestDuration = styled.p`
  color: #808080;
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 12px;
`
export const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`
export const SmallCircle = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: 2px solid #4799f4;
`
export const BigCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: #9acff6;
`
export const DotLine = styled.div`
  height: 35px;
  border-left: 1px dashed #4da4f6;
`
export const BlockAlign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`
export const AlignGraphOne = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
export const Nodata = styled.p`
  display: flex;
  font-weight: bold;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  height: 100%;
`
export const Center = styled.div`
  color: #1b2559;
  height: 75%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
