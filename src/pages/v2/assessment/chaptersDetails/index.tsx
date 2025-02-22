import InputV2 from '../../../../components/V2/Form/Input'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  AlignCircle,
  AllAddCourse2,
  CreateCourseWrapper,
  Heading,
  ButtonWrap,
  LoaderAlign
} from './styledComponents'
import {
  ButtonV2,
  Flex,
  PageContainer
} from '../../../../components/V2/styledComponents'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  createChapterAPI,
  getLearnCourseData,
  getSingleChapterAPI,
  getSubjectsDataCourseId,
  updateChapterAPI
} from '../../../../helpers/V2/apis'
import {
  CreateChapterProps,
  FinalpayloadCreateSubject
} from '../../../../utils/types'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import { hasFormError } from '../../../../helpers/V2/formValidation'
import { LoaderIcon } from 'react-hot-toast'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import CreateChapterValidation from './helper'
import { useHistory, useParams } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'

const chapterinfo = {
  name: '',
  subjectId: '',
  sequence: 0
}

const ChapterDetails = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const params: any = useParams()
  const history = useHistory()

  const [subjectList, setSubjectList] = useState<
    SearchableDropdownOptionData[]
  >([])
  const [errors, setErrors] = useState({} as Record<string, string>)
  const [createChapter, setCreateChapter] =
    useState<CreateChapterProps>(chapterinfo)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingList, setIsLoadingList] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [course, setCourse] = useState('')
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()

  const [isLoadingCourse, setIsLoadingCourse] = useState(true)
  const [courseList, setCourseList] = useState<SearchableDropdownOptionData[]>(
    []
  )

  const [selectedCourse, setSelectedCourse] = useState({
    id: '',
    label: ''
  })

  useEffect(() => {
    if (selectedCourse.id) {
      setIsLoadingList(true)
      getSubjectsDataCourseId({
        page: 1,
        limit: 150,
        courseId: selectedCourse.id
      })
        .then((response) => {
          let newSubjects: any = []
          newSubjects = response.data.map((course: any) => ({
            id: course._id,
            label: course.name
          }))
          setSubjectList(newSubjects)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoadingList(false))
    }
  }, [selectedCourse.id])

  useEffect(() => {
    setIsLoadingCourse(true)
    getLearnCourseData({
      page: 1,
      limit: 150
    })
      .then((response) => {
        let newCourses: any = []
        newCourses = response.map((course: any) => ({
          id: course._id,
          label: course.name
        }))
        setCourseList(newCourses)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoadingCourse(false))
  }, [])

  // const FinalCourseList: SearchableDropdownOptionData[] = courseList
  //   ? courseList.map((course) => ({
  //     id: course._id,
  //     label: course.name
  //   }))
  //   : []

  const handleCourseSelect = (subject: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedSubject(subject)
    if (subject && subject.id) {
      setCreateChapter({
        ...createChapter,
        subjectId: subject.id as string
      })
    }
  }

  const handleChapterSave = () => {
    const validationError = CreateChapterValidation(createChapter, errors)
    if (hasFormError(validationError)) {
      setErrors(validationError)
      setCourse('')
      CustomToastMessage('Please Enter the Required Fields', 'error')
    } else {
      setIsLoading(true)
      const newFormData: any = new FormData()
      newFormData.append('name', createChapter.name)
      newFormData.append('sequence', createChapter.sequence)
      newFormData.append('subjectId', createChapter.subjectId)

      if (isEdit) {
        updateChapterAPI(
          {
            name: createChapter.name,
            sequence: createChapter.sequence,
            subjectId: createChapter.subjectId
          },
          params.id
        )
          .then((res) => {
            setErrors({})
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.CHAPTERS)
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => setIsLoading(false))
      } else {
        createChapterAPI({
          name: createChapter.name,
          sequence: createChapter.sequence,
          subjectId: createChapter.subjectId
        })
          .then((res) => {
            setErrors({})
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.CHAPTERS)
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => setIsLoading(false))
      }
    }
  }
  const validateField = (field: {
    type: FinalpayloadCreateSubject
    value: string
  }): void => {
    setErrors(CreateChapterValidation(createChapter, errors, field))
  }

  // const HandleEdit = (user: EditDeleteProps) => {
  //   setIsEdit(true)
  //   getSingleChapterAPI(user.id)
  //     .then((response) => {
  //       setCreateChapter(response.data)
  //       setDefaultCourse({
  //         label: response.data.subjectName,
  //         id: response.data.subjectId
  //       })
  //     })
  //     .catch((error) => CustomToastMessage(error.message, 'error'))
  // }

  useEffect(() => {
    if (params.id) {
      setIsEdit(true)
      getSingleChapterAPI(params.id)
        .then((response) => {
          setCreateChapter(response.data)
          setSelectedCourse({
            label: response.data.courseName,
            id: response.data.courseId
          })
          setSelectedSubject({
            label: response.data.subjectName,
            id: response.data.subjectId
          })
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [params.id])

  return (
    <PageContainer>
      <AllAddCourse2>
        {userInfoV2.role === 'instituteAdmin' ? (
          ''
        ) : userInfoV2.role === 'branchAdmin' ? (
          ''
        ) : (
          <CreateCourseWrapper style={{ height: 'auto' }}>
            <Heading>
              {params.id ? 'Edit Chapter' : 'Create New Chapter'}
            </Heading>
            <SearchableDropdown
              label="Select Grade"
              required
              isLoader={isLoadingCourse}
              options={courseList}
              error={course === '' ? errors.courseId : ''}
              isClear={selectedCourse?.label ? true : false}
              onSelect={(data: any) => {
                setSelectedCourse(data)
                setSubjectList([])
                setSelectedSubject({ label: '', value: '' })
              }}
              placeHolder={'Please Select Grade'}
              selectedValue={selectedCourse}
              fullWidth
            ></SearchableDropdown>

            <Flex
              gap="10px"
              style={{ marginBottom: '20px', marginTop: '20px' }}
            >
              <SearchableDropdown
                label="Select Subject"
                required
                options={subjectList}
                error={course === '' ? errors.subjectId : ''}
                onSelect={handleCourseSelect}
                placeHolder={'Please Select Subject'}
                isClear={selectedSubject?.label ? true : false}
                isLoader={isLoadingList}
                selectedValue={selectedSubject}
                fullWidth
              ></SearchableDropdown>
            </Flex>
            <AlignCircle style={{ gap: '20px' }}>
              <InputV2
                label="Chapter Name"
                required
                placeholder="Enter Chapter name"
                onBlur={() => {
                  validateField({
                    type: FinalpayloadCreateSubject.name,
                    value: createChapter.name
                  })
                }}
                error={errors.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setCreateChapter({
                    ...createChapter,
                    name: event.target.value
                  })
                }}
                value={createChapter.name}
              ></InputV2>
              <InputV2
                label="Chapter Sequence"
                required
                placeholder="Enter Chapter Sequence"
                onBlur={() => {
                  validateField({
                    type: FinalpayloadCreateSubject.sequence,
                    value: createChapter.sequence
                  })
                }}
                error={errors.sequence}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setCreateChapter({
                    ...createChapter,
                    sequence: event.target.value
                  })
                }}
                value={
                  createChapter.sequence === 0 ? '' : createChapter.sequence
                }
              ></InputV2>
            </AlignCircle>
            <ButtonWrap className="d-flex justify-content-end">
              <div>
                {isLoading ? (
                  <LoaderAlign>
                    <LoaderIcon />
                  </LoaderAlign>
                ) : (
                  <ButtonV2 onClick={handleChapterSave}>
                    {isEdit ? 'Update' : 'Save & Add More'}
                  </ButtonV2>
                )}
              </div>
            </ButtonWrap>
          </CreateCourseWrapper>
        )}
        {/* <NewlyAddedSubjects>
        <NewSubHeading>Chapters Listing</NewSubHeading>
        <SubjectListWrapper>
          {isLoadingList ? (
            <ListLoader>
              <Loader />
            </ListLoader>
          ) : (
            chapterList &&
            chapterList.map((item: any, index: any) => (
              <SubjectList key={index}>
                <SubLogoAllign>
                  <div>
                    <SubjectName>{item.name}</SubjectName>
                    <CourseInfo>Subject - {item.subjectName}</CourseInfo>
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
                                setCreateChapter({
                                  ...createChapter,
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
      </NewlyAddedSubjects> */}
      </AllAddCourse2>
    </PageContainer>
  )
}

export default ChapterDetails
