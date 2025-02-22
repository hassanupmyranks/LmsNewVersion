import { Flex, WrapperCard } from '../../../../components/V2/styledComponents'

import { ReactComponent as PptxIcon } from '../../../../assets/svg/pptx-icon.svg'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import {
  FileName,
  MediaCard,
  MediaTitle,
  PptxSvg,
  TextMaterialFrame,
  Title
} from './styledComponents'
import MaterialPopup from '../../learn/components/MaterialPopup'
import { LearnModuleTextMaterial, SelectedPptxProps } from '../../learn/types'

import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'
import { Checkbox } from '../../../../components/V2/Form/ItemCheckbox'

const TeachingHighLights = ({
  highLights,
  isLoading,
  isSmall,
  isStudent,
  handleCheckedMaterials,
  materilsIds,
  isPrepMode
}: {
  highLights: LearnModuleTextMaterial[]
  isLoading: boolean
  isSmall: Boolean
  isStudent?: string
  handleCheckedMaterials: (d: string) => void
  materilsIds: string[]
  isPrepMode?: boolean
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
        <Flex gap="18px" style={{ flexWrap: 'wrap' }}>
          {highLights?.map((ele: LearnModuleTextMaterial, index: number) => {
            return (
              <Flex
                key={`highlight_file_${ele._id}`}
                alignItems="start"
                style={{ width: '140px' }}
              >
                <Checkbox
                  onClick={() =>
                    handleCheckedMaterials(isPrepMode ? ele._id : ele.parentId)
                  }
                  style={{ backgroundColor: 'white', cursor: 'pointer' }}
                >
                  {materilsIds.includes(isPrepMode ? ele._id : ele.parentId) ? (
                    <CheckedSvg />
                  ) : (
                    <UnCheckedSvg />
                  )}
                </Checkbox>
                <MediaCard
                  Bgcolor="rgba(255, 202, 185, 0.27)"
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
              </Flex>
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
    <TextMaterialFrame
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedPptx.PptxUrl}#toolbar=0`}
      loading="lazy"
    />
  )
}
