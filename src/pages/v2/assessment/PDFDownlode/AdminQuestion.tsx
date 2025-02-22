import React, { useRef } from 'react'
import styled from 'styled-components'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
import MarkdownV2 from './QuestionReader'
// import { SolutionImageDetails } from '../../../../utils/types'
// @ts-ignore
import html2pdf from 'html2pdf.js'
import moment from 'moment'
import MathJaxWrapper from '../../../../components/V2/MathJaxWrapper/MathJax'

const PdfAdminQuestion = ({
  QuestionsFiles,
  TestDetails
}: {
  QuestionsFiles: any
  TestDetails?: any
}) => {
  const pdfRef = useRef<HTMLDivElement>(null)

  const getAnswerText = (question: any) => {
    if (question.type === 'mcq' || question.type === 'assertion') {
      const correctOption = question.options.find(
        (option: any) => option.v === question.answer
      )
      return correctOption ? correctOption.d.text : ''
    } else {
      return question.answer
    }
  }

  const splitThePageOfTwoPartPDF = () => {
    const input = pdfRef.current

    if (!input) {
      console.error('PDF input element is null.')
      return
    }

    const borderStyle = `
      <style>
        @media print {
          .page-border {
            border: 2px solid black;
            box-sizing: border-box;
            width: calc(100% - 4px); /* Adjust for border width */
            height: calc(100% - 2px); /* Adjust for border width */
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1; /* Ensure border is behind content */
          }
          .two-column-layout {
            column-count: 2;
            column-gap: 20px; /* Adjust the gap between columns */
          }
        }
      </style>
    `

    const opt = {
      margin: 0.5,
      filename: 'Question.pdf',
      image: { type: 'jpeg', quality: 0.2 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      pagebreak: { mode: ['css', 'legacy'] }, // Add this option for page breaks
      jsPDF: { unit: 'in', format: '', orientation: 'p' }
    }

    const contentWithBorder = borderStyle + input.outerHTML

    html2pdf().set(opt).from(contentWithBorder).save()
  }

  console.log(TestDetails, 'TestDetails')
  return (
    <>
      <PdfDownload>
        <div ref={pdfRef} id="pdfContent">
          <div>
            <h4 style={{ textAlign: 'center' }}>{TestDetails?.testName}</h4>
            <h6 style={{ textAlign: 'center' }}>
              {TestDetails?.institutename}
            </h6>
            <div
              style={{
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <h6>TotalMarks: {TestDetails?.totalMark}</h6>
              <h6>Duration: {TestDetails?.testduriation}mins</h6>
              <h6>Date: {moment(TestDetails?.dateOfExam).format('L')}</h6>
            </div>
            <hr style={{ border: '1px solid black' }} />

            <h6>Instruction: {TestDetails?.testInstruction}</h6>
            <hr style={{ border: '1px solid black', marginBottom: '0px' }} />
          </div>
          <TwoColumnContainer>
            {QuestionsFiles.map((question: any, index: any) => (
              <div
                className="d-flex align-items-start gap-2 question"
                key={index}
                style={{ width: '100%', fontSize: '14px', marginTop: '5px' }}
              >
                <b>{index + 1}.</b>
                <div>
                  <div className="text">
                    {question?.question?.text && (
                      <MathJaxWrapper>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: question?.question?.text
                          }}
                        />
                      </MathJaxWrapper>
                    )}
                  </div>
                  {question.type === 'mcq' && (
                    <ol type="a" className="options">
                      {question.options.map((option: any, optionIndex: any) => (
                        <li key={optionIndex}>
                          <MathJaxWrapper>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: option.d.text
                              }}
                            />
                          </MathJaxWrapper>
                        </li>
                      ))}
                    </ol>
                  )}
                  {question.type === 'fill-blank' && (
                    <p>
                      Fill in the blank:
                      {question?.question?.text && (
                        <MathJaxWrapper>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: question?.question?.text
                            }}
                          />
                        </MathJaxWrapper>
                      )}
                    </p>
                  )}
                  {TestDetails?.type == 'examtype' ? (
                    ''
                  ) : (
                    <p>
                      <strong>Answer:</strong>
                      <MarkdownV2>
                        {getAnswerText(question) && getAnswerText(question)}
                      </MarkdownV2>
                    </p>
                  )}
                  {TestDetails?.type == 'examtype' ? (
                    ''
                  ) : (
                    <p>
                      <strong>Solution:</strong>
                      {question.solution.text && (
                        <MathJaxWrapper>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: question.solution.text
                            }}
                          />
                        </MathJaxWrapper>
                      )}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </TwoColumnContainer>
        </div>
      </PdfDownload>

      <button onClick={splitThePageOfTwoPartPDF}>download pdf</button>
    </>
  )
}

export default PdfAdminQuestion

export const PdfDownload = styled.div`
  font-size: 10px;
  // gap: 2px;
  padding-left: 10px;
  width: 100%;
  height: 80%;
  // column-count: 2;
  // column-gap: 20px;
  position: relative;
  overflow-y: auto;

  // &::after {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   bottom: 0;
  //   left: 50%;
  //   width: 1px;
  //   background-color: #000;
  //   transform: translateX(-50%);
  // }
`

const TwoColumnContainer = styled.div`
  column-count: 2;
  width: 100%;
  position: relative;
  overflow-y: auto;

  /* Add border between columns */
  &::after {
    content: '';
    width: 1px;
    background-color: black;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  table {
    max-width: 100%;
  }

  img {
    max-width: 100% !important;
  }

  mjx-container {
    font-size: 14px !important;
  }

  @media (max-width: 600px) {
    column-count: 1;

    &::after {
      display: none;
    }
  }
`

// const TwoColumnContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
//   grid-auto-rows: auto;
//   gap: 20px;
//   position: relative;

//   .question:nth-child(even) {
//     grid-column: span 1; /* Make odd numbered questions span two columns */
//   }

//   .question {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//   }

//   .text {
//     flex-grow: 1;
//   }

//   .options {
//     display: flex;
//     flex-direction: row;
//     gap: 15px;
//     list-style-type: lower-alpha;
//   }

//     /* Add border between columns */
//   &::after {
//     content: '';
//     width: 1px;
//     background-color: black;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 50%;
//     transform: translateX(-50%);
//   }
// `;
