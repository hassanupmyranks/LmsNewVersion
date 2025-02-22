import { useEffect, useState } from 'react'
import InputV2 from '../../../components/V2/Form/Input'
import InputMobile from '../../../components/V2/Form/Mobilenumber'
import ImageSelector from '../../../components/V2/ImageSelector/imageSelector'
import {
  ButtonV2,
  Flex,
  Grid,
  GridItem,
  PageContainer
} from '../../../components/V2/styledComponents'
import { BlueButton, White } from '../../../const/V2/stylingVariables'
import {
  ButtonContainer,
  HeaderImage,
  Heading,
  InputBar
} from '../addstudent/stylecomponent'
import Dropdownsmall from '../../../components/V2/Form/Dropdownsmall'
import {
  BloodGroup,
  Gender,
  TypeOfContract,
  yearsOfExperience
} from '../addstudent/data'
import { DropdownOptionData } from '../../../components/V2/Form/types'
import TextArea from '../../../components/V2/Form/TextArea'
import {
  CreateUserForTeacherParam,
  NewBranchDetails
} from '../../../utils/types'
import { AddStudentV2 } from '../../../redux/addStudentV2/api'
import { checkUserNameAPI } from '../../../redux/addStudentV2/api'
import { UserResponse } from '../../../redux/addStudentV2/types'
import CalenderSelectInput from '../../../components/V2/Calender'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
import InputPasswordV2 from '../../../components/V2/Form/InputPassword'
import {
  getAllBranchAPI,
  getInstituteSettingsAPI
} from '../../../helpers/V2/apis'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Spinner } from 'react-bootstrap'

const AddTeacherPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [genderName, setGenderName] = useState<DropdownOptionData<string>>()
  const [experience, setExperience] = useState<DropdownOptionData<string>>()
  const [selectedBloodGroup, setSelectedBloodGroup] =
    useState<DropdownOptionData<string>>()

  const [userData, setUserData] = useState<CreateUserForTeacherParam>({
    firstName: '',
    lastName: '',
    role: 'teacher',
    username: '',
    password: '',
    gender: '',
    email: '',
    mobile: '',
    bloodGroup: '',
    emergencyContactNumber: '',
    dob: null,
    educationalBackground: '',
    previousInstituteName: '',
    collegeName: '',
    collegeCityName: '',
    address: '',
    city: '',
    pincode: 0,
    experience: 0,
    dateOfJoining: null,
    department: '',
    designation: '',
    bankAccountNo: '',
    bankIfsc: '',
    bankName: '',
    pfAccountNumber: 0,
    contractType: '',
    contractStartDate: null,
    panNumber: '',
    aadharNo: '',
    epsAccountNumber: 0,
    profileImage: new File([], '')
  })

  const today = new Date()
  const maxSelectableDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const [errors] = useState<{ [key: string]: string }>({})
  const [tableData, setTableData] = useState<UserResponse>({
    message: '',
    data: {
      userExists: false
    }
  })

  const [teacherField, setTeacherField] = useState<any>([])
  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [selectedInstitute, setSelectedInstitute] = useState<any>()
  const [selectedBranch, setSelectedBranch] = useState<any>()
  const [contractType, setContractType] = useState<DropdownOptionData<string>>()

  const [branchData, setBranchData] = useState<any[]>([])
  const [branchLoading, setBranchLoading] = useState(false)
  const [issLoading, setIsLoading] = useState(false)

  const checkIsFieldExist = (name: string) => {
    return teacherField.some((item: any) => item.fieldName === name)
  }

  // const validateUserData = (userData: CreateUserForTeacherParam) => {
  //   const errors: { [key: string]: string } = {}

  //   if (userData.firstName.trim() === '') {
  //     errors.firstName = 'First name is required.'
  //   }
  //   if (userData.educationalBackground.trim() === '') {
  //     errors.educationalBackground = 'educationalBackground is required.'
  //   }

  //   if (userData.lastName.trim() === '') {
  //     errors.lastName = 'Last name is required.'
  //   }

  //   if (userData.username.trim() === '') {
  //     errors.username = 'Username is required.'
  //   }

  //   // if (userData.password.trim() === '') {
  //   //   errors.password = 'Password is required.'
  //   // } else if (
  //   //   !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{6,}/.test(
  //   //     userData.password
  //   //   )
  //   // ) {
  //   //   errors.password =
  //   //     'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.'
  //   // }

  //   if (!userData.email || userData.email.trim() === '') {
  //     errors.email = 'Email is required.'
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
  //     errors.email = 'Invalid email address.'
  //   }

  //   if (userData.mobile.trim() === '') {
  //     errors.mobile = 'Mobile Number is required.'
  //   } else if (userData.mobile.trim().length !== 10) {
  //     errors.mobile = 'Invalid mobile number.'
  //   }
  //   if (userData.emergencyContactNumber.trim() === '') {
  //     errors.emergencyContactNumber = 'EmergencyContactNumber is required.'
  //   } else if (userData.emergencyContactNumber.trim().length !== 10) {
  //     errors.emergencyContactNumber = 'Invalid mobile number.'
  //   }
  //   if (!userData.gender || userData.gender.trim() === '') {
  //     errors.gender = 'Gender is required.'
  //   }
  //   if (userData.address.trim() === '') {
  //     errors.address = 'Address is required.'
  //   }
  //   if (userData.department.trim() === '') {
  //     errors.department = 'Department is required.'
  //   }
  //   if (userData.designation.trim() === '') {
  //     errors.designation = 'Designation is required.'
  //   }
  //   if (userData.bankAccountNo.trim() === '') {
  //     errors.bankAccountNo = 'Bank AccountNo is required.'
  //   }
  //   if (userData.bankIfsc.trim() === '') {
  //     errors.bankIfsc = 'Bank IFSC is required.'
  //   }
  //   if (userData.bankName.trim() === '') {
  //     errors.bankName = 'Bank Name is required.'
  //   }
  //   if (!userData.contractType || userData.contractType.trim() === '') {
  //     errors.contractType = 'contractType is required.'
  //   }
  //   if (userData.panNumber.trim() === '') {
  //     errors.panNumber = 'Pan Number is required.'
  //   }
  //   if (userData.aadharNo.trim() === '') {
  //     errors.aadharNo = ' AadharNo is required.'
  //   }
  //   if (!userData.dob) {
  //     errors.dob = 'Date of birth is required.'
  //   }
  //   if (!userData.dateOfJoining) {
  //     errors.dateOfJoining = 'Date of Joining is required.'
  //   }
  //   return errors
  // }
  const SelectDate = (selectedDate: Date | null) => {
    setUserData({
      ...userData,
      dob: selectedDate
    })
    return selectedDate
  }

  const SelectContractDate = (selectedDate: Date | null) => {
    setUserData({
      ...userData,
      contractStartDate: selectedDate
    })
    return selectedDate
  }

  const SelectJoiningDate = (selectedDate: Date | null) => {
    setUserData({
      ...userData,
      dateOfJoining: selectedDate
    })
    return selectedDate
  }

  const handleSubmit = () => {
    // const errors = validateUserData(userData)
    // setErrors(errors)
    // if (Object.keys(errors).length === 0) {
    const file = new File([userData.profileImage], userData.firstName, {
      type: 'image/png'
    })
    const newFormData: any = new FormData()
    if (selectedInstitute?.id) {
      newFormData.append('instituteId', selectedInstitute?.id)
    }

    if (selectedBranch?.id) {
      newFormData.append('branchId', selectedBranch?.id)
    }
    if (userData.firstName) {
      newFormData.append('firstName', userData.firstName)
    }
    if (userData.lastName) {
      newFormData.append('lastName', userData.lastName)
    }

    if (userData.role) {
      newFormData.append('role', userData.role)
    }

    if (userData.mobile) {
      newFormData.append('mobile', `+91${userData.mobile}`)
    }

    if (userData.email) {
      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
      if (!regEx.test(userData.email)) {
        CustomToastMessage('Invalid Email', 'error')
        return 'Invalid Email'
      } else {
        newFormData.append('email', userData.email)
      }
    }

    if (userData.username) {
      newFormData.append('username', userData.username)
    }

    if (userData.password) {
      newFormData.append('password', userData.password)
    }

    if (userData.bloodGroup) {
      newFormData.append('bloodGroup', userData.bloodGroup)
    }

    if (genderName?.value) {
      newFormData.append('gender', genderName?.value)
    }

    if (userData.emergencyContactNumber) {
      newFormData.append(
        'emergencyContactNumber',
        `+91${userData.emergencyContactNumber}`
      )
    }
    if (userData.dob) {
      newFormData.append('dob', userData.dob)
    }

    if (userData.educationalBackground) {
      newFormData.append(
        'educationalBackground',
        userData.educationalBackground
      )
    }

    if (userData.previousInstituteName) {
      newFormData.append(
        'previousInstituteName',
        userData.previousInstituteName
      )
    }
    if (userData.collegeCityName) {
      newFormData.append('collegeCityName', userData.collegeCityName)
    }
    if (userData.collegeName) {
      newFormData.append('collegeName', userData.collegeName)
    }
    if (userData.address) {
      newFormData.append('address', userData.address)
    }

    if (userData.city) {
      newFormData.append('city', userData.city)
    }
    if (userData.pincode) {
      newFormData.append('pincode', userData.pincode)
    }
    if (userData.dateOfJoining) {
      newFormData.append('dateOfJoining', userData.dateOfJoining)
    }

    if (experience?.value) {
      newFormData.append('experience', experience?.value)
    }
    if (userData.department) {
      newFormData.append('department', userData.department)
    }
    if (userData.designation) {
      newFormData.append('designation', userData.designation)
    }

    if (userData.bankAccountNo) {
      newFormData.append('bankAccountNo', userData.bankAccountNo)
    }
    if (userData.bankIfsc) {
      newFormData.append('bankIfsc', userData.bankIfsc)
    }
    if (userData.bankName) {
      newFormData.append('bankName', userData.bankName)
    }

    if (userData.epsAccountNumber) {
      newFormData.append('epsAccountNumber', userData.epsAccountNumber)
    }
    if (userData.pfAccountNumber) {
      newFormData.append('pfAccountNumber', userData.pfAccountNumber)
    }
    if (userData.contractStartDate) {
      newFormData.append('contractStartDate', userData.contractStartDate)
    }
    if (contractType?.value) {
      newFormData.append('contractType', contractType?.value)
    }
    if (userData.panNumber) {
      newFormData.append('panNumber', userData.panNumber)
    }
    if (userData.aadharNo) {
      newFormData.append('aadharNo', userData.aadharNo)
    }
    if (file) {
      newFormData.append('file', file)
    }
    setIsLoading(true)
    AddStudentV2(newFormData)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          history.push(ROUTES_V2.TEACHER_LIST)
        }
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
      .finally(() => setIsLoading(false))
  }

  const handleBlur = (event: string | any) => {
    const inputValueOnBlur = event.target.value
    if (inputValueOnBlur) {
      checkUserNameAPI({
        username: inputValueOnBlur
      })
        .then((res) => {
          if (res) {
            setTableData(res)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }

  const getInstituteSettings = (id: string) => {
    getInstituteSettingsAPI({
      page: 1,
      limit: 20,
      instituteId: id
    })
      .then((res) => {
        if (res) {
          if (res?.data.length > 0) {
            if (res?.data[0]?.teacherFields.length > 0) {
              setTeacherField(res?.data[0]?.teacherFields)
            } else {
              CustomToastMessage(
                'Set the teacher form Master first from settings',
                'error'
              )
            }
          }
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }

  useEffect(() => {
    if (userInfoV2.role === 'superAdmin') {
      let newInstitute: any = []
      setInsLoading(true)
      const payload = {
        page: 1,
        limit: 150
      }
      getInstituteSettingsAPI(payload)
        .then((res: any) => {
          newInstitute = res?.data?.map((item: any) => {
            return {
              id: item.instituteId,
              label: item.instituteName
            }
          })
          setInstituteData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInsLoading(false))
    }

    if (userInfoV2.role !== 'superAdmin' && userInfoV2.instituteId) {
      getInstituteSettingsAPI({
        page: 1,
        limit: 20,
        instituteId: userInfoV2.instituteId
      })
        .then((res) => {
          if (res) {
            if (res?.data.length > 0) {
              if (res?.data[0]?.teacherFields.length > 0) {
                setTeacherField(res?.data[0]?.teacherFields)
              } else {
                CustomToastMessage(
                  'Set the teacher form Master first from settings',
                  'error'
                )
              }
            }
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [userInfoV2, dispatch])

  const [screenSize, setScreenSize] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth) {
        setScreenSize(window.innerWidth)
      }
    }
    window.addEventListener('resize', handleResize)

    // Run once to handle initial load
    handleResize()

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (userInfoV2.role !== 'branchAdmin') {
      if (selectedInstitute?.id) {
        setBranchLoading(true)
        const payload = {
          page: 1,
          limit: 150,
          instituteId: selectedInstitute?.id
        }
        getAllBranchAPI(payload)
          .then((res: any) => {
            const newBranch = res?.data?.map((branch: NewBranchDetails) => {
              return {
                label: branch.name,
                id: branch?._id,
                value: ''
              }
            })
            setBranchData(newBranch)
          })
          .catch((err: any) => CustomToastMessage(err.message, 'error'))
          .finally(() => setBranchLoading(false))
      }
    }
  }, [selectedInstitute, userInfoV2])

  useEffect(() => {
    if (userInfoV2.role === 'branchAdmin') {
      setSelectedInstitute({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName,
        value: ''
      })
      setSelectedBranch({
        id: userInfoV2.branchId,
        label: userInfoV2.branchName,
        value: userInfoV2.branchName
      })
    }
    if (userInfoV2.role === 'instituteAdmin') {
      setSelectedInstitute({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName,
        value: ''
      })
    }
  }, [userInfoV2])

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
          <Heading>Teacher Personal Details</Heading>
          <Grid>
            <GridItem columnSpan={2}>
              <HeaderImage style={{ marginLeft: '10px' }}>
                <ImageSelector
                  onImageSelected={(imageURL) => {
                    setUserData({
                      ...userData,
                      profileImage: imageURL
                    })
                  }}
                  defaultvalue={undefined}
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

          <InputBar>
            {userInfoV2.role === 'superAdmin' && (
              <SearchableDropdown
                required
                style={{ width: '100%' }}
                isLoader={insLoading}
                label={'Select Institute / School'}
                placeHolder={'Please Select Institute / School'}
                options={instituteData}
                isClear={!!selectedInstitute?.id}
                onSelect={(option) => {
                  setTeacherField([])
                  setSelectedInstitute(option)
                  setSelectedBranch({ id: '', label: '' })

                  if (option.id) {
                    getInstituteSettings(String(option.id))
                  }
                }}
                selectedValue={selectedInstitute}
              />
            )}
            <SearchableDropdown
              required
              style={{ width: '100%' }}
              isLoader={branchLoading}
              label={'Select Branch'}
              placeHolder={'Please Select Branch'}
              options={branchData}
              isClear={!!selectedBranch?.id}
              onSelect={(option) => {
                setSelectedBranch(option)
              }}
              selectedValue={selectedBranch}
            />
            {checkIsFieldExist('firstName') && (
              <InputV2
                error={errors.firstName}
                full
                placeholder="Mahendra"
                required
                label={'Teacher First Name'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    firstName: event.target.value
                  })
                }}
              />
            )}

            {checkIsFieldExist('lastName') && (
              <InputV2
                // error={errors.lastName}
                full
                placeholder="Singh"
                // required
                label={'Teacher Last Name'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    lastName: event.target.value
                  })
                }}
              />
            )}
            {checkIsFieldExist('mobile') && (
              <InputMobile
                // error={errors.mobile}
                // required
                full
                type="number"
                placeholder="+91"
                label={'Teacher Mobile Number'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    mobile: event.target.value
                  })
                }}
                error={errors.mobile}
              ></InputMobile>
            )}

            {checkIsFieldExist('email') && (
              <InputV2
                error={errors.email}
                full
                placeholder="Amrendra@gmail.com"
                type="email"
                label={'Teacher’s Email'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    email: event.target.value
                  })
                }}
              />
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              {checkIsFieldExist('gender') && (
                <Dropdownsmall
                  // error={errors.gender}
                  // required
                  fullWidth
                  label={'Gender'}
                  options={Gender}
                  onSelect={(option) => {
                    setGenderName(option)
                    setUserData({
                      ...userData,
                      gender: option.value
                    })
                  }}
                  selectedValue={genderName}
                  placeholder={'Male'}
                ></Dropdownsmall>
              )}

              {checkIsFieldExist('bloodGroup') && (
                <Dropdownsmall
                  fullWidth
                  label={'Blood Group'}
                  options={BloodGroup}
                  onSelect={(option) => {
                    setUserData({
                      ...userData,
                      bloodGroup: option?.value
                    })
                    setSelectedBloodGroup(option)
                  }}
                  placeholder={'O+ve'}
                  selectedValue={selectedBloodGroup}
                ></Dropdownsmall>
              )}
            </div>

            {checkIsFieldExist('emergencyContactNumber') && (
              <InputMobile
                // error={errors.emergencyContactNumber}
                // required
                type="number"
                full
                placeholder="+91"
                label={'Emergency Mobile Number'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    emergencyContactNumber: event.target.value
                  })
                }}
              ></InputMobile>
            )}

            {checkIsFieldExist('dob') && (
              <CalenderSelectInput
                maxDate={maxSelectableDate}
                // error={errors.dob}
                label={'Teacher’s DOB'}
                placeholder={''}
                value={userData.dob?.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                onChangeDate={SelectDate}
              >
                {userData.dob}
              </CalenderSelectInput>
            )}
          </InputBar>
        </GridItem>

        <GridItem
          columnSpan={4}
          rowSpan={40}
          style={{ background: White, borderRadius: '20px' }}
        >
          <Heading>Teacher Other Details</Heading>
          <InputBar>
            {checkIsFieldExist('educationalBackground') && (
              <InputV2
                // error={errors.educationalBackground}
                // required
                full
                placeholder="B.A"
                label={'Educational Background'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    educationalBackground: event.target.value
                  })
                }}
              />
            )}

            {checkIsFieldExist('previousInstituteName') && (
              <InputV2
                full
                placeholder="Previous company / institute / school name"
                label={'Previous Company / Institute / School'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    previousInstituteName: event.target.value
                  })
                }}
              />
            )}

            <Flex style={{ display: 'flex', justifyContent: 'space-between' }}>
              {checkIsFieldExist('collegeName') && (
                <InputV2
                  placeholder="College Name"
                  label={'College Name'}
                  style={{ width: '48%' }}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      collegeName: event.target.value
                    })
                  }}
                />
              )}

              {checkIsFieldExist('collegeCityName') && (
                <InputV2
                  placeholder="Bengaluru"
                  label={'College City'}
                  style={{ width: '48%' }}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      collegeCityName: event.target.value
                    })
                  }}
                />
              )}
            </Flex>

            {checkIsFieldExist('address') && (
              <TextArea
                // error={errors.address}
                // required
                rows={4}
                value={userData.address}
                label="Teacher’s Permanent Home address"
                placeholder="3, Queens Rd, Govinda Chetty Colony, 
              Shivaji Nagar, Bengaluru, Karnataka 560051"
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    address: event.target.value
                  })
                }}
              />
            )}

            <Flex style={{ display: 'flex', justifyContent: 'space-between' }}>
              {checkIsFieldExist('city') && (
                <InputV2
                  placeholder="Bengaluru"
                  label={'City'}
                  style={{ width: '48%' }}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      city: event.target.value
                    })
                  }}
                />
              )}

              {checkIsFieldExist('pincode') && (
                <InputV2
                  placeholder="560051"
                  type="number"
                  label={'Pin'}
                  style={{ width: '48%' }}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      pincode: Number(event.target.value)
                    })
                  }}
                />
              )}
            </Flex>

            <div style={{ display: 'flex', gap: '10px' }}>
              {checkIsFieldExist('experience') && (
                <div style={{ width: '49%' }}>
                  <Dropdownsmall
                    fullWidth
                    label={'Year of Experience'}
                    options={yearsOfExperience}
                    onSelect={(option) => {
                      setExperience(option)
                    }}
                    placeholder={'10'}
                    selectedValue={experience}
                  ></Dropdownsmall>
                </div>
              )}

              {checkIsFieldExist('dateOfJoining') && (
                <div style={{ width: '49%' }}>
                  <CalenderSelectInput
                    error={errors.dateOfJoining}
                    label={'Joining Date'}
                    placeholder={''}
                    value={userData.dateOfJoining?.toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                    onChangeDate={SelectJoiningDate}
                  >
                    {userData.dob}
                  </CalenderSelectInput>
                </div>
              )}
            </div>

            <Flex style={{ display: 'flex', justifyContent: 'space-between' }}>
              {checkIsFieldExist('department') && (
                <InputV2
                  // error={errors.department}
                  placeholder="Teaching"
                  // required
                  label={'Department'}
                  style={{ width: '48%' }}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      department: event.target.value
                    })
                  }}
                />
              )}

              {checkIsFieldExist('designation') && (
                <InputV2
                  // error={errors.designation}
                  placeholder="Teacher"
                  // required
                  label={'Designation'}
                  style={{ width: '48%' }}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      designation: event.target.value
                    })
                  }}
                />
              )}
            </Flex>
          </InputBar>
        </GridItem>
        <GridItem
          columnSpan={4}
          rowSpan={40}
          style={{ background: White, borderRadius: '20px' }}
        >
          <Heading>Teacher’s Admin & Document Details</Heading>
          <InputBar>
            {checkIsFieldExist('username') && (
              <InputV2
                label={'Teacher’s UserName'}
                placeholder="Mahendra1001"
                full
                required
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    username: event.target.value
                  })
                }}
                error={
                  tableData?.data.userExists
                    ? 'Username already exists'
                    : errors.username || ''
                }
                onBlur={handleBlur}
                autoComplete="off" // Disable autocomplete
              />
            )}

            {checkIsFieldExist('password') && (
              <InputPasswordV2
                error={errors.password}
                required
                full
                password={true}
                placeholder="ttmmhee192312"
                label={'Teacher’s Password'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    password: event.target.value
                  })
                }}
                autoComplete="new-password" // Use "new-password" for password fields
              />
            )}

            {checkIsFieldExist('bankAccountNo') && (
              <InputV2
                // error={errors.bankAccountNo}
                // required
                full
                placeholder="1231231 12312312"
                label={'Teacher’s Bank Account Number'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    bankAccountNo: event.target.value
                  })
                }}
              />
            )}

            {checkIsFieldExist('bankIfsc') && (
              <InputV2
                // error={errors.bankIfsc}
                // required
                full
                placeholder="123131277882"
                label={'Teacher’s Bank IFSC'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    bankIfsc: event.target.value
                  })
                }}
              />
            )}

            {checkIsFieldExist('bankName') && (
              <InputV2
                // error={errors.bankName}
                // required
                full
                placeholder="Kotak Mahindra"
                label={'Teacher’s Bank Name'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    bankName: event.target.value
                  })
                }}
              />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {checkIsFieldExist('pfAccountNumber') && (
                <div style={{ width: '49%' }}>
                  <InputV2
                    style={{ padding: '5px 10px 18px 0px' }}
                    full
                    placeholder="560051"
                    label={'PF Account Number'}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        pfAccountNumber: Number(event.target.value)
                      })
                    }}
                  />
                </div>
              )}

              <div style={{ width: '49%' }}>
                {checkIsFieldExist('contractType') && (
                  <Dropdownsmall
                    // error={errors.contractType}
                    // required
                    fullWidth
                    label={'Contract Type'}
                    options={TypeOfContract}
                    onSelect={(option) => {
                      setContractType(option)
                      setUserData({
                        ...userData,
                        contractType: option.value
                      })
                    }}
                    placeholder={'Regular'}
                    selectedValue={contractType}
                  ></Dropdownsmall>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {contractType?.value == 'Contract' &&
                checkIsFieldExist('contractStartDate') && (
                  <div style={{ width: '49%' }}>
                    <CalenderSelectInput
                      error={errors.contractStartDate}
                      label={'Contract Date'}
                      placeholder={'24th Oct, 2023'}
                      value={userData.contractStartDate?.toLocaleDateString(
                        'en-US',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }
                      )}
                      onChangeDate={SelectContractDate}
                    >
                      {userData.contractStartDate}
                    </CalenderSelectInput>
                  </div>
                )}

              {checkIsFieldExist('epsAccountNumber') && (
                <div
                  style={{
                    width: contractType?.value == 'Contract' ? '49%' : '98%'
                  }}
                >
                  <InputV2
                    style={{ padding: '5px 10px 18px 0px' }}
                    full
                    placeholder="560051"
                    label={'ESI Account Number'}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        epsAccountNumber: Number(event.target.value)
                      })
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {checkIsFieldExist('panNumber') && (
                <InputV2
                  // error={errors.panNumber}
                  placeholder="560051"
                  // required
                  label={'PAN Number'}
                  style={{ width: '48%' }}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      panNumber: event.target.value
                    })
                  }}
                />
              )}
              {checkIsFieldExist('aadharNo') && (
                <InputV2
                  // error={errors.aadharNo}
                  placeholder="560051005214"
                  // required
                  label={'Aadhar Number'}
                  style={{ width: '48%' }}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      aadharNo: event.target.value
                    })
                  }}
                />
              )}
            </div>

            <ButtonContainer>
              <ButtonV2
                onClick={handleSubmit}
                disabled={
                  !(
                    selectedInstitute?.id &&
                    selectedBranch?.id &&
                    userData?.firstName &&
                    userData?.username &&
                    userData?.password
                  )
                }
              >
                {issLoading ? (
                  <Spinner
                    style={{
                      width: '30px',
                      height: '30px',
                      color: `${BlueButton}`
                    }}
                    animation={'border'}
                  />
                ) : (
                  'Save'
                )}
              </ButtonV2>
            </ButtonContainer>
          </InputBar>
        </GridItem>
      </Grid>
    </PageContainer>
  )
}

export default AddTeacherPage
