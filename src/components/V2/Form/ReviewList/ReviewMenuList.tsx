import styled from 'styled-components'
// import NOUSER from '../../../../assets/no_user.png'
import {
  Blue,
  SecondaryGray600,
  White
} from '../../../../const/V2/stylingVariables'
import { ButtonV2 } from '../../styledComponents'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
export interface ListProps {
  profileImage: string
  submittedUser: {
    firstName: string
  }
  submittedAssignments: {
    submittedOn: string
  }

  //
  _id: string
  name: string
  type: string
  deadLine: string
  reviewCompleted: boolean
}

const List = ({ _id, name, deadLine }: ListProps) => {
  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-GB', options)
  }

  // const DeadLine = new Date(deadLine)
  // const SubmittedOn = new Date(submittedAssignments.submittedOn)
  const history = useHistory()

  const handleReviewStudentAssignment: any = (assignmentId: string) => {
    history.push({
      pathname: `${ROUTES_V2.REVIEW_ASSIGNMENT_STUDENT}/${assignmentId}`,
      state: {
        id: assignmentId
      }
    })
  }

  return (
    <TabContainer>
      {/* <TeacherImage
        src={
          profileImage == '' ||
          profileImage == null ||
          profileImage == undefined
            ? NOUSER
            : profileImage
        }
        alt=""
      />{' '} */}

      <Block>
        <Flex>
          <TeacherText>
            <Value>{name}</Value>
          </TeacherText>
          <TeacherText>
            <Label>{formatDate(deadLine)}</Label>
          </TeacherText>
          <ButtonV2
            style={{ padding: '3px 12px' }}
            onClick={() => handleReviewStudentAssignment(_id)}
          >
            Review
          </ButtonV2>{' '}
        </Flex>
        {/* {SubmittedOn <= DeadLine ? (
          <Completed>On Time</Completed>
        ) : (
          <Pending>Late</Pending>
        )} */}
      </Block>
    </TabContainer>
  )
}

export default List

export const TeacherImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`

export const TabContainer = styled.div`
  height: auto;
  display: flex;
  padding: 20px 20px 12px 20px;
  background: ${White};
  border-radius: 20px;
  width: auto;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  margin: 0px 16px 18px 16px;
`

export const Label = styled.p`
  color: ${SecondaryGray600};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

export const Value = styled.p`
  color: ${Blue};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.48px;
  line-height: 20px;
`
export const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const TeacherText = styled.div`
  margin-left: 15px;
  width: 33%;
`
export const DropdownPopup = styled.div`
  padding: 0px 10px;
  width: 80px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  background-color: ${White};
`
export const Completed = styled.div`
  font-size: 14px;
  font-weight: 600;
  height: 27px;
  width: 80px;
  background-color: #e4fcf4;
  color: #01b574;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13.5px;
  margin-top: 5px;
  margin-left: 8px;
`

export const Pending = styled.div`
  font-size: 14px;
  font-weight: 600;
  height: 27px;
  width: 80px;
  background-color: #fcf4f4;
  color: #ff8f6b;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13.5px;
  margin-top: 5px;
  margin-left: 8px;
`

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
