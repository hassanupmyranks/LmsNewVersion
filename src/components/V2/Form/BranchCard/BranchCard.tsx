import { ReactComponent as InstituteIcon } from '../../../../assets/svg/institutes-icon.svg'

import { ReactElement, useRef, useState } from 'react'
import NoImage from '../../../../assets/NoLogo.png'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon-red.svg'
import { useHistory } from 'react-router-dom'
import {
  CardContainer,
  InstituteImage,
  LogoContainer,
  LogoImage,
  DetailsContainer,
  Heading,
  LogoCountsContainer,
  IconContainer,
  Para,
  DotsIcon
} from './styledComponents'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import { DropdownOption, DropdownPopup } from '../../Table/PopupMenu'
import { Flex } from '../../styledComponents'
import { CustomToastMessage } from '../../ToastMessage'
import { DeleteBranch } from '../../../../helpers/V2/apis'
import ROUTES_V2 from '../../../../const/V2/routes'
import WarningPopUp from '../../PopUp/WarningPopup'

export interface BranchCardParams {
  branchImage: string
  logoImage: string
  branchHeading: string
  teacherCount: string | number
  batchCount: string | number
  BranchId: string
  onDelete: () => void
}

const BranchCard = ({
  logoImage,
  branchHeading,
  teacherCount,
  batchCount,
  BranchId,
  branchImage,
  onDelete
}: BranchCardParams): ReactElement => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [isWarning, setIsWarning] = useState(false)

  const closeDropDown = () => {
    setShowDropDown(false)
  }
  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, () => setShowDropDown(false))
  const history = useHistory()
  const ToggleDelete = () => {
    DeleteBranch(BranchId)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          setIsWarning(false)
          onDelete()
        }
      })
      .catch((error) => {
        CustomToastMessage(error?.response?.data?.message, 'error')
      })
  }
  return (
    <CardContainer>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          onDelete={() => ToggleDelete()}
          text="Are you sure you want to delete this branch?"
        />
      )}
      <InstituteImage
        src={branchImage ? branchImage : '/assets/images/instituteimage.jpg'}
        onClick={() => {
          history.push(`${ROUTES_V2.EDIT_BRANCH}/${BranchId}`) //please change the right path of add branch here
        }}
      />
      <LogoContainer>
        <LogoImage
          src={logoImage && logoImage.startsWith('https') ? logoImage : NoImage}
          alt="img"
        />
      </LogoContainer>
      <DetailsContainer>
        <Heading>{branchHeading ? branchHeading : ''}</Heading>
        <LogoCountsContainer>
          <Flex>
            <IconContainer>
              <InstituteIcon />
            </IconContainer>
            <Para>{`${teacherCount ? teacherCount : 0} teachers | ${
              batchCount ? batchCount : 0
            } batches / sections`}</Para>
          </Flex>
          <div
            style={{ cursor: 'pointer' }}
            role="presentation"
            onClick={() => {
              setShowDropDown(true)
            }}
          >
            <DotsIcon style={{ marginRight: '15px' }} />
          </div>
          {showDropDown && (
            <DropdownPopup style={{ right: '-14px' }} ref={popupRef}>
              <DropdownOption selected={'Edit'}>
                <Flex
                  gap="6px"
                  onClick={() => {
                    closeDropDown()
                    history.push(`${ROUTES_V2.EDIT_BRANCH}/${BranchId}`) //please change the right path of add branch here
                  }}
                >
                  <EditIcon />
                  Edit
                </Flex>
              </DropdownOption>
              <DropdownOption selected={'Delete'}>
                <Flex
                  gap="6px"
                  onClick={() => {
                    closeDropDown()
                    setIsWarning(true)
                  }}
                >
                  <DeleteIcon />
                  Delete
                </Flex>
              </DropdownOption>
            </DropdownPopup>
          )}
        </LogoCountsContainer>
      </DetailsContainer>
    </CardContainer>
  )
}

export default BranchCard
