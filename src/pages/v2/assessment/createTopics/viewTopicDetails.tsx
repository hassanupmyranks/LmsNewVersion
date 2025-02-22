import {
  AllAddCourse2,
  Heading,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from './styledComponents'
import { ChangeEvent, useEffect, useState } from 'react'
import { getSingleTopic, getSubTopicAPI } from '../../../../helpers/V2/apis'
import { useParams } from 'react-router-dom'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import {
  Flex,
  LabelH4,
  ListContainer,
  PageContainer,
  Span
} from '../../../../components/V2/styledComponents'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'
import {
  BoxOne,
  BoxThree,
  BoxTwo,
  DetailBox,
  FinalBox
} from '../../TimeTable/StyledComponents'

const ViewTopicDetails = () => {
  const { id }: any = useParams()

  const [topicDetails, setTopicDetails] = useState<any>()
  const [isLoading, setIsLoading] = useState<any>(false)
  const [isSubTopicLoading, setIsSubTopicLoading] = useState<any>(false)
  const [subTopicsData, setSubTopicData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      getSingleTopic({ id: id })
        .then((response) => {
          setTopicDetails(response.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }, [id])

  useEffect(() => {
    if (id) {
      setIsSubTopicLoading(true)
      getSubTopicAPI({
        page: 1,
        limit: 150,
        topicId: id || '',
        searchKey: searchKey
      })
        .then((res) => {
          setSubTopicData(res.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubTopicLoading(false))
    }
  }, [id, searchKey])

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
            {/* <Heading>Topic Details</Heading> */}
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
                gap="1px"
                justifyContent="center"
                alignItems="start"
                style={{ height: 'calc(100% - 64px)' }}
              >
                <LabelH4>
                  <Span> Name :- </Span> {topicDetails?.name}
                </LabelH4>
                <LabelH4>
                  <Span> Chapter Sequence :- </Span> {topicDetails?.sequence}
                </LabelH4>
                <LabelH4>
                  <Span> Chapter Name :- </Span> {topicDetails?.chapterName}
                </LabelH4>

                <LabelH4>
                  <Span> Grade Name :- </Span> {topicDetails?.courseName}
                </LabelH4>
                <LabelH4>
                  <Span> Subject Name :- </Span> {topicDetails?.subjectName}
                </LabelH4>
              </Flex>
            )}
          </DetailBox>
        </AllAddCourse2>
        <ListContainer>
          <Heading>Topics</Heading>
          <InputSearchV2
            label="Enter Name"
            required
            placeholder="Enter Name"
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
          {isSubTopicLoading && (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '30%',
                left: '50%'
              }}
              animation={'border'}
            />
          )}
          {subTopicsData && subTopicsData.length > 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>SI</TableHeader>
                    {/* <TableHeader>Profile</TableHeader> */}
                    <TableHeader>Name</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {subTopicsData && subTopicsData.length > 0 ? (
                    subTopicsData.map((item: any, index: number) => (
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
                        {/* <TableCell style={{ width: '80px' }}>
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
                      </TableCell> */}
                        <TableCell
                          style={{
                            width: '120px',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          {item.name}
                          {/* {item.lastName} */}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>
                        <Heading>No Sub-Topics for this Topic</Heading>
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>
            </TableContainer>
            // <ListWrapper>
            //   {subTopicsData &&
            //     subTopicsData.map((item: GetTopicsResponse, index: number) => (
            //       <ItemName key={`key_${index}`}>
            //         {index + 1}. {item.name}{' '}
            //       </ItemName>
            //     ))}
            // </ListWrapper>
          )}
        </ListContainer>
      </Flex>
    </PageContainer>
  )
}

export default ViewTopicDetails
