import styled from 'styled-components'
import {
  Blue,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import VIEW from '../../../assets/Vector.png'
import NOUSER from '../../../assets/no_user.png'
import { useRef, useState } from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { DropdownOption } from '../Table/PopupMenu'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import { useHistory } from 'react-router'
import ROUTES_V2 from '../../../const/V2/routes'
export interface ListProps {
  profileImage: string
  firstName: string
  branchName: string
  _id: string
}

const List = ({ profileImage, firstName, branchName, _id }: ListProps) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const closeDropDown = () => {
    setShowDropDown(false)
  }
  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, () => setShowDropDown(false))
  const history = useHistory()

  const HandleEdit = (id: string) => {
    history.push({
      pathname: `${ROUTES_V2.EDIT_TEACHER}/${id}`,
      state: { user: id }
    })
  }

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
          </TeacherText>
        </Flex>
        <div
          style={{ cursor: 'pointer' }}
          role="presentation"
          onClick={() => {
            setShowDropDown(true)
          }}
        >
          {!showDropDown && <Image src={VIEW} alt="" />}
        </div>
        {showDropDown && (
          <DropdownPopup ref={popupRef}>
            <DropdownOption selected={'Edit'}>
              <Flex
                onClick={() => {
                  HandleEdit(_id)
                  closeDropDown()
                }}
                style={{ justifyContent: 'space-between' }}
              >
                <EditIcon />
                Edit
              </Flex>
            </DropdownOption>
          </DropdownPopup>
        )}
      </TabContainer>
    </div>
  )
}

export default List

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
`

const Image = styled.img`
  margin-right: 10px;
  cursor: pointer;
`

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
