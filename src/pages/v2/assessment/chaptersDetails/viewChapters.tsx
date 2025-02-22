import {
  AllAddCourse2,
  Heading,
  LabelH4,
  Span,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TopicListContainer
} from './styledComponents'
import { ChangeEvent, useEffect, useState } from 'react'
import { getSingleChapterAPI, getTopicData } from '../../../../helpers/V2/apis'
import { useParams } from 'react-router-dom'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'
import { GetTopicsResponse } from '../../../../utils/types'
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

const ViewChapterDetails = () => {
  const { id }: any = useParams()

  const [ChapterDetails, setChapterDetails] = useState<any>()
  const [isLoading, setIsLoading] = useState<any>(false)
  const [isTopicLoading, setIsTopicLoading] = useState<any>(false)
  const [topicsData, setTopicData] = useState<GetTopicsResponse[]>([])
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      getSingleChapterAPI(id)
        .then((response) => {
          setChapterDetails(response.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }, [id])

  useEffect(() => {
    if (id) {
      setIsTopicLoading(true)
      getTopicData({
        page: 1,
        limit: 150,
        chapterId: id || '',
        searchKey: searchKey
      })
        .then((res) => {
          setTopicData(res.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsTopicLoading(false))
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
            {/* <Heading>Chapter Details</Heading> */}
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
                alignItems="start"
                style={{ height: 'calc(100% - 64px)' }}
              >
                <LabelH4>
                  <Span> Name :- </Span> {ChapterDetails?.name}
                </LabelH4>
                <LabelH4>
                  <Span> Sequence :- </Span> {ChapterDetails?.sequence}
                </LabelH4>
                <LabelH4>
                  <Span> Grade Name :- </Span> {ChapterDetails?.courseName}
                </LabelH4>
                <LabelH4>
                  <Span> Subject Name :- </Span> {ChapterDetails?.subjectName}
                </LabelH4>
              </Flex>
            )}
          </DetailBox>
        </AllAddCourse2>
        <TopicListContainer>
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
          {isTopicLoading && (
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

          {topicsData && topicsData.length > 0 && (
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
                  {topicsData && topicsData.length > 0 ? (
                    topicsData.map((item: any, index: number) => (
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
                        <Heading>No Topics for this Chapter</Heading>
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>
            </TableContainer>
            // <TopicListWrapper>
            //   {topicsData &&
            //     topicsData.map((item: GetTopicsResponse, index: number) => (
            //       <TopicName key={`key_${index}`}>
            //         {index + 1}. {item.name}{' '}
            //       </TopicName>
            //     ))}
            // </TopicListWrapper>
          )}
        </TopicListContainer>
      </Flex>
    </PageContainer>
  )
}

export default ViewChapterDetails
