import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetSingleStudentV2 } from '../../../redux/addStudentV2/api'
import {
  Flex,
  LabelH4,
  PageContainer,
  Span
} from '../../../components/V2/styledComponents'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import {
  BoxOne,
  BoxThree,
  BoxTwo,
  DetailBox,
  // DetailText,
  FinalBox
} from './stylecomponent'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'
import moment from 'moment'

const TeacherDetails = () => {
  const param: { id: string } = useParams()
  const [userData, setUserData] = useState<any>()
  const [isLoading, setIsLoading] = useState<any>(false)

  useEffect(() => {
    if (param.id) {
      setIsLoading(true)
      GetSingleStudentV2(param.id)
        .then((res) => {
          setUserData(res.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }, [param.id])

  return (
    <PageContainer style={{ overflowY: 'scroll' }}>
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
          {/* <DetailText> Teacher Details </DetailText> */}
          {!userData && isLoading ? (
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
                <Span> Name :- </Span> {userData?.firstName}{' '}
                {userData?.lastName}
              </LabelH4>
              <LabelH4>
                <Span> Username :- </Span> {userData?.username}
              </LabelH4>
              {userData?.dob && (
                <LabelH4>
                  <Span> Date of Birth :- </Span>{' '}
                  {moment(userData?.dob).format('DD MMM, YYYY')}
                </LabelH4>
              )}
              {userData?.mobile && (
                <LabelH4>
                  <Span> Phone :- </Span> {userData?.mobile}
                </LabelH4>
              )}
              {userData?.gender && (
                <LabelH4>
                  <Span> Gender :- </Span> {userData?.gender}
                </LabelH4>
              )}
              {userData?.bloodGroup && (
                <LabelH4>
                  <Span> Blood Group:- </Span> {userData?.bloodGroup}
                </LabelH4>
              )}
              {userData?.aadharNo && (
                <LabelH4>
                  <Span> Aadhar Number :- </Span> {userData?.aadharNo}
                </LabelH4>
              )}
              {userData?.bankIfsc && (
                <LabelH4>
                  <Span> Bank Ifsc :- </Span> {userData?.bankIfsc}
                </LabelH4>
              )}
              {userData?.panNumber && (
                <LabelH4>
                  <Span> Pan Number :- </Span> {userData?.panNumber}
                </LabelH4>
              )}
              {userData?.instituteName && (
                <LabelH4>
                  <Span> Institute Name :- </Span> {userData?.instituteName}
                </LabelH4>
              )}
              {userData?.branchName && (
                <LabelH4>
                  <Span> Branch Name :- </Span> {userData?.branchName}
                </LabelH4>
              )}
              {userData?.batches?.length > 0 && (
                <LabelH4>
                  <Span> Batch / Section Name :- </Span>{' '}
                  {userData?.batches
                    ?.map((item: any) => item.batchName)
                    .join(', ')}
                </LabelH4>
              )}
              {userData?.subjects?.length > 0 && (
                <LabelH4>
                  <Span> Subjects Name :- </Span>{' '}
                  {userData?.subjects
                    ?.map((item: any) => item.subjectName)
                    .join(', ')}
                </LabelH4>
              )}
              {userData?.department && (
                <LabelH4>
                  <Span> Department :- </Span> {userData?.department}
                </LabelH4>
              )}
              {userData?.collegeName && (
                <LabelH4>
                  <Span> College Name :- </Span> {userData?.collegeName}
                </LabelH4>
              )}
              {userData?.experience && (
                <LabelH4>
                  <Span> Experience :- </Span> {userData?.experience}
                </LabelH4>
              )}
            </>
          )}
        </DetailBox>
      </Flex>
    </PageContainer>
  )
}
export default TeacherDetails
