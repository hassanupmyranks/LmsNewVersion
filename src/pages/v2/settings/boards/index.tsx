import InputV2 from '../../../../components/V2/Form/Input'
import {
  AllAddCourse2,
  CreateCourseWrapper,
  DotsIcon,
  Heading,
  NewSubHeading,
  NewlyAddedSubjects,
  SubLogoAllign,
  SubjectName,
  ButtonWrap,
  SubjectDate,
  DateIconWrap,
  SubjectListWrapper,
  LoaderAlign,
  ListLoader,
  BoardList
} from './styledComponents'
import { ButtonV2, Flex } from '../../../../components/V2/styledComponents'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  createBoardAPI,
  deleteBoardAPI,
  getAllBoardsAPI,
  getSingleBoardAPI,
  updateBoardAPI
} from '../../../../helpers/V2/apis'

import { LoaderIcon } from 'react-hot-toast'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import {
  DropdownContainer,
  DropdownOption,
  DropdownPopup
} from '../../../../components/V2/Table/PopupMenu'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon-red.svg'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'

const subjectinfo = {
  name: '',
  description: ''
}

const BoardsComponents = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const [boardList, setBoardList] = useState<any[]>([])
  const [createBoard, setCreateBoard] = useState<any>(subjectinfo)
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const [isSavedLoading, setIsSavedLoading] = useState(false)

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return ''
    }

    const option = {
      day: 'numeric' as const,
      month: 'short' as const,
      year: 'numeric' as const
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', option).format(date)
    return formattedDate
  }

  const handleSubjectSave = () => {
    setIsSubmit(true)
    if (createBoard.name && createBoard.description) {
      setIsSubmit(false)
      setIsSavedLoading(true)
      if (isEdit) {
        updateBoardAPI(createBoard, createBoard._id)
          .then((res) => {
            CustomToastMessage(res.data.message, 'success')
            setIsLoading(true)
            getAllBoardsAPI({
              page: 1,
              limit: 120
            })
              .then((response) => {
                setBoardList(response.data)
              })
              .catch((error) => CustomToastMessage(error.message, 'error'))
              .finally(() => setIsLoading(false))
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsSavedLoading(false)
          })
        setIsEdit(false)
      } else {
        createBoardAPI(createBoard)
          .then((res) => {
            CustomToastMessage(res.message, 'success')
            setIsLoading(true)
            getAllBoardsAPI({
              page: 1,
              limit: 120
            })
              .then((response) => {
                setBoardList(response.data)
              })
              .catch((error) => CustomToastMessage(error.message, 'error'))
              .finally(() => setIsLoading(false))
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => {
            setCreateBoard(subjectinfo)
            setIsSavedLoading(false)
          })
      }
    }
  }

  const HandleEdit = (boardId: string) => {
    setIsEdit(true)
    getSingleBoardAPI(boardId)
      .then((response) => {
        setCreateBoard({
          name: response?.data?.name,
          description: response?.data?.description || ''
        })
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
  }

  // const [isDelete, setIsDelete] = useState(false)
  const HandleDelete = (boardId: string) => {
    deleteBoardAPI(boardId)
      .then((res) => {
        CustomToastMessage(res.message, 'success')
        setIsLoading(true)
        getAllBoardsAPI({
          page: 1,
          limit: 120
        })
          .then((response) => {
            setBoardList(response.data)
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => setIsLoading(false))
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
  }

  useEffect(() => {
    setIsLoading(true)
    getAllBoardsAPI({
      page: 1,
      limit: 120
    })
      .then((response) => {
        setBoardList(response.data)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [])

  const [showDropDownIndex, setShowDropDownIndex] = useState(null)

  const closeDropDown = () => {
    setShowDropDownIndex(null)
  }

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setShowDropDownIndex(null))

  return (
    <AllAddCourse2>
      {userInfoV2.role === 'instituteAdmin' ? (
        ''
      ) : userInfoV2.role === 'branchAdmin' ? (
        ''
      ) : (
        <CreateCourseWrapper>
          <Heading>Add New Board</Heading>

          <InputV2
            label="Board Name"
            required
            placeholder="Enter board name"
            error={createBoard.name || !isSubmit ? '' : 'Field is required'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setCreateBoard({ ...createBoard, name: event.target.value })
            }}
            value={createBoard.name}
            full
            style={{ marginBottom: '20px' }}
          ></InputV2>
          <InputV2
            label="Description"
            required
            placeholder="Enter description"
            error={
              createBoard.description || !isSubmit ? '' : 'Field is required'
            }
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setCreateBoard({
                ...createBoard,
                description: event.target.value
              })
            }}
            value={createBoard.description}
            full
            style={{ marginBottom: '30px' }}
          ></InputV2>
          <ButtonWrap>
            <div>
              {isSavedLoading ? (
                <LoaderAlign>
                  <LoaderIcon />
                </LoaderAlign>
              ) : (
                <ButtonV2 onClick={handleSubjectSave}>
                  {isEdit ? 'Update' : 'Save & Add More'}
                </ButtonV2>
              )}
            </div>
          </ButtonWrap>
        </CreateCourseWrapper>
      )}
      <NewlyAddedSubjects>
        <NewSubHeading>Boards Listing</NewSubHeading>
        <SubjectListWrapper>
          {isLoading ? (
            <Flex justifyContent="center">
              <ListLoader>
                <Spinner
                  style={{
                    color: `${BlueButton}`
                  }}
                  animation={'border'}
                />
              </ListLoader>
            </Flex>
          ) : (
            boardList &&
            boardList.map((item: any, index: any) => (
              <BoardList key={index}>
                <SubLogoAllign>
                  {/* <SubjectLogo
                    src={
                      item.icon && item.icon.startsWith('https')
                        ? item.icon
                        : NoImage
                    }
                    alt="Subject Icon"
                  /> */}
                  <div>
                    <SubjectName>{item.name}</SubjectName>
                    {/* <CourseInfo>Course - {item.description}</CourseInfo> */}
                  </div>
                </SubLogoAllign>
                <DateIconWrap>
                  <SubjectDate>{formatDate(item.createdAt)}</SubjectDate>
                  {userInfoV2.role === 'superAdmin' && (
                    <DropdownContainer>
                      <div
                        style={{ cursor: 'pointer' }}
                        role="presentation"
                        onClick={() => {
                          {
                            userInfoV2.role === 'instituteAdmin'
                              ? ''
                              : userInfoV2.role === 'branchAdmin'
                              ? ''
                              : setShowDropDownIndex(
                                  showDropDownIndex === index ? null : index
                                )
                          }
                        }}
                      >
                        <DotsIcon />
                      </div>

                      {showDropDownIndex === index && (
                        <DropdownPopup
                          style={{ right: '-14px' }}
                          ref={popupRef}
                        >
                          <DropdownOption selected={'Edit'}>
                            <Flex
                              gap="6px"
                              onClick={() => {
                                HandleEdit(item._id)
                                setCreateBoard({
                                  ...createBoard,
                                  _id: item._id
                                })
                                closeDropDown()
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
                                HandleDelete(item._id)
                                closeDropDown()
                              }}
                            >
                              <DeleteIcon />
                              Delete
                            </Flex>
                          </DropdownOption>
                        </DropdownPopup>
                      )}
                    </DropdownContainer>
                  )}
                </DateIconWrap>
              </BoardList>
            ))
          )}
        </SubjectListWrapper>
      </NewlyAddedSubjects>
    </AllAddCourse2>
  )
}

export default BoardsComponents
