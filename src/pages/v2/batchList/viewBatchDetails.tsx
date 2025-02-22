import { useParams } from 'react-router-dom'
import {
  AllAddCourse2,
  Heading,
  LabelH4,
  Span,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  ListContainer
} from './styledComponents'
import { ChangeEvent, useEffect, useState } from 'react'
import { getNewAllStudentAPI } from '../../../redux/addStudentV2/api'
import { Flex, PageContainer } from '../../../components/V2/styledComponents'
import { Spinner, Table } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { GetSingleBatch } from '../../../helpers/V2/apis'
import InputSearchV2 from '../../../components/V2/Form/inputSearchV2'
import TeacherPng from '../../../assets/Teacherreplace.jpeg'
import {
  BoxOne,
  BoxThree,
  BoxTwo,
  DetailBox,
  FinalBox
} from '../TimeTable/StyledComponents'
import { PageTitle } from '../CRMSupport/StyledComponents'

const ViewBatchDetails = () => {
  const { id }: any = useParams()
  const [batchDetails, setBatchDetails] = useState<any>()
  const [isLoading, setIsLoading] = useState<any>(false)
  const [isStudentLoading, setIsStudentLoading] = useState<any>(false)
  const [isTeacherLoading, setIsTeacherLoading] = useState<any>(false)
  const [studentData, setStudentData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [teacherData, setTeacherData] = useState<any[]>([])
  const [searchTeacherKey, setSearchTeacherKey] = useState('')

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      GetSingleBatch(id)
        .then((response) => {
          setBatchDetails(response.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }, [id])

  useEffect(() => {
    if (id) {
      setIsStudentLoading(true)
      getNewAllStudentAPI({
        page: 1,
        limit: 250,
        role: 'student',
        batchId: id,
        searchKey: searchKey
      })
        .then((res) => {
          setStudentData(res.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsStudentLoading(false))
    }
  }, [id, searchKey])

  useEffect(() => {
    if (id) {
      setIsTeacherLoading(true)
      getNewAllStudentAPI({
        page: 1,
        limit: 250,
        role: 'teacher',
        batchId: id,
        searchKey: searchTeacherKey
      })
        .then((res) => {
          setTeacherData(res.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsTeacherLoading(false))
    }
  }, [id, searchTeacherKey])

  return (
    <PageContainer>
      <Flex gap="10px" direction="row" alignItems="start">
        <AllAddCourse2>
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
            {isLoading ? (
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
              <Flex
                direction="column"
                gap="20px"
                justifyContent="center"
                alignItems="center"
                style={{ height: 'calc(100% - 64px)' }}
              >
                <LabelH4>
                  <Span> Institute Name :- </Span> {batchDetails?.instituteName}
                </LabelH4>
                <LabelH4>
                  <Span> Branch Name :- </Span> {batchDetails?.branchName}
                </LabelH4>
                <LabelH4>
                  <Span> Batch / Section Name :- </Span> {batchDetails?.name}
                </LabelH4>
                <LabelH4>
                  <Span> Questions Bank Grade :- </Span>{' '}
                  {batchDetails?.questionBankCourses
                    ?.map((item: any) => item.courseName)
                    .join(', ')}
                </LabelH4>
              </Flex>
            )}
          </DetailBox>
        </AllAddCourse2>
        <ListContainer>
          <Heading>Students</Heading>
          <InputSearchV2
            label="Enter Name/Username"
            required
            placeholder="Enter Name/Username"
            style={{ width: '450px', marginTop: '6px' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (
                event.target.value.length >= 1 ||
                event.target.value.length === 0
              ) {
                setSearchKey(event.target.value)
              }
            }}
          />
          {isStudentLoading && (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '50%',
                left: '50%'
              }}
              animation={'border'}
            />
          )}
          {studentData && studentData.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>SI</TableHeader>
                    <TableHeader>Profile</TableHeader>
                    <TableHeader>Name</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {studentData && studentData.length > 0 ? (
                    studentData.map((item: any, index: number) => (
                      <TableRow key={`key_${index}`}>
                        <TableCell
                          style={{
                            width: '60px',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ width: '80px' }}>
                          {' '}
                          <img
                            src={
                              item.profileImage ? item.profileImage : TeacherPng
                            } // Placeholder image URL
                            alt="Student Profile"
                            style={{
                              borderRadius: '50%',
                              width: '40px',
                              height: '40px',
                              objectFit: 'cover'
                            }}
                          />
                        </TableCell>
                        <TableCell
                          style={{
                            width: '120px',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          {item.firstName} {item.lastName}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>
                        <Heading>No students for this Batch / Section</Heading>
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>
            </TableContainer>
          ) : (
            <Flex
              justifyContent="center"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <PageTitle style={{ fontSize: '22px' }}>
                No Students assigned yet!
              </PageTitle>
            </Flex>
          )}
        </ListContainer>
        <ListContainer>
          <Heading>Teachers</Heading>
          <InputSearchV2
            label="Enter Name/Username"
            required
            placeholder="Enter Name/Username"
            style={{ width: '450px', marginTop: '6px' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (
                event.target.value.length >= 1 ||
                event.target.value.length === 0
              ) {
                setSearchTeacherKey(event.target.value)
              }
            }}
          />
          {isTeacherLoading && (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '50%',
                left: '80%'
              }}
              animation={'border'}
            />
          )}
          {teacherData && teacherData.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>SI</TableHeader>
                    <TableHeader>Profile</TableHeader>
                    <TableHeader>Name</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {teacherData && teacherData.length > 0 ? (
                    teacherData.map((item: any, index: number) => (
                      <TableRow key={`key_${index}`}>
                        <TableCell
                          style={{
                            width: '60px',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ width: '80px' }}>
                          {' '}
                          <img
                            src={
                              item.profileImage ? item.profileImage : TeacherPng
                            } // Placeholder image URL
                            alt="Student Profile"
                            style={{
                              borderRadius: '50%',
                              width: '40px',
                              height: '40px',
                              objectFit: 'cover'
                            }}
                          />
                        </TableCell>
                        <TableCell
                          style={{
                            width: '120px',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          {item.firstName} {item.lastName}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>
                        <Heading>No Teachers for this Batch / Section</Heading>
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>
            </TableContainer>
          ) : (
            // <StudentListWrapper>
            //   {teacherData &&
            //     teacherData.map((item: any, index: number) => (
            //       <TopicName key={`key_${index}`}>
            //         {index + 1}. {item.teacherName}
            //       </TopicName>
            //     ))}

            //   {teacherData && teacherData.length === 0 && (
            //     <Heading>No Teacher for this Batch</Heading>
            //   )}
            // </StudentListWrapper>
            <Flex
              justifyContent="center"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <PageTitle style={{ fontSize: '22px' }}>
                No Teachers assigned yet!
              </PageTitle>
            </Flex>
          )}
        </ListContainer>
      </Flex>
    </PageContainer>
  )
}

export default ViewBatchDetails
