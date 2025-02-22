import { ReactComponent as InstituteIcon } from '../../../assets/svg/institutes-icon.svg'
import {
  CardContainer,
  DetailsContainer,
  DotsIcon,
  Heading,
  IconContainer,
  InstituteImage,
  LogoContainer,
  LogoCountsContainer,
  LogoImage,
  Para
} from './styledComponents'

import { ReactElement, useRef, useState } from 'react'
import NoImage from '../../../assets/NoLogo.png'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { DropdownOption, DropdownPopup } from '../Table/PopupMenu'
import { Flex } from '../styledComponents'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-icon-red.svg'
import { DeleteInstitute } from '../../../helpers/V2/apis'
import { CustomToastMessage } from '../ToastMessage'
import { useHistory } from 'react-router-dom'
import WarningPopUp from '../PopUp/WarningPopup'
import ROUTES_V2 from '../../../const/V2/routes'

export interface InstituteCardParams {
  instituteImage: string
  logoImage: string
  instituteHeading: string
  teacherCount: string | number
  branchCount: string | number
  batchCount: string | number
  InstituteId: string
  onDelete: () => void // Add this line to accept the onDelete prop
}

const InstituteCard = ({
  logoImage,
  instituteHeading,
  teacherCount,
  branchCount,
  batchCount,
  InstituteId,
  instituteImage,
  onDelete
}: InstituteCardParams): ReactElement => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [isWarning, setIsWarning] = useState(false)

  const closeDropDown = () => {
    setShowDropDown(false)
  }
  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, () => setShowDropDown(false))
  const history = useHistory()

  const ToggleDelete = () => {
    DeleteInstitute(InstituteId)
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
          text="Are you sure you want to delete this institute?"
        />
      )}
      <InstituteImage
        src={
          instituteImage ? instituteImage : '/assets/images/instituteimage.jpg'
        }
        onClick={() => {
          history.push(`${ROUTES_V2.EDIT_INSTITUTE}/${InstituteId}`)
        }}
      />
      <LogoContainer>
        <LogoImage
          src={logoImage && logoImage.startsWith('https') ? logoImage : NoImage}
          alt="img"
        />
      </LogoContainer>
      <DetailsContainer>
        <Heading>{instituteHeading ? instituteHeading : ''}</Heading>
        <LogoCountsContainer>
          <Flex>
            <IconContainer>
              <InstituteIcon />
            </IconContainer>
            <Para>{`${teacherCount ? teacherCount : 0} teachers | ${
              branchCount ? branchCount : 0
            } Branches | ${
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
                    history.push(`${ROUTES_V2.EDIT_INSTITUTE}/${InstituteId}`)
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

export default InstituteCard
