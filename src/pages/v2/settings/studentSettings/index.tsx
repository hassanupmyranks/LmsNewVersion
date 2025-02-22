import { useEffect, useState } from 'react'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  getAllInstituteAPI,
  getInstituteSettingsAPI,
  instituteSettingsAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { FormContainerV2 } from '../../assessment/TestPreview/subcomponents'
import { Flex } from '../../../../components/V2/styledComponents'
import {
  ButtonDiv,
  Checkbox,
  CheckboxContainer,
  FieldContainer,
  FieldLabel,
  Fields,
  FirstDiv,
  // HeadingH3,
  HeadingH5,
  ProfileField,
  SecondDiv,
  SelectContainer,
  SelectedFieldContainer,
  SelectedInputField
} from './styledComponents'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'
import styled from 'styled-components'
import SimpleButton from '../../../../components/V2/Button/SimpleButton'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

const StudentFormMaster = () => {
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )

  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [selectedInstitute, setSelectedInstitute] = useState<any>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedData, setSelectedData] = useState<any[]>([
    {
      field: 'profileImage'
    },
    {
      field: 'role',
      isOptional: false
    },
    {
      field: 'admissionNo'
    },
    {
      field: 'username',
      isOptional: false
    },
    {
      field: 'password',
      isOptional: false
    },
    {
      field: 'firstName',
      isOptional: false
    },
    {
      field: 'lastName'
    },
    {
      field: 'instituteId',
      isOptional: false
    },
    {
      field: 'branchId',
      isOptional: false
    },
    {
      field: 'batchId',
      isOptional: false
    },
    {
      field: 'gender'
    },
    {
      field: 'email'
    },
    {
      field: 'mobile'
    }
  ])

  const [selectedFullData, setSelectedFullData] = useState<any[]>([
    { name: 'Profile Image', field: 'profileImage', type: 'string' },
    { name: 'Admission No', field: 'admissionNo', type: 'string' },
    { name: 'First Name', field: 'firstName', type: 'string' },
    { name: 'Last Name', field: 'lastName', type: 'string' },
    { name: 'User Name', field: 'username', type: 'string' },
    { name: 'Password', field: 'password', type: 'string' },
    { name: 'Gender', field: 'gender', type: 'string' },
    { name: 'Mobile', field: 'mobile', type: 'string' }
  ])

  const [mandatory] = useState<any[]>([
    'profileImage',
    'role',
    'admissionNo',
    'username',
    'password',
    'firstName',
    'lastName',
    'instituteId',
    'branchId',
    'batchId',
    'gender',
    'email',
    'mobile'
  ])

  const studentField = [
    { name: 'Profile Image', field: 'profileImage', type: 'string' },
    { name: 'Admission No', field: 'admissionNo', type: 'string' },
    { name: 'First Name', field: 'firstName', type: 'string' },
    { name: 'Last Name', field: 'lastName', type: 'string' },
    { name: 'User Name', field: 'username', type: 'string' },
    { name: 'Password', field: 'password', type: 'string' },
    { name: 'Gender', field: 'gender', type: 'string' },
    { name: 'Mobile', field: 'mobile', type: 'string' },
    { name: 'Is Active', field: 'isActive', type: 'boolean' },
    { name: 'DOB', field: 'dob', type: 'date' },
    { name: 'Father Name', field: 'fatherName', type: 'string' },
    { name: 'Mother Name', field: 'motherName', type: 'string' },
    { name: 'Parent Mobile', field: 'parentMobile', type: 'string' },
    { name: 'Nationality', field: 'nationality', type: 'string' },
    { name: 'Aadhar No', field: 'aadharNo', type: 'string' },
    { name: 'Address', field: 'address', type: 'string' },
    { name: 'City', field: 'city', type: 'string' },
    { name: 'Pin code', field: 'pincode', type: 'string' },
    { name: 'Community', field: 'community', type: 'string' },
    { name: 'Registration Type', field: 'registrationType', type: 'string' },
    { name: 'Sats No', field: 'satsNo', type: 'string' },
    { name: 'Date Of Joining', field: 'dateOfJoining', type: 'date' }
    // { name: 'Role', field: "role", type: "string" },
    // { name: 'Institute', field: 'instituteId', type: 'objectId' },
    // { name: 'Branch', field: 'branchId', type: 'objectId' },
    // { name: 'Batch', field: 'batchId', type: 'objectId' },
  ]

  useEffect(() => {
    if (user.role === 'superAdmin') {
      let newInstitute: any = []
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
    }
    if (user.role === 'instituteAdmin' && user.instituteId) {
      checkInstitute(user.instituteId)
      setSelectedInstitute({ id: user.instituteId, label: user.instituteName })
    }
    if (user.role === 'branchAdmin' && user.instituteId) {
      checkInstitute(user.instituteId)
      setSelectedInstitute({ id: user.instituteId, label: user.instituteName })
    }
  }, [user])

  const onCheck = (value: any) => {
    if (!mandatory.includes(value?.field)) {
      let newSelectedData = [...selectedData]
      let newSelectedFullData = [...selectedFullData]
      if (!newSelectedData.some((field: any) => field.field === value?.field)) {
        newSelectedData.push({ field: value?.field })
        newSelectedFullData.push(value)
      } else {
        newSelectedData = newSelectedData.filter(
          (field: any) => field.field !== value?.field
        )
        newSelectedFullData = newSelectedFullData.filter(
          (field: any) => field.field !== value?.field
        )
      }
      setSelectedFullData(newSelectedFullData)
      setSelectedData(newSelectedData)
    } else {
      CustomToastMessage('This field is mandatory', 'error')
    }
  }

  const handleSubmit = () => {
    if (selectedInstitute?.id) {
      setIsSubmitting(true)
      const payload = {
        instituteId: selectedInstitute?.id,
        studentFields: selectedData
      }
      instituteSettingsAPI(payload)
        .then((res: any) => {
          CustomToastMessage(res.message, 'success')
          setSelectedInstitute({ id: '', label: '' })
          setSelectedFullData([
            { name: 'Profile Image', field: 'profileImage', type: 'string' },
            { name: 'Admission No', field: 'admissionNo', type: 'string' },
            { name: 'First Name', field: 'firstName', type: 'string' },
            { name: 'Last Name', field: 'lastName', type: 'string' },
            { name: 'User Name', field: 'username', type: 'string' },
            { name: 'Password', field: 'password', type: 'string' },
            { name: 'Gender', field: 'gender', type: 'string' },
            { name: 'Mobile', field: 'mobile', type: 'string' }
          ])
          setSelectedData([
            {
              field: 'profileImage'
            },
            {
              field: 'role',
              isOptional: false
            },
            {
              field: 'admissionNo'
            },
            {
              field: 'username',
              isOptional: false
            },
            {
              field: 'password',
              isOptional: false
            },
            {
              field: 'firstName',
              isOptional: false
            },
            {
              field: 'lastName'
            },
            {
              field: 'instituteId',
              isOptional: false
            },
            {
              field: 'branchId',
              isOptional: false
            },
            {
              field: 'batchId',
              isOptional: false
            },
            {
              field: 'gender'
            },
            {
              field: 'email'
            },
            {
              field: 'mobile'
            }
          ])
          if (user.role === 'instituteAdmin' || user.role === 'branchAdmin') {
            checkInstitute(user.instituteId)
            setSelectedInstitute({
              id: user.instituteId,
              label: user.instituteName
            })
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsSubmitting(false))
    } else {
      CustomToastMessage('Please Select Institue', 'error')
    }
  }

  const checkInstitute = (instituteId: string) => {
    getInstituteSettingsAPI({
      page: 1,
      limit: 20,
      instituteId: instituteId
    })
      .then((res) => {
        if (res && res.data?.length > 0) {
          if (res.data[0].studentFields.length > 0) {
            let newSelectedData: any = []
            let newSelectedFullData: any = []
            const resData = res.data[0].studentFields
            resData.map((item: any) => {
              newSelectedData.push({ field: item.fieldName })
            })
            resData.map((item: any) => {
              newSelectedFullData.push({
                field: item.fieldName,
                name: item.fieldName,
                type: item.type
              })
            })
            setSelectedData(newSelectedData)
            setSelectedFullData(newSelectedFullData)
          }
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <FormContainerV2 style={{ margin: '20px' }}>
      <div>
        {/* <HeadingH3>Student Form Master </HeadingH3> */}
        <Flex
          style={{ width: '100%' }}
          gap="20px"
          alignItems="start"
          direction={windowWidth >= 768 ? 'row' : 'column'}
        >
          <FirstDiv>
            {user.role === 'superAdmin' && (
              <SearchableDropdown
                style={{ width: '290px' }}
                isLoader={insLoading}
                label={'Select Institute / School'}
                placeHolder={'Please Select Institute / School'}
                options={instituteData}
                isClear={!!selectedInstitute?.id}
                onSelect={(option) => {
                  setSelectedInstitute(option)
                  if (option.id) {
                    checkInstitute(String(option.id))
                    setSelectedData([
                      {
                        field: 'profileImage'
                      },
                      {
                        field: 'role',
                        isOptional: false
                      },
                      {
                        field: 'admissionNo'
                      },
                      {
                        field: 'username',
                        isOptional: false
                      },
                      {
                        field: 'password',
                        isOptional: false
                      },
                      {
                        field: 'firstName',
                        isOptional: false
                      },
                      {
                        field: 'lastName'
                      },
                      {
                        field: 'instituteId',
                        isOptional: false
                      },
                      {
                        field: 'branchId',
                        isOptional: false
                      },
                      {
                        field: 'batchId',
                        isOptional: false
                      },
                      {
                        field: 'gender'
                      },
                      {
                        field: 'email'
                      },
                      {
                        field: 'mobile'
                      }
                    ])
                  }
                }}
                selectedValue={selectedInstitute}
              />
            )}
            <FieldContainer>
              {studentField.map((item: any, index: any) => (
                <Fields key={`key_${index}`}>
                  <CheckboxContainer
                    className="d-flex justify-content-center"
                    onClick={() => onCheck(item)}
                    onKeyDown={() => onCheck(item)}
                    role="button" // Adding role="button" to indicate this is an interactive element
                    tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
                  >
                    <Checkbox>
                      {selectedData.some(
                        (field) => field.field === item.field
                      ) ? (
                        <CheckedSvg />
                      ) : (
                        <UnCheckedSvg />
                      )}
                    </Checkbox>
                  </CheckboxContainer>{' '}
                  <FieldLabel>{item.name}</FieldLabel>{' '}
                </Fields>
              ))}
            </FieldContainer>
          </FirstDiv>
          <SecondDiv>
            <HeadingH5>Form Preview</HeadingH5>
            <SelectContainer>
              <SelectedFieldContainer>
                {selectedFullData.map((field: any, index: number) => {
                  return index === 0 ? (
                    <ProfileField key={`key_${index}`}></ProfileField>
                  ) : (
                    <SelectedInputField key={`key_${index}`}>
                      <p>{field.name}</p>
                    </SelectedInputField>
                  )
                })}
              </SelectedFieldContainer>
              <ButtonDiv>
                <SimpleButton
                  label={'Submit'}
                  clickHandler={() => handleSubmit()}
                  disabled={isSubmitting}
                />
              </ButtonDiv>
            </SelectContainer>
          </SecondDiv>
        </Flex>
      </div>
    </FormContainerV2>
  )
}

export default StudentFormMaster

export const TableWrapper = styled.div`
  width: 100%;
  max-height: 55vh;
  overflow-y: auto;
  padding: 0px 5px;
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    width: 3px;
  }

  & thead {
    position: sticky;
    top: -5px;
    background-color: #f4f7fe;
    height: 47px;
  }

  @media (max-width: 992px) {
    overflow: visible;
  }
`
