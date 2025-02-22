import {
  QuizDiv,
  Title,
  SubDetail,
  BgMathIcon,
  Line,
  QuizContent
} from './styledComponents'
import { ReactComponent as QrIcon } from '../../../../../../assets/svg/QR.svg'
import { ReactComponent as CalendarIcon } from '../../../../../../assets/svg/calendar-logo.svg'
import { ReactComponent as CircleIcon } from '../../../../../../assets/svg/blue-circle.svg'
import { Flex } from '../../../../../../components/V2/styledComponents'
export const QuizContainer = ({ data }: { data: any[] }) => {
  return (
    <QuizDiv>
      <Flex gap="12px" style={{ marginBottom: '16px' }}>
        <CalendarIcon />
        <Flex gap="3px">
          <Title fontWeight={700}>Quiz of the day</Title>
          <Title fontSize="11px" fontWeight={700}>
            (24th Jan, 2022)
          </Title>
        </Flex>
      </Flex>
      <Flex direction="column" gap="24px">
        {data.map((val, index) => {
          return (
            <Flex
              key={`${val}_${index}`}
              gap="14px"
              style={{ position: 'relative' }}
            >
              <CircleIcon />
              <QuizContent>
                <div>
                  <Title
                    fontSize="8px"
                    fontWeight={700}
                    style={{ color: '#7A86A1' }}
                  >
                    24th Jan, 2022
                  </Title>
                  <Title style={{ paddingBottom: '6px' }}>
                    Maths Quiz - Chapter 1
                  </Title>
                  <SubDetail fontSize="12px" fontWeight={500}>
                    MCQ - 10 mins
                  </SubDetail>
                </div>
                <QrIcon />
                <BgMathIcon />
              </QuizContent>
              {index === data.length - 1 ? '' : <Line />}
            </Flex>
          )
        })}
      </Flex>
    </QuizDiv>
  )
}
