import CourseItemCheckbox from '../../../../../components/V2/Form/CourseItemCheckbox'
import {
  SubTopicsDetails,
  SubjectTopicsDetails
} from '../../../../../utils/types'
import {
  ChaptersContainer,
  ContainerBody,
  ContainerHeading
} from './styledComponents'

const CoursesAndSubjectsSection = ({
  isCountRequired,
  courses,
  handleCourseChildChaptersChecked,
  handleCourseChecked,
  selectedCourse,
  selectedSubject,
  isTopicsLoading
}: {
  isCountRequired?: boolean
  selectedCourse: any
  selectedSubject: string[]
  courses: any[]
  handleCourseChecked: (data: SubjectTopicsDetails) => void
  handleCourseChildChaptersChecked: (childOption: SubTopicsDetails) => void
  isTopicsLoading: boolean
}) => {
  return (
    <ChaptersContainer>
      <ContainerHeading>
        <h3>Choose Course {isCountRequired ? courses.length || 0 : ''}</h3>
      </ContainerHeading>
      {!isTopicsLoading ? (
        <ContainerBody>
          {courses.map((item: any) => (
            <CourseItemCheckbox
              key={`chapters_and_topics_${item._id}`}
              {...{
                children: item.subjects || [],
                isChecked: selectedCourse._id == item._id ? true : false,
                label: item.name,
                totalQuestions: item.questions_count,
                selectedSubject,
                onCheck: () => handleCourseChecked(item),
                onChildCheck: handleCourseChildChaptersChecked
              }}
            />
          ))}
        </ContainerBody>
      ) : (
        <h5>Loading...</h5>
      )}
    </ChaptersContainer>
  )
}

export default CoursesAndSubjectsSection
