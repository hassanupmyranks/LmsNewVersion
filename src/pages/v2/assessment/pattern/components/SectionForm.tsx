import styled from 'styled-components'
import { Flex } from '../../../../../components/V2/styledComponents'
import InputV2 from '../../../../../components/V2/Form/Input'
import InputNumber from '../../../../../components/V2/Form/InputNumber'
import { ReactComponent as CopyIconSvg } from '../../../../../assets/svg/copy-icon.svg'
import { ReactComponent as DeleteIconSvg } from '../../../../../assets/svg/delete-icon.svg'
import { SectionFormProps } from './types'
import { PatternSectionDetails } from '../../../../../utils/types'
import React, { useEffect, useState } from 'react'
import { getDropDownOptions } from '../../../../../helpers/V2/dropdown'
import { validateSection, validateSingleFieldOfSection } from '../helper'
import { deepCloneData } from '../../../../../helpers/V2/dataHanders'
import { getQuestionType } from '../../../../../helpers/V2/apis'
import MultiselectDropdown from '../../../../../components/V2/Form/MultiselectDropdown'
import { DropdownOptionData } from '../../../assignment/Review/ReviewAssignment/Types'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import DecimalInputNumber from '../../../../../components/V2/Form/decimalInputNumber'

export const CountSpan = styled.span`
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  height: 18px;
  font-size: 12px;
  width: auto;
  color: white;
  border-radius: 5px;
  background: linear-gradient(90deg, #62a6d1, #0564a3);
  padding: 4px;
  font-weight: bold;
`

interface QuestionType {
  value: string
  label: string
}

const SectionForm = ({
  index,
  sectionData,
  activeSectionTab,
  setSectionDetails,
  showError,
  setSubjectDetails,
  selectedCourse,
  sectionDetails,
  indexOfCurrSubject,
  subjectDetails,
  setNumberOfQuestionChange
}: SectionFormProps) => {
  const [selectedTestType, setSelectedTestType] = useState<
    DropdownOptionData<QuestionType>[]
  >([])
  const [questionType, setQuestionType] = useState<QuestionType[]>([])
  const [typeLoading, setTypeLoading] = useState(false)

  const CountWrapper = ({ count }: any) => <CountSpan>{count}</CountSpan>

  useEffect(() => {
    setTypeLoading(true)
    setQuestionType([])
    getQuestionType({
      courseId: selectedCourse?.id,
      subjectId: activeSectionTab
    })
      .then((res) => {
        if (res.data.length > 0) {
          setQuestionType(
            res.data.map(
              (ele: { code: string; name: string; questionCount: number }) => {
                return {
                  value: ele.code,
                  label: (
                    <>
                      {ele.name} <CountWrapper count={ele.questionCount} />
                    </>
                  )
                }
              }
            )
          )
        } else {
          CustomToastMessage('No questions are available', 'error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setTypeLoading(false))
  }, [selectedCourse, activeSectionTab])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const updateSubjectDetails = (
    data: Record<string, PatternSectionDetails[]>
  ) => {
    setSubjectDetails((prevState) => {
      const SubjectDetails = prevState.map((subject) => {
        if (subject.subject_id === activeSectionTab) {
          return {
            ...subject,
            total_questions_for_subject: data[activeSectionTab].length
              ? data[activeSectionTab][data[activeSectionTab].length - 1]
                  .questions_to -
                data[activeSectionTab][0].questions_from +
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

  useEffect(() => {
    setSelectedTestType(
      getDropDownOptions(questionType, 'value', 'label').filter((item) =>
        sectionData.question_type.includes(item.value.value)
      )
    )
  }, [questionType, setSelectedTestType, sectionData.question_type])

  useEffect(() => {
    if (showError) {
      const validationObj = validateSection(sectionData)
      setErrors(validationObj)
    }
  }, [showError, setErrors, sectionData])

  const setValidator = (key: string, value: any) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: validateSingleFieldOfSection(key, value)
    }))
  }

  const onChangeHandler = <T,>(value: T, key: keyof PatternSectionDetails) => {
    setSectionDetails((prevState) => {
      const cloneData = deepCloneData(prevState)
      if (!(key === 'questions_to')) {
        cloneData[activeSectionTab][index] = {
          ...cloneData[activeSectionTab][index],
          [key]: value
        }
      } else {
        cloneData[activeSectionTab][index] = {
          ...cloneData[activeSectionTab][index],
          questions_to: +value,
          optional_question: 0
        }
        if (cloneData[activeSectionTab].length - 1 > index) {
          let nextIteration = index
          const updateQuestionNumber =
            +value - prevState[activeSectionTab][index].questions_to
          while (nextIteration < cloneData[activeSectionTab].length - 1) {
            const nextSection = cloneData[activeSectionTab][nextIteration + 1]
            cloneData[activeSectionTab][nextIteration + 1] = {
              ...nextSection,
              questions_from:
                nextSection.questions_from + updateQuestionNumber > 0
                  ? nextSection.questions_from + updateQuestionNumber
                  : 0,
              questions_to:
                nextSection.questions_to + updateQuestionNumber > 0
                  ? nextSection.questions_to + updateQuestionNumber
                  : 0
            }
            nextIteration++
          }
          for (let i = indexOfCurrSubject; i < subjectDetails.length - 1; i++) {
            cloneData[subjectDetails[i + 1]?.subject_id] = cloneData[
              subjectDetails[i + 1]?.subject_id
            ]?.map((section) => {
              return {
                ...section,
                questions_from: section.questions_from + updateQuestionNumber,
                questions_to: section.questions_to + updateQuestionNumber
              }
            })
          }
        }
        updateSubjectDetails(cloneData)
      }
      return cloneData
    })
  }

  const copySectionHandler = () => {
    setSectionDetails((prevState) => {
      const cloneData = deepCloneData(prevState)
      const lastIndex = cloneData[activeSectionTab].length - 1
      cloneData[activeSectionTab] = [
        ...cloneData[activeSectionTab],
        {
          ...cloneData[activeSectionTab][index],
          questions_from:
            cloneData[activeSectionTab][lastIndex].questions_to + 1,
          questions_to: cloneData[activeSectionTab][lastIndex].questions_to + 1
        }
      ]
      for (let i = indexOfCurrSubject; i < subjectDetails.length - 1; i++) {
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
      updateSubjectDetails(cloneData)
      return cloneData
    })
  }

  const deleteSectionHandler = () => {
    setSectionDetails((prevState) => {
      const cloneData = deepCloneData(prevState)
      const deletedSection = cloneData[activeSectionTab].splice(index, 1)
      const numberOfDeletedQuestion =
        deletedSection[0].questions_to - deletedSection[0].questions_from
      for (let i = index; i < cloneData[activeSectionTab].length; i++) {
        cloneData[activeSectionTab][i] = {
          ...cloneData[activeSectionTab][i],
          questions_from:
            cloneData[activeSectionTab][i].questions_from -
            numberOfDeletedQuestion -
            1,

          questions_to:
            cloneData[activeSectionTab][i].questions_to -
            numberOfDeletedQuestion -
            1
        }
      }
      for (let i = indexOfCurrSubject; i < subjectDetails.length - 1; i++) {
        cloneData[subjectDetails[i + 1]?.subject_id] = cloneData[
          subjectDetails[i + 1]?.subject_id
        ]?.map((section) => {
          return {
            ...section,
            questions_from:
              section.questions_from - numberOfDeletedQuestion - 1,
            questions_to: section.questions_to - numberOfDeletedQuestion - 1
          }
        })
      }
      updateSubjectDetails(cloneData)
      return cloneData
    })
  }

  return (
    <SectionContainer>
      <Flex justifyContent="space-between">
        <InputV2
          required
          defaultValue={sectionData.section_name}
          onBlur={(e) => {
            const sectionCloneData = sectionDetails
            sectionCloneData[activeSectionTab][index] = {
              ...sectionCloneData[activeSectionTab][index],
              ['section_name']: e.target.value
            }
            setSectionDetails(sectionCloneData)
            setValidator('name', e.target.value)
          }}
          label="Section Name"
          placeholder="Section A"
          error={errors.name}
        />
        <Flex gap="12px">
          <CopyIcon onClick={copySectionHandler} />
          <DeleteIcon onClick={deleteSectionHandler} />
        </Flex>
      </Flex>
      <Flex gap="12px" wrap justifyContent="space-between">
        <MultiselectDropdown
          isLoading={typeLoading}
          style={{ maxWidth: '250px' }}
          required
          label="Select Question Type (Select Multiple)"
          onSelect={(val: DropdownOptionData<QuestionType>[]) => {
            setValidator('type', val)
            onChangeHandler(
              val.map((ele) => ele.id),
              'question_type'
            )
            setSelectedTestType(val)
          }}
          selectedValue={selectedTestType}
          placeholder="Type Field Name"
          options={getDropDownOptions(questionType, 'value', 'label')}
          error={errors.type}
        />
        <InputNumber
          value={sectionData.questions_from}
          label="Questions From"
          disabled
          required
          onChange={(val) => onChangeHandler(val, 'questions_from')}
        />
        <InputNumber
          value={sectionData.questions_to}
          label="Questions To"
          required
          onChange={(val) => {
            onChangeHandler(val, 'questions_to')
            if (
              indexOfCurrSubject < subjectDetails?.length - 1 &&
              sectionDetails[activeSectionTab]?.length - 1 === index
            ) {
              const nextSubject =
                sectionDetails[
                  subjectDetails[indexOfCurrSubject + 1].subject_id
                ]
              if (nextSubject?.length) {
                setNumberOfQuestionChange(
                  +val + 1 - nextSubject[0].questions_from ?? 0
                )
              }
            }
          }}
          min={sectionData.questions_from}
        />
        <DecimalInputNumber
          value={sectionData.marks_per_question}
          label="Marks Per Question"
          required
          withHandler
          onChange={(val) => onChangeHandler(val, 'marks_per_question')}
        />
        <DecimalInputNumber
          value={sectionData.negative_mark}
          label="Negative Marks"
          withHandler
          onChange={(val) => {
            onChangeHandler(val, 'negative_mark')
          }}
        />
        <InputNumber
          value={sectionData.optional_question}
          label="Answer Any"
          withHandler
          onChange={(val) => onChangeHandler(val, 'optional_question')}
          min={0}
          max={sectionData.questions_to - sectionData.questions_from}
        />
      </Flex>
    </SectionContainer>
  )
}

export default SectionForm

export const CopyIcon = styled(CopyIconSvg)`
  cursor: pointer;
`

export const DeleteIcon = styled(DeleteIconSvg)`
  cursor: pointer;
`

export const SectionContainer = styled.div`
  border-radius: 30px;
  border: 1px solid #d7dceb;
  background: #fafdff;

  padding: 44px 36px;

  position: relative;

  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`
