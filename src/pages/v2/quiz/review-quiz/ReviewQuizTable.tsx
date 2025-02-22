import React, { useEffect, useState } from 'react'

import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  PublishDetailsPayload,
  ReactTablePropsType
} from '../../../../utils/types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import { Blue, DarkBlue, White } from '../../../../const/V2/stylingVariables'
// import { Grid, GridItem } from '../../../../components/V2/styledComponents'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  GetAllReviewBatch,
  getChapterData,
  getLearnCourseData,
  getSubjectData,
  getTeacherSubmittedQuizAPI,
  getTopicData
} from '../../../../helpers/V2/apis'
import { CourseDetailProps } from '../../learn/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

const ReviewQuizTable = <
  T extends {
    quizType: string
    ReviewNow: string
  }
>({
  tableData,
  columns,
  setData
}: ReactTablePropsType<T>) => {
  const Types = [
    { label: 'Subjective', id: 1 },
    { label: 'Objective', id: 2 }
  ]

  const memoizedData = React.useMemo(() => tableData, [tableData])
  const history = useHistory()
  const [gradeOptions, setGradeOptions] = useState<[]>([])

  const [subjectOptions, setSubjectOptions] = useState<[]>([])
  const [chaptersOptions, setChaptersOptions] = useState<[]>([])
  const [batchOptions, setBatchOptions] = useState<[]>([])
  const [topicsOptions, setTopicsOptions] = useState<[]>([])
  const [, setSubjectsList] = useState<PublishDetailsPayload[]>([])
  const defaultValues = {
    value: '',
    label: '',
    id: ''
  }
  const [selectedGrade, setSelectedGrade] = useState({
    ...defaultValues,
    type: ''
  })
  const [selectedSubject, setSelectedSubject] = useState(defaultValues)
  const [selectedBatch, setSelectedBatch] = useState(defaultValues)
  const [selectedChapter, setSelectedChapter] = useState(defaultValues)
  const [selectedTopic, setSelectedTopic] = useState<any>(defaultValues)
  const [selectedType, setSelectedType] = useState<any>(defaultValues)

  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)
  const [subjectApiLoading, setSubjectApiLoading] = useState(false)
  const [isBatchApiLoading, setIsBatchApiLoading] = useState(false)
  const [isChapterApiLoading, setIsChapterApiLoading] = useState<boolean>(false)
  const [isTopicApiLoading, setIsTopicApiLoading] = useState(false)

  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  useEffect(() => {
    SetIsCourseLoading(true)
    getLearnCourseData({ page: 1, limit: 120 })
      .then((res: CourseDetailProps[]) => {
        const options: any = res?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: '',
            type: el.type
          }
        })
        setGradeOptions(options)
        SetIsCourseLoading(false)
      })
      .catch(() => SetIsCourseLoading(false))
  }, [])
  useEffect(() => {
    const payload = {
      gradeId: selectedGrade?.id,
      batchId: selectedBatch?.id,
      limit: 100,
      skip: 1,
      subjectId: selectedSubject?.id,
      chapterId: selectedChapter?.id,
      topicId: selectedTopic?.id
    }
    getTeacherSubmittedQuizAPI(payload)
      .then((res) => {
        setData?.(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [
    setData,
    selectedGrade,
    selectedBatch,
    selectedSubject,
    selectedChapter,
    selectedTopic
  ])

  const emptySelectedValue = () => {
    setSelectedTopic(defaultValues)
    setSelectedChapter(defaultValues)
    setSelectedBatch(defaultValues)
  }

  const onSelectGrade = (data: any) => {
    emptySelectedValue()
    setSelectedSubject(defaultValues)
    setSelectedGrade(data)
    if (data.type === 'lab') {
      setIsTopicApiLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: data.id
      })
        .then((res) => {
          if (data.type === 'lab') {
            const newSubjects = res?.map((ele: any, ind: number) => {
              return {
                id: ind + 1,
                subject_id: ele._id,
                subject_name: ele.name,
                status: ele.published
              }
            })

            setSubjectsList(newSubjects)
            setIsTopicApiLoading(false)
          }
        })
        .catch(() => setIsTopicApiLoading(false))
        .finally(() => setSubjectApiLoading(false))
    } else if (data.type === 'theory') {
      setSubjectApiLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: data.id
      })
        .then((res) => {
          const options = res?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setSubjectOptions(options)
        })
        .catch(() => setIsTopicApiLoading(false))
        .finally(() => setSubjectApiLoading(false))
    }
  }

  const onSelectSubject = (subject: any) => {
    emptySelectedValue()
    setSelectedSubject({
      id: String(subject.id),
      value: String(subject.value),
      label: subject.label
    })
    setSelectedChapter(defaultValues)
    setIsBatchApiLoading(true)
    setIsChapterApiLoading(true)
    Promise.all([
      GetAllReviewBatch({
        branchIds: [user.branchId],
        courseId: selectedGrade.id,
        limit: 100,
        page: 1,
        subjectId: subject.id
      }),
      getChapterData({
        subjectId: subject.id,
        page: 1,
        limit: 100
      })
    ])
      .then(([res1, res2]) => {
        const options1: any = res1?.data?.map((ele: any) => {
          return {
            id: ele.batchId,
            label: ele.batchName,
            value: ''
          }
        })
        const options2 = res2?.data?.map((ele: any) => {
          return {
            id: ele._id,
            label: ele.name,
            value: ''
          }
        })
        setBatchOptions(options1)
        setChaptersOptions(options2)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsBatchApiLoading(false)
        setIsChapterApiLoading(false)
      })
  }

  const onSelectChapter = (chapter: any) => {
    setSelectedTopic(defaultValues)
    setSelectedChapter({
      id: String(chapter.id),
      value: String(chapter.value),
      label: chapter.label
    })
    setIsTopicApiLoading(true)
    getTopicData({
      chapterId: chapter.id,
      page: 1,
      limit: 100
    })
      .then((res) => {
        const newTopics = res?.data?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: ''
          }
        })
        setTopicsOptions(newTopics)
      })
      .catch((error) => console.log(error))
      .finally(() => setIsTopicApiLoading(false))
  }

  const table = useReactTable({
    data: memoizedData,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleReviewAction = (row: any) => {
    if (row?.ReviewNow === 'Review Now') {
      const quizId = row?.quizId
      const batchId = row?.batchId
      const quizType = row?.quizType
      const isReviewed = row?.isReviewed
      history.push({
        pathname: `${ROUTES_V2.TEACHERS_REVIEW_QUIZ_STUDENTS}`,
        state: {
          batchId: batchId,
          quizId: quizId,
          quizType: quizType,
          isReviewed: isReviewed
        }
      })
    }
  }

  const filteredRows = table
    .getRowModel()
    .rows.filter(
      (row) =>
        row.original.quizType === selectedType.label.toLowerCase() ||
        selectedType.label === ''
    )

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <FormContainerV2>
        <FormContainer1>
          <div>
            <SearchableDropdown
              label="Select Type"
              selectedValue={selectedType}
              onSelect={(type: any) => {
                setSelectedType(type)
              }}
              placeHolder="Type Name"
              required
              isClear={selectedType?.label ? true : false}
              options={Types}
              fullWidth
            />
          </div>
          <div>
            <SearchableDropdown
              label="Select Grade"
              selectedValue={selectedGrade}
              onSelect={onSelectGrade}
              placeHolder="Grade Name"
              isLoader={isCourseLoading}
              required
              isClear={selectedGrade?.label ? true : false}
              options={gradeOptions}
              fullWidth
            />
          </div>
          <div>
            <SearchableDropdown
              label="Select Subject"
              selectedValue={selectedSubject}
              onSelect={onSelectSubject}
              placeHolder="Subject Name"
              isLoader={subjectApiLoading}
              required
              isClear={selectedSubject?.label ? true : false}
              options={subjectOptions}
              fullWidth
            />
          </div>
        </FormContainer1>
        <FormContainer1>
          {!(selectedGrade.type === 'lab') && (
            <>
              <div>
                <SearchableDropdown
                  label="Select Batch / Section"
                  selectedValue={selectedBatch}
                  onSelect={(batchId: any) => {
                    setSelectedBatch(batchId)
                  }}
                  placeHolder="Batch / Section Name"
                  isLoader={isBatchApiLoading}
                  required
                  isClear={selectedBatch?.label ? true : false}
                  options={batchOptions}
                  fullWidth
                />
              </div>
              <div>
                <SearchableDropdown
                  label="Select Chapter"
                  selectedValue={selectedChapter}
                  onSelect={onSelectChapter}
                  placeHolder="Chapter Name"
                  isLoader={isChapterApiLoading}
                  required
                  isClear={selectedChapter?.label ? true : false}
                  options={chaptersOptions}
                  fullWidth
                />
              </div>
              <div>
                <SearchableDropdown
                  label="Select Topic"
                  selectedValue={selectedTopic}
                  onSelect={(topic: any) => {
                    setSelectedTopic(topic)
                  }}
                  placeHolder="Topic Name"
                  required
                  isClear={selectedTopic?.label ? true : false}
                  isLoader={isTopicApiLoading}
                  options={topicsOptions}
                  fullWidth
                />
              </div>
            </>
          )}
        </FormContainer1>
      </FormContainerV2>
      <TableWrapper>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Td
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ textAlign: 'center' }}
                  >
                    <InfoHead
                      style={{
                        color: 'rgba(94, 100, 131, 1)',
                        fontFamily: 'DM Sans'
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </InfoHead>
                  </Td>
                ))}
              </tr>
            ))}
          </TableHeader>
          <tbody>
            {filteredRows.map((row) => (
              <QuizRow key={row.id}>
                {row.getVisibleCells().map((cell, index) => {
                  const isLastColumn =
                    index === row.getVisibleCells().length - 1
                  return (
                    <Quizdata key={cell.id}>
                      <Info
                        style={{
                          backgroundColor:
                            cell.getContext().column.id === 'ReviewNow'
                              ? row.original.ReviewNow === 'Review Now'
                                ? '#1376B9'
                                : row.original.ReviewNow === 'Reviewed'
                                ? '#6ABAF0'
                                : ''
                              : '',
                          width: isLastColumn ? '100px' : '',
                          padding: isLastColumn ? '4px' : '',
                          borderRadius: isLastColumn ? '33px' : '',
                          color: isLastColumn ? '#FFFFFF' : 'rgba(3, 2, 41, 1)',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          if (isLastColumn) {
                            handleReviewAction(row.original)
                          } else if (
                            cell.getContext().column.id === 'ReviewNow'
                          ) {
                            console.log('column', cell.getContext().column)
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Info>
                    </Quizdata>
                  )
                })}
              </QuizRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  )
}

export default ReviewQuizTable

export const FormContainerV2 = styled.div`
  padding: 10px;
  border-radius: 20px;
  background: ${White};
  display: flex;
  gap: 20px;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
    // max-height: 100%;
  }
`

export const FormContainer1 = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 1250px) {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    width: 50%;
    gap: 5px;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`

export const TextParaLabel = styled.p`
  font-family: 'DM Sans', sans-serif;
  margin-top: 3rem;
  color: ${Blue};
  font-size: 14px;
  font-weight: 500;
`
export const TableWrapper = styled.div`
  overflow: auto;
  height: 100%;
  max-height: 490px;
  margin-top: 0px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
  }
`
const TableHeader = styled.thead`
  color: #2e3138;
  background-color: #fff;
  height: 35px;
  position: sticky;
  top: 0;
  z-index: 1;
`
export const InfoHead = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${DarkBlue};
  font-family: 'DM Sans';
`
export const Td = styled.td`
  text-align: start;
`
export const QuizRow = styled.tr`
  height: 50px;
  border-radius: 20px;
  // border: 1px solid #3AED099;

  box-shadow: 0px 5px 0px 0px #5b93ff1c;
  vertical-align: baseline;
  border-bottom: '1px solid #e9edf4';

  :hover {
    // background-color: #eff4fc;
    box-shadow: 0 1px 2px 0 #e9effa;
    border-radius: 20px;
  }
`

export const Quizdata = styled.td``
export const Info = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${DarkBlue};
  font-family: 'DM Sans';
`
