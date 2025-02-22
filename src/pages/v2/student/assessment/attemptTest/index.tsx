import { P } from '../../../../../components/V2/Table/BasicTable'
import { Flex } from '../../../../../components/V2/styledComponents'
import { ReactComponent as ShopWatchIcon } from '../../../../../assets/svg/stopwatch-icon.svg'
import { Title } from '../dashboard/components/styledComponents'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { Reducer, useEffect, useMemo, useReducer, useState } from 'react'
import {
  AllQuestionList,
  AnsweredQuestion,
  AttemptedQuestion,
  CorrectInCorrectAnswerProps,
  Payload,
  SectionCorrectAnswerProps,
  SectionPayload
} from './types'
import {
  MainContainer,
  Section,
  Para,
  BlueButton,
  Button
} from './styledComponents'
import attemptedQuestionReducer from './reducer'
import Questions from './components/Questions'
import QuestionNumbers from './components/QuestionNumbers'
import { SubmitAttemptedTest } from '../../../../../helpers/V2/apis'
import { SubmitAttemptedTestPayload } from '../../../../../utils/types'
import TestModel from './components/TestModel'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../../const/V2/routes'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'
import { PrimaryBlue } from '../../../../../const/V2/stylingVariables'
import WarningSubmitPopUp from '../../../../../components/V2/PopUp/WarningSubmitPopUp'
import { useLocation } from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const AttemptTest = () => {
  const [allQuestions, setAllQuestions] = useState<Array<AllQuestionList>>([])
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [showAllQuestion, setShowAllQuestion] = useState<boolean>(false)
  const [testDurHours, setTestDurHours] = useState<number>(0)
  const [testDurMinutes, setTestDurMinutes] = useState<number>(0)
  const [testDurSeconds, setTestDurSeconds] = useState<number>(0)
  const [timeTaken, setTimeTaken] = useState<number>(0)
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [testStartTime, setTestStartTime] = useState<any>()

  const [newAttemptedSectionsTestData, setNewAttemptedSectionsTestData] =
    useState<any>([])
  const [isSubmitAPILoading, setIsSubmitAPILoading] = useState(false)
  const history = useHistory()

  const query = useQuery()
  const startTime = query.get('startTime')

  useEffect(() => {
    setTestStartTime(startTime)
  }, [startTime])

  const assignedTestData = useSelector(
    (state: RootState) => state.assignedTest.data[0]
  )
  const [attemptedTestData, dispatch] = useReducer<
    Reducer<any[], { type: string; payload: Payload }>
  >(
    attemptedQuestionReducer,
    assignedTestData.test_details.map((subject) => ({
      sections: subject.sections.map((section) => ({
        questionsList: section.questions_list.map((question) => ({
          questionId: question._id,
          timeTakenForQuestion: 0,
          answer: null!,
          status: null!,
          isCorrect: false
        })),
        _id: section._id,
        questionType: section.question_type,
        sectionName: section.section_name,
        attemptedQuestions: 0
      })),
      selectedSubject: subject.subject_id,
      subjectName: subject.subject_name
    }))
  )
  const onSubmitClick = () => {
    setIsWarning(true)
  }

  const getCurrentDateTime = () => {
    return new Date().toISOString()
  }

  const testEndTime = getCurrentDateTime()

  const handleSubmitTest = () => {
    let subjectSkipAnswer: Record<string, number> = {}
    attemptedTestData.forEach((subject) => {
      let skipAnswer = 0
      subject.sections.forEach((section: SectionPayload) => {
        section.questionsList.forEach((question) => {
          question.status === 'skip' && (skipAnswer += 1)
        })
      })
      subjectSkipAnswer[subject.selectedSubject] = skipAnswer
    })

    let correctInCorrectAnswer: Record<string, CorrectInCorrectAnswerProps[]> =
      {}

    attemptedTestData.forEach((subject) => {
      let sectionCorrectAnswer: SectionCorrectAnswerProps[] = []
      subject.sections.forEach((section: SectionPayload) => {
        let correctAnswers = 0
        let inCorrectAnswers = 0
        let sectionDetails = assignedTestData.test_details
          .find((sub) => sub.subject_id === subject.selectedSubject)
          ?.sections.find((sec) => sec.section_name === section.sectionName)
        section.questionsList.forEach((question) => {
          question.answer !== null &&
            (question.isCorrect === true
              ? (correctAnswers += 1)
              : (inCorrectAnswers += 1))
        })
        sectionCorrectAnswer.push({
          countOfCorrectAns: correctAnswers,
          countOfInCorrectAns: inCorrectAnswers,
          markPerQuestion: sectionDetails?.marks_per_question ?? 0,
          negativeMark: sectionDetails?.negative_mark ?? 0
        })
      })

      correctInCorrectAnswer[subject.selectedSubject] = sectionCorrectAnswer
    })

    // const markDetails = Object.values(correctInCorrectAnswer).flat()
    // const totalScoredMarks =
    //   markDetails.reduce(
    //     (sum, item) => sum + item.countOfCorrectAns * item.markPerQuestion,
    //     0
    //   ) -
    //   markDetails.reduce(
    //     (sum, item) => sum + item.countOfInCorrectAns * item.negativeMark,
    //     0
    //   )

    const payload: SubmitAttemptedTestPayload = {
      testId: assignedTestData._id,
      // testName: assignedTestData.institute_test_name,
      // testPatternName: assignedTestData.test_pattern_details.name,

      testStartTime: testStartTime,
      testEndTime: testEndTime,
      // testStartTime: assignedTestData.test_start_time,
      // testEndTime: assignedTestData.test_end_time,
      // totalScoredMarks,
      // courseDetails: {
      //   courseId: assignedTestData.course_id,
      //   courseName: assignedTestData.course_name
      // },
      // batchName: assignedTestData.batch_details[0]?.batch_name,
      // testCreatedBy: assignedTestData.created_by._id,
      // testType: assignedTestData.test_type,
      // totalDuration: assignedTestData.test_duration,
      // totalTestMarks: assignedTestData.total_marks,
      testDetails: {
        subjectDetails: assignedTestData.test_details.map((subject) => {
          return {
            subjectId: subject.subject_id,
            // subjectName: subject.subject_name,
            // // teacherId: subject.teacher_details.teacher_id ?? null,
            // scoredMarks,
            // correctAnswers:
            //   sectionMarkDetails?.reduce?.(
            //     (a, b) => a + b.countOfCorrectAns,
            //     0
            //   ) ?? 0,
            // incorrectAnswers:
            //   sectionMarkDetails?.reduce?.(
            //     (a, b) => a + b.countOfInCorrectAns,
            //     0
            //   ) ?? 0,
            // skippedAnswers: subjectSkipAnswer[subject.subject_id],
            sections:
              attemptedTestData
                .find((sub) => sub.selectedSubject === subject.subject_id)
                ?.sections?.map?.((section: SectionPayload) => ({
                  // sectionName: section.sectionName,
                  _id: section._id,
                  // questionType: section.questionType,
                  questionsList: section.questionsList.map(
                    (question: AnsweredQuestion) => ({
                      answer: question.answer,
                      // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[question.answer] || '',
                      questionId: question.questionId,
                      skipped:
                        question.answer == null || undefined ? true : false,
                      timeTakenForQuestion: question.timeTakenForQuestion
                    })
                  )
                })) || []
          }
        })
      }
    }

    setIsSubmitAPILoading(true)
    SubmitAttemptedTest(payload)
      .then((res) => {
        setIsModelOpen(true)
        setIsWarning(false)
        CustomToastMessage('Test submitted successfully', 'success')
        history.push({
          pathname: `${ROUTES_V2.STUDENT_TEST_RESULT}/${res?.data?.testId}`,
          search: `?isPracticeTest=${false}`
        })
        setTestDurHours(-1)
        setTestDurMinutes(-1)
        setTestDurSeconds(-1)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsSubmitAPILoading(false))
  }

  const subjectAndSection: SectionPayload = useMemo(() => {
    return (
      attemptedTestData
        .find(
          (item: AttemptedQuestion) => item.selectedSubject === selectedSubject
        )
        ?.sections.find(
          (section: SectionPayload) => section.sectionName === selectedSection
        ) || []
    )
  }, [attemptedTestData, selectedSection, selectedSubject])

  const currentQuestion = useMemo(() => {
    return allQuestions
      .find((subject) => subject.subjectId === selectedSubject)
      ?.allQuestion.find((subject) => subject.sectionName === selectedSection)
      ?.sectionQuestion.find(
        (question) => question.questionId === currentQuestionId
      )
  }, [selectedSubject, selectedSection, allQuestions, currentQuestionId])

  useEffect(() => {
    const totalMinutes = assignedTestData.test_duration
    setTestDurHours(Math.floor(totalMinutes / 60))
    setTestDurMinutes(Math.floor(totalMinutes % 60))
    setTestDurSeconds(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTimeTaken(0)
  }, [currentQuestionId, selectedSection, selectedSubject])

  useEffect(() => {
    let myInterval = setInterval(() => {
      setTimeTaken((prevState) => prevState + 1)
      setTestDurSeconds((prevState) => {
        if (prevState > 0) {
          return prevState - 1
        } else {
          setTestDurMinutes((prevStateMin) => {
            if (prevStateMin > 0) {
              return prevStateMin - 1
            } else {
              setTestDurHours((prevStateHours) => {
                if (prevStateHours > 0) {
                  return testDurHours - 1
                } else {
                  clearInterval(myInterval)
                  setTestDurSeconds(0)
                  if (
                    testDurHours === 0 &&
                    testDurMinutes === 0 &&
                    testDurSeconds === 0
                  ) {
                    handleSubmitTest()
                  }
                  return 0
                }
              })
              return testDurHours === 0 ? 0 : 59
            }
          })
          return 59
        }
      })
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testDurHours])

  useEffect(() => {
    setSelectedSubject(assignedTestData.test_details[0]?.subject_id)
    setSelectedSection(
      assignedTestData.test_details[0]?.sections[0].section_name
    )
  }, [assignedTestData])

  useEffect(() => {
    let AllQuestion: AllQuestionList[] = []
    let questionNumber = 0
    assignedTestData.test_details.forEach((subject) => {
      AllQuestion.push({
        subjectId: subject.subject_id,
        allQuestion: subject.sections.map((section) => ({
          sectionName: section.section_name,
          sectionQuestion: section.questions_list.map((question) => {
            ++questionNumber
            return {
              questionNumber: questionNumber,
              questionId: question._id,
              question: question.question.text,
              options: question.options,
              solutionImages: section?.solutionImages?.filter((item) =>
                question?.assets?.includes(item._id)
              )
            }
          })
        }))
      })
    })
    setAllQuestions(AllQuestion)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedTestData])

  useEffect(() => {
    setCurrentQuestionId(
      allQuestions
        .find((subject) => subject.subjectId === selectedSubject)
        ?.allQuestion.find((subject) => subject.sectionName === selectedSection)
        ?.sectionQuestion[0].questionId ?? ''
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubject, selectedSection])

  // const currentQuestionAnswer = useMemo(() => {
  //   return subjectAndSection?.questionsList?.find(
  //     (question) => question?.questionId === currentQuestionId ?? -1
  //   )
  // }, [subjectAndSection, currentQuestionId])
  const currentQuestionAnswer = useMemo(() => {
    return subjectAndSection?.questionsList?.find(
      (question) => question?.questionId === (currentQuestionId || '')
    )
  }, [subjectAndSection, currentQuestionId])
  const handleNextQuestion = (value: string) => {
    const sectionQuestion = allQuestions
      .find((subject) => subject.subjectId === selectedSubject)
      ?.allQuestion.find(
        (subject) => subject.sectionName === selectedSection
      )?.sectionQuestion
    if (
      (sectionQuestion?.findIndex(
        (question) => question.questionId === value
      ) ?? 0) <
      (sectionQuestion?.length ?? 0) - 1
    ) {
      setCurrentQuestionId(
        sectionQuestion?.[
          sectionQuestion.findIndex(
            (question) => question.questionId === currentQuestion?.questionId
          ) + 1
        ].questionId ?? ''
      )
    } else {
      assignedTestData.test_details.find((subject, index1) => {
        subject.subject_id === selectedSubject &&
          subject.sections.find((section, index2) => {
            section.section_name === selectedSection &&
              (index2 === subject.sections.length - 1
                ? index1 < assignedTestData.test_details.length - 1 &&
                  (setSelectedSubject(
                    assignedTestData.test_details[index1 + 1].subject_id
                  ),
                  setSelectedSection(
                    assignedTestData.test_details[index1 + 1].sections[0]
                      .section_name
                  ))
                : setSelectedSection(subject.sections[index2 + 1].section_name))
          })
      })
    }
  }

  const handlePrevQuestion = (value: string) => {
    const sectionQuestion = allQuestions
      .find((subject) => subject.subjectId === selectedSubject)
      ?.allQuestion.find(
        (subject) => subject.sectionName === selectedSection
      )?.sectionQuestion
    if (
      0 <
      (sectionQuestion?.findIndex(
        (question) => question.questionId === value
      ) ?? 0)
    ) {
      setCurrentQuestionId(
        sectionQuestion?.[
          sectionQuestion.findIndex(
            (question) => question.questionId === currentQuestion?.questionId
          ) - 1
        ].questionId ?? ''
      )
    } else {
      assignedTestData.test_details.find((subject, index1) => {
        subject.subject_id === selectedSubject &&
          subject.sections.find((section, index2) => {
            section.section_name === selectedSection &&
              (index2 === 0
                ? index1 > 0 &&
                  (setSelectedSubject(
                    assignedTestData.test_details[index1 - 1].subject_id
                  ),
                  setSelectedSection(
                    assignedTestData.test_details[index1 - 1].sections[
                      assignedTestData.test_details[index1 - 1].sections
                        .length - 1
                    ].section_name
                  ))
                : setSelectedSection(subject.sections[index2 - 1].section_name))
          })
      })
    }
  }

  const commonPayloadValues = () => ({
    subjectName:
      assignedTestData.test_details.find(
        (subject) => subject.subject_id === selectedSubject
      )?.subject_name || '',
    activeSection: selectedSection,
    questionType:
      assignedTestData.test_details
        .find((subject) => subject.subject_id === selectedSubject)
        ?.sections.find((section) => section.section_name === selectedSection)
        ?.question_type || [],
    activeSubject: selectedSubject,
    questionId: currentQuestionId ?? '',
    timeTakenForQuestion:
      (currentQuestionAnswer?.timeTakenForQuestion ?? 0) + timeTaken,
    isCorrect: currentQuestionAnswer?.isCorrect
  })

  const handleModel = () => {
    setIsModelOpen(false)
  }

  useEffect(() => {
    if (attemptedTestData) {
      const newAttemptedTestData = attemptedTestData.map((subject) => {
        return {
          ...subject,
          sections: subject.sections.map((section: any) => {
            // Calculate the number of attempted questions in this section
            const attemptedCount = section.questionsList.reduce(
              (acc: any, question: any) => {
                return question.answer !== undefined && question.answer !== null
                  ? acc + 1
                  : acc
              },
              0
            )

            // Return the updated section with the attempted questions count
            return {
              ...section,
              attemptedQuestions: attemptedCount // Assign the computed count to this section
            }
          })
        }
      })
      setNewAttemptedSectionsTestData(newAttemptedTestData)
    }
  }, [attemptedTestData])

  useEffect(() => {
    if (assignedTestData && assignedTestData?.test_details?.length > 0) {
      const lastSubject =
        assignedTestData?.test_details[
          assignedTestData?.test_details?.length - 1
        ]
      // Find the last section in the last subject
      const lastSection =
        lastSubject?.sections[lastSubject?.sections?.length - 1]
      // Find the last question in the last section
      const lastQuestion =
        lastSection?.questions_list[lastSection.questions_list.length - 1]
      // Determine if the current question is the last question
      const lastQuestionIs = currentQuestionId === lastQuestion._id
      setIsLastQuestion(lastQuestionIs)
    }
  }, [assignedTestData, currentQuestionId])

  return (
    <MainContainer>
      <Flex justifyContent="space-between">
        <Flex gap="60px">
          <P style={{ fontSize: '25px', fontFamily: 'DM Sans' }}>
            {assignedTestData?.institute_test_name}
          </P>
          <Flex gap="16px" direction="column" alignItems="flex-start">
            <Flex gap="8px">
              {assignedTestData?.test_details.map((subjects) => (
                <Section
                  key={subjects?.subject_id}
                  active={subjects?.subject_id === selectedSubject}
                  onClick={() => {
                    setSelectedSubject(subjects?.subject_id)
                    setSelectedSection(subjects?.sections[0]?.section_name)
                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        ...commonPayloadValues(),
                        questionType: subjects.sections[0]?.question_type,
                        answer: currentQuestionAnswer?.answer,
                        status: null!
                      }
                    })
                  }}
                >
                  <Para>{subjects?.subject_name}</Para>
                </Section>
              ))}
            </Flex>
            <Flex gap="8px">
              {assignedTestData?.test_details
                ?.filter(
                  (subjects) => subjects?.subject_id === selectedSubject
                )?.[0]
                ?.sections?.map((section1) => (
                  <Section
                    key={section1?.section_name}
                    active={section1?.section_name === selectedSection}
                    onClick={() => {
                      setSelectedSection(section1?.section_name)
                      dispatch({
                        type: 'selectAnswer',
                        payload: {
                          ...commonPayloadValues(),
                          questionType: section1?.question_type,
                          answer: currentQuestionAnswer?.answer,
                          status: null!
                        }
                      })
                    }}
                  >
                    <Para>{section1?.section_name}</Para>
                    <Para>
                      {section1?.optional_question > 0
                        ? (() => {
                            const matchingSection = [
                              ...newAttemptedSectionsTestData
                            ]
                              .flatMap((subject: any) =>
                                subject?.selectedSubject === selectedSubject
                                  ? subject.sections
                                  : []
                              )
                              .find(
                                (section2: any) =>
                                  section2.sectionName ===
                                  section1?.section_name
                              )

                            if (matchingSection) {
                              const attemptedCount =
                                matchingSection.attemptedQuestions ?? 0
                              return `${attemptedCount}/${section1.optional_question} Attempted`
                            } else {
                              return 'Section not found'
                            }
                          })()
                        : 'No Optional'}
                    </Para>
                  </Section>
                ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          gap="2px"
          style={{ paddingRight: '48px', width: '116px' }}
        >
          <ShopWatchIcon />
          <Title fontSize="14px" fontWeight={700}>
            {`${testDurHours < 10 ? `0${testDurHours}` : testDurHours}:${
              testDurMinutes < 10 ? `0${testDurMinutes}` : testDurMinutes
            }:${testDurSeconds < 10 ? `0${testDurSeconds}` : testDurSeconds}`}
          </Title>
        </Flex>
      </Flex>
      <div style={{ position: 'relative', minHeight: '62vh' }}>
        <QuestionNumbers
          {...{
            allQuestions,
            currentQuestionId,
            currentQuestionAnswer,
            dispatch,
            setCurrentQuestionId,
            setShowAllQuestion,
            setTimeTaken,
            showAllQuestion,
            subjectAndSection,
            timeTaken,
            selectedSection,
            selectedSubject,
            assignedTestData
          }}
        />
        <Questions
          {...{
            allQuestions,
            currentQuestionId,
            currentQuestionAnswer,
            dispatch,
            selectedSection,
            selectedSubject,
            setAllQuestions,
            timeTaken,
            assignedTestData,
            handleNextQuestion,
            newAttemptedSectionsTestData
          }}
        />
      </div>
      <Flex justifyContent="space-between">
        <Button onClick={() => handlePrevQuestion(currentQuestionId)}>
          Previous
        </Button>
        {isWarning && (
          <WarningSubmitPopUp
            setIsWarning={setIsWarning}
            isLoading={isSubmitAPILoading}
            onClick={() => (!isSubmitAPILoading ? handleSubmitTest() : '')}
            text="Are you sure you want to submit this test?"
          />
        )}
        <Flex gap="18px">
          {!isLastQuestion && (
            <BlueButton
              onClick={() => {
                handleNextQuestion(currentQuestionId)
                dispatch({
                  type: 'selectAnswer',
                  payload: {
                    ...commonPayloadValues(),
                    answer: currentQuestionAnswer?.answer,
                    status:
                      currentQuestionAnswer?.answer !== undefined &&
                      currentQuestionAnswer?.answer !== null
                        ? 'answered'
                        : 'skip'
                  }
                })
              }}
            >
              Next Question
            </BlueButton>
          )}
          <Button
            aria-disabled={isSubmitAPILoading}
            onClick={() => (!isSubmitAPILoading ? onSubmitClick() : '')}
          >
            {isSubmitAPILoading ? (
              <Spinner
                style={{
                  height: '20px',
                  width: '20px',
                  color: `${PrimaryBlue}`
                }}
                animation={'border'}
              />
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </Flex>
      </Flex>
      {isModelOpen && <TestModel {...{ handleModel }} />}
    </MainContainer>
  )
}

export default AttemptTest
