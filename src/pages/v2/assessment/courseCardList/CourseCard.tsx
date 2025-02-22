import { useEffect, useState } from 'react'
import CourseCard from '../../../../components/V2/CourseCard'
import { getAllCourses } from '../../../../helpers/V2/apis'
import { GetCourseResponse } from '../../../../utils/types'
import { MainWrapper } from './styledComponents'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'

const CourseCardList = () => {
  const [list, setList] = useState<[GetCourseResponse]>()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteCourse, setIsDeleteCourse] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getAllCourses()
      .then((response) => {
        setList(response.data.data)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [isDeleteCourse])

  return (
    <MainWrapper>
      {isLoading && (
        <Spinner
          style={{
            color: `${BlueButton}`,
            position: 'absolute',
            top: '50%',
            left: '50%'
          }}
          animation={'border'}
        />
      )}
      {list?.map((item, index) => (
        <CourseCard
          key={index}
          courselogoImage={item.icon}
          courseHeading={item.name}
          courseDate={item.createdAt}
          subjectlogoImage1={
            (item.subjects &&
              item.subjects[0] &&
              item.subjects[0].subjectIcon) ||
            ''
          }
          subjectlogoImage2={
            (item.subjects &&
              item.subjects[0 + 1] &&
              item.subjects[0 + 1].subjectIcon) ||
            ''
          }
          subjectsLength={item.subjects && item.subjects.length - 2}
          OnButtonClick={() => setIsDeleteCourse(!isDeleteCourse)}
          OnClickHeart={() => {}}
          subject1={
            (item.subjects &&
              item.subjects[0] &&
              item?.subjects[0]?.subjectName) ||
            ''
          }
          subject2={
            (item.subjects &&
              item.subjects[0] &&
              item?.subjects[0 + 1]?.subjectName) ||
            ''
          }
          subjectsList={item.subjects}
          CourseId={item._id}
        />
      ))}
    </MainWrapper>
  )
}

export default CourseCardList
