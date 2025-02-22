import { Spinner } from 'react-bootstrap'
import ItemCheckbox from '../../../../../components/V2/Form/ItemCheckbox'
import {
  SubTopicsDetails,
  SubjectTopicsDetails
} from '../../../../../utils/types'
import {
  ChapterContainer,
  ChaptersContainer,
  ContainerBody,
  ContainerHeading
} from './styledComponents'
import { BlueButton } from '../../../../../const/V2/stylingVariables'

const ChapterAndTopicSection = ({
  units,
  selectedUnits,
  selectedChapters,
  topics,
  handleUnitChecked,
  handleChapterChecked,
  isTopicsLoading,
  chaptersAndTopics,
  handleChildChaptersChecked,
  selectedChildChaptersAndTopics,
  isChapterAPILoading
}: {
  units: SubjectTopicsDetails[]
  chaptersAndTopics?: SubjectTopicsDetails[]
  selectedUnits: string[]
  selectedChapters: any
  topics?: any
  selectedTopics?: string[]
  handleUnitChecked: (unit: SubjectTopicsDetails) => void
  handleChapterChecked: (chapter: SubTopicsDetails) => void
  isTopicsLoading?: boolean
  handleChildChaptersChecked?: any
  selectedChildChaptersAndTopics?: any
  isChapterAPILoading: boolean
}) => {
  return (
    <ChaptersContainer>
      <ContainerHeading>
        <h3>Choose Units & Chapters</h3>
      </ContainerHeading>
      {!isTopicsLoading ? (
        <ContainerBody>
          {units &&
            units.map((unit: SubjectTopicsDetails) => (
              <div key={`unit_${unit._id}`}>
                <ItemCheckbox
                  {...{
                    onChildCheck: handleChildChaptersChecked,
                    selectedChildChaptersAndTopics,
                    isChecked: selectedUnits.includes(unit._id),
                    label: unit.name,
                    totalQuestions: unit?.questionCount,
                    onCheck: () => handleUnitChecked(unit)
                  }}
                />
                {selectedUnits.includes(unit._id) && isChapterAPILoading ? (
                  <div className="d-flex justify-content-center mt-1">
                    <Spinner
                      style={{
                        width: '25px',
                        height: '25px',
                        color: `${BlueButton}`
                      }}
                      animation={'border'}
                    />
                  </div>
                ) : (
                  <ChapterContainer>
                    {selectedUnits.includes(unit._id) &&
                      chaptersAndTopics &&
                      selectedChapters &&
                      chaptersAndTopics.map((chapter: any) => (
                        <ItemCheckbox
                          key={`chapter_${chapter._id}`}
                          {...{
                            children: topics || [],
                            onChildCheck: handleChildChaptersChecked,
                            selectedChildChaptersAndTopics,
                            isChecked: selectedChapters.includes(chapter._id),
                            label: chapter.name,
                            totalQuestions: chapter?.questionCount,
                            onCheck: () => handleChapterChecked(chapter)
                          }}
                        />
                      ))}
                  </ChapterContainer>
                )}
              </div>
            ))}
        </ContainerBody>
      ) : (
        <h5>Loading...</h5>
      )}
    </ChaptersContainer>
  )
}

export default ChapterAndTopicSection
