import styled from 'styled-components'
import {
  Blue,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import NOUSER from '../../../assets/no_user.png'
import { AlignGraphOne } from '../../../pages/v2/dashboard/SuperAdminDashoard/styledComponents'
import ApexChart4 from '../../../pages/v2/dashboard/circleChart'

export interface ListProps {
  profileImage: string
  firstName: string
  branchName: string
  courseName: string
  // Names: any
  // Count: any
  percentages: any
  DataRole: any
}

const ListMenuForTopPerformers = ({
  profileImage,
  firstName,
  branchName,
  courseName,
  // Names,
  // Count,
  percentages,
  DataRole
}: ListProps) => {
  return (
    <div>
      <TabContainer>
        <Flex>
          <TeacherImage
            src={
              profileImage == '' ||
              profileImage == null ||
              profileImage == undefined
                ? NOUSER
                : profileImage
            }
            alt=""
          />
          <TeacherText>
            <Value>{firstName}</Value>
            <Label>{branchName}</Label>
            <Label>{courseName}</Label>
          </TeacherText>
        </Flex>
        <div
          style={{ cursor: 'pointer' }}
          role="presentation"
          onClick={() => {}}
        >
          {/* {!showDropDown && <Image src={VIEW} alt="" />} */}
          <AlignGraphOne>
            <ApexChart4
              // Names={Names}
              // Count={Count}
              percentages={percentages}
              DataRole={DataRole}
            />
          </AlignGraphOne>
        </div>
      </TabContainer>
    </div>
  )
}

export default ListMenuForTopPerformers

const TeacherImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: ${White};
  border-radius: 20px;
  width: auto;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  margin: 0px 18px 18px 18px;
  overflow-y: auto;
  scrollbar-width: 2px;
`

// const Image = styled.img`
//   margin-right: 10px;
//   cursor: pointer;
// `

const Label = styled.p`
  color: ${SecondaryGray600};
  font-size: 12px;
  font-weight: 500;
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
export const DropdownPopup = styled.div`
  padding: 0px 10px;
  width: 80px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  background-color: ${White};
`
