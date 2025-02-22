import styled from 'styled-components'
import {
  AlignHeading,
  Heading,
  RemoveIcon,
  PopUpContainer
} from './styledComponents'
import { useEffect, useState } from 'react'
import { getSingleNoPatternTestData } from '../../../helpers/V2/apis'
import PdfAdminQuestion from '../../../pages/v2/assessment/PDFDownlode/AdminQuestion'

const DownloadNoPatternTestPopUp = ({
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

export default DownloadNoPatternTestPopUp

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
