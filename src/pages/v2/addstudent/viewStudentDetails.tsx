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

const StudentDetails = () => {
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
          {/* <DetailText> Student Details </DetailText> */}
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
              {userData?.admissionNo && (
                <LabelH4>
                  <Span> Admission No :- </Span> {userData?.admissionNo}
                </LabelH4>
              )}
              {userData?.nationality && (
                <LabelH4>
                  <Span> Nationality :- </Span> {userData?.nationality}
                </LabelH4>
              )}
              {userData?.aadharNo && (
                <LabelH4>
                  <Span> Aadhar No :- </Span> {userData?.aadharNo}
                </LabelH4>
              )}
              {userData?.address && (
                <LabelH4>
                  <Span> Address :- </Span> {userData?.address}
                </LabelH4>
              )}
              {userData?.city && (
                <LabelH4>
                  <Span> City :- </Span> {userData?.city}
                </LabelH4>
              )}
              {userData?.pincode && (
                <LabelH4>
                  <Span> Pincode :- </Span> {userData?.pincode}
                </LabelH4>
              )}
              {userData?.parentMobile && (
                <LabelH4>
                  <Span> Parent Mobile No:- </Span> {userData?.parentMobile}
                </LabelH4>
              )}
              {userData?.fatherName && (
                <LabelH4>
                  <Span> Father Name :- </Span> {userData?.fatherName}
                </LabelH4>
              )}
              {userData?.motherName && (
                <LabelH4>
                  <Span> Mother Name :- </Span> {userData?.motherName}
                </LabelH4>
              )}
              {userData?.community && (
                <LabelH4>
                  <Span> Community :- </Span> {userData?.community}
                </LabelH4>
              )}
              {userData?.registrationType && (
                <LabelH4>
                  <Span> Registration Type :- </Span>{' '}
                  {userData?.registrationType}
                </LabelH4>
              )}
              {userData?.satsNo && (
                <LabelH4>
                  <Span> Sats No :- </Span> {userData?.satsNo}
                </LabelH4>
              )}
              {userData?.dateOfJoining && (
                <LabelH4>
                  <Span> Date of Joining :- </Span>{' '}
                  {moment(userData?.dateOfJoining).format('DD MMM, YYYY')}
                </LabelH4>
              )}
              <LabelH4>
                <Span> Institute Name :- </Span> {userData?.instituteName}
              </LabelH4>
              <LabelH4>
                <Span> Branch Name :- </Span> {userData?.branchName}
              </LabelH4>
              <LabelH4>
                <Span> Batch / Section Name :- </Span> {userData?.batchName}
              </LabelH4>
            </>
          )}
        </DetailBox>
      </Flex>
    </PageContainer>
  )
}
export default StudentDetails
