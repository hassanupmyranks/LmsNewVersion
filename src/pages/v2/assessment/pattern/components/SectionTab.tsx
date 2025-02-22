import styled from 'styled-components'
import {
  Blue,
  PrimaryBlue,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../../../const/V2/stylingVariables'
import { ReactComponent as AddIcon } from '../../../../../assets/svg/solid-add-icon.svg'
import { Flex } from '../../../../../components/V2/styledComponents'
import { ReactComponent as RemoveIconSvg } from '../../../../../assets/svg/remove-icon.svg'
import { ReactComponent as DangerRemoveIconSvg } from '../../../../../assets/svg/red-remove-icon.svg'
import { SectionTabProps } from './types'
import { useMemo } from 'react'

const SectionTab = ({
  label,
  isActive,
  activeSectionTab,
  sectionDetails,
  subject,
  setSectionDetails,
  selectedSubject,
  setActiveSectionTab,
  setSelectedSubject,
  setSubjectDetails,
  index,
  setSelectedSubjectIds,
  indexOfCurrSubject,
  subjectDetails
}: SectionTabProps) => {
  const removeSubjectHandler = () => {
    const newSubList = selectedSubject.filter(
      (selectedSub) => selectedSub.id !== subject.subject_id
    )
    const newSectionDetails = { ...sectionDetails }

    if (activeSectionTab === subject.subject_id) {
      setActiveSectionTab(newSubList.length ?? '' ? newSubList[0].id ?? '' : '')
    }

    setSelectedSubjectIds((prev: string[]) =>
      prev.filter((item) => item !== subject.subject_id)
    )

    setSelectedSubject(newSubList)
    setSubjectDetails((prevState) => {
      const temp = [...prevState]
      temp.splice(index, 1)
      return temp
    })
    if (subjectDetails.length > 1 && newSectionDetails[subject.subject_id]) {
      const deletedSubjectQuestion =
        (newSectionDetails[subject.subject_id][
          newSectionDetails[subject.subject_id]?.length - 1
        ].questions_to ?? 0) -
        (newSectionDetails[subject.subject_id][0].questions_from ?? 0) +
        1

      for (let i = index; i < subjectDetails.length - 1; i++) {
        newSectionDetails[subjectDetails[i + 1]?.subject_id] =
          newSectionDetails[subjectDetails[i + 1]?.subject_id]?.map(
            (section) => {
              return {
                ...section,
                questions_from: section.questions_from - deletedSubjectQuestion,
                questions_to: section.questions_to - deletedSubjectQuestion
              }
            }
          )
      }
      if (newSectionDetails[subject.subject_id]) {
        delete newSectionDetails[subject.subject_id]
        setSectionDetails(newSectionDetails)
      }
    }
  }
  const activeTabIndex = useMemo(
    () => selectedSubject.findIndex((ele) => ele.id === activeSectionTab),
    [selectedSubject, activeSectionTab]
  )
  return (
    <RelativeDiv>
      <SectionTabContainer
        onClick={() => setActiveSectionTab(subject.subject_id)}
        isActive={isActive}
      >
        <TabLabel>{label}</TabLabel>
        <Flex gap="20px">
          <InputContainer>
            <Input
              value={subject.total_questions_for_subject}
              readOnly={true}
              isActive={isActive}
            />
          </InputContainer>
          <AddIconContainer
            onClick={() => {
              if (activeSectionTab === subject.subject_id) {
                const cloneData = { ...sectionDetails }

                const tempQuestionFrom = cloneData[activeSectionTab]?.length
                  ? cloneData[activeSectionTab][
                      cloneData[activeSectionTab].length - 1
                    ].questions_to + 1
                  : 1
                const activeTabId =
                  cloneData[selectedSubject[activeTabIndex - 1]?.id]
                cloneData[activeSectionTab] = [
                  ...(cloneData[activeSectionTab] ?? []),
                  {
                    section_name: '',
                    question_type: [],
                    marks_per_question: 4,
                    questions_from:
                      activeTabIndex !== 0
                        ? cloneData[activeSectionTab]?.length
                          ? tempQuestionFrom
                          : activeTabId[activeTabId.length - 1].questions_to + 1
                        : tempQuestionFrom,
                    questions_to:
                      activeTabIndex !== 0
                        ? cloneData[activeSectionTab]?.length
                          ? tempQuestionFrom
                          : activeTabId[activeTabId.length - 1].questions_to + 1
                        : tempQuestionFrom,
                    negative_mark: 1,
                    optional_question: 0
                  }
                ]
                for (
                  let i = indexOfCurrSubject;
                  i < subjectDetails.length - 1;
                  i++
                ) {
                  cloneData[subjectDetails[i + 1]?.subject_id] = cloneData[
                    subjectDetails[i + 1]?.subject_id
                  ]?.map((section) => {
                    return {
                      ...section,
                      questions_from: section.questions_from + 1,
                      questions_to: section.questions_to + 1
                    }
                  })
                }
                setSectionDetails(cloneData)
                setSubjectDetails((prevState) => {
                  const SubjectDetails = prevState.map((subject) => {
                    if (subject.subject_id === activeSectionTab) {
                      return {
                        ...subject,
                        total_questions_for_subject: cloneData[activeSectionTab]
                          .length
                          ? cloneData[activeSectionTab][
                              cloneData[activeSectionTab].length - 1
                            ].questions_to -
                            cloneData[activeSectionTab][0].questions_from +
                            1
                          : 0
                      }
                    } else {
                      return subject
                    }
                  })
                  return SubjectDetails
                })
              }
            }}
          >
            {isActive ? <AddIcon /> : <GrayAddIcon />}
          </AddIconContainer>
        </Flex>
      </SectionTabContainer>
      {isActive ? (
        <RemoveIcon onClick={removeSubjectHandler} />
      ) : (
        <DangerRemoveIcon onClick={removeSubjectHandler} />
      )}
    </RelativeDiv>
  )
}

export default SectionTab

const TabLabel = styled.p`
  user-select: none;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-bottom: 8px;
`

const RelativeDiv = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 41px;
`

const SectionTabContainer = styled.div<{ isActive?: boolean }>`
  cursor: pointer;

  border-radius: 20px 20px 0px 0px;
  padding: 12px 16px;
  width: 180px;
  height: 70px;
  border: 1px solid #d7dceb;
  background: ${({ isActive }) => (isActive ? PrimaryBlue : White)};

  margin-left: 20px;

  margin-bottom: -10px;

  display: inline-block;

  color: ${({ isActive }) => (isActive ? White : SecondaryGray600)};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
  position: relative;
`
const InputContainer = styled.label`
  padding: 4px 12px 4px 16px;
  border-radius: 16px;
  border: 2px solid ${SecondaryGray};
  background: ${White};
  display: flex;
  gap: 5px;
  align-items: center;
  height: 42px;
  position: absolute;
  bottom: -25%;

  z-index: 2;
`

const Input = styled.input<{ isActive?: boolean }>`
  all: unset;
  width: 50px;
  color: ${({ isActive }) => (isActive ? Blue : SecondaryGray600)};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.34px;
`
const AddIconContainer = styled.div`
  background: #ddf1ff;
  padding: 8px;
  border-radius: 20px;
  cursor: pointer;

  bottom: -20%;

  position: absolute;
  right: 16px;

  z-index: 2;
`
const RemoveIcon = styled(RemoveIconSvg)`
  cursor: pointer;
  position: absolute;
  top: -8px;
  right: 20px;
`
const DangerRemoveIcon = styled(DangerRemoveIconSvg)`
  cursor: pointer;
  position: absolute;
  top: -8px;
  right: 20px;
`
const GrayAddIcon = styled(AddIcon)`
  * {
    fill: #a3aed0;
  }
`
