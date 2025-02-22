import { Flex, WrapperCard } from '../../../../components/V2/styledComponents'
import {
  MediaCard,
  MediaTitle,
  Title,
  VideoDiv,
  PlayIcon,
  Video
} from './styledComponents'
import { ReactComponent as VideoIcon } from '../../../../assets/svg/video-icon.svg'
import { ReactComponent as VideoPlayerIcon } from '../../../../assets/svg/video-player-icon.svg'
import MaterialPopup from './MaterialPopup'
import { useState } from 'react'
import { SelectedVideoProps, VideoMaterialProps } from '../types'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

export const TeachingVideos = ({
  videos,
  isLoading,
  audio
}: {
  videos: VideoMaterialProps[]
  isLoading: boolean
  audio?: boolean
}) => {
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoProps>({
    videoTitle: null!,
    videoUrl: null!,
    videoThumbnail: null!
  })
  return (
    <WrapperCard
      fullHeight
      style={{ overflowY: 'auto', position: 'relative', paddingTop: '0px' }}
    >
      <Flex
        gap="4px"
        alignItems="flex-end"
        style={{
          padding: '20px 0px 12px 0px',
          position: 'sticky',
          top: '0',
          backgroundColor: 'white',
          zIndex: 1
        }}
      >
        <VideoIcon />
        <Title>
          {audio ? 'Audio' : 'Videos'} ({videos.length})
        </Title>
      </Flex>
      {isLoading ? (
        <Spinner
          style={{
            width: '34px',
            height: '34px',
            color: `${BlueButton}`,
            position: 'absolute',
            top: '50%',
            left: '45%'
          }}
          animation={'border'}
        />
      ) : (
        <Flex gap="18px" direction="column">
          {videos?.map((ele: VideoMaterialProps) => {
            return (
              <MediaCard
                Bgcolor="rgba(222, 242, 255, 0.22)"
                key={`video_${ele._id}`}
              >
                <div
                  role="presentation"
                  onClick={() => {
                    setSelectedVideo({
                      videoTitle: ele.name,
                      videoUrl: ele.path,
                      videoThumbnail: ele.thumbnail
                    })
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <MediaTitle style={{ paddingBottom: '10px' }}>
                    {ele.name}
                  </MediaTitle>
                  <VideoDiv bgImage={ele.thumbnail}>
                    <PlayIcon>
                      <VideoPlayerIcon />
                    </PlayIcon>
                  </VideoDiv>
                </div>
              </MediaCard>
            )
          })}
          {videos.length <= 0 && <Title> No videos </Title>}
          {selectedVideo.videoTitle && (
            <MaterialPopup
              child={VideoPlayer(selectedVideo)}
              width="80%"
              height="auto"
              onClick={() =>
                setSelectedVideo({
                  videoTitle: '',
                  videoUrl: '',
                  videoThumbnail: ''
                })
              }
            />
          )}
        </Flex>
      )}
    </WrapperCard>
  )
}

export const TeachingVideosAudios = ({
  videos,
  isLoading
}: {
  videos: VideoMaterialProps[]
  isLoading: boolean
}) => {
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoProps>({
    videoTitle: null!,
    videoUrl: null!,
    videoThumbnail: null!
  })

  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  return (
    <WrapperCard
      fullHeight
      style={{ overflowY: 'auto', position: 'relative', paddingTop: '0px' }}
    >
      <Flex
        gap="4px"
        alignItems="flex-end"
        style={{
          padding: '20px 0px 12px 0px',
          position: 'sticky',
          top: '0',
          backgroundColor: 'white',
          zIndex: 1
        }}
      >
        <VideoIcon />
        {userInfoV2?.role === 'student' &&
        (userInfoV2.courses[0].name !== 'Grade 6' ||
          'Grade 7' ||
          'Grade 8' ||
          'Grade 9' ||
          'Grade 10' ||
          'Grade 11' ||
          'Grade 12') ? (
          <Title>Videos</Title>
        ) : (
          <Title>Videos & Audios</Title>
        )}
      </Flex>
      {isLoading ? (
        <Spinner
          style={{
            width: '34px',
            height: '34px',
            color: `${BlueButton}`,
            position: 'absolute',
            top: '50%',
            left: '45%'
          }}
          animation={'border'}
        />
      ) : (
        <Flex gap="18px" direction="column">
          {videos?.map((ele: VideoMaterialProps) => {
            return (
              <MediaCard
                Bgcolor="rgba(222, 242, 255, 0.22)"
                key={`video_${ele._id}`}
              >
                <div
                  role="presentation"
                  onClick={() => {
                    setSelectedVideo({
                      videoTitle: ele.name,
                      videoUrl: ele.path,
                      videoThumbnail: ele.thumbnail
                    })
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <MediaTitle style={{ paddingBottom: '10px' }}>
                    {ele.name}
                  </MediaTitle>
                  <VideoDiv bgImage={ele.thumbnail}>
                    <PlayIcon>
                      <VideoPlayerIcon />
                    </PlayIcon>
                  </VideoDiv>
                </div>
              </MediaCard>
            )
          })}
          {selectedVideo.videoTitle && (
            <MaterialPopup
              child={VideoPlayer(selectedVideo)}
              width="80%"
              height="auto"
              onClick={() =>
                setSelectedVideo({
                  videoTitle: '',
                  videoUrl: '',
                  videoThumbnail: ''
                })
              }
            />
          )}
        </Flex>
      )}
    </WrapperCard>
  )
}

const VideoPlayer = (selectedVideo: SelectedVideoProps) => {
  return (
    <Video
      config={{ file: { attributes: { controlsList: 'nodownload' } } }}
      url={selectedVideo.videoUrl}
      controls
      light={selectedVideo.videoThumbnail}
      playing={true}
      onContextMenu={(e: any) => e.preventDefault()} // Disable right-click
    />
  )
}
