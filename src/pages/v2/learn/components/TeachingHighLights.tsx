import { Flex, WrapperCard } from '../../../../components/V2/styledComponents'
import {
  FileName,
  MediaCard,
  MediaTitle,
  IframeContainer,
  PptxSvg,
  TextMaterialFrame,
  Title,
  Overlay,
  HideButtonArea
} from './styledComponents'
import { ReactComponent as PptxIcon } from '../../../../assets/svg/pptx-icon.svg'
import { useState } from 'react'
import MaterialPopup from './MaterialPopup'
import { LearnModuleTextMaterial, SelectedPptxProps } from '../types'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'

const TeachingHighLights = ({
  highLights,
  isLoading,
  isSmall,
  isStudent
}: {
  highLights: LearnModuleTextMaterial[]
  isLoading: boolean
  isSmall: Boolean
  isStudent?: string
}) => {
  const [selectedPptx, setSelectedPptx] = useState<SelectedPptxProps>({
    PptxTitle: '',
    PptxUrl: ''
  })
  return (
    <WrapperCard
      fullHeight
      style={{ overflowY: 'auto', position: 'relative', paddingTop: '0px' }}
    >
      <Flex
        gap="6px"
        style={{
          paddingTop: '10px',
          position: 'sticky',
          top: '0',
          backgroundColor: 'white',
          zIndex: 1
        }}
      >
        <PptxIcon style={{ width: '30px', height: '50px' }} />
        <Title>
          {isStudent ? 'Study Material' : 'Teaching PPTX'} ({highLights.length})
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
          {highLights?.map((ele: LearnModuleTextMaterial, index: number) => {
            return (
              <MediaCard
                Bgcolor="rgba(255, 202, 185, 0.27)"
                key={`highlight_file_${ele._id}`}
                role="presentation"
                onClick={() => {
                  setSelectedPptx({
                    PptxTitle: ele.name,
                    PptxUrl: ele.path
                  })
                }}
              >
                <MediaTitle>Highlight - {index + 1}</MediaTitle>
                <PptxSvg />
                <FileName color="#F23D02">
                  {ele.name}.{ele.fileType}
                </FileName>
              </MediaCard>
            )
          })}
          {selectedPptx.PptxTitle && (
            <MaterialPopup
              width={isSmall ? '90%' : '75%'}
              height="95%"
              child={PptxViewer(selectedPptx)}
              onClick={() => setSelectedPptx({ PptxTitle: '', PptxUrl: '' })}
            />
          )}
        </Flex>
      )}
    </WrapperCard>
  )
}

export default TeachingHighLights

const PptxViewer = (selectedPptx: SelectedPptxProps) => {
  return (
    <IframeContainer>
      <TextMaterialFrame
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedPptx.PptxUrl}#toolbar=0`}
        loading="lazy"
      />
      <Overlay>
        <HideButtonArea />
      </Overlay>
    </IframeContainer>
  )
}
