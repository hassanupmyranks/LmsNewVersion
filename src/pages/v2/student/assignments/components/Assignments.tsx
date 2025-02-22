import { Flex } from '../../../../../components/V2/styledComponents'
import {
  Assignments,
  DashedBorder,
  IconSec,
  SubjectDeadline
} from '../styledComponent'
import { ReactComponent as CircleIcon } from '../../../../../assets/svg/student-assignment-circleIcon.svg'
import moment from 'moment'
import { AssignmentsData } from '../types'
import ReviewedButton from './ReviewedButton'
import { DocLogo } from '../../../dashboard/ReiewAssignment/styledComponents'
import VideoIcon from '../../../../../assets/video player logo.png'
import AudioIcon from '../../../../../assets/audioplayer.png'
import PdfIcon from '../../../../../assets/pdf logo.png'
import PptxIcon from '../../../../../assets/pptx logo.jpeg'
import WordIcon from '../../../../../assets/word logo.png'

const Assignment = ({
  data,
  index,
  length,
  currentColor,
  iconColor,
  handleChangeAssignment,
  selectedAssignmentId
}: {
  data: AssignmentsData
  index: number
  length: number
  currentColor: any
  iconColor: any
  handleChangeAssignment: (d: any) => void
  selectedAssignmentId: string
}) => {
  const AssignmentfileExtension =
    data?.attachmentType?.split('.').pop()?.toLowerCase() || 'unknown'
  return (
    <Flex
      gap="6px"
      style={{
        position: 'relative',
        minHeight: '100px',
        overflowY: 'hidden'
      }}
    >
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
        style={{ height: '120px' }}
        active={selectedAssignmentId === data?._id ? true : false}
        borderColor={iconColor}
        color={currentColor}
        onClick={() => handleChangeAssignment(data)}
      >
        <SubjectDeadline>
          <p>Deadline - {moment(data.deadLine).format('Do MMM, YYYY')}</p>
          <h3>
            {data?.subjectName} - {data.name}
          </h3>
        </SubjectDeadline>
        <IconSec>
          {data && data?.status === 'reviewed' ? (
            <ReviewedButton label={'Reviewed'} />
          ) : (
            <DocLogo
              style={{ height: '30px', width: '30px' }}
              src={
                AssignmentfileExtension === 'mp4'
                  ? VideoIcon
                  : AssignmentfileExtension === 'mp3'
                  ? AudioIcon
                  : AssignmentfileExtension === 'pptx'
                  ? PptxIcon
                  : AssignmentfileExtension === 'document'
                  ? WordIcon
                  : PdfIcon
              }
            />
          )}
        </IconSec>
      </Assignments>
    </Flex>
  )
}

export default Assignment
