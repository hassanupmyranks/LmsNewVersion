import styled from 'styled-components'
import {
  AlignHeading,
  Heading,
  RemoveIcon,
  PopUpContainer
} from './styledComponents'
import { useEffect, useState } from 'react'
import { getNewAllTestData } from '../../../helpers/V2/apis'
import PdfAdminQuestion from '../../../pages/v2/assessment/PDFDownlode/AdminQuestion'

const DownloadPopUp = ({
  setPopup,
  data
}: {
  setPopup: (d: boolean) => void
  data: any
}) => {
  const [questions, setQuestions] = useState<any>([])
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
          const response = res.data
          setTestDetail({
            testName: response[0]?.institute_test_name,
            testInstruction: response[0]?.instruction_text,
            testduriation: response[0]?.test_duration,
            totalMark: response[0]?.total_marks,
            dateOfExam: response[0]?.test_start_time,
            institutename: response[0]?.institute_details?.institute_name || '',
            type: 'solution'
          })
          const questionsList: any[] = []
          response[0]?.test_details.forEach((item: any) => {
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
    <>
      <PopUpContainer>
        {/* {isQuestionsKey && <PdfStudentQuestion QuestionsFiles={questions} />} */}
        <PrintPopUpBox width={false}>
          <AlignHeading>
            <div></div>
            <Heading>Preview</Heading>
            <RemoveIcon onClick={() => setPopup(false)} />
          </AlignHeading>
          {questions && questions.length > 0 && (
            <PdfAdminQuestion
              QuestionsFiles={questions}
              TestDetails={teastDetail}
            />
          )}
        </PrintPopUpBox>
      </PopUpContainer>
    </>
  )
}

export default DownloadPopUp

const PrintPopUpBox = styled.div<{ width?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90%;
  width: 80%;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;

  @media (max-width: 992px) {
    height: 90%;
    width: 95%;
  }

  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    border-radius: 0px;
  }
`
