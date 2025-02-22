import { Flex, WrapperCard } from '../../../../components/V2/styledComponents'
import {
  FileName,
  MediaCard,
  MediaTitle,
  PdfSvg,
  TextMaterialFrame,
  Title
} from './styledComponents'
import { ReactComponent as PdfIcon } from '../../../../assets/svg/pdf-icon.svg'
import { ReactComponent as GamesIcon } from '../../../../assets/svg/game.svg'
import MaterialPopup from './MaterialPopup'
import { useState } from 'react'
import { LearnModuleTextMaterial, SelectedPdfProps } from '../types'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { Spinner } from 'react-bootstrap'

export const TeachingSolutions = ({
  solutions,
  isLoading,
  isSmall,
  isStudent,
  isTeacher
}: {
  solutions: LearnModuleTextMaterial[]
  isLoading: boolean
  isSmall: boolean
  isStudent?: string
  isTeacher?: boolean
}) => {
  const [selectedPDF, setSelectedPDF] = useState<SelectedPdfProps>({
    PdfTitle: '',
    PdfUrl: ''
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
        <PdfIcon style={{ width: '30px', height: '50px' }} />
        <Title>
          {isStudent ? 'textbook/workbook' : isTeacher ? 'PDF' : 'Teaching PDF'}{' '}
          ({solutions.length})
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
          {solutions?.map((ele: LearnModuleTextMaterial, index: number) => {
            return (
              <MediaCard
                Bgcolor="rgba(255, 231, 230, 0.30)"
                key={`solution_file_${ele._id}`}
                role="presentation"
                onClick={() => {
                  setSelectedPDF({
                    PdfTitle: ele.name,
                    PdfUrl: ele.path
                  })
                }}
              >
                <MediaTitle>Solution - {index + 1}</MediaTitle>
                <PdfSvg />
                <FileName color="#B30B00">
                  {ele.name}.{ele.fileType}
                </FileName>
              </MediaCard>
            )
          })}
          {selectedPDF.PdfTitle && (
            <MaterialPopup
              width={isSmall ? '90%' : '75%'}
              height="95%"
              child={PdfViewer(selectedPDF)}
              onClick={() => setSelectedPDF({ PdfTitle: '', PdfUrl: '' })}
            />
          )}
        </Flex>
      )}
    </WrapperCard>
  )
}

export const TeachingStudyMaterial = ({
  studyMaterial,
  isLoading,
  isSmall
}: {
  studyMaterial: LearnModuleTextMaterial[]
  isLoading: boolean
  isSmall: boolean
}) => {
  const [selectedPDF, setSelectedPDF] = useState<SelectedPdfProps>({
    PdfTitle: '',
    PdfUrl: ''
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
        <PdfIcon style={{ width: '30px', height: '50px' }} />
        <Title>
          {'Study Material'} ({studyMaterial.length})
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
          {studyMaterial?.map((ele: LearnModuleTextMaterial, index: number) => {
            return (
              <MediaCard
                Bgcolor="rgba(255, 231, 230, 0.30)"
                key={`solution_file_${ele._id}`}
                role="presentation"
                onClick={() => {
                  setSelectedPDF({
                    PdfTitle: ele.name,
                    PdfUrl: ele.path
                  })
                }}
              >
                <MediaTitle>Solution - {index + 1}</MediaTitle>
                <PdfSvg />
                <FileName color="#B30B00">
                  {ele.name}.{ele.fileType}
                </FileName>
              </MediaCard>
            )
          })}
          {selectedPDF.PdfTitle && (
            <MaterialPopup
              width={isSmall ? '90%' : '75%'}
              height="95%"
              child={PdfViewer(selectedPDF)}
              onClick={() => setSelectedPDF({ PdfTitle: '', PdfUrl: '' })}
            />
          )}
        </Flex>
      )}
    </WrapperCard>
  )
}

export const Games = ({
  games,
  isLoading,
  isSmall
}: {
  games: LearnModuleTextMaterial[]
  isLoading: boolean
  isSmall: boolean
}) => {
  const [selectedPDF, setSelectedPDF] = useState<SelectedPdfProps>({
    PdfTitle: '',
    PdfUrl: ''
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
        <GamesIcon style={{ width: '30px', height: '50px', fill: '#B30B00' }} />
        <Title>
          {'Games'} ({games.length})
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
          {games?.map((ele: LearnModuleTextMaterial, index: number) => {
            return (
              <MediaCard
                Bgcolor="rgba(255, 231, 230, 0.30)"
                key={`solution_file_${ele._id}`}
                role="presentation"
                onClick={() => {
                  setSelectedPDF({
                    PdfTitle: ele.name,
                    PdfUrl: ele.path
                  })
                }}
              >
                <MediaTitle>Solution - {index + 1}</MediaTitle>
                <PdfSvg />
                <FileName color="#B30B00">
                  {ele.name}.{ele.fileType}
                </FileName>
              </MediaCard>
            )
          })}
          {selectedPDF.PdfTitle && (
            <MaterialPopup
              width={isSmall ? '90%' : '75%'}
              height="95%"
              child={PdfViewer(selectedPDF)}
              onClick={() => setSelectedPDF({ PdfTitle: '', PdfUrl: '' })}
            />
          )}
        </Flex>
      )}
    </WrapperCard>
  )
}

const PdfViewer = (selectedPdf: SelectedPdfProps) => {
  return (
    <TextMaterialFrame src={`${selectedPdf.PdfUrl}#toolbar=0`} loading="lazy" />
  )
}
