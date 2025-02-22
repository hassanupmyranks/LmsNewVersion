import { Flex, WrapperCard } from '../../../../components/V2/styledComponents'

import { ReactComponent as VideoIcon } from '../../../../assets/svg/video-icon.svg'
import { ReactComponent as VideoPlayerIcon } from '../../../../assets/svg/video-player-icon.svg'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import {
  MediaCard,
  MediaTitle,
  PlayIcon,
  Title,
  Video,
  VideoDiv
} from './styledComponents'
import { SelectedVideoProps, VideoMaterialProps } from '../../learn/types'
import MaterialPopup from '../../learn/components/MaterialPopup'
import { Checkbox } from '../../../../components/V2/Form/ItemCheckbox'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'

export const TeachingVideos = ({
  videos,
  isLoading,
  audio,
  handleCheckedMaterials,
  materilsIds,
  isPrepMode
}: {
  videos: VideoMaterialProps[]
  isLoading: boolean
  audio?: boolean
  handleCheckedMaterials: (d: string) => void
  materilsIds: string[]
  isPrepMode?: boolean
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
        <Flex gap="18px" style={{ flexWrap: 'wrap' }}>
          {videos?.map((ele: VideoMaterialProps) => {
            return (
              <Flex
                key={`video_${ele._id}`}
                alignItems="start"
                style={{ width: '140px' }}
              >
                <Checkbox
                  onClick={() =>
                    handleCheckedMaterials(isPrepMode ? ele._id : ele.parentId)
                  }
                  style={{
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {materilsIds.includes(isPrepMode ? ele._id : ele.parentId) ? (
                    <CheckedSvg />
                  ) : (
                    <UnCheckedSvg />
                  )}
                </Checkbox>
                <MediaCard
                  Bgcolor="rgba(222, 242, 255, 0.22)"
                  style={{ width: '160px' }}
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
                      width: '140px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      margin: '10px'
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
              </Flex>
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

export const TeachingVideosAudios = ({
  videos,
  isLoading,
  handleCheckedMaterials,
  materilsIds
}: {
  videos: VideoMaterialProps[]
  isLoading: boolean
  handleCheckedMaterials: (d: string) => void
  materilsIds: string[]
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
        <Title>Videos & Audios</Title>
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
              <Flex key={`video_${ele._id}`} alignItems="start">
                <Checkbox
                  onClick={() => handleCheckedMaterials(ele._id)}
                  style={{
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {materilsIds.includes(ele._id) ? (
                    <CheckedSvg />
                  ) : (
                    <UnCheckedSvg />
                  )}
                </Checkbox>
                <MediaCard Bgcolor="rgba(222, 242, 255, 0.22)">
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
              </Flex>
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
    />
  )
}
