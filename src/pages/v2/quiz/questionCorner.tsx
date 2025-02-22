import React, { useEffect, useState } from 'react'
import {
  FlexReverse,
  Form,
  FullHeading,
  HeadingWrapper,
  Line,
  Line2,
  MyContainer2,
  PageAllign2,
  TableHeader2,
  TableScroll,
  TableWrapper
} from '../addAssignment/styledComponents'
import { Heading } from '../addAssignment/addAssignment'
import { ReactComponent as ReviewAssignmentOnLogoSVG } from '../../../assets/svg/add-qcon.svg'
import { ReactComponent as ReviewAssignmentOffLogoSVG } from '../../../assets/svg/qc-of.svg'
import { ReactComponent as ReviewQcOffLogoSVG } from '../../../assets/svg/reviewqc-of.svg'
import { ReactComponent as ReviewQcOnLogoSVG } from '../../../assets/svg/reviewqc-on.svg'
import styled from 'styled-components'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { ButtonV2 } from '../../../components/V2/styledComponents'

import {
  getAllCourses,
  getChapterData,
  getSubjectData,
  getTeacherQuizApi,
  getTopicData
} from '../../../helpers/V2/apis'
import moment from 'moment'
import QuizTable from './table'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { Spinner } from 'react-bootstrap'

// import { SearchableDropdownOptionData } from '../../../components/V2/Form/types'
interface HeadingProps {
  isActive: boolean
}
const QuestionCorner = () => {
  const Types = [
    { label: 'Subjective', id: 1 },
    { label: 'Objective', id: 2 }
  ]

  const defaultValues = {
    value: '',
    label: '',
    id: ''
  }

  const history = useHistory()
  const [data, setData] = useState([])
  const [entries, setEntries] = useState<number>(0)
  const [grades, setGrades] = useState<[]>([])
  const [subjects, setSubjects] = useState<[]>([])
  const [chapter, setChapter] = useState<[]>([])
  const [topic, setTopic] = useState<[]>([])
  const [selectedCourses, setCourses] = useState<any>(defaultValues)
  const [selectedSubject, setSelectedSubject] = useState(defaultValues)
  const [selectedChapter, setSelectedChapter] = useState(defaultValues)
  const [selectedTopic, setSelectedTopic] = useState(defaultValues)
  const [selectedType, setselectedType] = useState(defaultValues)
  const [isCourseLoadingAPI, SetIsCourseLoading] = useState<boolean>(false)
  const [isSubjectLoading, SetIsSubjectLoading] = useState<boolean>(false)
  const [isChapterLoading, SetIsChapterLoading] = useState<boolean>(false)
  const [isTopicLoading, SetIsTopicLoading] = useState<boolean>(false)
  const [getTeacherQuizApiLoading, setGetTeacherQuizApiLoading] =
    useState(false)

  const columns = [
    {
      header: () => {
        return <p style={{ minWidth: '100px' }}>Quiz Name</p>
      },
      accessorKey: 'name'
    },
    {
      header: () => {
        return (
          <p style={{ minWidth: '100px', marginLeft: '10px' }}>Quiz Type</p>
        )
      },
      accessorKey: 'quizType'
    },
    // {
    //   header: () => {
    //     return (
    //       <p style={{ minWidth: '120px', marginLeft: '10px' }}>Question Type</p>
    //     )
    //   },
    //   accessorKey: 'questionType'
    // },
    {
      header: () => {
        return <p style={{ minWidth: '100px', marginLeft: '10px' }}>Grade</p>
      },
      accessorKey: 'courseDetails'
    },
    {
      header: () => {
        return (
          <p style={{ minWidth: '100px', marginLeft: '10px' }}>
            Batch / Section
          </p>
        )
      },
      accessorKey: 'batchDetails'
    },
    {
      header: () => {
        return (
          <p style={{ minWidth: '100px', marginLeft: '10px' }}>Total Marks</p>
        )
      },
      accessorKey: 'totalMarks'
    },

    {
      header: () => {
        return (
          <p style={{ minWidth: '130px', marginLeft: '10px' }}>
            Total Questions
          </p>
        )
      },
      accessorKey: 'totalQuestions'
    },
    {
      header: () => {
        return (
          <p style={{ minWidth: '100px', marginLeft: '10px' }}>Release date</p>
        )
      },
      accessorKey: 'releaseDate'
    },

    // {
    //   header: () => {
    //     return (
    //       <p style={{ minWidth: '130px', marginLeft: '10px' }}>
    //         Duration/Deadline
    //       </p>
    //     )
    //   },
    //   accessorKey: 'duration'
    // },
    {
      header: () => {
        return <p style={{ minWidth: '100px', marginLeft: '10px' }}></p>
      },
      accessorKey: 'ViewDetail',
      onClick: () => {
        console.log('Clicked on column:')
      }
    },
    {
      header: () => {
        return <p style={{ minWidth: '100px', marginLeft: '10px' }}></p>
      },
      accessorKey: 'Downlode',
      onClick: () => {
        console.log('Clicked on column:')
      }
    }
  ]

  useEffect(() => {
    SetIsCourseLoading(true)
    getAllCourses()
      .then((res: any) => {
        const options: any = res.data.data.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: '',
            type: el.type
          }
        })
        setGrades(options)
        SetIsCourseLoading(false)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => SetIsCourseLoading(false))
  }, [])

  useEffect(() => {
    setGetTeacherQuizApiLoading(true)
    getTeacherQuizApi()
      .then((res) => {
        if (res) {
          const QuizData = res?.data?.map((item: any) => {
            return {
              batchDetail: item?.batchDetails,
              quizId: item?._id,
              name: item.name,
              questionType: item.questionType,
              totalMarks: item.totalMarks,
              // item.quizType == 'test'
              //   ? item.totalMarks
              //   : item.quizType == 'assignment'
              //   ? 'NA'
              //   : '',
              batchDetails: item.batchDetails.map((item: any) => item.name),
              totalQuestions: item.totalQuestions,
              releaseDate: moment(item.releaseDate).format('Do MMMM ,YYYY'),
              // duration:
              //   item.quizType == 'test'
              //     ? `${item.duration} mins`
              //     : item.quizType == 'assignment'
              //     ? new Date(item.endDate).toLocaleDateString('en-US', {
              //         day: 'numeric',
              //         month: 'short',
              //         year: 'numeric'
              //       })
              //     : '',
              courseDetails: item.courseDetails.name,
              ViewDetail: 'View Detail',
              Downlode: 'Download',
              quizType: item.quizType
            }
          })
          setData(QuizData)

          setEntries(res.count)
        }
      })
      .catch((error) => console.log({ error }))
      .finally(() => setGetTeacherQuizApiLoading(false))
  }, [])

  const handleCoursesSelect = (courses: any) => {
    setCourses(courses)
    setSelectedSubject(defaultValues)
    setSubjects([])
    setSelectedChapter(defaultValues)
    setChapter([])
    setSelectedTopic(defaultValues)
    setTopic([])
    setselectedType(defaultValues)
    if (courses.id) {
      SetIsSubjectLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: courses.id
      })
        .then((res) => {
          const options = res?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setSubjects(options)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => SetIsSubjectLoading(false))
    }
  }

  const handleSubjectSelect = (subjects: any) => {
    setChapter([])
    setSelectedSubject(subjects)
    setSelectedChapter(defaultValues)
    setChapter([])
    setSelectedTopic(defaultValues)
    setTopic([])
    setselectedType(defaultValues)
    if (subjects.id) {
      SetIsChapterLoading(true)
      getChapterData({
        page: 1,
        limit: 100,
        subjectId: subjects.id
      })
        .then((res) => {
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setChapter(options)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => SetIsChapterLoading(false))
    }
  }

  const handleChapterSelect = (chapters: any) => {
    setTopic([])
    setSelectedChapter(chapters)
    setSelectedTopic(defaultValues)
    setTopic([])
    if (chapters.id) {
      SetIsTopicLoading(true)
      getTopicData({
        page: 1,
        limit: 100,
        chapterId: chapters.id,
        isLMS: false
      })
        .then((res) => {
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setTopic(options)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => SetIsTopicLoading(false))
    }
  }

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic)
  }
  const handleTypeSelect = (type: any) => {
    setselectedType(type)
  }

  const handleCreateAction = (
    selectedSubject: any,
    selectedChapter: any,
    selectedTopic: any,
    selectedCourses: any
  ) => {
    let subjectDetails: any = {
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.label
    }

    if (selectedChapter.label && selectedTopic?.label === '') {
      subjectDetails = {
        subjectId: selectedSubject.id,
        subjectName: selectedSubject.label,
        chapterId: selectedChapter.id,
        chapterName: selectedChapter.label
      }
    }
    if (selectedTopic?.label) {
      subjectDetails = {
        subjectId: selectedSubject.id,
        subjectName: selectedSubject.label,
        chapterId: selectedChapter.id,
        chapterName: selectedChapter.label,
        topicId: selectedTopic?.id,
        topicName: selectedTopic?.label
      }
    }

    const courses = {
      coursesId: selectedCourses.id,
      coursesName: selectedCourses.label
    }
    const mytype = {
      Type: selectedType
    }
    if (courses.coursesId === 0 || subjectDetails.subjectId === 0) {
      CustomToastMessage('Select Grades And Subject', 'error')
    } else {
      history.push({
        pathname: `${ROUTES_V2.TEACHERS_CREATE_QUIZ}`,
        state: {
          subjectDetails: subjectDetails,
          courses: courses,
          type: mytype,
          page: 'create quiz'
        }
      })
    }
  }

  const handleReviewAction = () => {
    history.push(ROUTES_V2.TEACHERS_REVIEW_QUIZ)
  }
  // const [isPrintPopupOpen, setIsPrintPopupOpen] = useState(false)

  return (
    <MyContainer2>
      <PageAllign2>
        <FullHeading>
          <HeadingWrapper onClick={() => {}}>
            <AddQcLogo isActive={true} />

            <Heading isActive={true}>Add Quiz</Heading>
          </HeadingWrapper>
          <Line />
          <HeadingWrapper onClick={() => handleReviewAction()}>
            <ReviewQcLogo isActive={false} />
            <Heading isActive={false}>Review Quiz</Heading>
          </HeadingWrapper>
        </FullHeading>
        <Form>
          <SearchableDropdown
            label={'Select Grade'}
            options={grades}
            required
            onSelect={handleCoursesSelect}
            placeHolder={'Select Grade'}
            selectedValue={selectedCourses}
            isClear={selectedCourses?.label ? true : false}
            isLoader={isCourseLoadingAPI}
            style={{ marginBottom: '8px' }}
          />

          <SearchableDropdown
            label={'Select Subject'}
            options={subjects}
            required
            onSelect={handleSubjectSelect}
            placeHolder={'Select Subject'}
            selectedValue={selectedSubject}
            isClear={selectedSubject?.label ? true : false}
            isLoader={isSubjectLoading}
            style={{ marginBottom: '8px' }}
          />

          <SearchableDropdown
            label={'Select Chapter (Optional)'}
            options={chapter}
            onSelect={handleChapterSelect}
            placeHolder={'Select Chapter'}
            selectedValue={selectedChapter}
            isClear={selectedChapter?.label ? true : false}
            isLoader={isChapterLoading}
            style={{ marginBottom: '8px' }}
          />

          <SearchableDropdown
            label={'Select Topic (Optional)'}
            options={topic}
            onSelect={handleTopicSelect}
            placeHolder={'Select Topic'}
            selectedValue={selectedTopic}
            isClear={selectedTopic?.label ? true : false}
            isLoader={isTopicLoading}
            style={{ marginBottom: '8px' }}
          ></SearchableDropdown>
          <SearchableDropdown
            label={'Select Type'}
            options={Types}
            onSelect={handleTypeSelect}
            placeHolder={'Select Type'}
            selectedValue={selectedType}
            isClear={selectedType?.label ? true : false}
          ></SearchableDropdown>
          <FlexReverse style={{ marginTop: '10%' }}>
            <ButtonV2
              onClick={() =>
                handleCreateAction(
                  selectedSubject,
                  selectedChapter,
                  selectedTopic,
                  selectedCourses
                )
              }
            >
              Create Quiz
            </ButtonV2>
          </FlexReverse>
        </Form>
      </PageAllign2>
      <Line2 style={{ height: '90%' }} />
      <TableWrapper>
        <TableHeader2 style={{ color: 'rgba(94, 100, 131, 1)' }}>
          All Posted Quiz ({entries})
        </TableHeader2>
        <TableScroll style={{ width: '100%' }}>
          {getTeacherQuizApiLoading ? (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '45%',
                left: '65%'
              }}
              animation={'border'}
            />
          ) : (
            <QuizTable tableData={data} columns={columns} />
          )}
        </TableScroll>
      </TableWrapper>
    </MyContainer2>
  )
}
export default QuestionCorner

export const AddQcLogo = styled(({ isActive, ...props }: HeadingProps) =>
  isActive ? (
    <ReviewAssignmentOnLogoSVG {...props} />
  ) : (
    <ReviewAssignmentOffLogoSVG {...props} />
  )
)<HeadingProps>`
  height: 22px;
  width: 22px;
  margin-right: 8px;
`
export const ReviewQcLogo = styled(({ isActive, ...props }: HeadingProps) =>
  isActive ? (
    <ReviewQcOnLogoSVG {...props} />
  ) : (
    <ReviewQcOffLogoSVG {...props} />
  )
)<HeadingProps>`
  height: 22px;
  width: 22px;
  margin-right: 8px;
`
