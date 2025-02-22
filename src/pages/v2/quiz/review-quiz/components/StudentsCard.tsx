import {
  StudentCard,
  StudentCardAttemptedSpan,
  StudentCardP,
  StudentCardPendingSpan,
  StudentCardReviewedSpan,
  StudentCardUnAttemptedSpan
} from '../../create-quiz/components/styledComponents'

const StudentsCard = ({
  studentData,
  handleReviewStudent
}: {
  studentData?: any
  handleReviewStudent: (StudentID: string, Status: string) => void
}) => {
  return (
    <>
      {studentData.map((item: any, index: any) => (
        <StudentCard
          key={index}
          onClick={() => handleReviewStudent(item._id, item.quizStatus)}
        >
          <div style={{ width: '100%', display: 'flex', gap: '20px' }}>
            <img
              src={item?.profileImage}
              alt=""
              width="45px"
              style={{ borderRadius: '50%' }}
            />

            <StudentCardP>
              {item?.firstName + (item?.lastName || '')}
            </StudentCardP>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <StudentCardP style={{ width: '120px' }}>
              {item.mobile ? item.mobile : 'NA'}
            </StudentCardP>
            {item && item.status === 'Reviewed' ? (
              <StudentCardReviewedSpan>{item.status}</StudentCardReviewedSpan>
            ) : (
              <StudentCardPendingSpan>{item.status}</StudentCardPendingSpan>
            )}
            {item && item.quizStatus === 'Attempted' ? (
              <StudentCardAttemptedSpan>
                {item.quizStatus}
              </StudentCardAttemptedSpan>
            ) : (
              <StudentCardUnAttemptedSpan>
                {item.quizStatus}
              </StudentCardUnAttemptedSpan>
            )}
          </div>
        </StudentCard>
      ))}
    </>
  )
}

export default StudentsCard
