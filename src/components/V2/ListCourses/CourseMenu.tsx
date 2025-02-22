import styled from 'styled-components'
export interface ListProps {
  courseName: string
  subjectName: string
  createdAt: string
  topicName: string
}

const formatDate = (dateString: any) => {
  const date = new Date(dateString)
  const options: any = { day: 'numeric', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

const ListCourse = ({
  courseName,
  subjectName,
  createdAt,
  topicName
}: ListProps) => {
  return (
    <TabContainer>
      <Flex style={{ width: '100%' }}>
        <TeacherText>
          <TopicValue>{topicName}</TopicValue>
          <Flex style={{ justifyContent: 'space-between', margin: '5px 0px' }}>
            <Value>
              {courseName} - {subjectName}
            </Value>
          </Flex>
          <Label>{formatDate(createdAt)}</Label>
        </TeacherText>
      </Flex>
    </TabContainer>
  )
}

export default ListCourse

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background-image: linear-gradient(rgb(167, 239, 247), #ffffff);
  border-radius: 20px;
  width: auto;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  margin: 0px 18px 18px 18px;
`

const Label = styled.p`
  color: #808080;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  font-family: 'Rubik';
  letter-spacing: -0.28px;
`

const Value = styled.p`
  color: #1587a1;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.48px;
  line-height: 22px;
`
const TopicValue = styled.p`
  font-family: 'DM Sans';
  color: #343434;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.48px;
  line-height: 20px;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`
const TeacherText = styled.div`
  margin-left: 5px;
`
