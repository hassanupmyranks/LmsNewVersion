import { useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
import {
  Flex,
  FormHeading,
  PageContainer,
  SuccessButtonV2,
  WrapperCard
} from '../../../../components/V2/styledComponents'
// import { topHeaderValues } from '../../../../const/V2/topHeaderConsts'
import ROUTES_V2 from '../../../../const/V2/routes'
import { BlueButton } from '../../../../const/V2/stylingVariables'
// import { updateTopHeader } from '../../../../redux/topHeader/actions'
import {
  AddQuestionsContainerHeading,
  CommonSection,
  HeadAddQuestions,
  HeadTitle,
  Line,
  NoQuestions,
  QuestionsContainer
} from './components/styledComponents'
import {
  addAssignmentAPI,
  getLMSQuestions,
  updateAssignment
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import QuestionsQuiz from './components/QuestionsQuiz'
import { getDropDownOptions } from '../../../../helpers/V2/dropdown'
import Dropdownsmall from '../../../../components/V2/Form/Dropdownsmall'
import { DropdownOptionData } from '../../../../components/V2/Form/types'

const questionTypes = [
  { code: 'aq', name: 'All Question' },
  { code: 'multiple_mcq', name: 'Multiple Choice (Multiple Answer)' },
  { code: 'tf', name: 'True/False' },
  { code: 'assertion', name: 'Assertion' },
  { code: 'fill-blank', name: 'Fill in the Blank' },
  { code: 'number', name: 'Numeric' },
  { code: 'mcq', name: 'Multiple Choice (Single Answer)' },
  { code: 'descriptive', name: 'Descriptive' },
  { code: 'multiple_mcq_any', name: 'Multiple Choice Any (Multiple Answers)' },
  { code: 'vsa', name: 'Very Short Answer' },
  { code: 'sa', name: 'Short Answer' },
  { code: 'la', name: 'Long Answer' },
  { code: 'hots', name: 'Hots' },
  { code: 'passage', name: 'Passage' },
  { code: 'case', name: 'Case' }
]
interface Question {
  questionId: string
  marks: number
}

interface NewData {
  questionType: string[]
  questions: Question[]
}

const AssignmentQuestion = () => {
  const history = useHistory()
  const params: any = useParams()
  // const dispatch = useDispatch()
  const containerRef: any = useRef()

  const location: any = useLocation()
  const type: any = location.state && location.state.type
  const name: any = location.state && location.state.name
  // const testDeadline: any = location.state && location.state.deadline
  const courseId: any = location.state && location.state.courseId
  const subjectId: any = location.state && location.state.subjectId
  const chapterId: any = location.state && location.state.chapterId
  const topicId: any = location.state && location.state.topicId
  const subTopicId: any = location.state && location.state.subTopicId
  const scoreFormat: any = location.state && location.state.scoreFormat
  const description: any = location.state && location.state.description
  const edit: any = location.state && location.state.edit
  const Questions: any = location.state && location.state.questions
  let editQuestions = Questions?.map((item: any) => ({
    questionId: item._id,
    marks: item.marks
  }))

  const [isLoading, setLoading] = useState(false)
  const [isCreatedLoading, setIsCreatedLoading] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [addQuestionsSelected] = useState<string[]>([])
  const [addQuestionsOpen, setAddQuestionsOpen] = useState<string[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>(
    editQuestions ? editQuestions : []
  )
  const [filterQuestion, setFilterQuestion] =
    useState<DropdownOptionData<{ code: string; name: string }>>()
  const handleSelectQuestions = (questionId: string, Marks: number) => {
    const isChecked = selectedQuestions.findIndex(
      (item) => item.questionId === questionId
    )
    const newSelectedQuestions = [...selectedQuestions]

    if (isChecked !== -1) {
      newSelectedQuestions.splice(isChecked, 1)
    } else {
      newSelectedQuestions.push({
        questionId: questionId,
        marks: Marks ?? 0
      })
    }
    setSelectedQuestions(newSelectedQuestions)
  }
  useEffect(() => {
    setLoading(true)
    const payload = {
      courseId: courseId,
      subjectId: subjectId,
      chapterId: chapterId,
      topicId: topicId,
      subTopicId: subTopicId,
      limit: 100
    }
    getLMSQuestions(payload)
      .then((res) => {
        if (res) {
          setQuestions(res?.data)
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false))
  }, [courseId, subjectId, chapterId, topicId, subTopicId])

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

    const newFormData: any = new FormData()
    if (!edit) {
      newFormData.append('type', type)
    }
    newFormData.append('name', name)
    // newFormData.append('deadLine', testDeadline)
    newFormData.append('subjectId', subjectId)
    // if (chapterId) {
    //   newFormData.append('chapterId', chapterId)
    // }
    // if (topicId) {
    //   newFormData.append('topicId', topicId)
    // }
    // if (subTopicId) {
    //   newFormData.append('subTopicId', subTopicId)
    // }
    newFormData.append('scoreFormat', scoreFormat)
    if (scoreFormat === 'marks' && totalMarks > 0) {
      newFormData.append('totalMarks', totalMarks)
    }
    if (description) {
      newFormData.append('description', description)
    }
    if (selectedQuestions.length > 0) {
      if (edit) {
        newFormData.append('questionIds', JSON.stringify(selectedQuestions))
      } else {
        newFormData.append('questions', JSON.stringify(selectedQuestions))
      }
    }
    setIsCreatedLoading(true)
    if (edit) {
      updateAssignment(newFormData, params.id)
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          history.push(ROUTES_V2.ASSIGNMENT_LIST)
        })
        .catch((err) => {
          CustomToastMessage(`Error: ${err.message}`, 'error')
        })
        .finally(() => setIsCreatedLoading(false))
    } else {
      addAssignmentAPI(newFormData)
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          history.push(ROUTES_V2.ASSIGNMENT_LIST)
        })
        .catch((err) => {
          CustomToastMessage(`Error: ${err.message}`, 'error')
        })
        .finally(() => setIsCreatedLoading(false))
    }
  }

  // useEffect(() => {
  //   dispatch(
  //     updateTopHeader(topHeaderValues['teacher'][ROUTES_V2.ADD_ASSIGNMENTS])
  //   )
  // }, [dispatch])

  return (
    <PageContainer>
      <WrapperCard fullHeight={true}>
        <Flex justifyContent="space-between">
          <FormHeading>Select Questions</FormHeading>

          <Flex gap="30px">
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
              {edit ? 'Update Test Assignment' : 'Create Test Assignment'}
            </SuccessButtonV2>
          </Flex>
        </Flex>

        <CommonSection>
          <AddQuestionsContainerHeading>
            <HeadAddQuestions>
              <HeadTitle>
                {/* <h3>Total Questions - {questions?.length}</h3> */}

                <Flex>
                  {/* <Line></Line> */}
                  <h3>Selected Questions - {selectedQuestions?.length}</h3>
                </Flex>

                <Flex>
                  <Line></Line>
                  <h3>Assigned Marks - {totalMarks}</h3>
                </Flex>
              </HeadTitle>
              <div style={{ marginLeft: '20px' }}>
                <Dropdownsmall
                  label=""
                  selectedValue={filterQuestion}
                  placeholder="Select Question type"
                  onSelect={(data) => {
                    setFilterQuestion(data)
                    setLoading(true)
                    getLMSQuestions({
                      courseId: courseId,
                      subjectId: subjectId,
                      chapterId: chapterId,
                      topicId: topicId,
                      subTopicId: subTopicId,
                      limit: 100,
                      questionType: data.value.code !== 'aq' && [
                        data.value.code
                      ]
                    })
                      .then((res) => {
                        if (res) {
                          setQuestions(res?.data)
                          setLoading(false)
                        }
                      })
                      .finally(() => setLoading(false))
                  }}
                  options={getDropDownOptions(questionTypes, 'code', 'name')}
                ></Dropdownsmall>
              </div>
            </HeadAddQuestions>
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
              ? questions.map((qs: any) => (
                  <QuestionsQuiz
                    key={`question_${qs._id}`}
                    {...{
                      isQuize: true,
                      question: qs,
                      teacherQuizQuestion: qs,
                      handleSelectQuestions: handleSelectQuestions,
                      selectedQuestions: selectedQuestions,
                      handleOpenQuestions: handleOpenQuestions,
                      addQuestionsSelected,
                      addQuestionsOpen,
                      type: type
                    }}
                  />
                ))
              : !isLoading && (
                  <NoQuestions style={{ textAlign: 'center' }}>
                    {' '}
                    Questions Not Available{' '}
                  </NoQuestions>
                )}
          </QuestionsContainer>
        </CommonSection>
      </WrapperCard>
    </PageContainer>
  )
}

export default AssignmentQuestion
