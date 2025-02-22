import { useEffect, useState } from 'react'
import {
  Grid,
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
import { updateQuestionsCreatedTestAPI } from '../../../../helpers/V2/apis'

import QuestionPreview from './Components/QuestionPreview'
import {
  CreateInstituteTestPayload,
  Question,
  SectionProps,
  TestPreviewData
} from '../../../../utils/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import ActionBar from './Components/ActionBar'
import { formattedTime } from '../../../../helpers/V2/formattedTime'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { deepClone } from '../addQuestions/helper'

const TeacherTestPreview = () => {
  const [currentSubject, setCurrentSubject] = useState(0)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const [list, setList] = useState<any>()

  const [isTestSubmit, setIsTestSubmit] = useState(false)

  useEffect(() => {
    if (
      selector &&
      selector.subjectDetails &&
      selector.subjectDetails.length > 0
    ) {
      let testStartTime = formattedTime(selector.startDate, selector.startTime)

      let testEndTime = formattedTime(selector.endDate, selector.endTime)

      const subjectDetails = deepClone(selector.subjectDetails)
        .filter(
          (test_detail: { teacher_details: { teacher_id: string } }) =>
            user._id === test_detail?.teacher_details?.teacher_id
        )
        .map((test_detail: any) => {
          if (test_detail?.sections) {
            test_detail.sections.forEach((section: any) => {
              if (!Array.isArray(section.question_type)) {
                section.question_type = [section.question_type]
              }
            })
          }
          return test_detail
        })

      const listData: CreateInstituteTestPayload = {
        institute_test_name: selector.testName,
        course_id: selector.courseId,
        course_name: selector.course_name,
        test_pattern: selector.testPattern,
        institute_id: selector.institute_id,
        test_start_time: testStartTime,
        test_end_time: testEndTime,
        test_duration_type: '',
        test_duration: selector.testDuration,
        total_test_questions: selector.totalQuestions,
        total_marks: selector.totalMarks,
        addPassword: selector.isPasswordProtect,
        password: selector.password,
        instruction_text: selector.instructionText,
        test_details: {
          subjects_details: subjectDetails
        }
      }
      setList(listData)
      setLoading(false)
    } else {
      history.push(ROUTES_V2.TESTS)
    }
  }, [selector, history, user?._id])

  const submitHandler = () => {
    const subjectsDetails = list?.test_details?.subjects_details
    if (subjectsDetails) {
      const newSectionsPayload = subjectsDetails.map((subject: any) => ({
        subject_id: subject.subject_id,
        are_all_questions_added_for_subject: true,
        sections: subject.sections?.map((section: any) => ({
          _id: section?._id,
          section_name: section.section_name,
          questions: section.questions_list?.map((list: any) => list?._id) ?? []
        }))
      }))

      const submitPayload: any = {
        test_id: selector.test_id,
        teacher_id: user._id,
        subjects: newSectionsPayload
      }

      setIsTestSubmit(true)
      updateQuestionsCreatedTestAPI(submitPayload)
        .then(() => {
          CustomToastMessage(`Successfully updated!`, 'success')
          history.push(ROUTES_V2.TESTS)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsTestSubmit(false))
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

  let indexQuestion = 0

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

  return (
    <>
      <PageContainer>
        <FormContainerV2>
          <Grid columns={12} style={{ alignItems: 'center' }}>
            <GridItem columnSpan={isSmall ? 12 : 5}>
              <FlexContainer>
                {list?.test_details?.subjects_details?.map(
                  (data: TestPreviewData, index: number) => (
                    <div key={index} style={{ display: 'flex' }}>
                      <FlexContainer onClick={() => setCurrentSubject(index)}>
                        {actionIconMap[data?.subject_name?.toLocaleLowerCase()]}
                        <Label
                          isActive={
                            data.subject_name ===
                            list?.test_details?.subjects_details[currentSubject]
                              ?.subject_name
                          }
                        >
                          {data.subject_name}
                        </Label>
                      </FlexContainer>

                      {index !==
                      list?.test_details?.subjects_details?.length - 1 ? (
                        <OrSymbole></OrSymbole>
                      ) : (
                        ''
                      )}
                    </div>
                  )
                )}
              </FlexContainer>
            </GridItem>

            <GridItem columnSpan={isSmall ? 12 : 7}>
              <ActionBar
                {...{
                  list,
                  submitHandler,
                  isTestSubmit,
                  isUpdateQuestions: true,
                  startTime: list?.test_start_time,
                  endTime: list?.test_end_time,
                  totalMarks: list?.total_marks,
                  totalTestQuestion: list?.total_test_questions
                }}
              />
            </GridItem>
          </Grid>

          <SearchContainer>
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

export default TeacherTestPreview
