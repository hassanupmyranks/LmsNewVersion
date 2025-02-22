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
import { getNewAllTestData } from '../../../helpers/V2/apis'
import PdfStudentQuestion from '../../../pages/v2/assessment/PDFDownlode/StudentQuestion'
import PdfAdminQuestion from '../../../pages/v2/assessment/PDFDownlode/AdminQuestion'

const PrintPopUp = ({
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
      getNewAllTestData({
        test_id: data.test_id,
        skip: 0,
        limit: 10,
        show_only_user_created_tests: false
      })
        .then((res) => {
          setTestDetail({
            testName: res?.data[0]?.institute_test_name,
            testInstruction: res?.data[0]?.instruction_text,
            testduriation: res?.data[0]?.test_duration || 'No ',
            totalMark: res?.data[0]?.total_marks,
            dateOfExam: res?.data[0]?.test_start_time,
            // institutename: res?.data[0]?.institute_details.institute_name,
            type: 'examtype'
          })
          const questionsList: any[] = []

          res?.data[0]?.test_details.forEach((item: any) => {
            item?.sections?.forEach((section: any) => {
              // Use spread operator to append questions to the questionsList
              questionsList.push(...section?.questions_list)
            })
          })

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

export default PrintPopUp

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
