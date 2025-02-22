import React, { useState } from 'react'
import { Grid, GridItem } from '../../../../../components/V2/styledComponents'
import {
  ButtonContainer,
  FlexContainerV2,
  MarksButton,
  OptionContainer,
  OptionHeadingText,
  QuestionAddButton,
  QuestionButtonContainer,
  QuestionText,
  QuestionsContainer
} from '../subcomponents'
import { ReactComponent as QuestionAdd } from '../../../../../assets/svg/QuestionAdd.svg'
import { ReactComponent as QuestionDelete } from '../../../../../assets/svg/QuestionDelete.svg'
import { Option, QuestionProps } from './../../../../../utils/types'
import MathJaxWrapper from '../../../../../components/V2/MathJaxWrapper/MathJax'
import { wrapEquationsWithSpan } from '../../../../../helpers/V2/equationHelper'

const QuestionPreview = ({
  questionIndex,
  data,
  sectionData
}: QuestionProps) => {
  const [activeQuestion, setActiveQuestion] = useState(false)
  // return false

  return (
    <QuestionsContainer style={{ position: 'relative' }}>
      <Grid
        columns={12}
        style={{ alignItems: 'center' }}
        className="forPreviewQuestions"
      >
        {/* <div className="d-flex align-items-center"> */}
        <GridItem columnSpan={8}>
          <MathJaxWrapper>
            <QuestionText
              dangerouslySetInnerHTML={{
                __html: wrapEquationsWithSpan(
                  data?.question?.text
                    ? `Q. ${questionIndex + 1} ${data?.question?.text}`
                    : ''
                )
              }}
            />
          </MathJaxWrapper>

          {/* <QuestionText>
            Q. {questionIndex + 1}{' '}
            <MarkdownV2 maxWidth="100%" height="100%">
              {data?.question?.text
                ? getReplaceImage(
                  data?.question?.text
                    .replace(/\\/g, '')
                    // ?.replaceAll(/(?<!<)\//g, '')
                    ?.replaceAll(/[{}]/g, '')
                    ?.replaceAll(/tex/g, '$$$')
                    ?.replaceAll(/'/g, ''),
                  data.solutionImage
                )
                : ''}
            </MarkdownV2>
          </QuestionText> */}
        </GridItem>
        <GridItem columnSpan={1} />
        <GridItem columnSpan={3}>
          <FlexContainerV2>
            <MarksButton>
              + {sectionData.marks_per_question} Marks / -
              {sectionData.negative_mark} Mark
            </MarksButton>
            <QuestionAddButton
              onClick={() => setActiveQuestion((prevState) => !prevState)}
            >
              {activeQuestion ? <QuestionDelete /> : <QuestionAdd />}
            </QuestionAddButton>
            {/* <QuestionDelete /> */}
          </FlexContainerV2>
        </GridItem>
        {/* </div> */}
      </Grid>
      {activeQuestion && (
        <OptionContainer>
          <OptionHeadingText>Options</OptionHeadingText>
          <QuestionButtonContainer>
            {data.options &&
              data.options.map((option: Option, index: number) => (
                <ButtonContainer
                  key={index}
                  selected={option.v + 1 == data.answer ? true : false}
                >
                  <MathJaxWrapper>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: wrapEquationsWithSpan(option.d?.text)
                      }}
                    />
                  </MathJaxWrapper>
                  {/* <MarkdownV2>
                  {option.d?.text
                    ? getReplaceImage(
                        option.d?.text
                          .replace(/\\/g, '')
                          // ?.replaceAll(/(?<!<)\//g, '')
                          ?.replaceAll(/[{}]/g, '')
                          ?.replaceAll(/tex/g, '$$$')
                          ?.replaceAll(/'/g, ''),
                        data.solutionImage
                      )
                    : ''}
                </MarkdownV2> */}
                </ButtonContainer>
              ))}
          </QuestionButtonContainer>

          <OptionHeadingText>Explanation:</OptionHeadingText>
          <MathJaxWrapper>
            <OptionHeadingText
              dangerouslySetInnerHTML={{
                __html: data?.solution?.text ? data?.solution?.text : ''
              }}
            />
          </MathJaxWrapper>
        </OptionContainer>
      )}
    </QuestionsContainer>
  )
}

export default QuestionPreview
