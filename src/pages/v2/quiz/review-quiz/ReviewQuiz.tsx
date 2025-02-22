import React, { useEffect, useState } from 'react'
import { ReactComponent as ReviewAssignmentOnLogoSVG } from '../../../../assets/svg/add-qcon.svg'
import { ReactComponent as ReviewAssignmentOffLogoSVG } from '../../../../assets/svg/qc-of.svg'
import { ReactComponent as ReviewQcOffLogoSVG } from '../../../../assets/svg/reviewqc-of.svg'
import { ReactComponent as ReviewQcOnLogoSVG } from '../../../../assets/svg/reviewqc-on.svg'
import styled from 'styled-components'

import { getTeacherSubmittedQuizAPI } from '../../../../helpers/V2/apis'
import {
  BlueButton,
  CoolGray10,
  SecondaryGray600,
  White
} from '../../../../const/V2/stylingVariables'
import ReviewQuizTable from './ReviewQuizTable'
import { Spinner } from 'react-bootstrap'
interface HeadingProps {
  isActive: boolean
}
const ReviewQuiz = () => {
  const columns = [
    {
      header: () => {
        return (
          <p style={{ minWidth: '100px', marginLeft: '10px' }}>Quiz Name</p>
        )
      },
      accessorKey: 'quizName'
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
    //       <p style={{ minWidth: '90px', marginLeft: '10px' }}>Question Type</p>
    //     )
    //   },
    //   accessorKey: 'questionType'
    // },
    {
      header: () => {
        return (
          <p style={{ minWidth: '100px', marginLeft: '10px' }}>
            Batch / Section
          </p>
        )
      },
      accessorKey: 'batchName'
    },
    {
      header: () => {
        return (
          <p style={{ minWidth: '130px', marginLeft: '10px' }}>
            Total Students Attempted
          </p>
        )
      },
      accessorKey: 'attemptedStudents'
    },
    {
      header: () => {
        return (
          <p style={{ minWidth: '130px', marginLeft: '10px' }}>
            Total Student Un-Attempted
          </p>
        )
      },
      accessorKey: 'unattemptedStudents'
    },
    {
      header: () => {
        return (
          <p style={{ minWidth: '100px', marginLeft: '10px' }}>Total Marks</p>
        )
      },
      accessorKey: 'totalMarks'
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
      accessorKey: 'ReviewNow',
      onClick: () => {
        console.log('Clicked on column:')
      }
    }
  ]

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const payload = {
      limit: 100
    }
    setIsLoading(true)
    getTeacherSubmittedQuizAPI(payload)
      .then((res) => {
        if (res) {
          const QuizData = res.map((item: any) => ({
            ...item,
            reviewRequired: item.isReviewed ? 'Yes' : 'No',
            ReviewNow: item.isReviewed ? 'Reviewed' : 'Review Now',
            totalMarks:
              item.quizType == 'test'
                ? item.totalMarks
                : item.quizType == 'assignment'
                ? 'NA'
                : '',
            duration:
              item.quizType == 'test'
                ? `${item.duration} mins`
                : item.quizType == 'assignment'
                ? new Date(item.endDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                : ''
          }))
          setData(QuizData)
        }
      })
      .catch((error) => console.log({ Error: error }))
      .finally(() => setIsLoading(false))
  }, [])

  data.forEach((item: any) => {
    item.reviewRequired = item.isReviewed ? 'Yes' : 'No'
    item.ReviewNow = item.isReviewed ? 'Reviewed' : 'Review Now'
    item.MyType = item.quizType
  })

  return (
    <MyContainer>
      <TableWrapper>
        <TableScroll>
          {isLoading ? (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '45%',
                left: '50%'
              }}
              animation={'border'}
            />
          ) : (
            data && (
              <ReviewQuizTable
                tableData={data}
                columns={columns}
                setData={setData}
              />
            )
          )}
        </TableScroll>
      </TableWrapper>
    </MyContainer>
  )
}
export default ReviewQuiz

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

export const MyContainer = styled.div`
  background-color: ${White};
  height: 90%;
  width: auto;
  /* overflow: scroll; */
  border-radius: 1rem;
  padding: 25px;
  margin: 20px;
  /* display: flex; */

  @media (max-width: 768px) {
    padding: 10px;
  }
`
export const TableWrapper = styled.div`
  /* max-height: 100%; */
`

export const TableHeader = styled.div`
  margin-left: 20px;
  height: 9%;
  font-size: 20px;
  font-weight: 700;
  font-family: 'DM Sans';
  color: '#5E6483';
`

export const TableScroll = styled.div`
  /* height: 58%; */
  /* overflow-y: auto;
  overflow-x: hidden; */
  /* ::-webkit-scrollbar {
    width: 4px;
  } */

  /* ::-webkit-scrollbar-thumb {
    background-color: ${SecondaryGray600};
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${CoolGray10};
  } */
`

export const QuestionHeading = styled.h1`
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 34px;
  line-height: 42px;
  color: rgba(43, 54, 116, 1);
  margin-left: 20px;
`
