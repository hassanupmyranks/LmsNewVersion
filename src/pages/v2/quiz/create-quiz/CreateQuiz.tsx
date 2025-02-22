import { useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {
  Flex,
  FormHeading,
  PageContainer,
  SuccessButtonV2,
  WrapperCard
} from '../../../../components/V2/styledComponents'
import { topHeaderValues } from '../../../../const/V2/topHeaderConsts'
import ROUTES_V2 from '../../../../const/V2/routes'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { updateTopHeader } from '../../../../redux/topHeader/actions'
import SearchInput from './components/SearchInput'
import {
  AddQuestionsContainerHeading,
  CommonSection,
  HeadAddQuestions,
  HeadTitle,
  Line,
  NoQuestions,
  QuestionsContainer
} from './components/styledComponents'
import PublishQuiz from '../../../../components/V2/PopUp/PublishQuiz'
import {
  createQuizApi,
  getLMSQuestions,
  getTeacherQuizApi
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useLocation } from 'react-router-dom'
import QuestionsQuiz from './components/QuestionsQuiz'
import { getDropDownOptions } from '../../../../helpers/V2/dropdown'
import Dropdownsmall from '../../../../components/V2/Form/Dropdownsmall'
import { DropdownOptionData } from '../../../../components/V2/Form/types'
import { Checkbox } from '../../learn/publishMaterials/PublishTable'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'
import debounce from 'lodash/debounce' // You need to install lodash

const questionTypesObjective = [
  { code: 'tf', name: 'True/False' },
  { code: 'assertion', name: 'Assertion' },
  { code: 'matrix', name: 'Match the following' },
  { code: 'fill-blank', name: 'Fill in the Blank' },
  { code: 'mcq', name: 'Multiple Choice (Single Answer)' },
  { code: 'multiple_mcq_any', name: 'Multiple Choice Any (Multiple Answers)' },
  { code: 'number-range', name: 'Numeric Range' }
]

const questionTypesSubjective = [
  { code: 'vsa', name: 'Very Short Answer' },
  { code: 'sa', name: 'Short Answer' },
  { code: 'la', name: 'Long Answer' },
  { code: 'hots', name: 'Hots' },
  { code: 'passage', name: 'Passage' },
  { code: 'case', name: 'Case' },
  { code: 'descriptive', name: 'Descriptive' }
]

interface Question {
  questionId: string
  marks: number
  // questionType: string
}

interface NewData {
  questionType: string[]
  questions: Question[]
}

const CreateQuiz = () => {
  const dispatch = useDispatch()
  const containerRef: any = useRef()
  const debouncedScroll = useRef<any>(null)
  const [total, setTotal] = useState(0)
  const [length, setLength] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [isCreatedLoading, setIsCreatedLoading] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [addQuestionsOpen, setAddQuestionsOpen] = useState<string[]>([])
  const [isPublishPopup, setIsPublishPopup] = useState<any>(false)
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([])
  const [createdQuiz, setCreatedQuiz] = useState<any[]>([])
  const [isAllQuestions, setIsAllQuestions] = useState(false)
  const [filterQuestion, setFilterQuestion] =
    useState<DropdownOptionData<{ code: string; name: string }>>()
  const [questionsListPage, setQuestionsListPage] = useState(1)

  const location: any = useLocation()
  const subjectDetails: any = location.state && location.state.subjectDetails
  const courses: any = location.state && location.state.courses
  const page: any = location.state && location.state.page
  const mytype: any = location.state?.type ? location.state.type.Type.label : ''
  const batchDetail: any = location.state && location.state.batchDetail
  const quizId: any = location.state && location.state.quizId
  const viewDetail: any = location.state && location.state.viewDetail
  const viewType: any = location.state && location.state.quizType
  const AssignedMarks: any = location.state && location.state.totalMarks

  useEffect(() => {
    if (viewDetail && quizId && quizId != undefined) {
      const payload: any = {
        quizId: quizId
      }
      getTeacherQuizApi(payload)
        .then((res) => {
          if (res) {
            setQuestions(res?.data?.questions)
          }
        })
        .catch((err) => {
          CustomToastMessage(`Error: ${err}`, 'error')
        })
    }
  }, [viewDetail, quizId, batchDetail])

  const handleSelectQuestions = (
    questionId: string,
    Marks: number,
    type: string
  ) => {
    if (!Marks && mytype == 'Test') {
      CustomToastMessage('Add Marks', 'error')
    } else {
      const isChecked = selectedQuestions.findIndex(
        (item) => item.questionId === questionId
      )
      const newSelectedQuestions = [...selectedQuestions]

      if (isChecked !== -1) {
        newSelectedQuestions.splice(isChecked, 1)
      } else {
        newSelectedQuestions.push({
          questionId: questionId,
          marks: Marks ?? 0,
          type: type
        })
      }
      setSelectedQuestions(newSelectedQuestions)
    }
  }

  const handleSelectALL = () => {
    setIsAllQuestions(!isAllQuestions)
    if (!isAllQuestions) {
      let newQuestions: any = []
      questions.map((qs: any) => {
        newQuestions.push({
          questionId: qs._id,
          marks: qs.mark ?? 1,
          type: qs.type
        })
      })
      setSelectedQuestions(newQuestions)
    } else {
      setSelectedQuestions([])
    }
  }

  useEffect(() => {
    if (!viewDetail && !quizId && quizId === undefined) {
      setLoading(true)
      const payload = {
        courseId: courses?.coursesId,
        subjectId: subjectDetails?.subjectId,
        chapterId: subjectDetails?.chapterId,
        topicId: subjectDetails?.topicId,
        questionType:
          mytype === 'Subjective'
            ? '["vsa", "sa", "la", "hots", "descriptive", "passage", "case"]'
            : mytype === 'Objective'
            ? '["mcq", "multiple_mcq_any", "fill-blank", "tf", "assertion", "number-range", "matrix"]'
            : '',
        limit: 100
      }
      getLMSQuestions(payload)
        .then((res) => {
          if (res) {
            setTotal(res.total)
            setLength(res.data.length)
            setQuestions(res?.data)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setLoading(false))
    }
  }, [viewDetail, quizId, subjectDetails, courses, mytype])

  const handleOpenQuestions = (selectedId: string) => {
    const isChecked = addQuestionsOpen.indexOf(selectedId)
    const newOpenedQuestions = [...addQuestionsOpen]
    if (isChecked !== -1) {
      newOpenedQuestions.splice(isChecked, 1)
    } else {
      newOpenedQuestions.push(selectedId)
    }
    setAddQuestionsOpen(newOpenedQuestions)
  }

  let totalMarks = selectedQuestions.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.marks
  }, 0)

  const handlePublishAction = () => {
    const newSelectedQuestions = [...selectedQuestions]
    let newData: NewData = {
      questionType: [],
      questions: []
    }

    if (newSelectedQuestions) {
      newSelectedQuestions.forEach((item: any) => {
        const newquestions = {
          questionId: item.questionId,
          marks: item.marks,
          questionType: item.type
        }
        newData.questions.push(newquestions)

        if (!newData.questionType.includes(item.type)) {
          newData.questionType.push(item.type)
        }
      })
    }
    let payload: any = {
      questions: newData.questions,
      // questionType: newData.questionType,
      // totalMarks: totalMarks,
      // totalQuestions: newData.questions.length,
      // releaseDate: new Date(),
      subjectId: subjectDetails.subjectId,
      type: mytype.toLowerCase()
    }

    // if (mytype.toLowerCase() === 'test') {
    //   payload = {
    //     courseDetails: {
    //       id: courses.coursesId,
    //       name: courses.coursesName
    //     },
    //     instituteDetails: {
    //       id: user.instituteId,
    //       name: user.instituteName
    //     },
    //     branchDetails: {
    //       id: user.branchId,
    //       name: user.branchName
    //     },
    //     questions: newData.questions,
    //     questionType: newData.questionType,
    //     totalMarks: totalMarks,
    //     totalQuestions: newData.questions.length,
    //     releaseDate: new Date(),
    //     subjectDetails: subjectDetails,
    //     quizType: mytype.toLowerCase()
    //   }
    // }

    setIsCreatedLoading(true)
    createQuizApi(payload)
      .then((res) => {
        setCreatedQuiz(res?.data)
        setIsPublishPopup(true)
        CustomToastMessage(
          'Your quiz has been created successfully!',
          'success'
        )
      })
      .catch((err) => {
        CustomToastMessage(`Error: ${err?.response?.data?.message}`, 'error')
        setIsPublishPopup(false)
      })
      .finally(() => setIsCreatedLoading(false))
  }

  useEffect(() => {
    dispatch(
      updateTopHeader(
        topHeaderValues['teacher'][ROUTES_V2.TEACHERS_CREATE_QUIZ]
      )
    )
  }, [dispatch])

  const handleQuestionMarksChange = (val: any, qsID: string) => {
    setSelectedQuestions?.((prevState) => {
      if (Array.isArray(prevState)) {
        return prevState?.map((state) => {
          if (state.questionId === qsID) {
            return { ...state, marks: val }
          } else {
            return state
          }
        })
      } else {
        return prevState
      }
    })
  }

  console.log(questionsListPage, 'questionsListPage1')
  const handleScrollInfinite = (total: number, length: number) => {
    if (total > length) {
      console.log(questionsListPage, 'questionsListPage2')
      setLoading(true)
      const payload = {
        courseId: courses?.coursesId,
        subjectId: subjectDetails?.subjectId,
        chapterId: subjectDetails?.chapterId,
        topicId: subjectDetails?.topicId,
        questionType:
          mytype === 'Subjective'
            ? '["vsa", "sa", "la", "hots", "descriptive", "passage", "case"]'
            : mytype === 'Objective'
            ? '["mcq", "multiple_mcq_any", "fill-blank", "tf", "assertion", "number-range", "matrix"]'
            : '',
        limit: 100,
        page: questionsListPage + 1
      }
      getLMSQuestions(payload)
        .then((res) => {
          if (res) {
            setTotal(res.total)
            setLength(res.data.length)
            setQuestions((prev) => [...prev, ...res.data])
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    const container = containerRef.current
    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight
      if (scrollHeight < scrollTop + (clientHeight + 3)) {
        handleScrollInfinite?.(total, length)
        setQuestionsListPage(questionsListPage + 1)
      }
    }, 1000)

    if (container) {
      debouncedScroll.current = handleScroll
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
        debouncedScroll.current.cancel() // Cancel any pending debounced calls
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, length, questionsListPage])

  return (
    <PageContainer>
      <WrapperCard fullHeight={true}>
        <Flex justifyContent="space-between">
          <FormHeading>{viewDetail ? '' : 'Select Questions'}</FormHeading>

          {!viewDetail && (
            <Flex gap="30px">
              <SearchInput
                placeholder="Search Questions"
                autoComplete="false"
              />
              <SuccessButtonV2 onClick={handlePublishAction}>
                {isCreatedLoading && (
                  <Spinner
                    style={{
                      width: '44px',
                      height: '44px',
                      color: `${BlueButton}`,
                      position: 'absolute',
                      zIndex: 1,
                      top: '50%',
                      left: '45%'
                    }}
                    animation={'border'}
                  />
                )}
                Publish
              </SuccessButtonV2>
              {isPublishPopup && (
                <PublishQuiz
                  setIsPublishPopup={setIsPublishPopup}
                  reassignData={createdQuiz}
                  type={mytype}
                />
              )}
            </Flex>
          )}
        </Flex>

        <CommonSection>
          <AddQuestionsContainerHeading>
            <HeadAddQuestions>
              <HeadTitle>
                {page === 'create quiz' ? (
                  <Flex justifyContent="center">
                    <Checkbox
                      style={{ height: '40px', cursor: 'pointer' }}
                      onClick={() => handleSelectALL()}
                    >
                      {isAllQuestions ? <CheckedSvg /> : <UnCheckedSvg />}
                    </Checkbox>
                  </Flex>
                ) : (
                  ''
                )}
                {page === 'create quiz' ? <h3>Select All</h3> : ''}
                {page === 'create quiz' ? (
                  <Flex>
                    <Line style={{ margin: '0px' }}></Line>
                  </Flex>
                ) : (
                  ''
                )}
                <h3>Total Questions - {questions?.length}</h3>
                {viewDetail ? (
                  ''
                ) : (
                  <Flex>
                    <Line></Line>
                    <h3>Selected Questions - {selectedQuestions?.length}</h3>
                  </Flex>
                )}
                {/* {mytype == 'Assignment' || viewType == 'assignment' ? (
                  ''
                ) : ( */}
                <Flex>
                  <Line></Line>
                  <h3>
                    Assigned Marks - {viewDetail ? AssignedMarks : totalMarks}
                  </h3>
                </Flex>
                {/* )} */}
              </HeadTitle>
              <div style={{ marginLeft: '20px' }}>
                {viewDetail ? (
                  ''
                ) : (
                  <Dropdownsmall
                    label=""
                    selectedValue={filterQuestion}
                    placeholder="Select Question type"
                    onSelect={(data) => {
                      setFilterQuestion(data)
                      setLoading(true)
                      getLMSQuestions({
                        courseId: courses?.coursesId,
                        subjectId: subjectDetails?.subjectId,
                        chapterId: subjectDetails?.chapterId,
                        topicId: subjectDetails?.topicId,
                        // taskType: ['questionCorner'],
                        limit: 100,
                        questionType: `["${[data.value.code]}"]`
                      })
                        .then((res) => {
                          if (res) {
                            setQuestions(res?.data)
                            setLoading(false)
                          }
                        })
                        .finally(() => setLoading(false))
                    }}
                    options={getDropDownOptions(
                      mytype === 'Subjective'
                        ? questionTypesSubjective
                        : questionTypesObjective,
                      'code',
                      'name'
                    )}
                    // style={{ width: '220px' }}
                  ></Dropdownsmall>
                )}
              </div>
            </HeadAddQuestions>
            {/* <div style={{ marginLeft: '20px' }}>
              {' '}
              {mytype == 'Assignment' || viewType == 'assignment' ? (
                <HeadAddQuestions>
                  <CalenderSelectLabel
                    style={{
                      marginRight: '0px',
                      display: 'flex',
                      alignSelf: 'center'
                    }}
                  >
                    Deadline
                  </CalenderSelectLabel>
                  <DeadlineCalenderSelectInput
                    label={''}
                    onChangeDate={ToggleDeadline}
                    value={viewDetail ? DeadLine : formattedDate}
                  />
                </HeadAddQuestions>
              ) : (
                ''
              )}
            </div> */}
          </AddQuestionsContainerHeading>

          <QuestionsContainer ref={containerRef}>
            {isLoading && (
              <Spinner
                style={{
                  width: '44px',
                  height: '44px',
                  color: `${BlueButton}`,
                  position: 'absolute',
                  top: '50%',
                  left: '45%'
                }}
                animation={'border'}
              />
            )}
            {questions && questions.length > 0
              ? questions.map((qs: any, index: number) => (
                  <QuestionsQuiz
                    key={`question_${qs._id}`}
                    {...{
                      isQuize: true,
                      question:
                        viewDetail && quizId && quizId !== undefined
                          ? qs?.questionId
                          : qs,
                      questionIndex: index,
                      teacherQuizQuestion: qs,
                      viewDetail,
                      handleSelectQuestions: handleSelectQuestions,
                      selectedQuestions: selectedQuestions,
                      handleOpenQuestions: handleOpenQuestions,
                      handleQuestionMarksChange: handleQuestionMarksChange,
                      addQuestionsOpen,
                      type: mytype,
                      view: viewDetail,
                      viewType: viewType,
                      page: page
                    }}
                  />
                ))
              : !isLoading && (
                  <NoQuestions style={{ textAlign: 'center' }}>
                    {' '}
                    Questions Not Available{' '}
                  </NoQuestions>
                )}

            {/* <h3 className="loading">
              Loading...
            </h3> */}
          </QuestionsContainer>
        </CommonSection>
      </WrapperCard>
    </PageContainer>
  )
}

export default CreateQuiz
