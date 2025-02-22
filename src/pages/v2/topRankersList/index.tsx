import styled from 'styled-components'
import { Flex, PageContainer } from '../../../components/V2/styledComponents'
import { useEffect, useState } from 'react'
import { GetNewAllToppersResponce } from '../../../utils/types'
import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import BasicTable from '../../../components/V2/Table/BasicTable'
import CorrectIcon from '../../../assets/correct.png'
import InCorrectIcon from '../../../assets/incorrect.png'
import TimerIcon from '../../../assets/timer.png'
import { useLocation } from 'react-router-dom'
import { getTestTopperList } from '../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import DownloadComponent from './DownloadExcel'

const TopRankersList = () => {
  const [tableData, setTableData] = useState<GetNewAllToppersResponce[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [myTestId, setMyTestId] = useState<number>(0)
  // const [isLoading, setIsLoading] = useState(false)
  // const [popup, setpopup] = useState(false)
  // const [passId, setPassId] = useState<any>()
  const location: any = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const id: any = queryParams.get('id')

    setMyTestId(id)
    getTestTopperList({ testId: id, page: page + 1, limit })
      .then((res) => {
        if (res) {
          setTableData(res.data)
        }
        if (res.total) {
          setEntries(res.total)
        }
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
  }, [location.state?.id, limit, page, location.search])

  const columnHelper: any = createColumnHelper<GetNewAllToppersResponce>()
  const columns: ColumnDef<GetNewAllToppersResponce, any>[] = [
    columnHelper.accessor('firstName', {
      size: 200,
      header: '',

      cell: (props: any) => {
        const image = props.row.original.profileImage
        const last = props.row.original.lastName
        return (
          <Flex
            gap="1px"
            style={{ minWidth: '150px', width: 'auto', marginRight: '10px' }}
          >
            <IconView2 src={image} alt="" />
            <Name>
              {props.getValue()}
              {last}
            </Name>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('batchName', {
      size: 200,
      header: '',

      cell: (props: any) => {
        return (
          <Flex
            gap="11px"
            justifyContent="center"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <Content>
              <Name3>Batch / Section Name</Name3>
              <Name4>{props.getValue()}</Name4>
            </Content>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('totalCorrectAnswers', {
      size: 200,
      header: '',

      cell: (props: any) => {
        const Wrong = props.row.original.totalIncorrectAnswers

        return (
          <Flex
            gap="5px"
            style={{ minWidth: '200px', width: 'auto', marginRight: '10px' }}
          >
            <img width="15px" src={CorrectIcon} alt="" />
            <Correct>{props.getValue()}</Correct>
            <Correct>correct</Correct>
            <img width="15px" src={InCorrectIcon} alt="" />
            <Correct>{Wrong}</Correct>
            <Correct>incorrect</Correct>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('totalDuration', {
      size: 200,
      header: '',

      cell: (props: any) => {
        return (
          <Flex
            gap="11px"
            style={{ minWidth: '200px', width: 'auto', marginRight: '10px' }}
          >
            <img width="45px" src={TimerIcon} alt="" />
            <Content>
              <Name>Time taken</Name>
              <Name2> {props.getValue()} minutes</Name2>
            </Content>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('topSkillSubject', {
      size: 200,
      header: '',

      cell: (props: any) => {
        const Name = props.row.original?.highestMarkSubjectDetails?.subjectName
        const mark =
          props.row.original?.highestMarkSubjectDetails?.scoredMarks === 0
            ? 0
            : props.row.original?.highestMarkSubjectDetails?.totalMarks /
              props.row.original?.highestMarkSubjectDetails?.scoredMarks
        return (
          <Flex
            gap="11px"
            style={{ minWidth: '170px', width: 'auto', marginRight: '10px' }}
          >
            <Content>
              <Name3>Top Skill</Name3>
              <Name4>{`${Name} -> ${mark.toFixed(2)}%`}</Name4>
            </Content>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('totalSkippedAnswers', {
      size: 200,
      header: '',

      cell: (props: any) => {
        const Inr: any = props?.row?.original?.totalIncorrectAnswers
        const Crt: any = props?.row?.original?.totalCorrectAnswers
        const Skp: any = props.getValue()
        const safeAddition = (
          num1: number | undefined,
          num2: number | undefined,
          num3?: number | undefined
        ): number => {
          // Ensure both numbers are defined, or treat them as 0 if undefined
          const safeNum1 = num1 ?? 0
          const safeNum2 = num2 ?? 0
          const safeNum3 = num3 ?? 0
          return safeNum1 + safeNum2 + safeNum3
        }
        const result = safeAddition(Inr, Crt, Skp)
        const result2 = safeAddition(Inr, Crt)
        return (
          <Flex
            gap="11px"
            style={{ minWidth: '200px', width: 'auto', marginRight: '10px' }}
          >
            <Content>
              <Name3>Attempted Questions</Name3>
              <Name4>
                {result2} of {result}
              </Name4>
            </Content>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('totalScoredMarks', {
      size: 200,
      header: '',

      cell: (props: any) => {
        return (
          <Flex
            gap="11px"
            justifyContent="center"
            style={{ width: 'auto', minWidth: '120px' }}
          >
            <Name>
              {props?.row?.original?.totalScoredMarks}/
              {props?.row?.original?.totalTestMarks}
            </Name>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('percentageScore', {
      size: 200,
      header: '',

      cell: (props: any) => {
        return (
          <Flex
            gap="11px"
            justifyContent="center"
            style={{ width: 'auto', minWidth: '120px' }}
          >
            <Name>{props.getValue()}%</Name>
          </Flex>
        )
      }
    })
  ]
  return (
    <div>
      <QuestionTopicContainer>
        <Title>Test Statistics</Title>
        <Test>JEE Custom Test - Grade 6, Batch / Section, 3hours</Test>
      </QuestionTopicContainer>
      <PageContainer style={{ height: '100%' }}>
        <Flex justifyContent="space-between">
          <Rankers>TOP RANKERS</Rankers>
          <DownloadComponent row={myTestId} />
        </Flex>

        <TableWrapper>
          <BasicTable
            {...{
              maxHeight: '58vh',
              shadow: 'yes',
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
    </div>
  )
}
export default TopRankersList

const Rankers = styled.p`
  font-family: 'DM Sans';
  font-weight: 800;
  font-size: 24px;
  line-height: 28px;
  color: #0512c5;
  padding: 20px 0px 0px 20px;
`

const Title = styled.p`
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: rgba(12, 9, 42, 1);
`
const Test = styled.p`
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: rgba(12, 9, 42, 1);
`
const IconView2 = styled.img`
  height: 45px;
  width: 45px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 10px;
`

const TableWrapper = styled.div`
  height: 60vh;
  overflow: auto;

  & thead {
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
    display: none;
  }
`
const Name = styled.p`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 21px;
  line-height: 31.5px;
  color: rgba(91, 114, 248, 1);
`
const Name2 = styled.p`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: rgba(91, 114, 248, 1);
`
const Name3 = styled.p`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 19px;
  line-height: 28.5px;
  color: rgba(43, 54, 116, 1);
`
const Name4 = styled.p`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: rgba(43, 54, 116, 1);
`
const Correct = styled.p`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 12px;
  line-height: 16.8px;
  color: rgba(43, 54, 116, 1);
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
`
const QuestionTopicContainer = styled.div`
  margin-left: 25px;
  height: auto;
`
