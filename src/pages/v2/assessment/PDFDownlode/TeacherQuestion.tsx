import React, { useRef } from 'react'
import styled from 'styled-components'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
import MarkdownV2 from './QuestionReader'
import { getReplaceImage } from './helper'
// @ts-ignore
import html2pdf from 'html2pdf.js'
const PdfTeacherQuestion = ({
  QuestionsFiles,
  solutionsImage
}: {
  QuestionsFiles: any
  solutionsImage: any
}) => {
  const pdfRef = useRef<HTMLDivElement>(null)

  // const downloadPDF = () => {
  //   const input = pdfRef.current
  //   input.scrollTop = input.scrollHeight

  //   setTimeout(() => {
  //     html2canvas(input).then((canvas) => {
  //       const imagedata = canvas.toDataURL('image/png')
  //       const pdf = new jsPDF('p', 'mm', 'a4', true)
  //       const pdfWidth = pdf.internal.pageSize.getWidth()
  //       const pdfHeight = pdf.internal.pageSize.getHeight()
  //       const imgWidth = canvas.width
  //       const imgHeight = canvas.height
  //       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
  //       const imgX = (pdfWidth - imgWidth * ratio) / 2
  //       const imgY = 5
  //       pdf.addImage(
  //         imagedata,
  //         'PNG',
  //         imgX,
  //         imgY,
  //         imgWidth * ratio,
  //         imgHeight * ratio
  //       )
  //       pdf.save('Question.pdf')
  //     })
  //   }, 500)
  // }
  const downloadPDF = () => {
    const input = pdfRef.current

    const opt = {
      margin: 0.5,
      filename: 'Question.pdf',
      image: { type: 'png', quality: 0.2 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
    }

    html2pdf().set(opt).from(input).save()
  }

  // const addWidthToImgTags = (htmlString: string, width: string) => {
  //   return htmlString.replace(/<img(.*?)>/g, `<img$1 width="${width}">`)
  // }

  return (
    <>
      <PdfDownload ref={pdfRef}>
        {QuestionsFiles.map((question: any, index: any) => (
          <div key={index}>
            <p>Question {index + 1}</p>

            {/* <div
              dangerouslySetInnerHTML={{
                __html: addWidthToImgTags(question.question.text, '5px')
              }}
            /> */}
            <div>
              <MarkdownV2>
                {question?.question?.text
                  ? getReplaceImage(
                      question?.question?.text
                        .replace(/\\/g, '')
                        ?.replaceAll(/(?<!<)\//g, '')
                        ?.replaceAll(/[{}]/g, '')
                        ?.replaceAll(/tex/g, '$$$')
                        ?.replaceAll(/'/g, ''),
                      solutionsImage
                    )
                  : ''}
              </MarkdownV2>
            </div>
            {question.type === 'mcq' && (
              <ul>
                {question.options.map((option: any, optionIndex: any) => (
                  <li key={optionIndex}>
                    <MarkdownV2>
                      {option.d.text
                        ? getReplaceImage(
                            option.d.text
                              .replace(/\\/g, '')
                              ?.replaceAll(/(?<!<)\//g, '')
                              ?.replaceAll(/[{}]/g, '')
                              ?.replaceAll(/tex/g, '$$$')
                              ?.replaceAll(/'/g, ''),
                            solutionsImage
                          )
                        : ''}
                    </MarkdownV2>
                  </li>
                ))}
              </ul>
            )}
            {question.type === 'fill-blank' && (
              <p>
                Fill in the blank:
                <MarkdownV2>
                  {question?.question?.text
                    ? getReplaceImage(
                        question?.question?.text
                          .replace(/\\/g, '')
                          ?.replaceAll(/(?<!<)\//g, '')
                          ?.replaceAll(/[{}]/g, '')
                          ?.replaceAll(/tex/g, '$$$')
                          ?.replaceAll(/'/g, ''),
                        solutionsImage
                      )
                    : ''}
                </MarkdownV2>
              </p>
            )}
          </div>
        ))}
      </PdfDownload>
      <button onClick={downloadPDF}>download pdf</button>
    </>
  )
}

export default PdfTeacherQuestion

export const PdfDownload = styled.div`
  font-size: 10px;
  gap: 2px;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  column-count: 2;
  column-gap: 20px;
  position: relative;
  overflow-x: auto;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background-color: #000;
    transform: translateX(-50%);
  }
`
