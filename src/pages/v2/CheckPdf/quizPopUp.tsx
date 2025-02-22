import styled from 'styled-components'

import {
  AlignHeading,
  Heading,
  RemoveIcon
} from '../../../components/V2/PopUp/styledComponents'
import Printer from './printer'

import { useEffect, useState } from 'react'
import { getTeacherQuizApi } from '../../../helpers/V2/apis'

const QuiZDownloadPopUp = ({
  setPopup,
  questionId
}: //   data
{
  setPopup: (d: boolean) => void
  questionId?: any
}) => {
  useEffect(() => {
    if (questionId) {
      getTeacherQuizApi({ quizId: questionId }).then((res) => {
        if (res) {
          setPrintData(res)
        }
      })
    }
  }, [questionId])
  const [printdata, setPrintData] = useState<any>()

  return (
    <>
      <PopUpContainer>
        <PrintPopUpBox width={true}>
          <AlignHeading>
            <div></div>
            <Heading>Preview</Heading>
            <RemoveIcon onClick={() => setPopup(false)} />
          </AlignHeading>

          <Printer question={printdata} />
        </PrintPopUpBox>
      </PopUpContainer>
    </>
  )
}

export default QuiZDownloadPopUp

const PrintPopUpBox = styled.div<{ width?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${({ width }) => (width ? '90%' : '220px')};
  width: ${({ width }) => (width ? '40%' : '360px')};
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;

  @media (max-width: 1000px) {
    width: 70%;
  }

  @media (max-width: 800px) {
    width: 90%;
  }
`
export const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(104, 104, 104, 0.4);
`
