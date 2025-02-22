import { useEffect, useRef, useState } from 'react'
import InputV2 from '../../../components/V2/Form/Input'
import ImageSelector from '../../../components/V2/ImageSelector/imageSelector'
import {
  AddAuthorProps,
  EditDeleteProps,
  FinalPayloadField,
  ListAuthorResponse,
  ResetProfileType
} from '../../../utils/types'
import {
  AddAuthorDetailsContainer,
  AddAuthorHeading,
  AddAuthorInput,
  AuthorListBaseContainer,
  AuthorListHeading,
  AuthorListWrapper,
  AuthorMainPageContainer,
  BasePageContainer,
  DotsIcon,
  DropdownContainer,
  DropdownOption,
  DropdownPopup,
  Flex,
  ImageRequirements,
  ListBaseContainer,
  ListDetails,
  ListDetailsContainer,
  ListImage,
  ListLabel,
  ListLoader,
  ListPara,
  LoaderAlign
} from './styledComponents'
import AddAuthorValidation from './hepler'
import { hasFormError } from '../../../helpers/V2/formValidation'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-icon-red.svg'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import {
  addAuthorAPI,
  deleteAuthorAPI,
  editAuthorAPI,
  getAuthorListAPI,
  getHeaderTabsDataAPI,
  getSingleAuthor
} from '../../../helpers/V2/apis'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { LoaderIcon } from 'react-hot-toast'
import { ButtonV2 } from '../../../components/V2/styledComponents'
import NoImage from './../../../assets/noimage.png'
import { topHeaderValues } from '../../../const/V2/topHeaderConsts'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { capitalizeFirstLetter } from '../../../helpers/V2/capitalizeFirstLetter'
import { updateTopHeader } from '../../../redux/topHeader/actions'
import ROUTES_V2 from '../../../const/V2/routes'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'

const NewAuthor = {
  name: '',
  profileImage: '',
  _id: ''
}

const ResetValue = {
  profileImage: false
}

export const AddAndListAuthor = () => {
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

  const [resetValue, setResetValue] = useState<ResetProfileType>(ResetValue)
  const [errors, setErrors] = useState({} as Record<string, string>)
  const [list, setList] = useState<[ListAuthorResponse]>()
  const [addAuthor, setAddAuthor] = useState<AddAuthorProps>(NewAuthor)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingList, setIsLoadingList] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [icon, setIcon] = useState('')

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const [role, firstName]: any = useSelector((state: RootState) => [
    state.userV2.userInfoV2.role,
    state.userV2.userInfoV2.firstName
  ])

  const handleChangeHeader = () => {
    const newHeaderData = { ...topHeaderValues[role || 'superAdmin'][pathname] }
    if (
      Object.keys(newHeaderData).length > 0 &&
      newHeaderData.tabs.length > 0
    ) {
      let newTabs = newHeaderData.tabs
      const newTabsData: string[] = newTabs?.map((item: any) => {
        return item?.label === 'Institutes / Schools'
          ? 'institutes'
          : item.label === 'Ongoing & Finished Assessment'
          ? 'tests-submitted'
          : item.label === 'Pattern/Template'
          ? 'patterns'
          : item.label === 'Grade'
          ? 'grades'
          : item.label === 'Batch/Section'
          ? 'batches'
          : item.label === 'All Assessment'
          ? 'tests'
          : item?.label?.split(' ').join('-').toLowerCase()
      })

      getHeaderTabsDataAPI({ tabs: newTabsData })
        .then((res) => {
          if (res) {
            const newData = newTabs?.map((item: any) => {
              const matchingNewItem = res?.find(
                (newItem: any) =>
                  (item?.label === 'Institutes / Schools'
                    ? 'Institutes'
                    : item.label === 'Ongoing & Finished Assessment'
                    ? 'Tests Submitted'
                    : item.label === 'Pattern/Template'
                    ? 'Patterns'
                    : item.label === 'Grade'
                    ? 'Grades'
                    : item.label === 'Batch/Section'
                    ? 'Batches'
                    : item.label === 'All Assessment'
                    ? 'Tests'
                    : item?.label) ===
                  capitalizeFirstLetter(
                    newItem?.collectionName.split('-').join(' ')
                  )
              )

              if (matchingNewItem) {
                const newObj = {
                  ...item,
                  value: Number(matchingNewItem?.count)
                }
                return newObj
              }

              // If no matching item is found, return the original item
              return item
            })
            newHeaderData.tabs = newData
            dispatch(updateTopHeader(newHeaderData))
          }
        })
        .catch((error) => console.log({ error }))
    } else {
      const headerObj = {
        btnText: '',
        btnUrl: '',
        mainTitle:
          `${newHeaderData?.mainTitle ? newHeaderData?.mainTitle : ''}${
            role === 'student' && pathname === ROUTES_V2.DASHBOARD
              ? ` ${firstName}`
              : ''
          }` || '',
        topTitle: newHeaderData?.topTitle || '',
        tabs: []
      }
      dispatch(updateTopHeader(headerObj))
    }
  }

  const handleAuthorSave = () => {
    const validationError = AddAuthorValidation(addAuthor, errors)
    if (hasFormError(validationError)) {
      setErrors(validationError)
      CustomToastMessage('Please Enter the Required Fields', 'error')
    } else {
      setIsLoading(true)
      const newFormData: any = new FormData()
      newFormData.append('name', addAuthor.name)
      if (
        !(
          typeof addAuthor.profileImage === 'string' ||
          addAuthor.profileImage === undefined ||
          addAuthor.profileImage === null
        )
      ) {
        newFormData.append('profileImage', addAuthor.profileImage)
      }
      if (isEdit) {
        editAuthorAPI(newFormData, addAuthor._id)
          .then((res) => {
            setErrors({})
            CustomToastMessage(res.data.message, 'success')
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false)
            getAuthorListAPI().then((response) => {
              setList(response.data.data)
              setAddAuthor(NewAuthor)
              setResetValue({ profileImage: true })
            })
          })
        setIsEdit(false)
      } else {
        addAuthorAPI(newFormData)
          .then((res) => {
            setErrors({})
            CustomToastMessage(res.data.message, 'success')
            handleChangeHeader()
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false)
            getAuthorListAPI().then((response) => {
              setList(response.data.data)
              setAddAuthor(NewAuthor)
              setResetValue({ profileImage: true })
            })
          })
      }
    }
  }

  const validateField = (field: {
    type: FinalPayloadField
    value: string
  }): void => {
    setErrors(AddAuthorValidation(addAuthor, errors, field))
  }

  const HandleEdit = (user: EditDeleteProps) => {
    setIcon('')
    setIsEdit(true)
    setResetValue({ profileImage: false })
    getSingleAuthor(user.id).then((response) => {
      setAddAuthor(response.data.data)
      setIcon(response.data.data.profileImage)
    })
  }

  const HandleDelete = (user: EditDeleteProps) => {
    setIsLoadingList(true)
    deleteAuthorAPI(user.id)
      .then((res) => {
        CustomToastMessage(res.data.message, 'success')
        handleChangeHeader()
        getAuthorListAPI().then((response) => {
          setIsLoadingList(false)
          setList(response.data.data)
        })
      })
      .catch((error) => {
        console.log(error, 'delete')
        CustomToastMessage(error, 'error')
        setIsLoadingList(false)
      })
  }

  useEffect(() => {
    getAuthorListAPI().then((response) => {
      setIsLoadingList(false)
      setList(response.data.data)
    })
  }, [])
  const [showDropDownIndex, setShowDropDownIndex] = useState(null)

  const closeDropDown = () => {
    setShowDropDownIndex(null)
  }

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setShowDropDownIndex(null))
  return (
    <AuthorMainPageContainer>
      {role === 'instituteAdmin' ? (
        ''
      ) : role === 'branchAdmin' ? (
        ''
      ) : (
        <BasePageContainer>
          <AddAuthorHeading>Add New Author</AddAuthorHeading>
          <AddAuthorDetailsContainer>
            <ImageSelector
              defaultvalue={icon}
              onImageSelected={(imageUrl) => {
                setIcon('')
                setResetValue({ profileImage: false })
                setAddAuthor({
                  ...addAuthor,
                  profileImage: imageUrl
                })
              }}
              reset={resetValue.profileImage}
            />
            <AddAuthorInput>
              <InputV2
                label={'Author Name'}
                required
                placeholder="Enter Author name"
                full
                onBlur={() => {
                  validateField({
                    type: FinalPayloadField.name,
                    value: addAuthor.name
                  })
                }}
                error={errors.name}
                onChange={(event: any) => {
                  setAddAuthor({
                    ...addAuthor,
                    name: event.target.value
                  })
                }}
                value={addAuthor.name}
              />
            </AddAuthorInput>
          </AddAuthorDetailsContainer>
          <ImageRequirements>
            <div>
              Image requirements
              <ul>
                <li>Minimum size 500x500</li>
                <li>Should be in PNG,JPG,JPEG format</li>
              </ul>
            </div>
            <div>
              {isLoading ? (
                <LoaderAlign>
                  <LoaderIcon />
                </LoaderAlign>
              ) : (
                <ButtonV2 onClick={handleAuthorSave}>
                  {isEdit ? 'Update' : 'Save & Add More'}
                </ButtonV2>
              )}
            </div>
          </ImageRequirements>
        </BasePageContainer>
      )}
      <AuthorListBaseContainer>
        <AuthorListHeading>All Authors</AuthorListHeading>
        <AuthorListWrapper>
          {isLoadingList ? (
            <ListLoader>
              <Spinner
                style={{
                  color: `${BlueButton}`
                }}
                animation={'border'}
              />
            </ListLoader>
          ) : (
            list &&
            list.map((item: any, index: any) => (
              <ListBaseContainer key={index}>
                <ListDetailsContainer>
                  <ListImage
                    src={
                      item.profileImage && item.profileImage.startsWith('https')
                        ? item.profileImage
                        : NoImage
                    }
                    alt="Author Icon"
                  />
                  <ListDetails>
                    <ListLabel>{item.name}</ListLabel>
                    <ListPara>{formatDate(item.createdAt)}</ListPara>
                  </ListDetails>
                </ListDetailsContainer>
                {role === 'superAdmin' && (
                  <DropdownContainer>
                    <div
                      style={{ cursor: 'pointer' }}
                      role="presentation"
                      onClick={() => {
                        {
                          role === 'instituteAdmin'
                            ? ''
                            : role === 'branchAdmin'
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
                      <DropdownPopup style={{ right: '-14px' }} ref={popupRef}>
                        <DropdownOption selected={'Edit'}>
                          <Flex
                            gap="6px"
                            onClick={() => {
                              HandleEdit({ id: item._id })
                              setAddAuthor({ ...addAuthor, _id: item._id })
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
                              HandleDelete({ id: item._id })
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
              </ListBaseContainer>
            ))
          )}
        </AuthorListWrapper>
      </AuthorListBaseContainer>
    </AuthorMainPageContainer>
  )
}

export default AddAndListAuthor
