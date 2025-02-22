import { Flex } from '../../../../../components/V2/styledComponents'
import { Button, Container, P } from './styledComponents'
import InputV2 from '../../../../../components/V2/Form/Input'
import TextArea from '../../../../../components/V2/Form/TextArea'
import { AddBranchProps } from './types'
import BasicNumberInput from '../../../../../components/V2/Form/BasicNumberInput'
import MultiselectDropdownSmall from '../../../../../components/V2/Form/MultiselectDropdownSmall'
import { CourseInstitute } from '../../../../../utils/types'
import { DropdownOptionData } from '../../../assignment/Review/ReviewAssignment/Types'
import { useEffect, useState } from 'react'
import { getDropDownOptions } from '../../../../../helpers/V2/dropdown'
import {
  getAllInstituteAPI,
  getcourseById
} from '../../../../../helpers/V2/apis'
import { UserResponse } from '../../../../../redux/addStudentV2/types'
import { checkUserNameAPI } from '../../../../../redux/addStudentV2/api'
import { InputBar } from '../../../addstudent/stylecomponent'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import InputPasswordV2 from '../../../../../components/V2/Form/InputPassword'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import SearchableDropdown from '../../../../../components/V2/Form/SearchableDropdown'
import {
  Checkbox,
  CheckboxContainer
} from '../../../../../components/V2/Form/ItemCheckbox'
import { ReactComponent as CheckedSvg } from '../../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../../assets/svg/un-check-icon.svg'
const AddBranch = ({
  branchName,
  setBranchName,
  branchLocation,
  setBranchLocation,
  branchUserName,
  setBranchUserName,
  branchPassword,
  setBranchPassword,
  branchContactName,
  setBranchContactName,
  branchContactNumber,
  setBranchContactNumber,
  onBranchCourse,
  onClick,
  EditBranchId,
  branchData,
  isSubmiting,
  selectedInstitute,
  setSelectedInstitute,
  isPublish,
  setIsPublish
}: AddBranchProps) => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const [selectedCourse, setSelectedCourse] = useState<
    DropdownOptionData<CourseInstitute>[]
  >([])
  const [newCourseList, setNewCourseList] = useState<any[]>([])
  const [tableData, setTableData] = useState<UserResponse>({
    message: '',
    data: {
      userExists: false
    }
  })

  const [dataUpdate, setDataUpdate] = useState<any>(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [insLoading, setInsLoading] = useState(false)

  useEffect(() => {
    if (selectedInstitute.id) {
      getcourseById({
        instituteId: selectedInstitute.id
      }).then((response) => {
        const courses = response.data.map((course: any) => ({
          id: course._id,
          value: course.name,
          label: course.name,
          url: ''
        }))
        setNewCourseList(courses)
      })
    }
  }, [selectedInstitute])

  useEffect(() => {
    if (EditBranchId == '') {
      setSelectedCourse([])
      setDataUpdate(false)
    } else {
      const UpdateCourse = branchData?.map((u: any) => ({
        id: u.courseId,
        label: u.courseName,
        value: u.courseName,
        url: ''
      }))
      setSelectedCourse(UpdateCourse)
      setDataUpdate(true)
    }
  }, [EditBranchId, branchData])

  useEffect(() => {
    let newInstitute: any = []
    if (userInfoV2.role === 'superAdmin') {
      setInsLoading(true)
      const payload = {
        page: 1,
        limit: 150
      }
      getAllInstituteAPI(payload)
        .then((res: any) => {
          newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name
            }
          })
          setInstituteData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInsLoading(false))
    } else if (userInfoV2.role === 'instituteAdmin') {
      setSelectedInstitute({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName
      })
    }
  }, [userInfoV2, setSelectedInstitute])

  const [formErrors, setFormErrors] = useState<{
    branchContactNumber: string
    branchPassword: string
  }>({
    branchContactNumber: '',
    branchPassword: ''
  })
  const validateContactNumber = (number: string) => {
    if (number.length !== 10) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        branchContactNumber: 'Invalid phone number. Must be 10 digits.'
      }))
      return false
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        branchContactNumber: ''
      }))
      return true
    }
  }
  // const validatePassword = (branchPassword: string) => {
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  //   if (!passwordRegex.test(branchPassword)) {
  //     setFormErrors((prevErrors) => ({
  //       ...prevErrors,
  //       branchPassword:
  //         'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
  //     }))
  //     return false
  //   } else {
  //     setFormErrors((prevErrors) => ({ ...prevErrors, branchPassword: '' }))
  //     return true
  //   }
  // }
  const handleBlur = (event: string | any) => {
    if (!EditBranchId) {
      const inputValueOnBlur = event.target.value
      checkUserNameAPI({
        username: inputValueOnBlur
      })
        .then((res) => {
          if (res) {
            setTableData(res)
          }
        })
        .catch((error) => console.log({ error }))
    }
  }

  const handleSubmit = () => {
    if (!EditBranchId) {
      const isContactNumberValid = validateContactNumber(
        branchContactNumber.toString()
      )
      // const isPasswordValid = validatePassword(branchPassword)

      if (isContactNumberValid && branchPassword) {
        onClick()
      }
    } else {
      onClick()
    }
  }
  return (
    <Container style={{ overflow: 'hidden' }}>
      <InputBar>
        <Flex justifyContent="space-between" gap="4px">
          <P>
            {EditBranchId == '' ? 'Add' : 'Edit'} Branch for{' '}
            {selectedInstitute.label}
          </P>

          <Button
            disabled={
              isSubmiting ||
              !(EditBranchId
                ? branchName && branchLocation
                : userInfoV2.role === 'branchAdmin'
                ? ''
                : branchName &&
                  branchLocation &&
                  branchUserName &&
                  branchPassword &&
                  branchContactName &&
                  branchContactName)
            }
            onClick={handleSubmit}
          >
            {EditBranchId == '' ? 'Save' : 'Update'}
          </Button>
        </Flex>
        {userInfoV2.role === 'superAdmin' && (
          <SearchableDropdown
            style={{ width: '100%' }}
            isLoader={insLoading}
            label={'Select Institute / School'}
            placeHolder={'Please Select Institute / School'}
            options={instituteData}
            isClear={!!selectedInstitute?.id}
            onSelect={(option) => {
              setSelectedInstitute(option)
            }}
            selectedValue={selectedInstitute}
            required
          />
        )}
        {/* <div style={{ width: '100%' }}>
          <SearchableDropdown
            fullWidth
            required
            isLoader={insLoading}
            label={'Select Board'}
            placeHolder="Choose Board"
            options={boardList}
            onSelect={(data) => {
              setSelectedBoard(data)
            }}
            selectedValue={selectedBoard}
          />
        </div> */}

        <Flex style={{ flexDirection: 'row', gap: '2%' }}>
          <div style={{ width: '100%' }}>
            <InputV2
              Update={dataUpdate}
              label={'Branch Name'}
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Branch Name'"
              required
              full
              // readOnly={EditBranchId ? true : false}
            />
          </div>
          {/* <div style={{ width: '48%' }}>
            <InputNumber
              Update={dataUpdate}
              label={'Student Limit'}
              required
              withHandler
              value={studentLimit}
              onChange={(val) => setStudentLimit(val)}
            />
          </div> */}
        </Flex>
        {userInfoV2.role !== 'branchAdmin' && (
          <MultiselectDropdownSmall
            Update={dataUpdate}
            fullWidth
            required
            label={'Select Grade'}
            placeholder="Choose Grade"
            options={getDropDownOptions(newCourseList, 'id', 'label')}
            onSelect={(data) => {
              setSelectedCourse(data)
              onBranchCourse(
                data.filter((item) => item.id !== null).map((item) => item.id)
              )
            }}
            selectedValue={selectedCourse}
          ></MultiselectDropdownSmall>
        )}
        <TextArea
          Update={dataUpdate}
          label={'Branch Location'}
          value={branchLocation}
          onChange={(e) => setBranchLocation(e.target.value)}
          required
          placeholder="Search Location"
        />

        <Flex style={{ flexDirection: 'row', gap: '2%' }}>
          <div style={{ width: '48%' }}>
            <InputV2
              full
              label="Contact Name"
              placeholder="Enter Contact Name"
              value={branchContactName}
              onChange={(e) => setBranchContactName(e.target.value)}
              required
              readOnly={EditBranchId ? true : false}
            />
          </div>
          <div style={{ width: '48%' }}>
            <BasicNumberInput
              full
              value={branchContactNumber}
              label="Contact Number"
              placeholder="Enter Contact Number"
              onChange={(e) => {
                setBranchContactNumber(parseInt(e.target.value, 10))
              }}
              required
              error={formErrors.branchContactNumber}
              readOnly={EditBranchId ? true : false}
            />
          </div>
        </Flex>
        <Flex style={{ flexDirection: 'row', gap: '2%' }}>
          <div style={{ width: '48%' }}>
            <InputV2
              full
              label="UserName"
              placeholder="Enter Username"
              value={branchUserName}
              onChange={(e) => setBranchUserName(e.target.value)}
              required
              onBlur={handleBlur}
              error={
                tableData?.data.userExists ? 'Username already exists' : ''
              }
              readOnly={EditBranchId ? true : false}
              autoComplete="off" // Disable autocomplete
            />
          </div>
          {EditBranchId ? (
            ''
          ) : (
            <div style={{ width: '48%' }}>
              <InputPasswordV2
                full
                label="Password"
                placeholder="Enter the Password"
                required
                value={branchPassword}
                onChange={(e) => setBranchPassword(e.target.value)}
                type="password"
                error={formErrors.branchPassword}
                readOnly={EditBranchId ? true : false}
                password={true}
                autoComplete="new-password" // Use "new-password" for password fields
              />
            </div>
          )}
        </Flex>
        <Flex justifyContent="space-between" style={{ marginTop: '20px' }}>
          <CheckboxContainer
            className="checkbox"
            onClick={() => setIsPublish(!isPublish)}
            isChecked={isPublish}
            style={{
              border: 'none',
              padding: '0px',
              gap: '0px',
              boxShadow: 'none'
            }}
          >
            <Checkbox style={{ backgroundColor: 'white' }}>
              {isPublish ? <CheckedSvg /> : <UnCheckedSvg />}
            </Checkbox>
            <span>Publish All Materials</span>
          </CheckboxContainer>
        </Flex>
      </InputBar>
    </Container>
  )
}

export default AddBranch
