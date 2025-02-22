import styled from 'styled-components'
import { PrimaryBlue, White } from '../../../../const/V2/stylingVariables'
import { TableTitleText } from './styledComponents'
// import UpGraph from '../../../../assets/up.png'
// import DownGraph from '../../../../assets/decrease.png'
interface BatchProps {
  _id?: string
  batchId?: string
  batchName?: string
  courseId?: string
  courseName?: string
}
interface GradeProps {
  Batch: BatchProps[]
  onClick: (e: any) => void
  selectedBatch?: string
}
const GradeTabs = ({ Batch, onClick, selectedBatch }: GradeProps) => {
  return (
    <TabMenuContainer
      style={{
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#ffff',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}
    >
      <TableTitleText>Class Performance</TableTitleText>
      <TabMenuContainer
        style={{ overflow: 'auto', margin: '0px', padding: '5px 5px 15px 5px' }}
      >
        {Batch?.map((data: BatchProps, index: any) => {
          return (
            <TabContainer
              key={index}
              onClick={() => onClick(data?.batchId)}
              active={data?.batchId === selectedBatch ? true : false}
            >
              <GradeText>{data?.courseName}</GradeText>
              <GradeContainer>
                <GradeText>Batch - {data?.batchName}</GradeText>
                {/* <LogoImage src={UpGraph} alt="Test" /> */}
                {/* <GradeText>60%</GradeText> */}
              </GradeContainer>
            </TabContainer>
          )
        })}
        {/* <TabContainer>
          <GradeText>Grade 6</GradeText>
          <GradeContainer>
            <GradeText>Batch 10</GradeText>
            <LogoImage src={UpGraph} alt="Test" />
            <GradeText>60%</GradeText>
          </GradeContainer>
        </TabContainer>
        <TabContainer>
          <GradeText>Grade 10</GradeText>
          <GradeContainer>
            <GradeText>Batch 10</GradeText>
            <LogoImage src={DownGraph} alt="Test" />
            <GradeText>30%</GradeText>
          </GradeContainer>
        </TabContainer> */}
      </TabMenuContainer>
    </TabMenuContainer>
  )
}
export default GradeTabs
const TabMenuContainer = styled.div`
  display: flex;
  justify-content: stretch;
  gap: 10px;
  /* padding: 0 1.25rem 0.25rem 1rem; */
  width: 100%;
  max-width: 100%;
  margin: 15px;
  padding-top: 15px;
  border-radius: 20px;
`
const TabContainer = styled.div<{ active: boolean }>`
  all: unset;
  cursor: pointer;
  padding: 12px;
  background: ${White};
  border-radius: 20px;
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  /* outline: 
    ${({ active }) =>
    active ? ` 3px solid ${PrimaryBlue};` : `1px solid ${PrimaryBlue}`}; */
  ${({ active }) =>
    active
      ? `outline: 3px solid ${PrimaryBlue};`
      : `outline: 1px solid ${PrimaryBlue};`}/* outline: 1px solid ${PrimaryBlue}; */
`
const GradeContainer = styled.div`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`
export const GradeText = styled.p`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 15px;
`
export const LogoImage = styled.img`
  width: 35px;
  height: 35px;
`
