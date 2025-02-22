import styled from 'styled-components'
import {
  Blue,
  LightBlue,
  PrimaryBlue
} from '../../../../../../const/V2/stylingVariables'
import { Spinner } from 'react-bootstrap'

import { ReactComponent as CheckIcon } from '../../../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckIcon } from '../../../../../../assets/svg/un-check-icon.svg'
import { Count } from '../../../../../../components/V2/SideMenu/styledComponents'

const ItemCheckBox = ({
  unit,
  chapters,
  topics,
  isSelectedUnit,
  isChapterAPILoading,
  handleSelectUnit,
  handleSelectChapter,
  handleSelectTopic,
  subjectsDetails
}: {
  unit: any
  chapters: any[]
  topics?: any[]
  isSelectedUnit: boolean
  isChapterAPILoading: boolean
  subjectsDetails: any[]
  handleSelectUnit: (d: string) => void
  handleSelectChapter: (d: string) => void
  handleSelectTopic: (d: string) => void
}) => {
  return (
    <>
      <CheckBoxContainer
        key={`${unit}_${unit._id}`}
        isChecked={isSelectedUnit}
        onClick={() => handleSelectUnit(unit._id)}
      >
        <Checkbox>{isSelectedUnit ? <CheckIcon /> : <UnCheckIcon />}</Checkbox>
        <span>{unit?.name || '-'}</span>
        {unit?.questionCount == undefined ? (
          ''
        ) : (
          <Count>{unit?.questionCount}</Count>
        )}
      </CheckBoxContainer>
      {isSelectedUnit && isChapterAPILoading && (
        <Spinner
          style={{
            height: '30px',
            width: '30px',
            color: `${PrimaryBlue}`
          }}
          animation={'border'}
        />
      )}
      {isSelectedUnit &&
        chapters &&
        chapters.length > 0 &&
        chapters.map((chapter: any, ind: number) => (
          <>
            <ChildCheckBoxContainer
              style={{ marginLeft: '25px' }}
              key={`chapter_${ind}`}
              isChecked={subjectsDetails.some(
                (details) => details.chapterId === chapter._id
              )}
              onClick={() => handleSelectChapter(chapter._id)}
            >
              <Checkbox>
                {subjectsDetails.some(
                  (details) => details.chapterId === chapter._id
                ) ? (
                  <CheckIcon />
                ) : (
                  <UnCheckIcon />
                )}
              </Checkbox>
              <span> {chapter?.name || '-'} </span>
              {chapter?.questionCount == undefined ? (
                ''
              ) : (
                <Count>{chapter?.questionCount}</Count>
              )}
            </ChildCheckBoxContainer>
            {subjectsDetails.some(
              (details) => details.chapterId === chapter._id
            ) &&
              topics &&
              topics?.length === 0 && (
                <Spinner
                  style={{
                    height: '30px',
                    width: '30px',
                    color: `${PrimaryBlue}`
                  }}
                  animation={'border'}
                />
              )}
            {subjectsDetails.some(
              (details) => details.chapterId === chapter._id
            ) &&
              topics &&
              topics?.length > 0 &&
              topics?.map((topic: any, ind: number) => {
                const isChecked = subjectsDetails.some(
                  (details) =>
                    details?.chapterId === chapter?._id &&
                    details?.topicIds?.includes(topic?._id)
                )
                return (
                  <ChildCheckBoxContainer
                    style={{ marginLeft: '50px' }}
                    key={`topic_${ind}`}
                    isChecked={isChecked}
                    onClick={() => handleSelectTopic(topic?._id)}
                  >
                    <Checkbox>
                      {isChecked ? <CheckIcon /> : <UnCheckIcon />}
                    </Checkbox>
                    <span> {topic?.name || '-'} </span>
                    {topic?.questionCount == undefined ? (
                      ''
                    ) : (
                      <Count>{topic?.questionCount}</Count>
                    )}
                  </ChildCheckBoxContainer>
                )
              })}
          </>
        ))}
    </>
  )
}

export default ItemCheckBox

export const CheckBoxContainer = styled.div<{ isChecked?: boolean }>`
  padding: 12px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 16px;
  border: ${(props) => (props?.isChecked ? 'none' : '1px solid #A3AED054')};
  span {
    color: ${Blue};
    // font-family: DM Sans;
    letter-spacing: -0.68px;
    font-size: 16px;
    font-weight: 700;
  }

  box-shadow: ${(props) =>
    props?.isChecked ? '0px 18px 40px 0px rgba(112, 144, 176, 0.12)' : 'none'};
`
export const Checkbox = styled.div`
  background-color: ${LightBlue};
  display: flex;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
`

export const ChildCheckBoxContainer = styled.div<{ isChecked?: boolean }>`
  padding: 10px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 16px;
  border: ${(props) => (props?.isChecked ? 'none' : '1px solid #A3AED054')};
  span {
    color: ${Blue};
    // font-family: DM Sans;
    letter-spacing: -0.68px;
    font-size: 16px;
    font-weight: 700;
  }

  box-shadow: ${(props) =>
    props?.isChecked ? '0px 18px 40px 0px rgba(112, 144, 176, 0.12)' : 'none'};
`
