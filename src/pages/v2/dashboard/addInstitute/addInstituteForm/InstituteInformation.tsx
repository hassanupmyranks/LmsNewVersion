import { useEffect, useState } from 'react'
import BasicNumberInput from '../../../../../components/V2/Form/BasicNumberInput'
import InputV2 from '../../../../../components/V2/Form/Input'
import TextArea from '../../../../../components/V2/Form/TextArea'
import { Flex } from '../../../../../components/V2/styledComponents'
import { Button, Container, P } from './styledComponents'
import { InstituteInformationProps } from './types'
import MultiselectDropdownSmall from '../../../../../components/V2/Form/MultiselectableDropDown'
import { InputBar } from '../../../addstudent/stylecomponent'
import { getAllCourses } from '../../../../../helpers/V2/apis'
import { getDropDownOptions } from '../../../../../helpers/V2/dropdown'
import { UserResponse } from '../../../../../redux/addStudentV2/types'
import { checkUserNameAPI } from '../../../../../redux/addStudentV2/api'
import { useParams } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import InputPasswordV2 from '../../../../../components/V2/Form/InputPassword'
import {
  Checkbox,
  CheckboxContainer
} from '../../../../../components/V2/Form/ItemCheckbox'
import { ReactComponent as CheckedSvg } from '../../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../../assets/svg/un-check-icon.svg'

const InstituteInformation = ({
  instituteName,
  setInstituteName,
  contactName,
  setContactName,
  contactNumber,
  setContactNumber,
  instituteUserName,
  setInstituteUserName,
  institutePassword,
  setInstitutePassword,
  instituteLocation,
  setInstituteLocation,
  onClick,
  onIdsChange,
  // onBoardIdsChange,
  data,
  // boardList,
  selectedGrades,
  setSelectedGrades,
  hasPrepMaterial,
  setHasPrepMaterial,
  // selectedBoards,
  // setSelectedBoards,
  isSubmiting,
  screenSize
}: // isPublish,
// setIsPublish
InstituteInformationProps) => {
  const [newCourseList, setNewCourseList] = useState<any[]>([])
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)
  const [dataUpdate, setDataUpdate] = useState<any>(false)
  const [formErrors, setFormErrors] = useState<{
    contactNumber: string
    password: string
  }>({
    contactNumber: '',
    password: ''
  })
  const [tableData, setTableData] = useState<UserResponse>({
    message: '',
    data: {
      userExists: false
    }
  })
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  let { id }: any = useParams()
  if (userInfoV2?.role == 'instituteAdmin') {
    id = userInfoV2.instituteId
  }

  useEffect(() => {
    getAllCourses().then((response) => {
      const courses = response.data.data.map((course: any) => ({
        id: course._id,
        value: course.name,
        label: course.name,
        url: ''
      }))
      setNewCourseList(courses)
    })
  }, [])

  useEffect(() => {
    if (id) {
      setIsReadOnly(true)
      if (contactNumber == 0) {
        setDataUpdate(false)
      } else {
        const UpdateCourse = data.map(
          (u: any) =>
            u.courseId && {
              id: u.courseId,
              label: u.courseName,

              value: u.courseName,

              url: ''
            }
        )
        if (!UpdateCourse.includes(null)) {
          setSelectedGrades(UpdateCourse)
          setDataUpdate(true)
        }
      }
    }
  }, [id, contactNumber, data, setSelectedGrades])

  const validateContactNumber = (number: string) => {
    if (number.length !== 10) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        contactNumber: 'Invalid phone number. Must be 10 digits.'
      }))
      return false
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, contactNumber: '' }))
      return true
    }
  }

  // const validatePassword = (password: string) => {
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  //   if (!passwordRegex.test(password)) {
  //     setFormErrors((prevErrors) => ({
  //       ...prevErrors,
  //       password:
  //         'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
  //     }))
  //     return false
  //   } else {
  //     setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }))
  //     return true
  //   }
  // }

  const handleBlur = (event: string | any) => {
    if (!id) {
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
    if (!id) {
      const isContactNumberValid = validateContactNumber(
        contactNumber.toString()
      )
      // const isPasswordValid = validatePassword(institutePassword)
      if (isContactNumberValid) {
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
          <P>{id ? 'Edit' : 'Add'} Institute / School Information</P>
        </Flex>
        <Flex style={{ flexDirection: 'row', gap: '2%', alignItems: 'start' }}>
          {/* <div style={{ width: '48%' }}>
            <MultiselectDropdownSmall
              update={dataUpdate}
              required
              label={'Select Board'}
              placeholder="Choose Board"
              options={getDropDownOptions(boardList, 'id', 'label')}
              onSelect={(data) => {
                setSelectedBoards(data)
                onBoardIdsChange(data.map((item) => item.id))
              }}
              selectedValue={selectedBoards}
            ></MultiselectDropdownSmall>
          </div> */}
          <div style={{ width: '100%' }}>
            <InputV2
              Update={dataUpdate}
              label={'Institute / School Name'}
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              required
              placeholder="Institute / School Name"
              full
            />
          </div>
        </Flex>
        <Flex
          style={{
            flexDirection: screenSize >= 992 ? 'row' : 'column',
            gap: '2%',
            alignItems: 'start'
          }}
        >
          {userInfoV2.role === 'instituteAdmin' ? (
            ''
          ) : (
            <div style={{ width: screenSize >= 992 ? '48%' : '100%' }}>
              <MultiselectDropdownSmall
                update={dataUpdate}
                required
                label={'Select Grade'}
                placeholder="Choose Grade"
                options={getDropDownOptions(newCourseList, 'id', 'label')}
                onSelect={(data) => {
                  setSelectedGrades(data)
                  onIdsChange(data.map((item) => item.id))
                }}
                selectedValue={selectedGrades}
              ></MultiselectDropdownSmall>
            </div>
          )}
          <div style={{ width: screenSize >= 992 ? '48%' : '100%' }}>
            <InputV2
              full
              label="Contact Name"
              placeholder="Enter Contact Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              readOnly={isReadOnly}
              onBlur={handleBlur}
            />
          </div>
        </Flex>
        <Flex
          style={{
            flexDirection: screenSize >= 992 ? 'row' : 'column',
            gap: '2%',
            alignItems: 'start'
          }}
        >
          <div style={{ width: screenSize >= 992 ? '48%' : '100%' }}>
            <TextArea
              Update={dataUpdate}
              value={instituteLocation}
              onChange={(e) => setInstituteLocation(e.target.value)}
              label={'Institute / School Location'}
              required
              placeholder="Search Location"
            />
          </div>

          {/* <div style={{ width: '48%' }}>
            <InputNumber
              Update={dataUpdate}
              label={'Branch Student Limit'}
              required
              withHandler
              value={branchStudentLimit}
              onChange={(val) => setBranchStudentLimit(val)}
            />
          </div> */}
          <div style={{ width: screenSize >= 992 ? '48%' : '100%' }}>
            <BasicNumberInput
              full
              value={contactNumber}
              label="Contact Number"
              placeholder="Enter Contact Number"
              onChange={(e) => {
                setContactNumber(parseInt(e.target.value, 10))
              }}
              readOnly={isReadOnly}
              required
              error={formErrors.contactNumber}
            />
          </div>
        </Flex>
        <Flex
          style={{
            flexDirection: screenSize >= 992 ? 'row' : 'column',
            gap: '2%',
            alignItems: 'start'
          }}
        >
          <div style={{ width: screenSize >= 992 ? '48%' : '100%' }}>
            <InputV2
              full
              label="UserName"
              placeholder="Enter Username"
              value={instituteUserName}
              onChange={(e) => setInstituteUserName(e.target.value)}
              required
              readOnly={isReadOnly}
              onBlur={handleBlur}
              error={
                tableData?.data.userExists ? 'Username already exists' : ''
              }
              autoComplete="off" // Disable autocomplete
            />
          </div>
          {id ? (
            ''
          ) : (
            <div style={{ width: screenSize >= 992 ? '48%' : '100%' }}>
              <InputPasswordV2
                full
                label="Password"
                placeholder="Please Enter Password"
                required
                value={institutePassword}
                onChange={(e) => setInstitutePassword(e.target.value)}
                type="password"
                readOnly={isReadOnly}
                error={formErrors.password}
                password={true}
                autoComplete="new-password" // Use "new-password" for password fields
              />
            </div>
          )}
        </Flex>
        <Flex justifyContent="space-between" style={{ marginTop: '20px' }}>
          <CheckboxContainer
            className="checkbox"
            onClick={() => setHasPrepMaterial(!hasPrepMaterial)}
            isChecked={hasPrepMaterial}
            style={{
              border: 'none',
              padding: '0px',
              gap: '0px',
              boxShadow: 'none'
            }}
          >
            <Checkbox style={{ backgroundColor: 'white' }}>
              {hasPrepMaterial ? <CheckedSvg /> : <UnCheckedSvg />}
            </Checkbox>
            <span>Prep Mode</span>
          </CheckboxContainer>
          <div>
            <Button
              disabled={
                isSubmiting ||
                !(!id
                  ? contactNumber &&
                    instituteName &&
                    contactName &&
                    instituteUserName &&
                    instituteLocation &&
                    institutePassword
                  : instituteName && instituteLocation)
              }
              onClick={handleSubmit}
            >
              {id ? 'Update' : 'Save'}
            </Button>
          </div>
        </Flex>
      </InputBar>
    </Container>
  )
}

export default InstituteInformation
