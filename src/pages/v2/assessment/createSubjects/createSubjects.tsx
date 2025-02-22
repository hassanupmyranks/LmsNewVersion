import InputV2 from '../../../../components/V2/Form/Input'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  AlignCircle,
  AllAddCourse2,
  CreateCourseWrapper,
  DotsIcon,
  Heading,
  ListWrapper,
  // NewSubHeading,
  NewlyAddedSubjects,
  SubLogoAllign,
  SubjectList,
  SubjectLogo,
  SubjectName,
  ButtonWrap,
  CourseInfo,
  SubjectDate,
  DateIconWrap,
  SubjectListWrapper,
  LoaderAlign,
  ListLoader
} from './styledComponents'
import { ButtonV2, Flex } from '../../../../components/V2/styledComponents'
import ImageSelector from '../../../../components/V2/ImageSelector/imageSelector'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  createSubjects,
  deleteSubject,
  eidtOrUpdateSubject,
  getAllCourses,
  getAllSubjects,
  getCourses,
  getSingleSubject
} from '../../../../helpers/V2/apis'
import {
  CreateSubjectProps,
  EditDeleteProps,
  FinalpayloadCreateSubject,
  GetCourseResponse,
  GetSubjectsResponse,
  ResetType
} from '../../../../utils/types'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import CreateSubjectValidation from './helper'
import { hasFormError } from '../../../../helpers/V2/formValidation'
import { LoaderIcon } from 'react-hot-toast'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import {
  DropdownContainer,
  DropdownOption,
  DropdownPopup
} from '../../../../components/V2/Table/PopupMenu'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon-red.svg'
import { Loader } from '../../../../components/V2'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import NoImage from './../../../../assets/noimage.png'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import {
  Checkbox,
  CheckboxContainer
} from '../../../../components/V2/Form/ItemCheckbox'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'

const subjectinfo = {
  name: '',
  courseId: '',
  icon: '',
  _id: ''
}

const ResetValue = {
  icon: false
}

const CreateSubjects = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const [courseList, setCourseList] = useState<[GetCourseResponse]>()
  const [resetValue, setResetValue] = useState<ResetType>(ResetValue)
  const [errors, setErrors] = useState({} as Record<string, string>)
  const [subjectList, setSubjectList] = useState<[GetSubjectsResponse]>()
  const [createSubject, setCreateSubject] =
    useState<CreateSubjectProps>(subjectinfo)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingList, setIsLoadingList] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [course, setCourse] = useState('')
  const [icon, setIcon] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [defaultCourse, setDefaultCourse] =
    useState<SearchableDropdownOptionData>()
  const [selectedCourse, setSelectedCourse] =
    useState<SearchableDropdownOptionData>()
  const [isLab, setisLab] = useState(false)
  const [gradeListPage, setGradeListPage] = useState(1)
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeTotal, setGradeTotal] = useState(0)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()

  useEffect(() => {
    let newGrade: any = []
    setGradeLoading(true)
    const payload = {
      page: 1,
      limit: 150
    }
    getCourses(payload)
      .then((res: any) => {
        setGradeTotal(res.total)
        newGrade = res?.data?.data?.map((item: any) => {
          return {
            id: item._id,
            label: item.name,
            value: ''
          }
        })
        setGradeData(newGrade)
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setGradeLoading(false))
  }, [])

  useEffect(() => {
    getAllCourses().then((response) => {
      setCourseList(response.data.data)
    })
  }, [])

  const FinalCourseList: SearchableDropdownOptionData[] = courseList
    ? courseList.map((course) => ({
        id: course._id,
        label: course.name
      }))
    : []

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

  const handleCourseSelect = (courses: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedCourse(courses)
    setDefaultCourse({ label: '', id: '' })
    if (courses && courses.id) {
      setCreateSubject({
        ...createSubject,
        courseId: courses.id as string
      })
    }
  }

  const handleSubjectSave = () => {
    const validationError = CreateSubjectValidation(createSubject, errors)
    if (hasFormError(validationError)) {
      setErrors(validationError)
      setCourse('')
      CustomToastMessage('Please Enter the Required Fields', 'error')
    } else {
      setIsLoading(true)
      const newFormData: any = new FormData()
      newFormData.append('name', createSubject?.name)
      newFormData.append('courseId', createSubject?.courseId)
      newFormData.append('isLab', isLab)
      if (
        !(
          typeof createSubject?.icon === 'string' ||
          createSubject?.icon === undefined ||
          createSubject?.icon === null
        )
      ) {
        newFormData.append('icon', createSubject?.icon)
      }
      if (isEdit) {
        eidtOrUpdateSubject(newFormData, createSubject?._id)
          .then((res) => {
            setErrors({})
            CustomToastMessage(res.data.message, 'success')
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false)
            getAllSubjects({}).then((response) => {
              setSubjectList(response.data.data)
              setCreateSubject(subjectinfo)
              setResetValue({ icon: true })
              setSelectedCourse({ label: '' })
              setDefaultCourse({ label: '' })
              setisLab(false)
            })
          })
        setIsEdit(false)
      } else {
        createSubjects(newFormData)
          .then((res) => {
            setErrors({})
            CustomToastMessage(res.data.message, 'success')
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false)
            getAllSubjects({}).then((response) => {
              setSubjectList(response.data.data)
              setCreateSubject(subjectinfo)
              setResetValue({ icon: true })
              setSelectedCourse({ label: '' })
              setisLab(false)
            })
          })
      }
    }
  }
  const validateField = (field: {
    type: FinalpayloadCreateSubject
    value: string
  }): void => {
    setErrors(CreateSubjectValidation(createSubject, errors, field))
  }

  const HandleEdit = (user: EditDeleteProps) => {
    setIcon('')
    setIsEdit(true)
    setResetValue({ icon: false })
    getSingleSubject(user.id).then((response) => {
      setCreateSubject(response.data)
      setDefaultCourse({
        label: response.data.courseName
      })
      setisLab(response.data.isLab)
      setIcon(response.data.icon)
    })
  }

  const HandleDelete = (user: EditDeleteProps) => {
    setIsLoadingList(true)
    deleteSubject(user.id)
      .then((res) => {
        CustomToastMessage(res.message, 'success')
        getAllSubjects({})
          .then((response) => {
            setIsLoadingList(false)
            setSubjectList(response.data)
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
        setIsLoadingList(false)
      })
  }

  useEffect(() => {
    getAllSubjects({
      searchKey: searchKey,
      courseId: selectedGrade?.id ? selectedGrade?.id : ''
    })
      .then((response) => {
        setIsLoadingList(false)
        setSubjectList(response.data.data)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }, [searchKey, selectedGrade?.id])

  const [showDropDownIndex, setShowDropDownIndex] = useState(null)

  const closeDropDown = () => {
    setShowDropDownIndex(null)
  }

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setShowDropDownIndex(null))

  const handleScrollInfinite = (total: number, length: number) => {
    if (total > length) {
      setGradeListPage(gradeListPage + 1)
      setGradeLoading(true)
      const payload = {
        page: gradeListPage + 1,
        limit: 50
      }
      getCourses(payload)
        .then((res: any) => {
          const newGrade = res?.data?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setGradeData((prev) => [...prev, ...newGrade])
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
  }

  return (
    <AllAddCourse2>
      {userInfoV2.role === 'instituteAdmin' ? (
        ''
      ) : userInfoV2.role === 'branchAdmin' ? (
        ''
      ) : (
        <CreateCourseWrapper>
          <Heading>{isEdit ? 'Edit' : 'Add'} New Subject</Heading>
          <AlignCircle>
            <ImageSelector
              defaultvalue={icon}
              onImageSelected={(file: File) => {
                setIcon('')
                setResetValue({ icon: false })
                setCreateSubject({ ...createSubject, icon: file })
              }}
              reset={resetValue.icon}
            />
            <SearchableDropdown
              label="Select Grade"
              required
              style={{ marginLeft: '15px' }}
              options={FinalCourseList}
              error={course === '' ? errors.courseId : ''}
              onSelect={handleCourseSelect}
              placeHolder={'Please Select Grade'}
              selectedValue={
                defaultCourse?.label === '' ? selectedCourse : defaultCourse
              }
              fullWidth
            ></SearchableDropdown>
          </AlignCircle>
          <Flex gap="10px" style={{ marginBottom: '20px' }}>
            <InputV2
              label="Subject Name"
              required
              placeholder="Enter subject name"
              onBlur={() => {
                validateField({
                  type: FinalpayloadCreateSubject.name,
                  value: createSubject?.name
                })
              }}
              error={errors.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCreateSubject({ ...createSubject, name: event.target.value })
              }}
              value={createSubject?.name}
            ></InputV2>
            <CheckboxContainer
              className="checkbox"
              onClick={() => setisLab(!isLab)}
              isChecked={isLab}
              style={{
                border: 'none',
                padding: '0px',
                gap: '0px',
                marginTop: '30px',
                boxShadow: 'none'
              }}
            >
              <Checkbox style={{ backgroundColor: 'white' }}>
                {isLab ? <CheckedSvg /> : <UnCheckedSvg />}
              </Checkbox>
              <span style={{ width: '45px' }}>isLab</span>
            </CheckboxContainer>
          </Flex>
          <ButtonWrap>
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
                <ButtonV2 onClick={handleSubjectSave}>
                  {isEdit ? 'Update' : 'Save & Add More'}
                </ButtonV2>
              )}
            </div>
          </ButtonWrap>
        </CreateCourseWrapper>
      )}
      <NewlyAddedSubjects>
        {/* <NewSubHeading>Subjects Listing</NewSubHeading> */}
        <Flex gap="20px" style={{ margin: '0px 10px 10px 20px' }}>
          <SearchableDropdown
            style={{ width: '100%' }}
            handleScrollInfinite={(first, second) => {
              handleScrollInfinite(first, second)
            }}
            total={gradeTotal}
            length={gradeData.length}
            isLoader={gradeLoading}
            label={'Select Grade'}
            placeHolder={'Please Select Grade'}
            options={gradeData}
            isClear={selectedGrade?.id ? true : false}
            onSelect={(option) => {
              setSelectedGrade(option)
            }}
            selectedValue={selectedGrade}
          />
          <InputSearchV2
            label="Search Subject"
            required
            placeholder="Enter Subject Name"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (
                event.target.value.length >= 1 ||
                event.target.value.length === 0
              ) {
                setSearchKey(event.target.value)
              }
            }}
          />
        </Flex>
        <SubjectListWrapper>
          {isLoadingList ? (
            <ListLoader>
              <Loader />
            </ListLoader>
          ) : (
            subjectList &&
            subjectList.map((item: any, index: any) => (
              <SubjectList key={index}>
                <SubLogoAllign>
                  <SubjectLogo
                    src={
                      item.icon && item.icon.startsWith('https')
                        ? item.icon
                        : NoImage
                    }
                    alt="Subject Icon"
                  />
                  <div>
                    <SubjectName>{item.name}</SubjectName>
                    <CourseInfo>Grade - {item.courseName}</CourseInfo>
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
                                HandleEdit({ id: item._id })
                                // setCreateSubject({
                                //   ...createSubject,
                                //   _id: item._id
                                // })
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
                </DateIconWrap>
              </SubjectList>
            ))
          )}
        </SubjectListWrapper>
      </NewlyAddedSubjects>
    </AllAddCourse2>
  )
}

export default CreateSubjects
