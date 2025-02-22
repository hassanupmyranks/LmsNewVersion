import { Flex } from '../../../../../../components/V2/styledComponents'
import {
  // CorrectAnswer,
  // IncorrectAnswer,
  QuestionCountDiv,
  QuestionNumber
  // SkipStatus
} from '../../analytics/analyticsStyled'
import { ReviewStatus, SkipStatus } from '../attemptedStyled'

interface QuestionsNumberProps {
  allSectionsQuestion: any[]
  currentQuestionId: string
  handleSelectQuestion: (d: any) => void
}

const QuestionsNumber = ({
  allSectionsQuestion,
  currentQuestionId,
  handleSelectQuestion
}: QuestionsNumberProps) => {
  return (
    <QuestionCountDiv>
      <Flex justifyContent="center">
        <Flex
          wrap={true}
          justifyContent="center"
          alignItems="center"
          gap="12px"
        >
          {allSectionsQuestion &&
            allSectionsQuestion.length > 0 &&
            allSectionsQuestion.map((questions: any, index: number) => {
              return (
                <QuestionNumber
                  isSelect={questions?.questionId === currentQuestionId}
                  isAnswered={questions.status === 'answered'}
                  key={`key_${index}`}
                  onClick={() => handleSelectQuestion(questions.questionId)}
                >
                  {index + 1}
                  {questions.status === 'skip' && <SkipStatus />}
                  {questions.status === 'review' && <ReviewStatus />}
                </QuestionNumber>
              )
            })}
        </Flex>
      </Flex>
    </QuestionCountDiv>
  )
}

export default QuestionsNumber
