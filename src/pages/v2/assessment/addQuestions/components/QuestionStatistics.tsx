import styled from 'styled-components'
import { ReactComponent as DifficultySvg } from '../../../../../assets/svg/difficulty.svg'
import { ReactComponent as GenerateRandomSvg } from '../../../../../assets/svg/generate-random.svg'
import { ReactComponent as LightbulbQuestionSvg } from '../../../../../assets/svg/lightbulb-question.svg'
import { ReactComponent as PencilLineSvg } from '../../../../../assets/svg/pencil-line.svg'
import { ReactComponent as TimerSvg } from '../../../../../assets/svg/timer.svg'
import { ReactComponent as UploadSvg } from '../../../../../assets/svg/upload.svg'
import { Blue } from '../../../../../const/V2/stylingVariables'
// import SearchInput from './SearchInput'
import { QuestionStatisticsProps, StatisticsProps } from './../types'
import Actions from './Actions'

const iconMap: { [key: string]: JSX.Element } = {
  difficulty: <DifficultySvg />,
  generateRandom: <GenerateRandomSvg />,
  upload: <UploadSvg />,
  timer: <TimerSvg />,
  lightbulbQuestion: <LightbulbQuestionSvg />,
  pencilLine: <PencilLineSvg />
}

const QuestionStatistics = ({
  // search,
  handleOnClick,
  // handleSearchChange,
  statistics,
  startTime,
  endTime,
  totalMarks,
  totalTestQuestion
}: QuestionStatisticsProps) => {
  return (
    <RelativeDiv>
      <SearchSection>
        {/* <SearchInput
          placeholder="Search Chapters and Topics"
          value={search}
          onChange={(e: any) => handleSearchChange(e?.target?.value)}
        /> */}
      </SearchSection>
      <Statistics>
        {statistics.map((s: StatisticsProps) => (
          <Statistic
            isClickable={s.isClickable}
            isHoverable={s.isHoverable}
            key={`statistic_${s.index}`}
            onClick={() => {
              if (s.isClickable) {
                handleOnClick(s)
              }
            }}
          >
            {iconMap[s.icon]}
            <StatisticsText>{s.name}</StatisticsText>
          </Statistic>
        ))}
        <Actions
          {...{
            startTime,
            endTime,
            totalMarks,
            totalTestQuestion
          }}
        />
      </Statistics>
    </RelativeDiv>
  )
}

export default QuestionStatistics

const RelativeDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-basis: 26%;
  box-shadow: 14px 17px 40px 4px #7090b014;
  padding: 10px;
  border-radius: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`
const Statistics = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
const Statistic = styled.div<{ isClickable: boolean; isHoverable: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: ${(props) =>
    props?.isClickable || props?.isHoverable ? 'pointer' : 'default'};
`
export const StatisticsText = styled.div`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.68px;
`
