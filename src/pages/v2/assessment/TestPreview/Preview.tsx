import { useEffect, useState } from 'react'
import {
  ButtonV2,
  Flex,
  GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
import {
  FlexContainer,
  FlexContainerV2,
  FormContainerV2,
  FormContainerV2InnerSelect,
  HeadingSubTitle,
  HeadingTitle,
  InnerSearchContainer,
  InputWrapper,
  Label,
  OrSymbole,
  SearchContainer,
  SearchIconDiv,
  SectionName
} from './subcomponents'
import { ReactComponent as ChemistrySvg } from '../../../../assets/svg/chemistry.svg'
import { ReactComponent as PhysicsSvg } from '../../../../assets/svg/physics.svg'
import { ReactComponent as NewPhysicsIconSvg } from '../../../../assets/svg/new-physics-icon.svg'
import { ReactComponent as SearchIcon } from '../../../../assets/svg/search-icon.svg'
import { useParams } from 'react-router'
import {
  NewCreateInstituteTest,
  getCreateTestDataApi,
  updateInstituteTestAPI
} from '../../../../helpers/V2/apis'

import QuestionPreview from './Components/QuestionPreview'
import {
  CreateInstituteTestPayload,
  NewSubjectDetails,
  Question,
  SectionProps,
  TestPreviewData
} from '../../../../utils/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import PopUp from '../../../../components/V2/PopUp/AssignTestPopup'
import ActionBar from './Components/ActionBar'
import { formattedTime } from '../../../../helpers/V2/formattedTime'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { deepClone } from '../addQuestions/helper'

const Preview = () => {
  let { testId }: any = useParams()
  const [currentSubject, setCurrentSubject] = useState(0)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const [list, setList] = useState<any>()

  const [show, setPopup] = useState(false)

  const [isOnlySubmit, setIsOnlySubmit] = useState(false)
  const [isTestSubmit, setIsTestSubmit] = useState(false)

  useEffect(() => {
    if (testId) {
      setLoading(true)
      getCreateTestDataApi({
        test_id: testId
      })
        .then((res) => {
          if (res) {
            setList(res?.data[0])
            setLoading(false)
          }
        })
        .catch((error) => console.log(error.message))
    } else if (
      selector &&
      selector.subjectDetails &&
      selector.subjectDetails.length > 0
    ) {
      let testStartTime = formattedTime(selector.startDate, selector.startTime)

      let testEndTime = formattedTime(selector.endDate, selector.endTime)

      // console.log('selector.subjectDetails', selector.subjectDetails)

      const test_details: any = deepClone(selector.subjectDetails)
      for (let index = 0; index < test_details.length; index++) {
        const test_detail: any = test_details[index]

        if (test_detail?.sections) {
          for (let j = 0; j < test_detail.sections.length; j++) {
            if (!Array.isArray(test_detail.sections[j].question_type)) {
              test_detail.sections[j].question_type = [
                test_detail.sections[j].question_type
              ]
            }
          }
        }

        test_details[index] = test_detail
      }

      const listData: CreateInstituteTestPayload = {
        institute_test_name: selector.testName,
        course_id: selector.courseId,
        test_pattern: selector.testPattern,
        institute_id: selector.institute_id,
        test_start_time: testStartTime,
        test_end_time: testEndTime,
        test_duration_type: '',
        test_duration: selector.testDuration,
        total_test_questions: selector.totalQuestions,
        total_marks: selector.totalMarks,
        addPassword: selector.isPasswordProtect,
        isOffline: selector.isOffline,
        hasOfflineQuestions: selector.hasOfflineQuestions,
        password: selector.password,
        instruction_text: selector.instructionText,
        test_details: {
          subjects_details: test_details
        }
      }

      setList(listData)
      setLoading(false)
    } else {
      history.push(ROUTES_V2.TESTS)
    }
  }, [selector, testId, history])

  useEffect(() => {
    if (
      list?.test_details.subjects_details &&
      list?.test_details.subjects_details.length
    ) {
      const newSubjectDetails = list?.test_details.subjects_details
      newSubjectDetails.forEach((subject: NewSubjectDetails, index: number) => {
        if (subject.is_teacher_assigned && subject.teacher_details) {
          setIsOnlySubmit(true)
        } else {
          setCurrentSubject(index)
        }
      })
    }
  }, [list])

  const submitHandler = () => {
    if (isOnlySubmit || user.role !== '' || selector.isEdit) {
      let testStartTime = formattedTime(selector.startDate, selector.startTime)
      let testPatternDetails: any = {
        id: selector.testPatternId,
        name: selector.testPattern
      }
      let testEndTime = formattedTime(selector.endDate, selector.endTime)

      let testType = 'SUPERADMIN_TEST'

      if (user.role === 'teacher') {
        testType = 'TEACHER_TEST'
      }

      if (user.role === 'student') {
        testType = 'PRACTICE_TEST'
      }

      const test_details: any = deepClone(selector.subjectDetails)
      for (let index = 0; index < test_details.length; index++) {
        const test_detail: any = test_details[index]

        if (test_detail?.sections) {
          for (let j = 0; j < test_detail.sections.length; j++) {
            if (!Array.isArray(test_detail.sections[j].question_type)) {
              test_detail.sections[j].question_type = [
                test_detail.sections[j].question_type
              ]
            }
          }
        }
        test_details[index] = test_detail
      }
      let payload: CreateInstituteTestPayload | any = {
        institute_test_name: selector.testName,
        test_pattern_details: testPatternDetails,
        course_id: selector.courseId,
        course_name: selector.course_name,
        test_duration_type: 'FIXED',
        test_duration: selector.testDuration,
        total_test_questions: selector.totalQuestions,
        total_marks: selector.totalMarks,
        add_password: selector.isPasswordProtect ? true : false,
        password: selector.password,
        instruction_text: selector.instructionText,
        isOffline: selector.isOffline,
        hasOfflineQuestions: selector.hasOfflineQuestions,
        created_by: user._id,
        test_details: {
          subjects_details: test_details
        },
        test_type: testType,
        type: selector.type,
        ...(!selector.isEdit ? { withoutPattern: false } : {})
      }

      if (selector.isTimeChange) {
        payload = {
          ...payload,
          test_start_time: testStartTime,
          test_end_time: testEndTime
        }
      }
      setIsTestSubmit(true)
      if (selector.isEdit) {
        payload['test_id'] = selector.test_id
        delete payload.course_name
        delete payload.created_by
        updateInstituteTestAPI(payload)
          .then((res) => {
            if (res.status === 200 || res.status === 'success') {
              CustomToastMessage(`Successfully updated!`, 'success')
              if (user.role === 'teacher') {
                history.push(ROUTES_V2.CUSTOM_TESTS)
              } else {
                history.push(ROUTES_V2.TESTS)
              }
            } else {
              CustomToastMessage(res?.message, 'error')
            }
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => setIsTestSubmit(false))
      } else {
        NewCreateInstituteTest(payload)
          .then((res) => {
            if (res.status === 200 || res.status === 'success') {
              CustomToastMessage(`Successfully Created!`, 'success')
              if (user.role === 'teacher') {
                history.push(ROUTES_V2.CUSTOM_TESTS)
              } else {
                history.push(ROUTES_V2.TESTS)
              }
            } else {
              CustomToastMessage(`${res.data}`, 'error')
            }
          })
          .catch((error) => CustomToastMessage(`${error}`, 'error'))
          .finally(() => setIsTestSubmit(false))
      }
    } else {
      setPopup(true)
    }
  }

  const actionIconMap: { [key: string]: JSX.Element } = {
    physics: <NewPhysicsIconSvg />,
    chemistry: <ChemistrySvg />,
    maths: <PhysicsSvg />,
    mathematics: <PhysicsSvg />,
    science: <PhysicsSvg />,
    biology: <PhysicsSvg />
  }

  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsSmall(true)
      } else {
        setIsSmall(false)
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

  let indexQuestion = 0
  return (
    <>
      {show && (
        <PopUp
          {...{
            setPopup
          }}
        />
      )}

      <PageContainer>
        <FormContainerV2>
          <div>
            <ButtonV2 width="10%" onClick={() => history.goBack()}>
              Back
            </ButtonV2>
          </div>
          <Flex justifyContent="space-between" wrap={true}>
            <GridItem columnSpan={isSmall ? 12 : 5}>
              <FlexContainer>
                {list?.test_details.subjects_details.map(
                  (data: TestPreviewData, index: number) =>
                    !data?.teacher_details?.teacher_id ? (
                      <div key={index} style={{ display: 'flex' }}>
                        <FlexContainer onClick={() => setCurrentSubject(index)}>
                          {actionIconMap[data.subject_name.toLocaleLowerCase()]}
                          <Label
                            isActive={
                              data.subject_name ===
                              list?.test_details?.subjects_details[
                                currentSubject
                              ]?.subject_name
                            }
                          >
                            {data.subject_name}
                          </Label>
                        </FlexContainer>

                        {index !==
                        list?.test_details.subjects_details.length - 1 ? (
                          <OrSymbole></OrSymbole>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : null
                )}
              </FlexContainer>
            </GridItem>

            <GridItem columnSpan={isSmall ? 12 : 7}>
              <ActionBar
                {...{
                  list,
                  isEditTest: selector.isEdit,
                  submitHandler,
                  isTestSubmit,
                  isUpdateQuestions: isOnlySubmit || user.role === 'teacher',
                  startTime: list?.test_start_time,
                  endTime: list?.test_end_time,
                  totalMarks: list?.total_marks,
                  totalTestQuestion: list?.total_test_questions
                }}
              />
            </GridItem>
          </Flex>

          <SearchContainer className="display-none-mobile">
            <InnerSearchContainer>
              <SearchIconDiv>
                <SearchIcon />
              </SearchIconDiv>
              <InputWrapper
                type="search"
                placeholder="Search Chapter and Topics"
              />
            </InnerSearchContainer>
          </SearchContainer>

          {!loading &&
          list?.test_details?.subjects_details[currentSubject]?.sections ? (
            <FormContainerV2InnerSelect style={{ overflowY: 'scroll' }}>
              {/* <div key={index}> */}

              <FlexContainerV2>
                <HeadingTitle>
                  {
                    list?.test_details.subjects_details[currentSubject]
                      .subject_name
                  }
                </HeadingTitle>
                <HeadingSubTitle>Marks</HeadingSubTitle>
              </FlexContainerV2>
              {list?.test_details?.subjects_details[
                currentSubject
              ]?.sections?.flatMap((questionArr: SectionProps) => [
                questionArr.section_name && (
                  <SectionName key={`section-${questionArr.section_name}`}>
                    {questionArr.section_name}
                  </SectionName>
                ),
                questionArr?.questions_list?.flatMap(
                  (question: Question, questionIndex: number) => (
                    <QuestionPreview
                      // active={question.active}
                      key={questionIndex}
                      questionIndex={indexQuestion++}
                      data={question}
                      sectionData={questionArr}
                    />
                  )
                )
              ])}
            </FormContainerV2InnerSelect>
          ) : (
            <h5>Loading...</h5>
          )}
        </FormContainerV2>
      </PageContainer>
    </>
  )
}

export default Preview
