import {
  courseMappingAPI,
  deleteCourseMappingAPI,
  getLearnCourseData,
  getQuestionBankV2CoursesAPI,
  getQuestionsCourseAPI,
  getSignleQuestionsCourseAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import {
  Form,
  MyContainer,
  PageAllign
} from '../../addAssignment/styledComponents'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { useEffect, useMemo, useState } from 'react'
import { ButtonV2, Flex } from '../../../../components/V2/styledComponents'
// import { Heading } from '../../addAssignment/addAssignment'
import { getDropDownOptions } from '../../../../helpers/V2/dropdown'
import { DropdownOptionData } from '../../../../components/V2/Form/types'
import { CourseInstitute } from '../../../../utils/types'
import MultiselectDropdown from '../../../../components/V2/Form/MultiselectDropdown'
import BasicTable, { P } from '../../../../components/V2/Table/BasicTable'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import {
  ColumnDef,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import styled from 'styled-components'
import PopupMenu from '../../../../components/V2/Table/PopupMenu'

const CourseMapping = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [selectedGrade, setSelectedGrade] = useState<any>({
    id: '',
    label: ''
  })
  const [grades, setGrades] = useState<[]>([])
  const [isCourseLoadingAPI, SetIsCourseLoading] = useState<boolean>(false)
  const [isBankQuestionsCourseLoadingAPI, SetIsBankQuestionsCourseLoading] =
    useState<boolean>(false)
  const [bankQuestionCourse, setBankQuestionCourse] = useState<any[]>([])
  const [selectedQuestionCourse, setSelectedQuestionCourse] = useState<
    DropdownOptionData<CourseInstitute>[]
  >([])
  const [isSubmitLoadingAPI, setIsSubmitLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    SetIsCourseLoading(true)
    getLearnCourseData({ page: 1, limit: 120 })
      .then((res: any) => {
        const options: any = res?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: ''
          }
        })
        setGrades(options)
        SetIsCourseLoading(false)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => SetIsCourseLoading(false))

    SetIsBankQuestionsCourseLoading(true)
    getQuestionBankV2CoursesAPI({
      limit: 110
    })
      .then((response) => {
        const courses = response?.data?.map((course: any) => ({
          id: course._id,
          value: course.name,
          label: course.name,
          url: ''
        }))

        setBankQuestionCourse(courses)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => SetIsBankQuestionsCourseLoading(false))
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getQuestionsCourseAPI({ page: 1, limit })
      .then((res: any) => {
        setTableData(res.data)
        setEntries(res.total)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [limit])

  const submitHandler = () => {
    setIsSubmit(true)
    if (selectedGrade.id && selectedQuestionCourse.length > 0) {
      setIsSubmit(false)
      setIsSubmitLoading(true)
      courseMappingAPI({
        courseId: selectedGrade.id,
        questionBankCourseIds: selectedQuestionCourse.map(
          (item: any) => item.id
        )
      })
        .then((res: any) => {
          CustomToastMessage(res.message, 'success')
          setSelectedGrade({ id: '', label: '' })
          setSelectedQuestionCourse([])
          setIsLoading(true)
          getQuestionsCourseAPI({ page: 1, limit })
            .then((res: any) => {
              setTableData(res.data)
              setEntries(res.total)
            })
            .catch((error) => CustomToastMessage(error.message, 'error'))
            .finally(() => setIsLoading(false))
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => {
          setIsSubmitLoading(false)
          setIsEdit(false)
        })
    }
  }

  const editCellOption = useMemo(
    () => [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (id: any) => {
          setIsEdit(true)
          getSignleQuestionsCourseAPI(id)
            .then((res: any) => {
              //                       "data": {
              //     "lmsCourseId": "65ab983bf8506871a0e0d1dc",
              //     "lmsCourseName": "Grade 7",
              //     "questionBankCourses": [
              //         {
              //             "courseId": "65f2f66a5c2490b327dbed1e",
              //             "courseName": "CBSE - Class 7"
              //         }
              //     ]
              // }
              setSelectedGrade({
                id: res.data.lmsCourseId,
                label: res.data.lmsCourseName
              })
              if (
                res.data &&
                res.data.questionBankCourses &&
                res.data.questionBankCourses.length > 0
              ) {
                let newCourse: any = []
                res.data.questionBankCourses.map((item: any) => {
                  newCourse.push({
                    id: item.courseId,
                    label: item.courseName
                  })
                })
                setSelectedQuestionCourse(newCourse)
              }
            })
            .catch((error) => CustomToastMessage(error.message, 'error'))
          // .finally(() => setIsLoading(false))
        }
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (id: any) => {
          setIsLoading(true)
          deleteCourseMappingAPI(id)
            .then((res: any) => {
              CustomToastMessage(res.message, 'success')
              setLimit(limit + 1)
            })
            .catch((error) => CustomToastMessage(error.message, 'error'))
            .finally(() => setIsLoading(false))
        }
      }
    ],
    [limit]
  )

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('lmsCourseName', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '100px' }}>
            <p>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('questionBankCourses', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Question Bank Grades Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="5px" alignItems="start" style={{ width: '450px' }}>
            <p>
              {props
                ?.getValue()
                ?.map((item: any) => item.courseName)
                .join(', ')}
            </p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('lmsCourseId', {
      size: 50,
      header: '',
      cell: (props) => (
        <>
          <PopupMenu id={props.getValue()} options={editCellOption} />
        </>
      )
    })
  ]

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Flex
      gap="20px"
      alignItems="start"
      direction={windowWidth >= 768 ? 'row' : 'column'}
      style={{ overflowY: 'auto' }}
    >
      <MyContainer>
        <PageAllign>
          {/* <Heading isActive={true}>Course Mapping</Heading> */}
          <Form style={{ height: '100%' }}>
            <Flex
              style={{
                margin: '10px 0px',
                gap: '10px',
                flexDirection: 'column'
              }}
            >
              <SearchableDropdown
                label={'Select Grade'}
                placeHolder={'Please Select'}
                options={grades}
                onSelect={(value) => {
                  setSelectedGrade(value)
                  setSelectedQuestionCourse([])
                }}
                selectedValue={selectedGrade}
                isClear={selectedGrade?.id ? true : false}
                required
                isLoader={isCourseLoadingAPI}
                fullWidth
                error={
                  selectedGrade?.id || !isSubmit ? '' : 'field is required'
                }
              />
              <div style={{ width: '100%' }}>
                <MultiselectDropdown
                  isLoading={isBankQuestionsCourseLoadingAPI}
                  label={'Add Question Bank Grades'}
                  placeholder={'Select Question Bank Grades'}
                  isClear={selectedQuestionCourse.length <= 0 ? false : true}
                  options={getDropDownOptions(
                    bankQuestionCourse,
                    'id',
                    'label'
                  )}
                  onSelect={(data) => {
                    setSelectedQuestionCourse(data)
                  }}
                  selectedValue={selectedQuestionCourse}
                />
              </div>
            </Flex>
            <Flex style={{ justifyContent: 'end', marginTop: '20px' }}>
              <ButtonV2
                disabled={isSubmitLoadingAPI}
                onClick={() => submitHandler()}
              >
                {isEdit ? 'Update' : 'Submit'}
              </ButtonV2>
            </Flex>
          </Form>
        </PageAllign>
      </MyContainer>
      <Flex style={{ width: windowWidth >= 768 ? '65%' : '100%' }}>
        <TableWrapper>
          {isLoading && (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '45%',
                left: '70%'
              }}
              animation={'border'}
            />
          )}
          <BasicTable
            {...{
              maxHeight: '65vh',
              tableData,
              columns,
              sorting,
              setSorting,
              setPage,
              setLimit,
              entries,
              limit,
              page
            }}
          />
        </TableWrapper>
      </Flex>
    </Flex>
  )
}

export default CourseMapping

const TableWrapper = styled.div`
  // height: 100%;
  // overflow-y: auto;
  width: 100%;
  & thead {
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
  }
`
