import { AllAddCourse2 } from './styledComponents'
import { useEffect, useState } from 'react'
import { getSingleSubTopic } from '../../../../helpers/V2/apis'
import { useParams } from 'react-router-dom'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import {
  Flex,
  LabelH4,
  PageContainer,
  Span
} from '../../../../components/V2/styledComponents'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import {
  BoxOne,
  BoxThree,
  BoxTwo,
  DetailBox,
  FinalBox
} from '../../TimeTable/StyledComponents'

const ViewSubTopicDetails = () => {
  const { id }: any = useParams()

  const [subTopicDetails, setSubTopicDetails] = useState<any>()
  const [isLoading, setIsLoading] = useState<any>(false)

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      getSingleSubTopic({ id: id })
        .then((response) => {
          console.log(response, 'resss')
          setSubTopicDetails(response.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }, [id])

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
            <FinalBox style={{ height: '400px' }}></FinalBox>
          </div>
          <DetailBox style={{ height: '480px' }}>
            {/* <Heading>Sub-Topic Details</Heading> */}
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
                gap="12px"
                justifyContent="center"
                alignItems="start"
                style={{ height: 'calc(100% - 64px)' }}
              >
                <LabelH4>
                  <Span> Name :- </Span> {subTopicDetails?.name}
                </LabelH4>
                <LabelH4>
                  <Span> Sequence :- </Span> {subTopicDetails?.sequence}
                </LabelH4>
                <LabelH4>
                  <Span> Topic Name :- </Span> {subTopicDetails?.topicName}
                </LabelH4>
                <LabelH4>
                  <Span> Chapter Name :- </Span> {subTopicDetails?.chapterName}
                </LabelH4>
                <LabelH4>
                  <Span> Grade Name :- </Span> {subTopicDetails?.courseName}
                </LabelH4>
                <LabelH4>
                  <Span> Subject Name :- </Span> {subTopicDetails?.subjectName}
                </LabelH4>
              </Flex>
            )}
          </DetailBox>
        </AllAddCourse2>
      </Flex>
    </PageContainer>
  )
}

export default ViewSubTopicDetails
