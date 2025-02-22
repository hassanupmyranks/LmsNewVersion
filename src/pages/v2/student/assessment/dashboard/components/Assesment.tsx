import { Flex } from '../../../../../../components/V2/styledComponents'
import { ReactComponent as CircleIcon } from '../../../../../../assets/svg/student-assignment-circleIcon.svg'
import moment from 'moment'
import {
  SubjectDeadline,
  Assignments,
  DashedBorder
} from '../../../assignments/styledComponent'

const Assessment = ({
  data,
  index,
  length,
  currentColor,
  iconColor,
  handleChangeAssessment,
  selectedAssessmentId
}: {
  data: any
  index: number
  length: number
  currentColor: any
  iconColor: any
  handleChangeAssessment: (d: any) => void
  selectedAssessmentId: string
}) => {
  console.log(data, 'data')
  return (
    <Flex
      gap="6px"
      style={{
        position: 'relative',
        minHeight: '100px',
        overflowY: 'hidden'
      }}
    >
      {data?.institute_test_name ? (
        <>
          {' '}
          <DashedBorder>
            {index !== 0 &&
              Array(4)
                .fill(null)
                .map((_, i) => <div key={i}></div>)}
            <CircleIcon />
            {index !== length - 1 &&
              Array(6)
                .fill(null)
                .map((_, i) => <div key={i}></div>)}
          </DashedBorder>
          <Assignments
            style={{ height: '100px' }}
            active={selectedAssessmentId === data?._id ? true : false}
            borderColor={iconColor}
            color={currentColor}
            onClick={() => handleChangeAssessment(data)}
          >
            <SubjectDeadline>
              <p>
                {moment(data.test_start_time).format('Do MMM, YYYY')} -{' '}
                {moment(data.test_end_time).format('Do MMM, YYYY')}
              </p>
              <h3>{data?.institute_test_name}</h3>
              <p>Total Marks - {data.total_marks}</p>
            </SubjectDeadline>
          </Assignments>
        </>
      ) : (
        'No Data'
      )}
    </Flex>
  )
}

export default Assessment
