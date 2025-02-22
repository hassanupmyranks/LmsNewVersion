import SearchableDropdown from '../Form/SearchableDropdown'
import { ButtonV2 } from '../styledComponents'
import {
  PopUpBox,
  AlignHeading,
  Heading,
  RemoveIcon,
  SearchInputWrapper,
  ButtonWrapper,
  PopUpContainer
} from './styledComponents'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import {
  BatchDetails,
  BranchDetails,
  CreateInstituteTestPayload,
  InstituteDetails,
  NewBatchDetails,
  NewBranchDetails
} from '../../../utils/types'
import {
  NewCreateInstituteTest,
  getBatchAPI,
  getBranchAPI,
  getInstitutesAPI,
  updateInstituteTestAPI
} from '../../../helpers/V2/apis'
import { useHistory } from 'react-router-dom'
import { createTestDetails } from '../../../redux/create_schedule_assign_test/actions'
import { initialState } from '../../../redux/create_schedule_assign_test/types'
import { useEffect, useMemo, useState } from 'react'
import {
  deepClone,
  getNumber
} from '../../../pages/v2/assessment/addQuestions/helper'
import { DropdownOptionData, SearchableDropdownOptionData } from '../Form/types'
import ROUTES_V2 from '../../../const/V2/routes'
import { formattedTime } from '../../../helpers/V2/formattedTime'
import MultiselectDropdown from '../Form/MultiselectDropdown'
import { getDropDownOptions } from '../../../helpers/V2/dropdown'
import { CustomToastMessage } from '../ToastMessage'

const AssignTestPopUp = ({ setPopup }: { setPopup: (d: boolean) => void }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const defaultValue = useMemo(() => {
    return {
      label: '',
      id: ''
    }
  }, [])

  const [institutes, setInstitutes] = useState<SearchableDropdownOptionData[]>(
    []
  )

  const [branch, setBranch] = useState<SearchableDropdownOptionData[]>([])

  const [batch, setBatch] = useState<any[]>([])

  const [selectedInstitute, setSelectedInstitute] = useState({
    institute_id: '',
    institute_name: ''
  })
  const [selectedBranch, setSelectedBranch] = useState<BranchDetails[]>([])
  const [selectedBatch, setSelectedBatch] = useState<
    DropdownOptionData<BatchDetails>[]
  >([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [institutesApiLoading, setInstitutesAPILoading] = useState(false)

  const [branchApiLoading, setBranchApiLoading] = useState(false)

  const [batchApiLoading, setBatchApiLoading] = useState(false)

  const [isSubmit, setIsSubmit] = useState(false)

  const [selectInstitute, setSelectInstitute] = useState(defaultValue)
  const [selectBranch, setSelectBranch] = useState(defaultValue)

  const submitHandler = () => {
    setIsSubmit(true)
    if (
      selectedInstitute.institute_id &&
      selectedBranch.length > 0 &&
      selectedBatch.length > 0
    ) {
      let testStartTime = formattedTime(selector.startDate, selector.startTime)
      let testPatternDetails: any = {
        id: selector.testPatternId,
        name: selector.testPattern
      }
      let testEndTime = formattedTime(selector.endDate, selector.endTime)

      const newBatch = selectedBatch.map((item) => {
        return {
          batch_id: item.id,
          batch_name: item.label
        }
      })

      let testType = 'SUPERADMIN_TEST'

      if (user.role === 'teacher') {
        testType = 'TEACHER_TEST'
      }

      if (user.role === 'student') {
        testType = 'PRACTICE_TEST'
      }

      const test_details: any = deepClone(selector.subjectDetails)
      for (let index = 0; index < test_details.length; index++) {
        const test_detail: any = test_details[index]

        if (test_detail?.sections) {
          for (let j = 0; j < test_detail.sections.length; j++) {
            if (!Array.isArray(test_detail.sections[j].question_type)) {
              test_detail.sections[j].question_type = [
                test_detail.sections[j].question_type
              ]
            }
          }
        }

        test_details[index] = test_detail
      }

      const payload: CreateInstituteTestPayload | any = {
        institute_test_name: selector.testName,
        test_pattern_details: testPatternDetails,
        course_id: selector.courseId,
        course_name: selector.course_name,
        test_start_time: testStartTime,
        test_end_time: testEndTime,
        test_duration_type: 'FIXED',
        test_duration: selector.testDuration,
        total_test_questions: selector.totalQuestions,
        institute_details: selectedInstitute,
        branch_details: selectedBranch,
        batch_details: newBatch,
        total_marks: selector.totalMarks,
        add_password: selector.isPasswordProtect ? true : false,
        password: selector.password,
        instruction_text: selector.instructionText,
        created_by: user._id,
        test_details: {
          subjects_details: selector.subjectDetails
        },
        test_type: testType
      }
      setIsDisabled(true)
      if (selector.isEdit) {
        payload['test_id'] = selector.test_id
        delete payload.course_name
        delete payload.created_by
        updateInstituteTestAPI(payload)
          .then((res) => {
            if (res.status === 200 || res.status === 'success') {
              CustomToastMessage(`Successfully updated!`, 'success')
              dispatch(createTestDetails(initialState))
              history.push(ROUTES_V2.TESTS)
            } else {
              CustomToastMessage(`${res.data}`, 'error')
            }
          })
          .catch((error) =>
            CustomToastMessage(error.response.data.message, 'error')
          )
          .finally(() => setIsDisabled(false))
      } else {
        NewCreateInstituteTest(payload)
          .then((res) => {
            if (res.status === 200 || res.status === 'success') {
              CustomToastMessage(`Successfully Created!`, 'success')
              dispatch(createTestDetails(initialState))
              history.push(ROUTES_V2.TESTS)
            } else {
              CustomToastMessage(`${res.data}`, 'error')
            }
            setPopup(false)
          })
          .catch((error) => CustomToastMessage(`${error}`, 'error'))
          .finally(() => setIsDisabled(false))
      }
      setIsSubmit(true)
    }
  }

  useEffect(() => {
    setInstitutesAPILoading(true)
    getInstitutesAPI({ page: 1, limit: 50 })
      .then((data) => {
        const newInstitutes = data?.data?.map((item: InstituteDetails) => {
          return {
            value: `${getNumber(
              Number(item.teacherCount)
            )} Teachers | ${getNumber(item.branchCount)} Branches `,
            label: item.name,
            id: item?._id,
            url: ''
          }
        })
        setInstitutes(newInstitutes)
      })
      .catch((err) => console.log(err))
      .finally(() => setInstitutesAPILoading(false))
  }, [])

  const getBranch = (instituteId: string) => {
    const payload = {
      page: 1,
      limit: 50,
      instituteId: instituteId
    }
    setBranchApiLoading(true)
    getBranchAPI(payload)
      .then((res) => {
        const newBranch = res?.data?.map((branch: NewBranchDetails) => {
          return {
            value: `${getNumber(Number(branch.teacherCount))} Teachers`,
            label: branch.name,
            id: branch?._id
          }
        })
        setBranch(newBranch)
      })
      .catch((err) => console.log(err))
      .finally(() => setBranchApiLoading(false))
  }

  const getBatch = (branchId: string) => {
    const payload = {
      page: 1,
      limit: 200,
      branchIds: [branchId]
    }
    setBatchApiLoading(true)
    getBatchAPI(payload)
      .then((res) => {
        const newBatch = res?.data?.map((batch: NewBatchDetails) => {
          return {
            label: batch.name,
            id: batch?._id
          }
        })
        setBatch(newBatch)
      })
      .catch((err) => console.log(err))
      .finally(() => setBatchApiLoading(false))
  }

  const SelectedInstitute = (selectedValue: SearchableDropdownOptionData) => {
    setSelectedInstitute({
      institute_id: '',
      institute_name: ''
    })
    setBranch([])
    setSelectedBatch([])
    setSelectInstitute({
      id: String(selectedValue.id),
      label: selectedValue.label
    })
    setSelectBranch(defaultValue)
    getBranch(String(selectedValue.id))
    setSelectedInstitute({
      institute_id: String(selectedValue.id),
      institute_name: selectedValue.label
    })
  }

  const SelectedBranch = (selectedValue: SearchableDropdownOptionData) => {
    setSelectBranch({
      id: String(selectedValue.id),
      label: selectedValue.label
    })
    setBatch([])
    getBatch(String(selectedValue.id))
    setSelectedBranch([])
    setSelectedBatch([])
    setSelectedBranch((prev) => {
      return [
        ...prev,
        {
          branch_id: String(selectedValue.id),
          branch_name: selectedValue.label
        }
      ]
    })
  }

  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <div></div>
          <Heading>Assign Test</Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <SearchInputWrapper>
          <SearchableDropdown
            label="Select Institute / School"
            placeHolder="Enter or select institute / school"
            options={institutes}
            onSelect={SelectedInstitute}
            selectedValue={selectInstitute}
            isClear={selectedInstitute.institute_name ? true : false}
            defaultValue=""
            required
            isLoader={institutesApiLoading}
            error={
              selectedInstitute.institute_name || !isSubmit
                ? ''
                : 'field is required'
            }
          />
        </SearchInputWrapper>
        <SearchInputWrapper>
          <SearchableDropdown
            label="Select Branch"
            placeHolder="Enter or select branch"
            options={branch}
            onSelect={SelectedBranch}
            selectedValue={selectBranch}
            isClear={selectBranch?.label ? true : false}
            defaultValue=""
            isLoader={branchApiLoading}
            required
            error={
              selectedBranch.length > 0 || !isSubmit ? '' : 'field is required'
            }
          />
        </SearchInputWrapper>
        <MultiselectDropdown
          selectedValue={selectedBatch}
          isLoading={batchApiLoading}
          label="Select Batch / Section (Select multiple)"
          placeholder="Enter or select Batch / Section"
          options={getDropDownOptions(batch, 'id', 'label')}
          onSelect={(data) => {
            setSelectedBatch(data)
          }}
          required
          fullWidth
        />
        <ButtonWrapper>
          <ButtonV2 onClick={() => submitHandler()} disabled={isDisabled}>
            Assign
          </ButtonV2>
        </ButtonWrapper>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default AssignTestPopUp
