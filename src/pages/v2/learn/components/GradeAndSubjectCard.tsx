import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SmallDropdown from '../../../../components/V2/Form/SmallDropdown'
import { Flex, WrapperCard } from '../../../../components/V2/styledComponents'

import SubjectCard from './SubjectCard'
import { getDropDownOptions } from '../../../../helpers/V2/dropdown'
import {
  CourseDetailProps,
  SubjectDetailProps,
  GetLearnModuleSubjectResponse
} from '../types'
import { getLearnCourseData } from '../../../../helpers/V2/apis'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import styled from 'styled-components'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'

const GradeAndSubjectCard = ({
  onSelectGrade,
  onSelectSubject,
  courseDetail,
  subjectDetail,
  subjectData,
  setSubjectDetail,
  setCourseDetail,
  loader
}: {
  onSelectGrade: (id: string) => void
  onSelectSubject: (id: string) => void
  courseDetail: CourseDetailProps
  subjectDetail: SubjectDetailProps
  setSubjectDetail: Dispatch<SetStateAction<SubjectDetailProps>>
  setCourseDetail: Dispatch<SetStateAction<CourseDetailProps>>
  subjectData: GetLearnModuleSubjectResponse[]
  loader: boolean
}) => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const [courseData, setCourseData] = useState<CourseDetailProps[]>([])
  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)

  useEffect(() => {
    if (
      userInfoV2.role === 'student' &&
      userInfoV2?.courses &&
      userInfoV2?.courses?.length > 0
    ) {
      onSelectGrade(userInfoV2?.courses[0]?._id)
      setCourseData(userInfoV2?.courses)
    } else {
      SetIsCourseLoading(true)
      getLearnCourseData({ page: 1, limit: 120 })
        .then((res: CourseDetailProps[]) => {
          setCourseData(res)
          SetIsCourseLoading(false)
        })
        .catch((err: any) => {
          SetIsCourseLoading(false), CustomToastMessage(err.message, 'error')
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCourseData, userInfoV2.courses, userInfoV2.role])

  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsSmall(true)
      } else {
        setIsSmall(false)
      }
    }

    window.addEventListener('resize', handleResize)
    // Run once to handle initial load
    handleResize()
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getStyles = () => {
    if (!isSmall) {
      return {
        height: 'auto',
        overflow: 'visible'
        // Add other styles for small screens
      }
    } else {
      return {
        overflow: 'visible',
        padding: '10px',
        height: '330px'
      }
    }
  }

  return (
    <WrapperCard style={getStyles()}>
      {userInfoV2.role === 'student' ? <Subject>My Subjects</Subject> : ''}
      <div
        style={
          !isSmall
            ? { display: 'flex', width: '100%' }
            : {
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                gap: '10px'
              }
        }
      >
        {userInfoV2.role !== 'student' && (
          <SmallDropdown
            label="Select Grade"
            onSelect={({ id, label }) => {
              onSelectGrade(id)
              setCourseDetail({
                ...courseDetail,
                _id: id,
                name: label
              })
            }}
            options={getDropDownOptions(courseData, '_id', 'name')}
            style={{ maxWidth: '350px', width: '290px' }}
            placeholder="Select Grade"
            isLoading={isCourseLoading}
          />
        )}
        <Flex
          gap="16px"
          style={
            !isSmall
              ? {
                  overflowX: 'auto',
                  width: '100%',
                  marginLeft: '20px'
                }
              : {
                  overflowX: 'auto',
                  width: '100%',
                  marginLeft: '0px'
                }
          }
        >
          {loader ? (
            <Spinner
              style={{
                width: '24px',
                height: '24px',
                color: `${BlueButton}`,
                margin: '36px 100px 18px'
              }}
              animation={'border'}
            />
          ) : (
            subjectData &&
            subjectData?.map((subject: GetLearnModuleSubjectResponse) => {
              return (
                <SubjectCard
                  onSelectSubject={() => {
                    setSubjectDetail({
                      ...subjectDetail,
                      id: subject._id,
                      name: subject.name
                    })
                    onSelectSubject(subject._id)
                  }}
                  logo={subject.icon}
                  key={subject._id}
                  active={subject._id === subjectDetail.id}
                  details={`${subject.materialCount} ${
                    subject.isLab === true ? 'Videos' : 'Materials'
                  }`}
                  subjectName={subject.name}
                />
              )
            })
          )}
        </Flex>
      </div>
    </WrapperCard>
  )
}

export default GradeAndSubjectCard
const Subject = styled.h2`
  font-family: 'DM Sans';
  color: rgba(43, 54, 116, 1);
  font-weight: 700;
  font-size: 25px;
`
