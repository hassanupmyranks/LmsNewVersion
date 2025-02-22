import { Flex } from '../../../../../../components/V2/styledComponents'
import {
  CorrectAnswer,
  IncorrectAnswer,
  QuestionCountDiv,
  QuestionNumber,
  SkipStatus,
  SubjectSectionName
} from '../analyticsStyled'
import { questionsListDetails, subjectDetails } from '../type'

interface QuestionsNumberProps {
  allSectionsQuestion: questionsListDetails[]
  currentQuestionId: string
  handleSelectQuestion: (d: any) => void
  testDetails?: subjectDetails[]
}

const QuestionsNumber = ({
  allSectionsQuestion,
  currentQuestionId,
  testDetails,
  handleSelectQuestion
}: QuestionsNumberProps) => {
  let questionNumber = 0
  return (
    <QuestionCountDiv>
      <Flex justifyContent="center">
        <Flex
          wrap={true}
          justifyContent="center"
          alignItems="center"
          gap="12px"
        >
          {testDetails &&
            testDetails.length > 0 &&
            testDetails.flatMap((subject) => {
              return subject.sections.flatMap((section) => {
                const subjectSectionName = `${subject.subjectName} - ${section.sectionName}`
                return (
                  <>
                    <SubjectSectionName className="w-100">
                      {subjectSectionName}
                    </SubjectSectionName>
                    {section.questionsList.flatMap((questions, qIndex) => {
                      ++questionNumber
                      return (
                        <QuestionNumber
                          isSelect={questions.questionId === currentQuestionId}
                          isAnswered={!questions.skipped}
                          key={`key_${qIndex}`}
                          onClick={() =>
                            handleSelectQuestion(questions.questionId)
                          }
                        >
                          {questionNumber}
                          {questions.skipped ? (
                            <SkipStatus />
                          ) : !questions.isCorrect ? (
                            <IncorrectAnswer />
                          ) : (
                            <CorrectAnswer />
                          )}
                        </QuestionNumber>
                      )
                    })}
                  </>
                )
              })
            })}

          {!(testDetails && testDetails.length > 0) &&
            allSectionsQuestion &&
            allSectionsQuestion.length > 0 &&
            allSectionsQuestion.map(
              (questions: questionsListDetails, index: number) => {
                // const status = getAnswerStatus(questions)
                return (
                  <QuestionNumber
                    isSelect={questions.questionId === currentQuestionId}
                    isAnswered={!questions.skipped}
                    key={`key_${index}`}
                    onClick={() => handleSelectQuestion(questions.questionId)}
                  >
                    {index + 1}
                    {questions.skipped ? (
                      <SkipStatus />
                    ) : !questions.isCorrect ? (
                      <IncorrectAnswer />
                    ) : (
                      <CorrectAnswer />
                    )}
                  </QuestionNumber>
                )
              }
            )}
        </Flex>
      </Flex>
    </QuestionCountDiv>
  )
}

export default QuestionsNumber
