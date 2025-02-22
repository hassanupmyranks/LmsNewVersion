import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import {
  Flex,
  LabelH4,
  PageContainer,
  Span
} from '../../../../components/V2/styledComponents'
import {
  BoxOne,
  BoxThree,
  BoxTwo,
  DetailBox,
  DetailText,
  FinalBox
} from './stylecomponent'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { getNewAllTestData } from '../../../../helpers/V2/apis'
import moment from 'moment'
import SimpleButton from '../../../../components/V2/Button/SimpleButton'
import ViewQuestionsPopUp from '../../../../components/V2/PopUp/ViewQuestionsPopup'

const AssessmentTestDetails = () => {
  const { testId, courseId }: any = useParams()
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<any>(false)
  const [isQuestionPopup, setIsQuestionsPopup] = useState<any>(false)

  useEffect(() => {
    if (testId && courseId !== 'undefined') {
      setIsLoading(true)
      getNewAllTestData({
        test_id: testId,
        skip: 0,
        limit: 10,
        show_only_user_created_tests: false
      })
        .then((res) => {
          setData(res.data[0])
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId, courseId])

  return (
    <PageContainer style={{ overflowY: 'scroll' }}>
      {isQuestionPopup && (
        <ViewQuestionsPopUp setPopup={setIsQuestionsPopup} data={data} />
      )}
      <Flex>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          <BoxOne></BoxOne>
          <BoxTwo></BoxTwo>
          <BoxThree></BoxThree>
          <BoxTwo></BoxTwo>
          <FinalBox></FinalBox>
        </div>
        <DetailBox>
          <DetailText> Test Details </DetailText>
          {!data && isLoading ? (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'relative',
                top: '30%',
                left: '50%'
              }}
              animation={'border'}
            />
          ) : (
            <>
              <LabelH4>
                <Span> Name :- </Span> {data?.institute_test_name}
              </LabelH4>
              <LabelH4>
                <Span> Pattern Name :- </Span>{' '}
                {data?.test_pattern_details?.name}
              </LabelH4>
              <LabelH4>
                <Span> Grade Name :- </Span> {data?.course_name}
              </LabelH4>
              {data?.test_duration && (
                <LabelH4>
                  <Span> Duration :- </Span> {data?.test_duration}
                </LabelH4>
              )}
              {data?.test_start_time && (
                <LabelH4>
                  <Span> Start time :- </Span>{' '}
                  {moment(data?.test_start_time).format('DD MMM, YYYY LT')}
                </LabelH4>
              )}
              {data?.test_end_time && (
                <LabelH4>
                  <Span> End time :- </Span>{' '}
                  {moment(data?.test_end_time).format('DD MMM, YYYY LT')}
                </LabelH4>
              )}
              {data?.password && (
                <LabelH4>
                  <Span> Password :- </Span> {data?.password}
                </LabelH4>
              )}
              {data?.total_marks && (
                <LabelH4>
                  <Span> Total Marks :- </Span> {data?.total_marks}
                </LabelH4>
              )}

              {data?.total_test_questions && (
                <LabelH4>
                  <Span> Total questions :- </Span> {data?.total_test_questions}
                </LabelH4>
              )}
              {data?.test_type && (
                <LabelH4>
                  <Span> Test Type :- </Span> {data?.test_type}
                </LabelH4>
              )}
              {data?.institute_details?.institute_name && (
                <LabelH4>
                  <Span> Institute Name :- </Span>{' '}
                  {data?.institute_details?.institute_name}
                </LabelH4>
              )}
              {data?.branch_details.length > 0 && (
                <LabelH4>
                  <Span> Branch Name :- </Span>{' '}
                  {data?.branch_details
                    ?.map((item: any) => item.branch_name)
                    .join(', ')}
                </LabelH4>
              )}
              {data?.batch_details.length > 0 && (
                <LabelH4>
                  <Span> Batches / Sections Name :- </Span>{' '}
                  {data?.batch_details
                    ?.map((item: any) => item.batch_name)
                    .join(', ')}
                </LabelH4>
              )}
              {data?.test_details.length > 0 && (
                <LabelH4>
                  <Span> Subjects Name :- </Span>{' '}
                  {data?.test_details
                    ?.map((item: any) => item.subject_name)
                    .join(', ')}
                </LabelH4>
              )}
              <LabelH4>
                <Span> Created by :- </Span> {data?.created_by?.firstName}
              </LabelH4>

              <div className="d-flex me-4" style={{ marginTop: '15px' }}>
                <SimpleButton
                  label="View Questions"
                  clickHandler={() => setIsQuestionsPopup(true)}
                />
              </div>
            </>
          )}
        </DetailBox>
      </Flex>
    </PageContainer>
  )
}
export default AssessmentTestDetails
