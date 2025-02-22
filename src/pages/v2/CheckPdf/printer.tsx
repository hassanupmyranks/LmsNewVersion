import { useRef } from 'react'

import HtmlToPdf from './PDFDownload'
import MathJaxWrapper from '../../../components/V2/MathJaxWrapper/MathJax'
import { wrapEquationsWithSpan } from '../../../helpers/V2/equationHelper'

interface QuestionsProps {
  question: any
}

const Printer = ({ question }: QuestionsProps) => {
  console.log(question, 'question')
  const elementRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ textAlign: 'center', overflowY: 'scroll' }}>
      <div style={{ width: '99%' }} ref={elementRef}>
        <div style={{ width: '90%', marginLeft: '10%' }}>
          <h2>{question?.data?.name}</h2>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ border: '1px solid black', fontSize: '15px' }}>
                  Q. Nos.
                </th>
                <th style={{ border: '1px solid black', fontSize: '15px' }}>
                  Questions{' '}
                </th>
                <th style={{ border: '1px solid black', fontSize: '15px' }}>
                  Marks
                </th>
              </tr>
            </thead>
            <tbody className="table table-bordered">
              {question?.data?.questions.map((item: any, index: any) => {
                return (
                  <tr key={index} className="table table-bordered">
                    <td style={{ border: '1px solid black', fontSize: '15px' }}>
                      {index + 1}
                    </td>

                    <td style={{ border: '1px solid black', fontSize: '15px' }}>
                      <MathJaxWrapper>
                        <h5
                          dangerouslySetInnerHTML={{
                            __html: wrapEquationsWithSpan(
                              item?.questionId?.question
                            )
                          }}
                        />
                      </MathJaxWrapper>

                      {/* <Markdown width={'100px'}>
                        {item?.questionId?.question
                          ? item?.questionId?.question
                            .split(/(<img.*?>)/)
                            .map((segment: any) => {
                              console.log(segment) // Log each segment
                              if (segment.startsWith('<img')) {
                                return segment
                              } else {
                                return segment.replace(/\/\//g, '')
                              }
                            })
                            .join('')
                            // .replace(/\\/g, '')
                            // ?.replaceAll(/(?<!<)\//g, '')
                            // ?.replaceAll(/[{}]/g, '')
                            ?.replaceAll(/tex/g, '$$$')
                            ?.replaceAll(/'/g, '')
                          : item?.questionId?.question}
                      </Markdown> */}

                      {/* {item.question} */}
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {item?.questionId?.options?.map(
                          (dd: any, index: any) => {
                            return (
                              <li
                                key={index}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  fontSize: '15px'
                                }}
                              >
                                {dd?.number}.&nbsp;{' '}
                                <MathJaxWrapper>
                                  <h5
                                    dangerouslySetInnerHTML={{
                                      __html: wrapEquationsWithSpan(dd?.option)
                                    }}
                                  />
                                </MathJaxWrapper>
                                {/* <Markdown width={'100px'}>
                                  {dd?.option
                                    ? dd?.option
                                      ?.replaceAll(/tex/g, '$$')
                                      ?.replaceAll(/'/g, '')
                                    : dd?.option}
                                </Markdown> */}
                              </li>
                            )
                          }
                        )}
                      </ul>
                    </td>
                    <td style={{ border: '1px solid black', fontSize: '15px' }}>
                      {item.marks}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <HtmlToPdf htmlContent={question} elementRef={elementRef} />
    </div>
  )
}

export default Printer
