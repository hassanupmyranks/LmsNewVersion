import { Flex } from '../../../../../components/V2/styledComponents'
import {
  BlueButton,
  PrimaryBlue
} from '../../../../../const/V2/stylingVariables'
import { BranchBtn, BranchesDiv, Container, Image, P } from './styledComponents'
import map from '../../../../../assets/map-icon.png'
import { ReactComponent as EditIcon } from '../../../../../assets/svg/edit-grey-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/delete-icon-red.svg'
import { useEffect, useRef, useState } from 'react'
import { RootState } from '../../../../../redux/store'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  DeleteBranch,
  getNewAllBranchAPI
} from '../../../../../helpers/V2/apis'
import { ListBranchProps } from './types'

import {
  DropdownContainer,
  DropdownOption,
  DropdownPopup
} from '../../../assignment/Review/ReviewAssignment/Components/styledComponents'
import useOnClickOutside from '../../../../../hooks/useOnClickOutside'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'
import { EmptyContainer } from '../AddEditBranchForm'
import { ReactComponent as AddBranchIcon } from '../../../../../assets/svg/add-branch.svg'
const AddedBranch = ({
  setddBranchBachId,
  CreatedInstituteId,
  setEditBranchId
}: ListBranchProps) => {
  const dispatch = useDispatch()
  const { branchList, branchLoading, user } = useSelector(
    (state: RootState) => ({
      branchList: state.branchV2.data,
      branchLoading: state.branchV2.loading,
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )

  useEffect(() => {
    if (user.role === 'instituteAdmin') {
      dispatch(
        getNewAllBranchAPI({
          page: 1,
          limit: 100,
          instituteId: user.instituteId
        })
      )
    }

    if (CreatedInstituteId && user.role !== 'branchAdmin') {
      dispatch(
        getNewAllBranchAPI({
          page: 1,
          limit: 100,
          instituteId: CreatedInstituteId
        })
      )
    }
  }, [dispatch, CreatedInstituteId, user])

  const closeDropDown = () => {
    setShowDropDownIndex(null)
  }

  const [showDropDownIndex, setShowDropDownIndex] = useState<any>()
  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, () => setShowDropDownIndex(null))

  const flexOutsideRef = useRef<HTMLDivElement>(null)
  const flexInsideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showDropDownIndex && popupRef.current) {
      popupRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    }
  }, [showDropDownIndex])

  return (
    <Container style={{ paddingRight: '0px' }}>
      <P fontSize={20} style={{ paddingBottom: '10px' }}>
        Added Branches
      </P>
      {branchLoading ? (
        <Spinner
          style={{
            width: '44px',
            height: '44px',
            color: `${BlueButton}`,
            position: 'absolute',
            left: '15%'
          }}
          animation={'border'}
        />
      ) : !branchList.length ? (
        <EmptyContainer
          icon={<AddBranchIcon />}
          text={
            'No Branches Yet! Create new branch for this institute / school'
          }
        />
      ) : (
        <Flex
          gap="20px"
          direction="column"
          alignItems="flex-start"
          style={{
            paddingRight: '16px',
            overflowY: 'auto',
            height: '330px'
          }}
          ref={flexOutsideRef}
        >
          {branchList.map((data, index) => {
            return (
              <BranchesDiv key={`branch_${index}`} ref={flexInsideRef}>
                <Image src={map}></Image>
                <Flex
                  direction="column"
                  style={{ width: '100%', alignItems: 'start' }}
                >
                  <P fontSize={15} style={{ fontWeight: '500' }}>
                    {data.instituteName}-{data.name}
                  </P>
                  <Flex
                    style={{ width: '100%' }}
                    justifyContent="space-between"
                  >
                    <BranchBtn
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: `${PrimaryBlue}`,
                        textDecoration: 'underline'
                      }}
                      onClick={() => {
                        setddBranchBachId(data._id)
                      }}
                    >
                      Add Batches / Sections
                    </BranchBtn>
                    <DropdownContainer
                      style={{
                        justifyContent: 'flex-end',
                        width: '20px',
                        border: 'none',
                        zIndex: '-1000px'
                      }}
                    >
                      <BranchBtn>
                        <EditIcon
                          role="presentation"
                          onClick={() => {
                            setShowDropDownIndex(
                              showDropDownIndex === index ? null : index
                            )
                          }}
                        />
                      </BranchBtn>
                      {showDropDownIndex === index && (
                        <DropdownPopup
                          style={{ right: '-14px', zIndex: '1000px' }}
                          ref={popupRef}
                        >
                          <DropdownOption>
                            <Flex
                              style={{ color: '#5B93FF' }}
                              gap="6px"
                              onClick={() => {
                                closeDropDown()
                                setEditBranchId(data._id)
                              }}
                            >
                              <EditIcon />
                              Edit
                            </Flex>
                          </DropdownOption>
                          <DropdownOption>
                            <Flex
                              style={{ color: '#E71D36' }}
                              gap="6px"
                              onClick={() => {
                                closeDropDown()
                                DeleteBranch(data._id)
                                  .then((res) => {
                                    if (res) {
                                      CustomToastMessage(res.message, 'success')
                                      dispatch(
                                        getNewAllBranchAPI({
                                          page: 1,
                                          limit: 20,
                                          instituteId: CreatedInstituteId
                                        })
                                      )
                                    }
                                  })
                                  .catch((error) => {
                                    console.error(
                                      'Error adding student:',
                                      error
                                    )
                                    CustomToastMessage(
                                      error.response.data.message,
                                      'error'
                                    )
                                  })
                              }}
                            >
                              <DeleteIcon />
                              Delete
                            </Flex>
                          </DropdownOption>
                        </DropdownPopup>
                      )}
                    </DropdownContainer>
                  </Flex>
                </Flex>
              </BranchesDiv>
            )
          })}
        </Flex>
      )}
    </Container>
  )
}

export default AddedBranch
