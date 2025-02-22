import styled from 'styled-components'

import SelectButtonV2 from '../../../Button/SelectButton'

import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/delete-icon-red.svg'
import {
  OptionDetails,
  RandomGenerateQuestionsDetails
} from '../../../../../utils/types'
import MathJaxWrapper from '../../../MathJaxWrapper/MathJax'
import { wrapEquationsWithSpan } from '../../../../../helpers/V2/equationHelper'

import { Blue } from '../../../../../const/V2/stylingVariables'

const QuestionsV2 = ({
  question,
  handleSelectQuestions,
  handleDeleteQuestions,
  addQuestionsSelected,
  addQuestionsOpen
}: {
  question: RandomGenerateQuestionsDetails
  handleSelectQuestions: (id: string) => void
  handleDeleteQuestions: (id: string) => void
  addQuestionsSelected: string[]
  addQuestionsOpen: string[]
}) => {
  return (
    <QuestionsOptionsItems key={`question_${question._id}`}>
      <QuestionsItems>
        <QuestionOptionsItems>
          <MathJaxWrapper>
            <h5
              dangerouslySetInnerHTML={{
                __html: wrapEquationsWithSpan(question?.question?.text)
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
          <SelectButtonV2
            {...{
              label: addQuestionsSelected.includes(question._id)
                ? 'Selected'
                : 'Select',
              isSelected: addQuestionsSelected.includes(question._id),
              onClick: () => handleSelectQuestions(question._id)
            }}
          />
          <DeleteButton onClick={() => handleDeleteQuestions(question._id)}>
            <DeleteIcon />
          </DeleteButton>
          {/* {isUploadedQuestion ?
            : (
          <AddRemoveButtonV2
            {...{
              isSelected: addQuestionsOpen.includes(question._id),
              label: 'question',
              onClick: () => handleOpenQuestions(question._id)
            }}
          />
        )} */}
        </Actions>
      </QuestionsItems>
      <QuestionOptionContainer>
        {addQuestionsOpen.includes(question._id) &&
          question.options &&
          question.options?.length > 0 && (
            <>
              <OptionLabel>
                {' '}
                <p>Options</p>
              </OptionLabel>
              <QuestionsOptions>
                {question.options.map((ptn: OptionDetails, index: any) => (
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
        {addQuestionsOpen.includes(question._id) &&
          question?.solution &&
          question?.solution?.text && (
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

export default QuestionsV2

const QuestionsOptionsItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 0px;
  background: rgba(222, 242, 255, 0.22);
  position: relative;
`
const QuestionsItems = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    align-items: start;
  }
`

const QuestionOptionsItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  h5 {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
    // display: flex;
    padding-left: 10px;
    // gap: 10px;
    align-items: center;
    margin-bottom: 5px;

    p {
      font-size: 18px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      padding-left: 0px;
      font-size: 16px;
    }

    .katex .base {
      white-space: wrap !important;
      width: fit-content !important;
    }
  }

  table p font {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
    display: inline;
  }
`
const QuestionOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const OptionLabel = styled.div`
  p {
    font-family: DM Sans;
    font-weight: 500;
    padding-left: 10px;
    padding-bottom: 5px;
    font-size: 14px;
    color: #2b3674;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const QuestionsOptions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
  padding-left: 10px;
  flex-wrap: wrap;
  gap: 5px;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`

const ChildOptions = styled.div<{ isActive: boolean }>`
  width: 230px;
  min-height: 57px;
  border-radius: 16px;
  border: 1px solid;
  border-color: ${(props) =>
    props?.isActive ? 'rgba(79, 159, 128, 1)' : '#A3AED0'};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
  background: ${(props) =>
    props?.isActive ? 'rgba(230, 248, 241, 1)' : '#fff'};

  // overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &:hover {
    border-color: rgba(79, 159, 128, 1);
    background: rgba(230, 248, 241, 1);
  }

  h3 {
    color: ${Blue};
    font-size: 14px;
    font-weight: 500;
    // display: flex;
    // align-items: center;
    margin-bottom: 0px;
  }

  mjx-container[jax='CHTML'][display='true'] {
    margin: 0px !important;
  }
`

const QuestionsExplanation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
`

const ExplanationHeading = styled.div`
  padding-left: 10px;
  font-family: DM Sans;
  font-weight: 500;
  font-size: 15px;
  color: #2b3674;
`

const ExplanationDescription = styled.div`
  padding-left: 10px;

  p {
    font-family: DM Sans;
    font-weight: 500;
    font-size: 15px;
    color: #2b3674;
  }

  .mb {
    margin-bottom: 10px;
  }
`

const DeleteButton = styled.button`
  all: unset;
  border-radius: 12px;
  width: 30px;
  padding: 6px 5px 5px 5px;
  cursor: pointer;
  text-align: center;
  background: #ffffff;
  border: 1px solid red;
`
