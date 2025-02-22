import React, { useRef } from 'react'
import styled from 'styled-components'
// import { jsPDF } from 'jspdf'

// @ts-ignore
import html2pdf from 'html2pdf.js'
import MathJaxWrapper from '../../../../components/V2/MathJaxWrapper/MathJax'
const PdfStudentQuestion = ({
  QuestionsFiles,
  TestDetails
}: {
  QuestionsFiles: any
  TestDetails?: any
}) => {
  const pdfRef = useRef<HTMLDivElement>(null)

  const downloadPDF = () => {
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

  const getAnswerText = (question: any) => {
    if (question.type === 'mcq' || question.type === 'assertion') {
      const correctOption = question.options.find(
        (option: any) => option.v === question.answer
      )
      return correctOption ? `${correctOption.d.text}` : ''
    } else if (question.type === 'multiple_mcq') {
      const correctOption = question.options.filter((option: any) =>
        question?.answer?.includes(option.v)
      )
      return correctOption.length > 0
        ? correctOption.map((option: any) => option.d.text).join(',  ')
        : ''
    } else {
      return question.answer
    }
  }

  const getAnswerTextForKey = (question: any) => {
    if (question.type === 'mcq' || question.type === 'assertion') {
      const correctOption = question.options.find(
        (option: any) => option.v === question.answer
      )
      return correctOption ? `(${correctOption.v}),` : ''
    } else {
      return question.answer
    }
  }

  console.log(TestDetails, 'TestDetails')

  return (
    <>
      <PdfDownload ref={pdfRef}>
        <div>
          <h4 style={{ textAlign: 'center' }}>{TestDetails?.testName}</h4>
          <h6 style={{ textAlign: 'center' }}>{TestDetails?.institutename}</h6>
          <hr style={{ border: '1px solid black' }} />

          <h6>Instruction: {TestDetails?.testInstruction}</h6>
          <hr style={{ border: '1px solid black', marginBottom: '0px' }} />
        </div>
        <TwoColumnContainer>
          {QuestionsFiles.map((question: any, index: any) => (
            <div
              key={index}
              style={{ width: '100%', fontSize: '14px', marginTop: '10px' }}
            >
              <p className="d-flex gap-1">
                <strong>{index + 1}. </strong>
                <strong> Key: </strong>
                <MathJaxWrapper>
                  <p
                    className="d-flex"
                    dangerouslySetInnerHTML={{
                      __html: getAnswerTextForKey(question)
                    }}
                  />
                </MathJaxWrapper>
              </p>
              <p>
                <strong> Answer: </strong>
                {'  '}
                <MathJaxWrapper>
                  <p
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: getAnswerText(question)
                    }}
                  />
                </MathJaxWrapper>
              </p>
              <p>
                <strong>Solution:</strong>
                {question?.solution?.text && (
                  <MathJaxWrapper>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: question.solution.text
                      }}
                    />
                  </MathJaxWrapper>
                )}
              </p>
            </div>
          ))}
        </TwoColumnContainer>
      </PdfDownload>
      <button onClick={downloadPDF}>download pdf</button>
    </>
  )
}

export default PdfStudentQuestion

export const PdfDownload = styled.div`
  // font-size: 10px;
  // gap: 2px;
  // padding-left: 10px;
  // width: 100%;
  // height: 100%;
  // column-count: 2;
  // column-gap: 20px;
  // position: relative;
  // overflow-x: auto;

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
