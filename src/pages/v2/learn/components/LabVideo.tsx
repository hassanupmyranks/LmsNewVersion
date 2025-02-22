import {
  LabVideoDiv,
  MediaCard,
  MediaTitle,
  VideoDiv,
  PlayIcon,
  Video
} from './styledComponents'
import { ReactComponent as VideoPlayerIcon } from '../../../../assets/svg/video-player-icon.svg'
import { LabVideoMaterialProps, SelectedVideoProps } from '../types'
import { useState } from 'react'
import MaterialPopup from './MaterialPopup'
import { Flex } from '../../addAssignment/styledComponents'

const LabVideo = ({ videos }: { videos: LabVideoMaterialProps[] }) => {
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoProps>({
    videoTitle: '',
    videoUrl: '',
    videoThumbnail: ''
  })
  return (
    <Flex>
      <LabVideoDiv>
        {videos?.map((ele: LabVideoMaterialProps) => {
          return (
            <MediaCard
              style={{ padding: '30px 0px 0px' }}
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
                style={{ width: '100%' }}
              >
                <VideoDiv bgImage={ele.thumbnail}>
                  <PlayIcon>
                    <VideoPlayerIcon />
                  </PlayIcon>
                </VideoDiv>
                <MediaTitle style={{ paddingTop: '16px' }}>
                  {ele.name}
                </MediaTitle>
              </div>
            </MediaCard>
          )
        })}
        {selectedVideo.videoTitle ? (
          <MaterialPopup
            height="auto"
            width="80%"
            child={VideoPlayer(selectedVideo)}
            onClick={() =>
              setSelectedVideo({
                videoTitle: '',
                videoUrl: '',
                videoThumbnail: ''
              })
            }
          />
        ) : (
          ''
        )}
      </LabVideoDiv>
    </Flex>
  )
}

export default LabVideo

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
