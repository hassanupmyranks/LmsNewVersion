import styled from 'styled-components'
import {
  AlignHeading,
  Heading,
  RemoveIcon,
  PopUpContainer
} from './styledComponents'
import { ButtonV2 } from '../styledComponents'
import { Blue } from '../../../const/V2/stylingVariables'
import { useEffect, useState } from 'react'
import { getSingleNoPatternTestData } from '../../../helpers/V2/apis'
import PdfStudentQuestion from '../../../pages/v2/assessment/PDFDownlode/StudentQuestion'
import PdfAdminQuestion from '../../../pages/v2/assessment/PDFDownlode/AdminQuestion'

const PrintNoPatternTestPopUp = ({
  setPopup,
  data
}: {
  setPopup: (d: boolean) => void
  data: any
}) => {
  const [questions, setQuestions] = useState<any>([])
  const [printFormat, setPrintFormat] = useState<
    'print' | 'exam-format' | 'key' | 'key-solutions'
  >('print')
  const [teastDetail, setTestDetail] = useState<any>({})

  useEffect(() => {
    if (data) {
      getSingleNoPatternTestData({
        testId: data.test_id
      })
        .then((res) => {
          setTestDetail({
            testName: res?.data?.name,
            testInstruction: res?.data?.instruction,
            testduriation: res?.data?.duration,
            totalMark: res?.data?.totalMarks,
            dateOfExam: res?.data?.startTime,
            institutename: res?.data?.instituteName,
            type: 'examtype'
          })
          const questionsList: any[] = res?.data?.questions

          setQuestions(questionsList)
        })
        .catch((error) => console.log({ error }))
    }
  }, [data])

  return (
    <PopUpContainer>
      {/* {isQuestionsKey && <PdfStudentQuestion QuestionsFiles={questions} />} */}
      <PrintPopUpBox width={printFormat !== 'print' ? true : false}>
        <AlignHeading>
          <div></div>
          {printFormat === 'exam-format' ? (
            <Heading>Exam Format</Heading>
          ) : printFormat === 'key-solutions' ? (
            <Heading>Key & Solutions</Heading>
          ) : (
            <Heading>Preview</Heading>
          )}
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        {printFormat === 'print' && (
          <AllPrintSections>
            <Section>
              <p>Exam Format</p>
              <ButtonV2 onClick={() => setPrintFormat('exam-format')}>
                Print
              </ButtonV2>
            </Section>
            {/* <Section>
              <p>Key only</p>
              <ButtonV2 onClick={() => setPrintFormat('key')}>Print</ButtonV2>
            </Section> */}
            <Section>
              <p>Key & Solutions</p>
              <ButtonV2 onClick={() => setPrintFormat('key-solutions')}>
                Print
              </ButtonV2>
            </Section>
          </AllPrintSections>
        )}
        {printFormat === 'exam-format' && (
          <PdfAdminQuestion
            QuestionsFiles={questions}
            TestDetails={teastDetail}
          />
        )}

        {/* {printFormat === 'key' && (
          <PdfStudentQuestion
            QuestionsFiles={questions}
            solutionsImage={solutionsImage}
          />
        )} */}
        {printFormat === 'key-solutions' && (
          <PdfStudentQuestion
            QuestionsFiles={questions}
            TestDetails={teastDetail}
          />
        )}
        {/* <ButtonWrapper>
                    <ButtonV2 onClick={() => setPopup(false)}>Assign</ButtonV2>
                </ButtonWrapper> */}
      </PrintPopUpBox>
    </PopUpContainer>
  )
}

export default PrintNoPatternTestPopUp

const PrintPopUpBox = styled.div<{ width?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${({ width }) => (width ? '90%' : '220px')};
  width: ${({ width }) => (width ? '90%' : '360px')};
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;

  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    border-radius: 0px;
  }
`
export const AllPrintSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  margin-top: 10px;
`
export const Section = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  p {
    color: ${Blue};
    font-size: 16px;
    font-weight: 700;
  }
`
