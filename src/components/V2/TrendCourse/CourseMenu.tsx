import styled from 'styled-components'
import { Blue, White } from '../../../const/V2/stylingVariables'
import NOUSER from '../../../assets/no_user.png'
import ApexChart8 from '../../../pages/v2/dashboard/PieChartCommon'
export interface ListProps {
  SubjectLogo: string
  SubjectName: string
  LessonStatus: string
  LessonPercent: string
  graphColor: string
  _id: string
}

const ListCourse = ({
  SubjectLogo,
  SubjectName,
  LessonStatus,
  LessonPercent,
  graphColor
}: ListProps) => {
  return (
    <div>
      <TabContainer>
        <Flex>
          <SubjectImage
            src={
              SubjectLogo == '' ||
              SubjectLogo == null ||
              SubjectLogo == undefined
                ? NOUSER
                : SubjectLogo
            }
            alt=""
          />
          <TeacherText>
            <Value>{SubjectName}</Value>
            <Label>{LessonStatus} lessons completed</Label>
          </TeacherText>
        </Flex>
        <ApexChart8
          Count={LessonPercent}
          Color={graphColor}
          Height={90}
          Width={90}
          Size={'80'}
          FontSize={'10'}
          StartAngle={0}
          EndAngle={360}
        />
      </TabContainer>
    </div>
  )
}

export default ListCourse

const SubjectImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
`

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 12px;
  background: ${White};
  border-radius: 20px;
  width: auto;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  margin: 0px 18px 18px 18px;
`

const Label = styled.p`
  color: #a7a7a7;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  font-family: 'Rubik';
  letter-spacing: -0.28px;
`

const Value = styled.p`
  color: ${Blue};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.48px;
  line-height: 20px;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
`
const TeacherText = styled.div`
  margin-left: 15px;
`
