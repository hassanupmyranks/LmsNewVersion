// import { useEffect, useState } from "react"
// import { PageContainer } from "../../../../components/V2/styledComponents"
// import { DropdownContainer } from "../../../../components/V2/Table/PopupMenu"
// import { CourseInfo, CreateCourseWrapper, DateIconWrap, DotsIcon, ListLoader, NewSubHeading, SubjectDate, SubjectList, SubjectName, SubLogoAllign } from "../../assessment/addCourseForm/styledComponents"
// import { getStudentQuizApi } from "../../../../helpers/V2/apis"
// import { Spinner } from "react-bootstrap"
// import { BlueButton } from '../../../../const/V2/stylingVariables'
// import { ReactComponent as FireIcon } from '../../../../assets/svg/quiz-icon.svg'
// import styled from "styled-components"

import styled from 'styled-components'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import {
  ColumnDef,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table'
import { ReactComponent as DownArrow } from '../../../../assets/svg/darkblue-down-arrow.svg'
import { getStudentQuizApi } from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { ReactComponent as FireIcon } from '../../../../assets/svg/quiz-icon.svg'
import { ShowStatus } from '../../assessment/table/tests'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'

// const QuizList = () => {

//     const [isLoadingList, setIsLoadingList] = useState(true)
//     const [list, setList] = useState<any>()

//     useEffect(() => {
//         getStudentQuizApi().then((response) => {
//             setIsLoadingList(false)
//             setList(response.data)
//         })
//     }, [])

//     return (
//         <PageContainer>
//             <NewSubHeading style={{ margin: '0px 0px 20px 0px', fontSize: '24px' }}>Quiz Corner</NewSubHeading>
//             <CreateCourseWrapper style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
//                 <div style={{ overflow: 'auto' }}>
//                     {isLoadingList ? (
//                         <ListLoader>
//                             <Spinner
//                                 style={{
//                                     color: `${BlueButton}`
//                                 }}
//                                 animation={'border'}
//                             />
//                         </ListLoader>
//                     ) : (
//                         list && list.map((item: any, index: any) => (
//                             <SubjectList style={{
//                                 border: '4px outset', borderColor: 'rgb(159, 205, 248)',
//                                 marginBottom: '15px'
//                             }} key={index}>
//                                 <SubLogoAllign>
//                                     <LogoWrapper><FireIcon /></LogoWrapper>
//                                     <div>
//                                         <SubjectName>{item.name}</SubjectName>
//                                         <CourseInfo>Type - {item.quizType}</CourseInfo>
//                                     </div>
//                                 </SubLogoAllign>
//                                 <DateIconWrap>
//                                     <SubjectDate>Time {item.duration} mins</SubjectDate>
//                                     <DropdownContainer>
//                                         <DotsIcon />
//                                     </DropdownContainer>
//                                 </DateIconWrap>
//                             </SubjectList>
//                         )))}
//                 </div>
//             </CreateCourseWrapper>
//         </PageContainer>
//     )
// }

// export default QuizList

const QuizList = () => {
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)

  useEffect(() => {
    setIsLoading(true)
    getStudentQuizApi({
      skip: page * limit,
      limit
    })
      .then((response) => {
        setTableData(response.data)
        setEntries(response?.total || 0)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [page, limit])

  const handleChange = (id: any) => {
    history.push(`${ROUTES_V2.STUDENT_QUIZ_SUBMIT}/${id}`)
  }

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('name', {
      size: 200,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Name</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="15px">
            <LogoWrapper>
              <FireIcon />
            </LogoWrapper>
            <p>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('quizType', {
      size: 200,
      header: () => {
        return (
          <Flex>
            <P>Quiz Type</P>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('duration', {
      size: 200,
      header: () => {
        return (
          <Flex>
            <P>Quiz Duration</P>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('totalMarks', {
      size: 200,
      header: () => {
        return (
          <Flex>
            <P>Total Marks</P>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('isReviewed', {
      size: 200,
      header: () => {
        return (
          <Flex>
            <P>Status</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex>
            <p>
              {props.row.original.isReviewed === true ? (
                <ShowStatus bgColor="#01B574" style={{ width: '90px' }}>
                  Reviewed
                </ShowStatus>
              ) : props.row.original.attempted ? (
                <ShowStatus bgColor="#f39d2d" style={{ width: '90px' }}>
                  Attempted
                </ShowStatus>
              ) : (
                <ShowStatus
                  bgColor="#197bbd"
                  style={{ width: '90px', cursor: 'pointer' }}
                  onClick={() => handleChange(props.row.original._id)}
                >
                  Start
                </ShowStatus>
              )}
            </p>
          </Flex>
        )
      }
    })
  ]
  return (
    <PageContainer>
      <TableWrapper>
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
        <BasicTable
          {...{
            maxHeight: '70vh',
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
    </PageContainer>
  )
}

export default QuizList

const TableWrapper = styled.div`
  // height: 100%;
  // overflow-y: auto;

  & thead {
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
  }
`
const P = styled.p`
  cursor: pointer;
`
const LogoWrapper = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgb(83, 170, 228);
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 0px 14px 0px 0px; */
`
