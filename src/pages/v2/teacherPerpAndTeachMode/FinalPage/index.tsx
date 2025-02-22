import { useEffect, useState } from 'react'
import {
  ContentRow,
  Flex,
  FormContainerV2,
  Heading,
  SmallContainer,
  StyledContainer,
  Text
} from '../components/styledComponents'
import {
  getSessionMaterials,
  updateSessionsAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useHistory, useParams } from 'react-router-dom'
import { TeachingVideos } from '../../learn/components/TeachingVideos'
import TeachingHighLights from '../../learn/components/TeachingHighLights'
import { TeachingSolutions } from '../../learn/components/TeachingSolutions'
import { ButtonV2 } from '../../../../components/V2/styledComponents'
import SessionCompleteConfirmationPopup from '../../../../components/V2/PopUp/CompletedSessionConfmationPopup'

const FinalPageTeachMode = () => {
  const history = useHistory()
  const param: any = useParams()
  const [sessionDetails, setSessionsDetails] = useState<any>()
  const [videoMaterial, setVideoMaterial] = useState<any[]>([])
  const [audioMaterials, setAudioMaterial] = useState<any[]>([])
  const [pdfMaterial, setPdfMaterial] = useState<any[]>([])
  const [pptxMaterial, setPptxMaterial] = useState<any[]>([])
  const [isMaterialLoading, setIsMaterialLoading] = useState<boolean>(false)

  const [isConfirmationPopup, setIsConfirmationPopup] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (param?.id) {
      setIsMaterialLoading(true)
      getSessionMaterials(param?.id)
        .then((res) => {
          if (res.data) {
            setSessionsDetails(res.data)
            setPptxMaterial(
              res?.data?.materials.filter(
                (item: any) => item.fileType === 'pptx'
              )
            )
            setPdfMaterial(
              res?.data?.materials?.filter(
                (item: any) => item.fileType === 'pdf'
              )
            )
            setVideoMaterial(
              res?.data?.materials?.filter(
                (item: any) => item.fileType === 'video'
              )
            )
            setAudioMaterial(
              res?.data?.materials?.filter(
                (item: any) => item.fileType === 'audio'
              )
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsMaterialLoading(false))
    }
  }, [param.id])

  const handleSubmit = () => {
    setIsConfirmationPopup(true)
  }

  useEffect(() => {
    const handlePopState = async () => {
      if (!isCompleted) {
        try {
          // Make your API call
          updateSessionsAPI(param?.id, { status: 'inProgress' })
            .then(() => {})
            .catch(() => {})
        } catch (error) {
          console.error('Error during API call:', error)
        }
      }
    }

    // Listen for the browser's back/forward navigation
    window.addEventListener('popstate', handlePopState)

    // Cleanup listener
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [history, param?.id, isCompleted])

  return (
    <Flex>
      <FormContainerV2 style={{ marginBottom: '0px' }}>
        <StyledContainer>
          <SmallContainer>
            <ContentRow>
              <Heading>Grade:</Heading>
              <Text>{sessionDetails?.courseName || ''}</Text>
            </ContentRow>
            <ContentRow>
              <Heading>Subject:</Heading>
              <Text>{sessionDetails?.subjectName || ''}</Text>
            </ContentRow>
          </SmallContainer>
          <SmallContainer>
            <ContentRow>
              <Heading>Chapter:</Heading>
              <Text>{sessionDetails?.chapters[0]?.chapterName || ''}</Text>
            </ContentRow>
            <ContentRow>
              <Heading>Topic:</Heading>
              <Text>
                {sessionDetails?.chapters[0]?.topics[0]?.topicName || ''}
              </Text>
            </ContentRow>
          </SmallContainer>
          <ButtonV2 onClick={() => handleSubmit()}>Complete</ButtonV2>
        </StyledContainer>
      </FormContainerV2>

      <div style={{ display: 'flex', marginTop: '0px' }}>
        <FormContainerV2
          style={{ height: '600px', padding: '6px', width: '35%' }}
        >
          <TeachingVideos
            videos={videoMaterial}
            isLoading={isMaterialLoading}
          />{' '}
        </FormContainerV2>
        <FormContainerV2
          style={{
            height: '600px',
            padding: '6px',
            width: '30%',
            marginLeft: '0px',
            marginRight: '0px'
          }}
        >
          <TeachingVideos
            audio
            videos={audioMaterials}
            isLoading={isMaterialLoading}
          />{' '}
          {/* <TeachingVideosAudios
            audio
            videos={videoMaterial}
            isLoading={isMaterialLoading}
          /> */}
        </FormContainerV2>

        <div style={{ margin: '0px', width: '35%' }}>
          <FormContainerV2 style={{ height: '285px', padding: '6px' }}>
            <div style={{ height: '100%' }}>
              <TeachingHighLights
                isStudent={''}
                highLights={pptxMaterial}
                isLoading={isMaterialLoading}
                isSmall={false}
              />
            </div>
          </FormContainerV2>
          <FormContainerV2 style={{ height: '285px', padding: '6px' }}>
            <div style={{ height: '100%' }}>
              <TeachingSolutions
                isStudent={''}
                solutions={pdfMaterial}
                isLoading={isMaterialLoading}
                isSmall={false}
              />
            </div>
          </FormContainerV2>
        </div>
      </div>
      {isConfirmationPopup && (
        <SessionCompleteConfirmationPopup
          sessionId={param?.id}
          setPopup={() => setIsConfirmationPopup(false)}
          setIsCompleted={() => setIsCompleted(true)}
        />
      )}
    </Flex>
  )
}

export default FinalPageTeachMode
