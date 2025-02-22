import AddRemoveButtonV2 from '../../../../../components/V2/Button/AddRemoveButton'
import SelectButtonV2 from '../../../../../components/V2/Button/SelectButton'
import {
  OptionDetails,
  RandomGenerateQuestionsDetails
} from '../../../../../utils/types'
import DragDownButtonV2 from '../../../../../components/V2/Button/DragUpButton'
import DragUpButtonV2 from '../../../../../components/V2/Button/DragDownButton'
import {
  Actions,
  ChildOptions,
  ExplanationDescription,
  ExplanationHeading,
  OptionLabel,
  QuestionOptionContainer,
  QuestionOptionsItems,
  QuestionsExplanation,
  QuestionsItems,
  QuestionsOptions,
  QuestionsOptionsItems,
  UpToDownButton
} from './styledComponents'
// import MarkdownV2 from './QuestionReader'
// import { getReplaceImage } from '../helper'
import MathJaxWrapper from '../../../../../components/V2/MathJaxWrapper/MathJax'
import { wrapEquationsWithSpan } from '../../../../../helpers/V2/equationHelper'

const SingleRandomlyGeneratedQuestion = ({
  question,
  totalLength,
  index,
  randomGenerateQuestionsOpen,
  handleOpenQuestions,
  handleArrangeQuestions,
  handleRemovedQuestions
}: {
  question: RandomGenerateQuestionsDetails
  totalLength: number
  index: number
  randomGenerateQuestionsOpen: string[]
  handleOpenQuestions: (id: string) => void
  handleArrangeQuestions: (
    firstQuestionId: number,
    secondQuestionId: number
  ) => void
  handleRemovedQuestions: (index: number, replaceId: string) => void
}) => {
  return (
    <QuestionsOptionsItems key={`question_${question._id}`}>
      <QuestionsItems>
        <QuestionOptionsItems>
          <MathJaxWrapper>
            <h5
              dangerouslySetInnerHTML={{
                __html: wrapEquationsWithSpan(
                  question?.question?.text ? question?.question?.text : ''
                )
              }}
            />
          </MathJaxWrapper>
          {/* <h5>
            <MarkdownV2 maxWidth="100%" height="100%">
              {question?.question?.text
                ? getReplaceImage(
                  question?.question?.text
                    .replace(/\\/g, '')
                    // ?.replaceAll(/(?<!<)\//g, '')
                    ?.replaceAll(/<answer>/g, '____')
                    ?.replaceAll(/[{}]/g, '')
                    ?.replaceAll(/tex/g, '$$$')
                    ?.replaceAll(/'/g, ''),
                  question.solutionImage
                )
                : ''}
            </MarkdownV2>
          </h5> */}
        </QuestionOptionsItems>
        <Actions>
          <UpToDownButton>
            <DragDownButtonV2
              {...{
                label: 'down-button',
                isDisabled: index === totalLength - 1,
                onClick: () => handleArrangeQuestions(index, index + 1)
              }}
            />

            <DragUpButtonV2
              {...{
                label: 'up-button',
                isDisabled: index === 0,
                onClick: () => handleArrangeQuestions(index, index - 1)
              }}
            />
          </UpToDownButton>
          <SelectButtonV2
            {...{
              label: 'Replace',
              isSelected: false,
              onClick: () => handleRemovedQuestions(index, question._id)
            }}
          />
          <AddRemoveButtonV2
            {...{
              isSelected: randomGenerateQuestionsOpen.includes(question._id),
              onClick: () => handleOpenQuestions(question._id)
            }}
          />
        </Actions>
      </QuestionsItems>
      <QuestionOptionContainer>
        {randomGenerateQuestionsOpen.includes(question._id) &&
          question.options &&
          question.options?.length > 0 && (
            <>
              <OptionLabel>
                <p>Options</p>
              </OptionLabel>
              <QuestionsOptions>
                {question.options.map((ptn: OptionDetails, index: number) => (
                  <ChildOptions
                    key={`answer_${index}`}
                    isActive={
                      question.answer.length > 0
                        ? question?.answer?.includes(ptn.v)
                        : ptn.v === question.answer
                    }
                  >
                    <MathJaxWrapper>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: wrapEquationsWithSpan(ptn.d?.text)
                        }}
                      />
                    </MathJaxWrapper>
                  </ChildOptions>
                ))}
              </QuestionsOptions>
            </>
          )}
        {randomGenerateQuestionsOpen.includes(question._id) &&
          question.solution &&
          question.solution.text && (
            <QuestionsExplanation>
              <ExplanationHeading>Explanation:</ExplanationHeading>
              <ExplanationDescription>
                <MathJaxWrapper>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: question.solution.text
                    }}
                  />
                </MathJaxWrapper>
              </ExplanationDescription>
            </QuestionsExplanation>
          )}
      </QuestionOptionContainer>
    </QuestionsOptionsItems>
  )
}

export default SingleRandomlyGeneratedQuestion
