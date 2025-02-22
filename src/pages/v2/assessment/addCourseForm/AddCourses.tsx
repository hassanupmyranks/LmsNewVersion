import InputV2 from '../../../../components/V2/Form/Input'
import {
  AlignCircle,
  AllAddCourse2,
  CreateCourseWrapper,
  DotsIcon,
  // Heading,
  ListWrapper,
  NewSubHeading,
  NewlyAddedSubjects,
  SubLogoAllign,
  SubjectList,
  SubjectLogo,
  SubjectName,
  ButtonWrap,
  // CourseInfo,
  SubjectDate,
  DateIconWrap,
  SubjectListWrapper,
  ListLoader
} from './styledComponents'
import {
  ButtonV2,
  Flex,
  LoaderAlign
} from '../../../../components/V2/styledComponents'
import ImageSelector from '../../../../components/V2/ImageSelector/imageSelector'
// import SimpleDropdown from '../../../../components/V2/Form/SimpleDropdown'
// import { SmallDropdownOptionData } from '../../../../components/V2/Form/types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  addCourses,
  deleteCourse,
  editOrUpdateCourse,
  getAllCourses,
  getSingleCourse
} from '../../../../helpers/V2/apis'
import AddCourseValidation from './helpers'
import {
  AddCourseProps,
  EditDeleteProps,
  FinalpayloadAddCourse,
  GetCourseResponse,
  ResetType
} from '../../../../utils/types'
import { hasFormError } from '../../../../helpers/V2/formValidation'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import {
  DropdownContainer,
  DropdownOption,
  DropdownPopup
} from '../../../../components/V2/Table/PopupMenu'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon-red.svg'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { LoaderIcon } from 'react-hot-toast'
import NoImage from './../../../../assets/noimage.png'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { useParams } from 'react-router-dom'
// let Types: SmallDropdownOptionData<string>[] = [
//   { label: 'theory' },
//   { label: 'lab' }
// ]

const NewCourse = {
  name: '',
  icon: '',
  // type: '',
  _id: ''
}

const ResetValue = {
  icon: false
}

const AddCoursesV2 = () => {
  const params: any = useParams()

  useEffect(() => {
    if (params.id) {
      const id = params.id
      HandleEdit(id)
    }
  }, [params.id])

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

  const [resetValue, setResetValue] = useState<ResetType>(ResetValue)
  const [errors, setErrors] = useState({} as Record<string, string>)
  const [list, setList] = useState<[GetCourseResponse]>()
  const [addCourse, setAddCourse] = useState<AddCourseProps>(NewCourse)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingList, setIsLoadingList] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [icon, setIcon] = useState('')
  // const [, setDefaultType] = useState<SmallDropdownOptionData<string>>()

  // const handleTypeSelect = (types: SmallDropdownOptionData<string>) => {
  //   setType('type')
  //   setSelectedType(types)
  //   setDefaultType({ label: '' })
  //   if (types && types.label) {
  //     setAddCourse({
  //       ...addCourse,
  //       type: types.label as string
  //     })
  //   }
  // }

  const handleCourseSave = () => {
    const validationError = AddCourseValidation(addCourse, errors)
    if (hasFormError(validationError)) {
      setErrors(validationError)
      CustomToastMessage('Please Enter the Required Fields', 'error')
    } else {
      setIsLoading(true)
      const newFormData: any = new FormData()
      newFormData.append('name', addCourse.name)
      // newFormData.append('type', addCourse.type)
      if (
        !(
          typeof addCourse.icon === 'string' ||
          addCourse.icon === undefined ||
          addCourse.icon === null
        )
      ) {
        newFormData.append('icon', addCourse.icon)
      }
      if (isEdit) {
        editOrUpdateCourse(newFormData, addCourse._id)
          .then((res) => {
            setErrors({})
            CustomToastMessage(res.data.message, 'success')
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false)
            getAllCourses().then((response) => {
              setList(response.data.data)
              setAddCourse(NewCourse)
              setResetValue({ icon: true })
              // setSelectedType({ label: '' })
              // setDefaultType({ label: '' })
            })
          })
        setIsEdit(false)
      } else {
        addCourses(newFormData)
          .then((res) => {
            setErrors({})
            CustomToastMessage(res.data.message, 'success')
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false)
            getAllCourses().then((response) => {
              setList(response.data.data)
              setAddCourse(NewCourse)
              setResetValue({ icon: true })
              // setSelectedType({ label: '' })
            })
          })
      }
    }
  }
  const validateField = (field: {
    type: FinalpayloadAddCourse
    value: string
  }): void => {
    setErrors(AddCourseValidation(addCourse, errors, field))
  }

  const HandleEdit = (gradeId: string) => {
    setIcon('')
    setIsEdit(true)
    setResetValue({ icon: false })
    getSingleCourse(gradeId).then((response) => {
      setAddCourse(response.data.data)
      // setDefaultType({
      //   label: response.data.data.type
      // })
      setIcon(response.data.data.icon)
    })
  }

  const HandleDelete = (user: EditDeleteProps) => {
    setIsLoadingList(true)
    deleteCourse(user.id)
      .then((res) => {
        CustomToastMessage(res.data.message, 'success')
        getAllCourses().then((response) => {
          setIsLoadingList(false)
          setList(response.data.data)
        })
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
      .finally(() => setIsLoadingList(false))
  }

  useEffect(() => {
    getAllCourses().then((response) => {
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
    <AllAddCourse2>
      <CreateCourseWrapper>
        {/* <Heading>{isEdit ? 'Edit' : 'Add'} Grade</Heading> */}
        <AlignCircle>
          <ImageSelector
            defaultvalue={icon}
            onImageSelected={(file: File) => {
              setIcon('')
              setResetValue({ icon: false })
              setAddCourse({ ...addCourse, icon: file })
            }}
            reset={resetValue.icon}
          />
          <InputV2
            label="Grade Name"
            required
            placeholder="Enter Grade name"
            style={{ marginLeft: '15px' }}
            onBlur={() => {
              validateField({
                type: FinalpayloadAddCourse.name,
                value: addCourse.name
              })
            }}
            error={errors.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setAddCourse({ ...addCourse, name: event.target.value })
            }}
            value={addCourse.name}
          ></InputV2>
        </AlignCircle>
        {/* <SimpleDropdown
          label="Select Grade Type"
          required
          options={Types}
          error={type === '' ? errors.type : ''}
          onSelect={handleTypeSelect}
          placeholder={'Please Select Grade Type'}
          selectedValue={defaultType?.label === '' ? selectedType : defaultType}
        ></SimpleDropdown> */}
        <ButtonWrap className="mt-5">
          <ListWrapper>
            Image requirements
            <ul style={{ margin: '0px' }}>
              <li>Minimum size 500x500</li>
              <li>Should be in PNG,JPG,JPEG format</li>
            </ul>
          </ListWrapper>
          <div>
            {isLoading ? (
              <LoaderAlign>
                <LoaderIcon />
              </LoaderAlign>
            ) : (
              <ButtonV2 onClick={handleCourseSave}>
                {isEdit ? 'Update' : 'Save & Add More'}
              </ButtonV2>
            )}
          </div>
        </ButtonWrap>
      </CreateCourseWrapper>
      <NewlyAddedSubjects>
        <NewSubHeading>Newly Added Grades</NewSubHeading>
        <SubjectListWrapper>
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
              <SubjectList key={index}>
                <SubLogoAllign>
                  <SubjectLogo
                    src={
                      item.icon && item.icon.startsWith('https')
                        ? item.icon
                        : NoImage
                    }
                    alt="Grade Icon"
                  />
                  <div>
                    <SubjectName>{item.name}</SubjectName>
                    {/* <CourseInfo>Type - {item.type}</CourseInfo> */}
                  </div>
                </SubLogoAllign>
                <DateIconWrap>
                  <SubjectDate>{formatDate(item.createdAt)}</SubjectDate>
                  <DropdownContainer>
                    <div
                      style={{ cursor: 'pointer' }}
                      role="presentation"
                      onClick={() => {
                        setShowDropDownIndex(
                          showDropDownIndex === index ? null : index
                        )
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
                              HandleEdit(item._id)
                              setAddCourse({ ...addCourse, _id: item._id })
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
                </DateIconWrap>
              </SubjectList>
            ))
          )}
        </SubjectListWrapper>
      </NewlyAddedSubjects>
    </AllAddCourse2>
  )
}

export default AddCoursesV2
