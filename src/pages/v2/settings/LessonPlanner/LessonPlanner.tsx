// import {
//   ColumnDef,
//   SortingState,
//   createColumnHelper
// } from '@tanstack/react-table'
// import { useEffect, useState, useMemo } from 'react'
// import { ReactComponent as DeleteIcon } from '../../../../assets/svg/Delete.svg'
// import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
// import styled from 'styled-components'
// import { Spinner } from 'react-bootstrap'
// import BasicTable from '../../../../components/V2/Table/BasicTable'
// import PopupMenu from '../../../../components/V2/Table/PopupMenu'
// import { Flex, PageContainer } from '../../../../components/V2/styledComponents'
// import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
// import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
// import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
// import WarningPopUp from '../../../../components/V2/PopUp/WarningPopup'
// import { BlueButton } from '../../student/assessment/attemptTest/styledComponents'
// import {
//   getCourses,
//   getLessonPlanApi,
//   getSubjectData
// } from '../../../../helpers/V2/apis'
// import SimpleButton from '../../../../components/V2/Button/SimpleButton'

// const LessonPlanner = () => {
//   const [tableData, setTableData] = useState<[]>([])
//   const [sorting, setSorting] = useState<SortingState>([])
//   const [page, setPage] = useState<number>(0)
//   const [limit, setLimit] = useState<number>(10)
//   const [entries, setEntries] = useState<number>(0)
//   const [isLoading, setIsLoading] = useState(false)
//   const [selectedGrade, setSelectedGrade] =
//     useState<SearchableDropdownOptionData>()
//   const [selectedSubject, setSelectedSubject] =
//     useState<SearchableDropdownOptionData>()
//   const [subject, setSubject] = useState<any[]>([])
//   const [subjectLoading, setSubjectLoading] = useState(false)
//   const [gradeLoading, setGradeLoading] = useState(false)
//   const [gradeListPage, setGradeListPage] = useState(1)
//   const [gradeData, setGradeData] = useState<any[]>([])
//   const [gradeTotal, setGradeTotal] = useState(0)
//   const [subjectListPage, setSubjectListPage] = useState(1)
//   const [subjectTotal, setSubjectTotal] = useState(0)
//   const [isWarning, setIsWarning] = useState(false)
//   const [topicId, setTopicId] = useState('')

//   useEffect(() => {
//     setIsLoading(true)
//     const payload = {
//       page: 1,
//       limit: 99,
//       courseId: selectedGrade?.id,
//       subjectId: selectedSubject?.id
//     }
//     getLessonPlanApi(payload)
//       .then((res: any) => {
//         setTableData(res.data)
//         setEntries(res.total)
//       })
//       .catch((err: any) => CustomToastMessage(err.message, 'error'))
//       .finally(() => setIsLoading(false))
//   }, [selectedGrade?.id, selectedSubject?.id])

//   useEffect(() => {
//     let newGrade: any = []
//     setGradeLoading(true)
//     const payload = {
//       page: 1,
//       limit: 150
//     }
//     getCourses(payload)
//       .then((res: any) => {
//         setGradeTotal(res.total)
//         newGrade = res?.data?.data?.map((item: any) => {
//           return {
//             id: item._id,
//             label: item.name,
//             value: ''
//           }
//         })
//         setGradeData(newGrade)
//       })
//       .catch((err: any) => CustomToastMessage(err.message, 'error'))
//       .finally(() => setGradeLoading(false))
//   }, [])

//   useEffect(() => {
//     if (selectedGrade?.id) {
//       setSubjectLoading(true)
//       const payload = {
//         page: 1,
//         limit: 150,
//         courseId: selectedGrade?.id
//       }
//       getSubjectData(payload)
//         .then((res: any) => {
//           setSubjectTotal(res?.total)
//           const newSubject = res?.map((Subject: any) => {
//             return {
//               label: Subject.name,
//               id: Subject?._id,
//               value: ''
//             }
//           })
//           setSubject(newSubject)
//           if (res.length <= 0) {
//             CustomToastMessage(
//               'There are no Subjects under this Grade',
//               'error'
//             )
//           }
//         })
//         .catch((err: any) => CustomToastMessage(err.message, 'error'))
//         .finally(() => setSubjectLoading(false))
//     }
//   }, [selectedGrade?.id])

//   // useEffect(() => {
//   //   setIsLoading(true)
//   //   getTopicData({
//   //     page: page + 1,
//   //     limit,
//   //     courseId: selectedGrade?.id ? selectedGrade?.id : '',
//   //     subjectId: selectedSubject?.id ? selectedSubject?.id : '',
//   //   })
//   //     .then((res) => {
//   //       setTableData(res.data)
//   //       setEntries(res.total)
//   //     })
//   //     .catch((error) => CustomToastMessage(error.message, 'error'))
//   //     .finally(() => setIsLoading(false))
//   // }, [
//   //   page,
//   //   limit,
//   //   selectedGrade?.id,
//   //   selectedSubject?.id,
//   // ])

//   /** @todo This will be used for sorting (When Changes are done from backend)  */
//   useEffect(() => {}, [sorting])
//   // const onEditIconClick = useCallback(
//   //   (id: string | number) => {
//   //     history.push(`${ROUTES_V2.EDIT_TOPICS}/${id}`)
//   //   },
//   //   [history]
//   // )

//   const handleDelete = (id: string) => {
//     console.log(id)
//   }

//   const editCellOption = useMemo(
//     () => [
//       {
//         Icon: <EditIcon />,
//         label: 'Edit',
//         onClick: () => {}
//       },
//       {
//         Icon: <DeleteIcon />,
//         label: 'Delete',
//         onClick: (id: any) => {
//           setIsWarning(true)
//           setTopicId(id)
//         }
//       }
//     ],
//     []
//   )
//   const columnHelper = createColumnHelper<any>()
//   const columns: ColumnDef<any, any>[] = [
//     columnHelper.accessor('courseName', {
//       size: 200,
//       header: () => {
//         return (
//           <Flex gap="11px">
//             <P>Course</P>
//           </Flex>
//         )
//       },
//       cell: (props) => {
//         return (
//           <Flex gap="11px" style={{ width: '150px' }}>
//             {props.getValue()}
//           </Flex>
//         )
//       }
//     }),
//     columnHelper.accessor('subjectName', {
//       header: () => {
//         return (
//           <Flex gap="11px" style={{ width: '150px' }}>
//             <P>Subject</P>
//           </Flex>
//         )
//       },
//       cell: (props) => {
//         return (
//           <Flex gap="11px" style={{ width: '150px' }}>
//             {props.getValue()}
//           </Flex>
//         )
//       }
//     }),

//     columnHelper.accessor('chapterName', {
//       header: () => {
//         return (
//           <Flex gap="11px" style={{ width: '250px' }}>
//             <P>Chapter</P>
//           </Flex>
//         )
//       },
//       cell: (props) => {
//         return (
//           <Flex gap="11px" style={{ width: '250px' }}>
//             {props.getValue()}
//           </Flex>
//         )
//       }
//     }),
//     columnHelper.accessor('sessionCount', {
//       header: () => {
//         return (
//           <Flex gap="11px" style={{ width: '160px' }}>
//             <P>Sessions Count</P>
//           </Flex>
//         )
//       },
//       cell: (props) => {
//         return (
//           <Flex gap="11px" style={{ width: '150px' }}>
//             {props.getValue()}
//           </Flex>
//         )
//       }
//     }),
//     columnHelper.accessor('classActivities', {
//       size: 180,
//       header: () => {
//         return (
//           <Flex gap="11px">
//             <P>Class Activities</P>
//           </Flex>
//         )
//       },
//       cell: (props) => {
//         return (
//           <Flex gap="11px" style={{ width: '120px' }}>
//             {props
//               .getValue()
//               ?.map((item: any) => item.name)
//               .join(', ')}
//           </Flex>
//         )
//       }
//     }),
//     columnHelper.accessor('_id', {
//       size: 50,
//       header: () => {
//         return (
//           <Flex gap="11px">
//             <P>Action</P>
//           </Flex>
//         )
//       },
//       cell: (props) => (
//         <>
//           <PopupMenu id={props.getValue()} options={editCellOption} />
//         </>
//       )
//     })
//   ]

//   const handleScrollInfinite = (total: number, length: number) => {
//     if (total > length) {
//       setGradeListPage(gradeListPage + 1)
//       setGradeLoading(true)
//       const payload = {
//         page: gradeListPage + 1,
//         limit: 50
//       }
//       getCourses(payload)
//         .then((res: any) => {
//           const newGrade = res?.data?.data?.map((item: any) => {
//             return {
//               id: item._id,
//               label: item.name,
//               value: ''
//             }
//           })
//           setGradeData((prev) => [...prev, ...newGrade])
//         })
//         .catch((err: any) => CustomToastMessage(err.message, 'error'))
//         .finally(() => setGradeLoading(false))
//     }
//   }

//   const handleInfiniteScrollSubject = (total: number, length: number) => {
//     if (total > length) {
//       setSubjectLoading(true)
//       setSubjectListPage(subjectListPage + 1)
//       const payload = {
//         page: subjectListPage + 1,
//         limit: 50,
//         courseId: selectedGrade?.id ? selectedGrade?.id : ''
//       }
//       getSubjectData(payload)
//         .then((res: any) => {
//           const newSubject = res?.map((Subject: any) => {
//             return {
//               label: Subject.name,
//               id: Subject?._id,
//               value: ''
//             }
//           })
//           setSubject((prev) => [...prev, ...newSubject])
//         })
//         .catch((err: any) => CustomToastMessage(err.message, 'error'))
//         .finally(() => setSubjectLoading(false))
//     }
//   }

//   return (
//     <PageContainer>
//       {isWarning && (
//         <WarningPopUp
//           setIsWarning={setIsWarning}
//           isLoading={isLoading}
//           onDelete={() => handleDelete(topicId)}
//           text="Are you sure you want to delete this Topic?"
//         />
//       )}

//       <Flex
//         alignItems="center"
//         gap="10px"
//         wrap
//         style={{ marginBottom: '15px' }}
//         justifyContent="space-between"
//       >
//         <Flex gap="10px" wrap alignItems="end">
//           <SearchableDropdown
//             style={{ width: '290px' }}
//             handleScrollInfinite={(first, second) => {
//               handleScrollInfinite(first, second)
//             }}
//             total={gradeTotal}
//             length={gradeData.length}
//             isLoader={gradeLoading}
//             label={'Select Grade'}
//             placeHolder={'Please Select Grade'}
//             options={gradeData}
//             isClear={selectedGrade?.id ? true : false}
//             onSelect={(option) => {
//               setSelectedGrade(option)
//               setSubject([])
//               setSelectedSubject({ id: '', label: '', value: '' })
//             }}
//             selectedValue={selectedGrade}
//           />
//           <SearchableDropdown
//             style={{ width: '280px' }}
//             isLoader={subjectLoading}
//             label="Select Subject"
//             placeHolder="Please Select Subject"
//             options={subject}
//             isClear={selectedSubject?.id ? true : false}
//             total={subjectTotal}
//             length={subject.length}
//             handleScrollInfinite={(first: any, second: any) => {
//               handleInfiniteScrollSubject(first, second)
//             }}
//             onSelect={(data: any) => {
//               setSelectedSubject(data)
//             }}
//             selectedValue={selectedSubject}
//           />
//           <SimpleButton label="Submit" clickHandler={() => {}} />
//         </Flex>
//       </Flex>
//       <TableWrapper>
//         {isLoading && (
//           <Spinner
//             style={{
//               width: '44px',
//               height: '44px',
//               color: `${BlueButton}`,
//               position: 'absolute',
//               top: '50%',
//               left: '45%'
//             }}
//             animation={'border'}
//           />
//         )}
//         <BasicTable
//           {...{
//             maxHeight: '57vh',
//             tableData,
//             columns,
//             sorting,
//             setSorting,
//             setPage,
//             setLimit,
//             entries,
//             limit,
//             page
//           }}
//         />
//       </TableWrapper>
//     </PageContainer>
//   )
// }

// export default LessonPlanner

// const P = styled.p`
//   cursor: pointer;
// `

// const TableWrapper = styled.div`
//   & thead {
//     position: sticky;
//     top: -9px;
//     margin: 0 0 0 0;
//     height: 47px;
//   }
// `

// uncomment above code to implement lesson Planner

import { Flex, MenuBar, PageTitle } from './StyledComponents'

const LessonPlanner = () => {
  return (
    <MenuBar>
      <Flex>
        <PageTitle>Coming Soon !</PageTitle>
      </Flex>
    </MenuBar>
  )
}

export default LessonPlanner
