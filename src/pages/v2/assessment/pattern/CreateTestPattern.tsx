import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Dropdown from '../../../../components/V2/Form/Dropdown'
import InputV2 from '../../../../components/V2/Form/Input'
import InputNumber from '../../../../components/V2/Form/InputNumber'
import MultiselectDropdown from '../../../../components/V2/Form/MultiselectDropdown'
import TextArea from '../../../../components/V2/Form/TextArea'
import { FormContainerV2 } from '../../../../components/V2/Form/styledComponents'
import { DropdownOptionData } from '../../../../components/V2/Form/types'
import {
  ButtonV2,
  Flex,
  Grid,
  GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
import {
  createPatternApi,
  getCreatePatternDataApi,
  getQuestionBankV2CoursesAPI,
  getQuestionBankV2SubjectsAPI,
  updatePatternApi
} from '../../../../helpers/V2/apis'
import { getDropDownOptions } from '../../../../helpers/V2/dropdown'
import {
  CourseDetails,
  CreatePatternPayload,
  GetPatternResponse,
  PatternSectionDetails,
  PatternSubjectDetails,
  SubjectDetails
} from '../../../../utils/types'
import EmptySection from './components/EmptySection'
import SectionForm from './components/SectionForm'
import SectionTab from './components/SectionTab'
import { Prompt, useHistory, useParams } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import toast from 'react-hot-toast'
import {
  areAllSectionsValid,
  createPatternSingleFiledValidator,
  createPatternValidator
} from './helper'
import { hasAnyErrors } from '../../../../helpers/V2/formValidattion'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import InputDuration from '../../../../components/V2/Form/InputDuration'
import { deepCloneData } from '../../../../helpers/V2/dataHanders'

export const CountSpan = styled.span`
  font-family: 'Inter', sans-serif;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
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

const CreateTestPattern = () => {
  const history = useHistory()

  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [courseList, setCourseList] = useState<CourseDetails[]>([])
  const [isCourseLoading, setIsCourseLoading] = useState<boolean>(false)
  const [subjectList, setSubjectList] = useState<SubjectDetails[]>([])
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false)

  const [newSubjectList, setNewSubjectList] = useState<SubjectDetails[]>([])
  const [newSelectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([])

  const [activeSectionTab, setActiveSectionTab] = useState<string>('')

  const [patternName, setPatternName] = useState<string>('')
  const [totalQuestions, setTotalQuestions] = useState<number>(0)
  const [totalMarks, setTotalMarks] = useState<number>(0)
  const [totalDuration, setTotalDuration] = useState<number>(0)
  const [testInstructions, setTestInstructions] = useState<string>('')
  const [selectedSubjects, setSelectedSubjects] = useState<
    DropdownOptionData<SubjectDetails>[]
  >([])
  const [subjectDetails, setSubjectDetails] = useState<PatternSubjectDetails[]>(
    []
  )
  const [isDisablePatternBtn, setIsDisablePatternBtn] = useState<boolean>(false)
  const [sectionDetails, setSectionDetails] = useState<
    Record<string, PatternSectionDetails[]>
  >({})
  const Ref = useRef<HTMLDivElement>(null)
  const [showErrorInSections, setShowErrorInSections] = useState<boolean>(false)

  const [selectedCourse, setSelectedCourse] =
    useState<DropdownOptionData<CourseDetails>>()

  const [validation, setValidation] = useState<Record<string, string>>({})
  const [numberOfQuestionChange, setNumberOfQuestionChange] =
    useState<number>(0)
  const [courseTotal, setCourseTotal] = useState(0)
  const [coursePage, setCoursePage] = useState(1)

  const param: { id: string } = useParams()
  useEffect(() => {
    if (param.id) {
      getCreatePatternDataApi({
        skip: 0,
        limit: 5,
        test_id: param.id
      })
        .then((res) => {
          const response: GetPatternResponse = res.data[0]
          setPatternName(response.test_name)
          setSelectedCourse({
            id: response.course_details.course_id,
            label: response.course_details.course_name,
            value: {
              name: response.course_details.course_name,
              _id: response.course_details.course_id
            }
          })
          getQuestionBankV2SubjectsAPI({
            courseId: response.course_details.course_id,
            limit: 100
          })
            .then((res) => {
              setSubjectList(res.data)
              setIsSubjectLoading(false)
            })
            .catch((err) => {
              console.log(err)
              setIsSubjectLoading(false)
            })
          const selectedSubject = response.subjects_details.map((subject) => ({
            id: subject.subject_id,
            label: subject.subject_name,
            value: {
              courseId: response.course_details.course_id,
              name: subject.subject_name,
              _id: subject.subject_id
            }
          }))
          setTestInstructions(response.instruction_text)
          setActiveSectionTab(selectedSubject[0].id)
          setSelectedSubjects(selectedSubject)
          setSubjectDetails(
            selectedSubject.map((item, index) => ({
              subject_id: item.id ?? '',
              subject_name: item.label,
              total_questions_for_subject:
                response.subjects_details[index].total_questions_for_subject
            }))
          )
          const obj: Record<string, PatternSectionDetails[]> = {}
          response.subjects_details.forEach((subject) => {
            const key = subject.subject_id
            const value = subject.sections
            obj[key] = value
            return obj
          })
          setSectionDetails(obj)
          setTotalDuration(response.test_duration)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [param.id])

  useEffect(() => {
    if (subjectDetails) {
      let totalNumberQuestions = 0
      subjectDetails.map((subjects: PatternSubjectDetails) => {
        totalNumberQuestions += subjects.total_questions_for_subject
      })
      setTotalQuestions(totalNumberQuestions)
    }
  }, [subjectDetails])

  useEffect(() => {
    if (sectionDetails) {
      let newTotalMarks = 0
      for (const property in sectionDetails) {
        subjectDetails.map((subjects: PatternSubjectDetails) => {
          if (subjects.subject_id === property) {
            sectionDetails[property]?.map((details: PatternSectionDetails) => {
              if (details.optional_question > 0) {
                newTotalMarks +=
                  details.optional_question * details.marks_per_question
              } else {
                newTotalMarks +=
                  (details.questions_to - details.questions_from + 1) *
                  details.marks_per_question
              }
            })
          }
        })
      }
      setTotalMarks(newTotalMarks)
    }
  }, [subjectDetails, sectionDetails])

  useEffect(() => {
    setIsCourseLoading(true)
    getQuestionBankV2CoursesAPI({
      page: coursePage,
      limit: 20
    })
      .then((res) => {
        setCourseTotal(res.total)
        setCourseList((prev) => [...prev, ...res.data])
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsCourseLoading(false))
  }, [coursePage])

  const setValidator = (key: string, value: any) => {
    setValidation((prevState) => ({
      ...prevState,
      [key]: createPatternSingleFiledValidator(key, value)
    }))
  }

  const courseSelectHandler = async (
    data: DropdownOptionData<CourseDetails>
  ) => {
    setIsDirty(true)
    setValidator('courseDetails', data.value._id)
    setSelectedCourse(data)
    setTestInstructions(data.value.instructionText || '')
    setSelectedSubjects([])
    setActiveSectionTab('')
    setSubjectDetails([])
    setIsSubjectLoading(true)
    getQuestionBankV2SubjectsAPI({
      courseId: data.id,
      limit: 100
    })
      .then((res) => {
        setSubjectList(res.data)
        setIsSubjectLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsSubjectLoading(false)
      })
  }

  const SubmitHandler = () => {
    const payload: CreatePatternPayload = {
      test_name: patternName,
      test_duration: totalDuration,
      total_marks: totalMarks,
      total_questions: totalQuestions,
      instruction_text: testInstructions,
      course_details: {
        course_id: selectedCourse?.value?._id ?? '',
        course_name: selectedCourse?.value?.name ?? ''
      },
      subjects_details: subjectDetails.map((subject) => ({
        ...subject,
        sections: sectionDetails[subject.subject_id]?.map((section) => {
          return {
            ...section,
            questions_list: []
          }
        })
      }))
    }

    setShowErrorInSections(true)
    const validatedObj = createPatternValidator(payload)

    if (hasAnyErrors(validatedObj) || !areAllSectionsValid(payload)) {
      Ref?.current?.scrollTo(0, 0)
      setValidation(validatedObj)
      if (validatedObj.sections) {
        toast.error(validatedObj.sections)
      } else if (validatedObj.sectionsQuestion) {
        toast.error(validatedObj.sectionsQuestion)
      }
    } else {
      setIsDirty(false)
      setIsDisablePatternBtn(true)
      if (param.id) {
        updatePatternApi({ ...payload, test_id: param.id })
          .then(() => {
            setIsDisablePatternBtn(false)

            history.push(ROUTES_V2.PATTERNS)
            CustomToastMessage(
              'Your pattern has been updated successfully',
              'success'
            )
          })
          .catch((err) => {
            setIsDisablePatternBtn(false)
            CustomToastMessage(err.response.data.message, 'error')
            console.log(err)
          })
      } else {
        createPatternApi(payload)
          .then(() => {
            setIsDisablePatternBtn(false)

            history.push(ROUTES_V2.PATTERNS)
            CustomToastMessage(
              'Your pattern has been created successfully!',
              'success'
            )
          })
          .catch((err) => {
            setIsDisablePatternBtn(false)
            CustomToastMessage(err.response.data.message, 'error')
            console.log(err)
          })
      }
    }
  }

  useEffect(() => {
    setNewSubjectList(() => {
      let newSubject
      newSubject = subjectList.filter(
        (item) => !newSelectedSubjectIds.includes(item._id)
      )
      return newSubject
    })
  }, [subjectList, newSelectedSubjectIds])

  useEffect(() => {
    if (subjectList) {
      setNewSubjectList(subjectList)
    }
  }, [subjectList])

  let indexOfCurrSubject = useMemo(
    () =>
      subjectDetails.findIndex(
        (subject) => subject.subject_id === activeSectionTab
      ),
    [activeSectionTab, subjectDetails]
  )

  useEffect(() => {
    setSectionDetails((prevState) => {
      const cloneData = deepCloneData(prevState)
      for (let i = indexOfCurrSubject; i < subjectDetails.length - 1; i++) {
        cloneData[subjectDetails[i + 1]?.subject_id] = cloneData[
          subjectDetails[i + 1]?.subject_id
        ]?.map((section) => {
          return {
            ...section,
            questions_from: section.questions_from + numberOfQuestionChange,
            questions_to: section.questions_to + numberOfQuestionChange
          }
        })
      }
      return cloneData
    })
    return () => setNumberOfQuestionChange(0)
  }, [numberOfQuestionChange, subjectDetails, indexOfCurrSubject])

  const handleScrollWithGetCourse = (total: number, length: number) => {
    if (total > length) {
      setCoursePage(coursePage + 1)
    }
  }

  const [screenSize, setScreenSize] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth) {
        setScreenSize(window.innerWidth)
      }
    }
    window.addEventListener('resize', handleResize)

    // Run once to handle initial load
    handleResize()

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <PageContainer>
      <FormContainerV2 ref={Ref}>
        <Grid columns={12} gap="20px">
          <GridItem
            columnSpan={screenSize > 768 ? 4 : screenSize < 600 ? 12 : 6}
          >
            <Flex gap="20px" direction="column">
              <InputV2
                label="Pattern Name"
                value={patternName}
                required
                placeholder="JEE Pattern"
                onChange={(e) => {
                  setPatternName(e.currentTarget.value)
                  setIsDirty(true)
                }}
                error={validation.patternName}
                onBlur={(e) => setValidator('patternName', e.target.value)}
              />
              <Dropdown
                label="Select Grade"
                selectedValue={selectedCourse}
                onSelect={courseSelectHandler}
                placeholder="Grade Name"
                total={courseTotal}
                length={courseList.length}
                handleScrollInfinite={(total, length) =>
                  handleScrollWithGetCourse(total, length)
                }
                required
                options={getDropDownOptions(courseList, '_id', 'name')}
                error={validation.courseDetails}
                fullWidth
                isLoading={isCourseLoading}
              />

              <MultiselectDropdown
                selectedValue={selectedSubjects}
                label="Select Subject"
                error={validation.subjectDetails}
                onSelect={(data) => {
                  setSelectedSubjects(data)
                  setIsDirty(true)
                  setValidator('subjectDetails', data)
                  if (!activeSectionTab) {
                    setActiveSectionTab(data[0].id ?? '')
                  }
                  if (data.length) {
                    setSubjectDetails(
                      data.map((item) => ({
                        subject_id: item.id ?? '',
                        subject_name: item.label,
                        total_questions_for_subject:
                          subjectDetails.find(
                            (subject) => subject.subject_id === item.id
                          )?.total_questions_for_subject ?? 0
                      }))
                    )
                    setSelectedSubjectIds(data.map((item) => item.id))
                    setActiveSectionTab((prevState) =>
                      data.some((item) => item.id === prevState)
                        ? prevState
                        : data[0].id ?? ''
                    )
                  } else {
                    setSubjectDetails([])
                    setActiveSectionTab('')
                  }
                }}
                placeholder="Subject Name"
                required
                options={getDropDownOptions(newSubjectList, '_id', 'name')}
                fullWidth
                isLoading={isSubjectLoading}
              />
            </Flex>
          </GridItem>
          <Divider></Divider>
          <GridItem
            columnSpan={screenSize > 768 ? 7 : screenSize < 600 ? 12 : 6}
          >
            <NumberInputsContainer>
              <TextArea
                required
                rows={5}
                value={testInstructions}
                label="Instructions"
                placeholder="Enter instructions for this Pattern"
                onChange={(e) => {
                  setTestInstructions(e.currentTarget.value)
                  setIsDirty(true)
                }}
                error={validation.testInstructions}
                onBlur={(e) => setValidator('testInstructions', e.target.value)}
              />
              <InputNumber
                required
                label="Total Number of Questions"
                value={totalQuestions}
                readOnly
                showButtons={false}
              />
              <InputNumber
                required
                value={totalMarks}
                label="Total Marks"
                readOnly
                showButtons={false}
              />
              <InputDuration
                required
                withHandler
                value={totalDuration}
                label="Total Duration(In Minutes)"
                onChange={(val) => {
                  setTotalDuration(val)
                  setIsDirty(true)
                }}
                error={validation.totalDuration}
                onBlur={(e) => setValidator('totalDuration', +e.target.value)}
              />
            </NumberInputsContainer>
          </GridItem>
        </Grid>
        <SubjectDetailsContainer>
          {subjectDetails.map((subject, index) => (
            <SectionTab
              key={subject.subject_name + index}
              label={subject.subject_name}
              isActive={activeSectionTab === subject.subject_id}
              {...{
                activeSectionTab,
                sectionDetails,
                subject,
                setSectionDetails: (d) => {
                  setSectionDetails(d)
                  setIsDirty(true)
                },
                selectedSubject: selectedSubjects,
                setActiveSectionTab,
                setSelectedSubject: setSelectedSubjects,
                setSubjectDetails: (d) => {
                  setSubjectDetails(d)
                  setIsDirty(true)
                },
                index,
                setSelectedSubjectIds,
                indexOfCurrSubject,
                subjectDetails
              }}
            />
          ))}
          <Flex direction="column" gap="12px" alignItems="flex-start">
            {!!selectedSubjects.length &&
              (sectionDetails[activeSectionTab]?.length ? (
                sectionDetails[activeSectionTab]?.map((sectionData, index) => {
                  return (
                    <SectionForm
                      key={sectionData.section_name + index}
                      {...{
                        index,
                        sectionData,
                        activeSectionTab,
                        setSectionDetails: (d) => {
                          setSectionDetails(d)
                          setIsDirty(true)
                        },
                        showError: showErrorInSections,
                        setSubjectDetails: (d) => {
                          setSubjectDetails(d)
                          setIsDirty(true)
                        },
                        selectedCourse,
                        indexOfCurrSubject,
                        sectionDetails,
                        setNumberOfQuestionChange,
                        subjectDetails
                      }}
                    />
                  )
                })
              ) : (
                <>
                  <EmptySection
                    label={
                      selectedSubjects.find(
                        (item) => item.id === activeSectionTab
                      )!.label
                    }
                  />
                </>
              ))}
          </Flex>
        </SubjectDetailsContainer>
        <Flex style={{ marginTop: '10px' }}>
          <ButtonV2
            width="130px"
            style={
              screenSize > 600 ? { marginLeft: 'auto' } : { margin: 'auto' }
            }
            onClick={SubmitHandler}
            disabled={isDisablePatternBtn}
          >
            {param.id ? `Update Pattern` : `Create Pattern`}
          </ButtonV2>
        </Flex>
      </FormContainerV2>

      <Prompt
        when={isDirty}
        message="If you leave this page, any unsaved data will be lost. Are you sure you want to leave?"
      />
    </PageContainer>
  )
}

export default CreateTestPattern

export const Divider = styled.div`
  border-right: 2px solid rgba(25, 123, 189, 0.14);

  @media (max-width: 768px) {
    display: none;
  }
`
export const Divider2 = styled.div`
  border-right: 2px solid rgba(25, 123, 189, 0.14);

  @media (max-width: 768px) {
    display: none;
  }
`

const NumberInputsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-left: 60px;
  margin-right: 20px;

  @media (max-width: 1580px) {
    margin-left: 30px;
    margin-right: 0px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    margin-left: 10px;
    justify-content: center;
  }

  @media (max-width: 600px) {
    margin-left: 0px;
  }
`

const SubjectDetailsContainer = styled.div`
  padding-top: 20px;
`
