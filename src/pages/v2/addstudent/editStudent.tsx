import React, { useEffect, useState } from 'react'
import {
  ButtonV2,
  Grid,
  GridItem,
  PageContainer
} from '../../../components/V2/styledComponents'
import { White } from '../../../const/V2/stylingVariables'
import {
  ButtonContainer,
  DoubleInput,
  DoubleInputV2,
  HeaderImage,
  Heading,
  InputBar
} from './stylecomponent'
import InputV2 from '../../../components/V2/Form/Input'
import Dropdown from '../../../components/V2/Form/Dropdown'
import TextArea from '../../../components/V2/Form/TextArea'
import Dropdownsmall from '../../../components/V2/Form/Dropdownsmall'

import InputMobile from '../../../components/V2/Form/Mobilenumber'

import {
  sampleOptions,
  Gender,
  RegistrationType,
  StudentCommunity,
  StudentCast,
  StudentReligion
} from './data'
import { DropdownOptionData } from '../../../components/V2/Form/types'
import ImageSelector from '../../../components/V2/ImageSelector/imageSelector'
import {
  GetSingleStudentV2,
  UpdateStudentV2
} from '../../../redux/addStudentV2/api'
import CalenderSelectInput from '../../../components/V2/Calender'
import EditFormValidator from './editValidation'
import { useHistory, useParams } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import InputPasswordV2 from '../../../components/V2/Form/InputPassword'
import { getInstituteSettingsAPI } from '../../../helpers/V2/apis'

const EditStudent = () => {
  const history = useHistory()
  const [date, setDate] = useState<Date | null>(null)
  const [admissionDate, setadmissionDate] = useState<Date | null>(null)
  const [selectedAcademicYear, setselectedAcademicYear] =
    useState<DropdownOptionData<string>>()
  const [gender, setGender] = useState<DropdownOptionData<string>>()
  const [registration, setRegistration] = useState<DropdownOptionData<string>>()
  const [community, setCommunity] = useState<DropdownOptionData<string>>()
  const [caste, setCaste] = useState<DropdownOptionData<string>>()
  const [religion, setReligion] = useState<DropdownOptionData<string>>()
  const [formData, setFormData] = useState<Record<string, string>>({
    firstName: '',
    lastName: '',
    mobile: '',
    fatherName: '',
    motherName: '',
    aadharNo: '',
    address: '',
    password: '',
    admissionNo: '',
    statsNo: '',
    parentMobile: '',
    nationality: '',
    city: '',
    pincode: ''
  })
  const [studentField, setStudentField] = useState<any>([])
  const [username, setUsername] = useState()
  // const [editPassword, seteditPassword] = useState('')
  const param: { id: string } = useParams()
  const [isUpdateAPILoading, setIsUpdateAPILoading] = useState(false)
  const { formErrors, EdithandleInputChange } = EditFormValidator({
    formData,
    setFormData
  })
  useEffect(() => {
    if (param.id) {
      GetSingleStudentV2(param.id)
        .then((res) => {
          if (res) {
            getInstituteSettingsAPI({
              page: 1,
              limit: 20,
              instituteId: res?.data?.instituteId
            })
              .then((res) => {
                if (res) {
                  if (res?.data.length > 0) {
                    if (
                      res?.data[0]?.studentFields &&
                      res?.data[0]?.studentFields.length > 0
                    ) {
                      setStudentField(res?.data[0]?.studentFields)
                    } else {
                      CustomToastMessage('Field not available', 'error')
                    }
                  }
                }
              })
              .catch((error) => CustomToastMessage(error.message, 'error'))
          }

          if (res) {
            if (res.data.mobile) {
              res.data.mobile = res.data.mobile.replace('+91', '')
            }
            if (res.data.parentMobile) {
              res.data.parentMobile = res.data.mobile.replace('+91', '')
            }
            setUsername(res.data.username)
            // seteditPassword(res.data.password)
            setFormData({
              lastName: res.data.lastName,
              fatherName: res.data.fatherName,
              firstName: res.data.firstName,
              motherName: res.data.motherName,
              aadharNo: res.data.aadharNo,
              address: res.data.address,
              admissionNo: res.data.admissionNo,
              statsNo: res.data.satsNo,
              mobile: res.data.mobile,
              parentMobile: res.data.parentMobile,
              nationality: res.data.nationality,
              city: res.data.city,
              pincode: res.data.pincode
            })
            if (res.data.gender) {
              setGender({
                id: '1',
                label: res.data.gender,
                value: res.data.gender
              })
            }
            if (res.data.academicYear) {
              setselectedAcademicYear({
                id: '1',
                label: res.data.academicYear,
                value: res.data.academicYear
              })
            }
            if (res.data.registrationType) {
              setRegistration({
                id: '1',
                label: res.data.registrationType,
                value: res.data.registrationType
              })
            }

            if (res.data.dob) {
              setDate(new Date(res.data.dob))
            }
            if (res.data.dateOfJoining) {
              setadmissionDate(new Date(res.data.dateOfJoining))
            }
            if (res.data.religion) {
              setReligion({
                id: '1',
                label: res.data.religion,
                value: res.data.religion
              })
            }
            if (res.data.caste) {
              setCaste({
                id: '1',
                label: res.data.caste,
                value: res.data.caste
              })
            }
            if (res.data.community) {
              setCommunity({
                id: '1',
                label: res.data.community,
                value: res.data.community
              })
            }

            setEditImage(res?.data?.profileImage)
          }
        })
        .catch((error) => console.log({ error }))
    }
  }, [param?.id])

  const [image, setImage] = useState<File>()
  const [editimage, setEditImage] = useState('')
  const SelectDate = (selectedDate: Date | null) => {
    setDate(selectedDate)
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString() : ''
    EdithandleInputChange('dob', formattedDate)
    return selectedDate
  }
  const SelectAdmissionDate = (selectedDate: Date) => {
    setadmissionDate(selectedDate)
    const formattedAdmissionDate = selectedDate
      ? selectedDate.toLocaleDateString()
      : ''
    EdithandleInputChange('admissionDate', formattedAdmissionDate)
    return selectedDate
  }
  const handleCourseImageSelected = (imagePath: File) => {
    setEditImage('')
    setImage(imagePath)
  }
  console.log(date, 'datedate')
  const EdithandleSubmit = () => {
    // const canContinue = EdithandleContinue()
    // if (canContinue) {
    const EditformData = new FormData()
    if (formData.firstName) {
      EditformData.append('firstName', formData.firstName)
    }
    if (formData.lastName) {
      EditformData.append('lastName', formData.lastName)
    }
    if (formData.mobile) {
      EditformData.append('mobile', `+91${formData.mobile}`)
    }
    if (formData.parentMobile) {
      EditformData.append('parentMobile', `+91${formData.parentMobile}`)
    }
    if (formData.fatherName) {
      EditformData.append('fatherName', formData.fatherName)
    }

    if (date !== null) {
      EditformData.append('dob', date.toISOString())
    }

    if (gender) {
      EditformData.append('gender', gender.label.toString())
    }
    if (formData.nationality) {
      EditformData.append('nationality', formData.nationality)
    }
    if (formData.aadharNo) {
      EditformData.append('aadharNo', formData.aadharNo)
    }
    if (formData.address) {
      EditformData.append('address', formData.address)
    }

    if (formData.city) {
      EditformData.append('city', formData.city)
    }
    if (formData.pincode) {
      EditformData.append('pincode', formData.pincode)
    }

    if (formData.password != undefined) {
      EditformData.append('password', formData.password)
    }
    if (selectedAcademicYear?.value != undefined) {
      EditformData.append('academicYear', selectedAcademicYear.label.toString())
    }

    if (registration) {
      EditformData.append('registrationType', registration.label.toString())
    }
    if (formData.admissionNo) {
      EditformData.append('admissionNo', formData.admissionNo)
    }
    if (formData.statsNo) {
      EditformData.append('satsNo', formData.statsNo)
    }

    if (caste?.label != undefined) {
      EditformData.append('caste', caste.label.toString())
    }
    if (community) {
      EditformData.append('community', community.label.toString())
    }
    if (religion?.label != undefined) {
      EditformData.append('religion', religion.label.toString())
    }
    if (admissionDate) {
      EditformData.append('dateOfJoining', admissionDate.toString())
    }
    if (image) {
      if (image.type !== undefined) {
        EditformData.append('profileImage', image)
      }
    }
    setIsUpdateAPILoading(true)
    UpdateStudentV2(EditformData, param.id)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          history.push(ROUTES_V2.STUDENT_LIST)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsUpdateAPILoading(false))
  }
  const today = new Date()
  const maxSelectableDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const [screenSize, setScreenSize] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth) {
        setScreenSize(window.innerWidth)
      }
    }
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const checkIsFieldExist = (name: string) => {
    return studentField.some((item: any) => item.fieldName === name)
  }
  return (
    <PageContainer style={{ alignItems: 'center', overflowY: 'scroll' }}>
      <Grid columns={screenSize > 768 ? 12 : 1} gap="20px" style={{}}>
        <GridItem
          columnSpan={4}
          rowSpan={40}
          style={{
            background: White,
            borderRadius: '20px'
          }}
        >
          <Heading>Student Personal Details</Heading>
          {checkIsFieldExist('profileImage') && (
            <Grid>
              <GridItem columnSpan={2}>
                <HeaderImage style={{ marginLeft: '10px' }}>
                  <ImageSelector
                    onImageSelected={handleCourseImageSelected}
                    defaultvalue={editimage}
                  />

                  <HeaderImage>
                    <div>
                      <p>Image requirements </p>
                      <li>Minimum size 500x500 </li>
                      <li>Should be in PNG,JPG,JPEG format</li>
                    </div>
                  </HeaderImage>
                </HeaderImage>
              </GridItem>
            </Grid>
          )}

          <InputBar>
            {checkIsFieldExist('firstName') && (
              <InputV2
                full
                placeholder="Mahendra"
                required
                label={'Student First Name'}
                name="firstName"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.firstName}
                error={formErrors.firstName}
              />
            )}
            {checkIsFieldExist('lastName') && (
              <InputV2
                full
                placeholder="Singh"
                // required
                label={'Student Last Name'}
                name="lastName"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.lastName}
                // error={formErrors.lastName}
              />
            )}

            {checkIsFieldExist('mobile') && (
              <InputMobile
                // required
                full
                type="number"
                placeholder="Enter your mobile number"
                label={'Student Mobile Number'}
                name="mobile"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.mobile}
                // error={formErrors.mobile}
              ></InputMobile>
            )}

            {checkIsFieldExist('fatherName') && (
              <InputV2
                full
                placeholder="Amrendra"
                // required
                label={'Student’s Father Name'}
                name="fatherName"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.fatherName}
                // error={formErrors.fatherName}
              />
            )}
            {checkIsFieldExist('motherName') && (
              <InputV2
                full
                placeholder="Devsena"
                // required
                label={'Student’s Mother Name'}
                name="motherName"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.motherName}
                // error={formErrors.motherName}
              />
            )}
            {checkIsFieldExist('parentMobile') && (
              <InputMobile
                // required
                type="number"
                full
                placeholder="Enter your mobile number"
                label={'Parent Mobile Number'}
                name="parentMobile"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.parentMobile}
                // error={formErrors.parentMobile}
              ></InputMobile>
            )}

            {checkIsFieldExist('dob') && (
              <CalenderSelectInput
                maxDate={maxSelectableDate}
                label={'Student’s DOB'}
                placeholder={''}
                value={date?.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                onChangeDate={SelectDate}
              >
                {date}
              </CalenderSelectInput>
            )}
          </InputBar>
        </GridItem>

        <GridItem
          columnSpan={4}
          rowSpan={40}
          style={{ background: White, borderRadius: '20px' }}
        >
          <Heading>Student Other Details</Heading>
          <InputBar>
            {checkIsFieldExist('gender') && (
              <Dropdownsmall
                required
                fullWidth
                label={"Student's Gender"}
                options={Gender}
                onSelect={(option) => {
                  setGender(option)
                  EdithandleInputChange('gender', option.value)
                }}
                selectedValue={gender}
                placeholder={'Male'}
                error={formErrors.gender}
              ></Dropdownsmall>
            )}
            {checkIsFieldExist('nationality') && (
              <InputV2
                full
                placeholder="Indian"
                label={'Nationality'}
                name="nationality"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.nationality}
              />
            )}

            <DoubleInputV2>
              {checkIsFieldExist('religion') && (
                <Dropdownsmall
                  style={{ width: '48%' }}
                  fullWidth
                  label={'Religion'}
                  placeholder={'Hindu'}
                  options={StudentReligion}
                  onSelect={(option) => {
                    setReligion(option)
                  }}
                  selectedValue={religion}
                ></Dropdownsmall>
              )}
              {checkIsFieldExist('caste') && (
                <Dropdownsmall
                  fullWidth
                  label={'Caste'}
                  placeholder={'Brahmin'}
                  options={StudentCast}
                  onSelect={(option) => {
                    setCaste(option)
                  }}
                  selectedValue={caste}
                  style={{ width: '48%' }}
                ></Dropdownsmall>
              )}
            </DoubleInputV2>
            {checkIsFieldExist('community') && (
              <Dropdown
                error={formErrors.community}
                required
                fullWidth
                label={'Student’s Community'}
                placeholder={'Select Community'}
                options={StudentCommunity}
                onSelect={(option) => {
                  setCommunity(option)
                  EdithandleInputChange('community', option.value)
                }}
                selectedValue={community}
              ></Dropdown>
            )}
            {checkIsFieldExist('aadharNo') && (
              <InputV2
                full
                type="number"
                placeholder="91231231 12312312"
                // required
                label={"Student's Aadhar Number"}
                name="aadharNo"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.aadharNo}
                // error={formErrors.aadharNo}
              />
            )}
            {checkIsFieldExist('address') && (
              <TextArea
                // error={formErrors.address}
                // required
                rows={4}
                value={formData.address}
                label="Student’s Permanent Home address"
                placeholder="3, Queens Rd, Govinda Chetty Colony, 
                Shivaji Nagar, Bengaluru, Karnataka 560051"
                name="address"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
              />
            )}

            <DoubleInputV2>
              {checkIsFieldExist('city') && (
                <InputV2
                  style={{ width: '48%' }}
                  placeholder="Bengaluru"
                  label={'City'}
                  name="city"
                  onChange={(e) =>
                    EdithandleInputChange(e.target.name, e.target.value)
                  }
                  value={formData.city}
                />
              )}
              {checkIsFieldExist('pincode') && (
                <InputV2
                  style={{ width: '48%' }}
                  placeholder="560051"
                  type="number"
                  label={'Pin'}
                  name="pincode"
                  onChange={(e) =>
                    EdithandleInputChange(e.target.name, e.target.value)
                  }
                  value={formData.pincode}
                />
              )}
            </DoubleInputV2>
          </InputBar>
        </GridItem>
        <GridItem
          columnSpan={4}
          rowSpan={40}
          style={{ background: White, borderRadius: '20px' }}
        >
          <Heading>Student Academic Details</Heading>
          <InputBar>
            {checkIsFieldExist('username') && (
              <InputV2
                label={"Student's Username"}
                placeholder="Mahendra1001"
                full
                required
                value={username}
                autoComplete="off" // Disable autocomplete
              />
            )}

            {checkIsFieldExist('password') && (
              <InputPasswordV2
                full
                placeholder="Min.6 (eg. Mahend$001)"
                password={true}
                label={"Update Student's Password"}
                name="password"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.password}
                error={formErrors.password}
                autoComplete="new-password" // Use "new-password" for password fields
              />
            )}

            {checkIsFieldExist('dateOfJoining') && (
              <DoubleInput>
                <div style={{ width: '49%' }}>
                  {checkIsFieldExist('dateOfJoining') && (
                    <CalenderSelectInput
                      label={'Admission Date'}
                      placeholder={''}
                      value={admissionDate?.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                      onChangeDate={SelectAdmissionDate}
                    >
                      {admissionDate}
                    </CalenderSelectInput>
                  )}
                </div>
                <div style={{ width: '49%' }}>
                  <Dropdownsmall
                    fullWidth
                    label={'Acadamic Year'}
                    placeholder={'1994'}
                    options={sampleOptions}
                    onSelect={(option) => {
                      setselectedAcademicYear(option)
                    }}
                    selectedValue={selectedAcademicYear}
                  ></Dropdownsmall>
                </div>
              </DoubleInput>
            )}
            {checkIsFieldExist('registrationType') && (
              <Dropdown
                error={formErrors.type}
                required
                fullWidth
                label={'Register type'}
                placeholder={'Select type of registration'}
                options={RegistrationType}
                onSelect={(option) => {
                  setRegistration(option)
                  EdithandleInputChange('type', option.value)
                }}
                selectedValue={registration}
              ></Dropdown>
            )}
            {checkIsFieldExist('admissionNo') && (
              <InputV2
                // required
                full
                placeholder="1231231 12312312"
                label={'Student’s Admission Number'}
                name="admissionNo"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.admissionNo}
                // error={formErrors.admissionNo}
              />
            )}
            {checkIsFieldExist('satsNo') && (
              <InputV2
                // required
                full
                placeholder="123131277882"
                label={'Student’s Stats Number'}
                name="statsNo"
                onChange={(e) =>
                  EdithandleInputChange(e.target.name, e.target.value)
                }
                value={formData.statsNo}
                // error={formErrors.statsNo}
              />
            )}
            <ButtonContainer>
              <ButtonV2
                disabled={isUpdateAPILoading}
                onClick={EdithandleSubmit}
              >
                Update
              </ButtonV2>
            </ButtonContainer>
          </InputBar>
        </GridItem>
      </Grid>
    </PageContainer>
  )
}

export default EditStudent
