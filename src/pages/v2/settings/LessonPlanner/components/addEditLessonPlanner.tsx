import { useEffect, useState } from 'react'
import SimpleButton from '../../../../../components/V2/Button/SimpleButton'
import SearchableDropdown from '../../../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../../../components/V2/Form/types'
import {
  Flex,
  PageContainer
} from '../../../../../components/V2/styledComponents'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import {
  createLessonPlanApi,
  getChapterData,
  getClassActivitiesApi,
  getCourses,
  getSubjectData
} from '../../../../../helpers/V2/apis'
import {
  Fields,
  FullPage,
  SubmitSecondContainer,
  UnitChapterHeading,
  UnitsChapterContainer
} from '../StyledComponents'
import {
  Checkbox,
  CheckboxContainer,
  FieldLabel
} from '../../studentSettings/styledComponents'
import { ReactComponent as CheckedSvg } from '../../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../../assets/svg/un-check-icon.svg'
import InputV2 from '../../../../../components/V2/Form/Input'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../../const/V2/stylingVariables'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../../const/V2/routes'

const AddEditLessonPlanner = () => {
  const history = useHistory()
  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()
  const [subject, setSubject] = useState<any[]>([])
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [chapterData, setChapterData] = useState<any[]>([])
  const [chapterLoading, setChapterLoading] = useState(false)

  const [selectedChapterId, setSelectedChapterId] = useState('')
  const [selectedClassActivitiesId, setSelectedClassActivitesId] = useState<
    String[]
  >([])
  const [sessioncount, setSessionCout] = useState(0)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [classActivitiesData, setClassActivitiesData] = useState([])

  useEffect(() => {
    let newActivities: any = []
    const payload = {
      page: 1,
      limit: 150
    }
    getClassActivitiesApi(payload)
      .then((res: any) => {
        newActivities = res?.data?.map((item: any) => {
          return {
            id: item.key,
            name: item.name
          }
        })
        setClassActivitiesData(newActivities)
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setGradeLoading(false))
  }, [])

  useEffect(() => {
    let newGrade: any = []
    setGradeLoading(true)
    const payload = {
      page: 1,
      limit: 150
    }
    getCourses(payload)
      .then((res: any) => {
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
    if (selectedGrade?.id) {
      setSubjectLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        courseId: selectedGrade?.id
      }
      getSubjectData(payload)
        .then((res: any) => {
          const newSubject = res?.map((Subject: any) => {
            return {
              label: Subject.name,
              id: Subject?._id,
              value: ''
            }
          })
          setSubject(newSubject)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setSubjectLoading(false))
    }
  }, [selectedGrade?.id])

  const getChapter = () => {
    if (selectedGrade?.id && selectedSubject?.id) {
      setChapterLoading(true)
      getChapterData({ limit: 120, page: 1, subjectId: selectedSubject?.id })
        .then((res: any) => {
          console.log(res?.data, 'ddfsdf')
          setChapterData(res?.data)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setChapterLoading(false))
    }
  }

  const handleSelect = (id: string) => {
    let newSelectedids: any = [...selectedClassActivitiesId]
    if (newSelectedids.includes(id)) {
      newSelectedids = newSelectedids.filter((prev: any) => prev !== id)
      setSelectedClassActivitesId(newSelectedids)
    } else {
      newSelectedids.push(id)
      setSelectedClassActivitesId(newSelectedids)
    }
  }

  const handleSubmit = () => {
    if (
      selectedChapterId &&
      sessioncount &&
      selectedClassActivitiesId.length > 0
    ) {
      setSubmitLoading(true)
      createLessonPlanApi({
        chapterId: selectedChapterId,
        sessionCount: sessioncount,
        classActivities: selectedClassActivitiesId
      })
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          history.push(ROUTES_V2.LESSON_PLANNER)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSubmitLoading(false))
    }
  }

  return (
    <PageContainer>
      <FullPage>
        <Flex gap="10px" wrap alignItems="end">
          <SearchableDropdown
            style={{ width: '290px' }}
            isLoader={gradeLoading}
            label={'Select Grade'}
            placeHolder={'Please Select Grade'}
            options={gradeData}
            isClear={selectedGrade?.id ? true : false}
            onSelect={(option) => {
              setSelectedGrade(option)
              setSubject([])
              setSelectedSubject({ id: '', label: '', value: '' })
            }}
            selectedValue={selectedGrade}
          />
          <SearchableDropdown
            style={{ width: '280px' }}
            isLoader={subjectLoading}
            label="Select Subject"
            placeHolder="Please Select Subject"
            options={subject}
            isClear={selectedSubject?.id ? true : false}
            onSelect={(data: any) => {
              setSelectedSubject(data)
            }}
            selectedValue={selectedSubject}
          />
          <SimpleButton label="Submit" clickHandler={() => getChapter()} />
        </Flex>

        <Flex gap="10px" wrap style={{ marginTop: '10px' }} alignItems="start">
          <UnitsChapterContainer>
            <UnitChapterHeading> Chapters </UnitChapterHeading>

            {chapterLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Spinner
                  style={{
                    width: '44px',
                    height: '44px',
                    color: `${BlueButton}`,
                    marginTop: '20px'
                  }}
                  animation={'border'}
                />
              </div>
            )}
            {chapterData &&
              chapterData.length > 0 &&
              chapterData?.map((item: any, index: any) => (
                <Fields key={`key_${index}`}>
                  <CheckboxContainer
                    className="d-flex justify-content-center"
                    onClick={() => setSelectedChapterId(item?._id)}
                    onKeyDown={() => setSelectedChapterId(item?._id)}
                    role="button" // Adding role="button" to indicate this is an interactive element
                    tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
                  >
                    <Checkbox>
                      {selectedChapterId === item?._id ? (
                        <CheckedSvg />
                      ) : (
                        <UnCheckedSvg />
                      )}
                    </Checkbox>
                  </CheckboxContainer>{' '}
                  <FieldLabel>{item?.name}</FieldLabel>{' '}
                </Fields>
              ))}
          </UnitsChapterContainer>
          <SubmitSecondContainer>
            <InputV2
              style={{ width: '80%' }}
              placeholder="Enter no of sessions / periods"
              type="number"
              label={''}
              name="pincode"
              onChange={(e) => setSessionCout(Number(e.target.value))}
            />
            <div>
              <UnitChapterHeading> Resources </UnitChapterHeading>

              {classActivitiesData &&
                classActivitiesData.length > 0 &&
                classActivitiesData?.map((item: any, index: any) => (
                  <Fields key={`key_${index}`}>
                    <CheckboxContainer
                      className="d-flex justify-content-center"
                      onClick={() => handleSelect(item?.id)}
                      onKeyDown={() => handleSelect(item?.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <Checkbox>
                        {selectedClassActivitiesId.includes(item?.id) ? (
                          <CheckedSvg />
                        ) : (
                          <UnCheckedSvg />
                        )}
                      </Checkbox>
                    </CheckboxContainer>{' '}
                    <FieldLabel>{item?.name}</FieldLabel>{' '}
                  </Fields>
                ))}
            </div>
            <SimpleButton
              label="Submit"
              clickHandler={() => handleSubmit()}
              disabled={submitLoading}
            />
          </SubmitSecondContainer>
        </Flex>
      </FullPage>
    </PageContainer>
  )
}
export default AddEditLessonPlanner
