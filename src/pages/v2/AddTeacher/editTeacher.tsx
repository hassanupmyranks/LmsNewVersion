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
  initialState,
  NewBranchDetails
} from '../../../utils/types'
import {
  GetSingleStudentV2,
  UpdateStudentV2
} from '../../../redux/addStudentV2/api'
import CalenderSelectInput from '../../../components/V2/Calender'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { useHistory, useParams } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import UserImage from '../../../assets/user-profile.png'
import InputPasswordV2 from '../../../components/V2/Form/InputPassword'
import {
  checkUserNameAPI,
  getAllBranchAPI,
  getInstituteSettingsAPI,
  getNewAllBranchAPI
} from '../../../helpers/V2/apis'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { Spinner } from 'react-bootstrap'
import { UserResponse } from '../../../redux/addStudentV2/types'

const EditTeacher = () => {
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

  const [userData, setUserData] =
    useState<CreateUserForTeacherParam>(initialState)

  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [selectedInstitute, setSelectedInstitute] = useState<any>()
  const [selectedBranch, setSelectedBranch] = useState<any>()

  const [imageUrl, setImageUrl] = useState<any>()
  const [teacherField, setTeacherField] = useState<any>([])
  const [issLoading, setIsLoading] = useState(false)

  const SelectDate = (selectedDate: Date) => {
    setUserData({
      ...userData,
      dob: selectedDate
    })

    return selectedDate
  }

  const [branchData, setBranchData] = useState<any[]>([])
  const [branchLoading, setBranchLoading] = useState(false)

  const SelectContractDate = (selectedDate: Date) => {
    setUserData({
      ...userData,
      contractStartDate: selectedDate
    })
    return selectedDate
  }
  const SelectJoiningDate = (selectedDate: Date) => {
    setUserData({
      ...userData,
      dateOfJoining: selectedDate
    })
    return selectedDate
  }

  const today = new Date()
  const maxSelectableDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const [screenSize, setScreenSize] = useState(0)

  const [contractType, setContractType] = useState<DropdownOptionData<string>>()
  const [errors] = useState<{ [key: string]: string }>({})

  const handleSubmit = () => {
    const file = new File([userData.profileImage], userData.firstName, {
      type: 'image/png'
    })
    const newFormData: any = new FormData()
    if (userData.firstName) {
      newFormData.append('firstName', userData.firstName)
    }
    if (userData.lastName || userData.lastName === '') {
      newFormData.append('lastName', userData.lastName || ' ')
    }
    if (userData.mobile) {
      newFormData.append('mobile', `+91${userData.mobile}`)
    }
    if (userData.bloodGroup) {
      newFormData.append('bloodGroup', userData.bloodGroup)
    }
    newFormData.append('role', userData.role)

    if (userData.email) {
      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
      if (!regEx.test(userData.email)) {
        CustomToastMessage('Invalid Email', 'error')
        return 'Invalid Email'
      } else {
        newFormData.append('email', userData.email)
      }
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
    if (userData.pincode) {
      newFormData.append('pincode', userData.pincode)
    }
    if (userData.city) {
      newFormData.append('city', userData.city)
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

    if (userData.password) {
      newFormData.append('password', userData.password)
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

    UpdateStudentV2(newFormData, param.id)
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
    // } else {
    //   console.log(errors)
    // }
  }
  const param: { id: string } = useParams()

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
                    setTeacherField(res?.data[0]?.teacherFields)
                  }
                }
              })
              .catch((error) => CustomToastMessage(error.message, 'error'))
          }
          if (res.data.profileImage) {
            setImageUrl(res.data.profileImage)
          }
          const resData = res.data
          if (resData.instituteId && resData.branchId) {
            setSelectedInstitute({
              id: resData.instituteId,
              label: resData.instituteName
            })
            setSelectedBranch({
              id: resData.branchId,
              label: resData.branchName
            })
          }

          if (res.data?.gender) {
            setGenderName({
              id: '1',
              label: res.data.gender,
              value: res.data.gender
            })
          }
          if (res.data?.contractType) {
            setContractType({
              id: '1',
              label: res.data.contractType,
              value: res.data.contractType
            })
          }
          if (res.data?.experience) {
            setSelectedBloodGroup({
              id: '1',
              label: res.data.bloodGroup,
              value: res.data.bloodGroup
            })
          }
          if (res.data?.experience) {
            setExperience({
              id: '1',
              label: res.data.experience,
              value: res.data.experience
            })
          }

          if (res && res?.data) {
            const {
              firstName,
              lastName,
              role,
              username,
              password,
              gender,
              email,
              mobile,
              bloodGroup,
              emergencyContactNumber,
              dob,
              educationalBackground,
              previousInstituteName,
              collegeName,
              collegeCityName,
              address,
              city,
              pincode,
              experience,
              dateOfJoining,
              department,
              designation,
              bankAccountNo,
              bankIfsc,
              bankName,
              pfAccountNumber,
              contractType,
              contractStartDate,
              panNumber,
              aadharNo,
              epsAccountNumber,
              profileImage
            } = res.data

            setUserData({
              firstName: firstName,
              lastName: lastName,
              role: role,
              username: username,
              password: password,
              gender: gender,
              email: email,
              mobile: mobile && mobile.replace('+91', ''),
              bloodGroup: bloodGroup,

              emergencyContactNumber:
                emergencyContactNumber?.replace('+91', '') || '',

              dob: dob ? new Date(dob) : null,
              educationalBackground: educationalBackground,
              previousInstituteName: previousInstituteName,
              collegeName: collegeName,
              collegeCityName: collegeCityName,
              address: address,
              city: city,
              pincode: parseInt(pincode, 10),
              experience: parseInt(experience, 10),
              dateOfJoining: dateOfJoining ? new Date(dateOfJoining) : null,
              department: department,
              designation: designation,
              bankAccountNo: bankAccountNo,
              bankIfsc: bankIfsc,
              bankName: bankName,
              pfAccountNumber: parseInt(pfAccountNumber, 10),
              contractType: contractType,
              contractStartDate: contractStartDate
                ? new Date(contractStartDate || dateOfJoining)
                : null,
              panNumber: panNumber,
              aadharNo: aadharNo,
              epsAccountNumber: parseInt(epsAccountNumber, 10),
              profileImage: new File([], profileImage)
            })
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [param.id])

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
  const checkIsFieldExist = (name: string) => {
    console.log(
      name,
      'name',
      teacherField.some((item: any) => item.fieldName !== name)
    )
    return teacherField.some((item: any) => item.fieldName === name)
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
            setTeacherField(res?.data[0]?.teacherFields)
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
              setTeacherField(res?.data[0]?.teacherFields)
            }
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
      if (userInfoV2.role !== 'branchAdmin') {
        dispatch(
          getNewAllBranchAPI({
            page: 1,
            limit: 20,
            instituteId: userInfoV2.instituteId
          })
        )
      }
    }
  }, [userInfoV2, dispatch])

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

  const [tableData, setTableData] = useState<UserResponse>({
    message: '',
    data: {
      userExists: false
    }
  })

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
                    setImageUrl('')
                    setUserData({
                      ...userData,
                      profileImage: imageURL
                    })
                  }}
                  defaultvalue={imageUrl || UserImage}
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
                    dispatch(
                      getNewAllBranchAPI({
                        page: 1,
                        limit: 20,
                        instituteId: option.id
                      })
                    )
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
                value={userData.firstName}
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
                error={errors.lastName}
                value={userData.lastName}
                full
                placeholder="Singh"
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
                error={errors.mobile}
                value={userData?.mobile?.toString()}
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
              ></InputMobile>
            )}
            {checkIsFieldExist('email') && (
              <InputV2
                error={errors.email}
                value={userData?.email}
                full
                placeholder="Amrendra@gmail.com"
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
                  error={errors.gender}
                  required
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
                error={errors.emergencyContactNumber}
                value={userData.emergencyContactNumber.toString()}
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
                error={errors.dob}
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
                error={errors.educationalBackground}
                value={userData.educationalBackground}
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
                value={userData.previousInstituteName}
                full
                placeholder="Previous company or institute / school name"
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
                  value={userData.collegeName}
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
                  value={userData.collegeCityName}
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
                error={errors.address}
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
                  value={userData.city}
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
                  value={userData.pincode}
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
                  error={errors.department}
                  value={userData.department}
                  placeholder="Teaching"
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
                  error={errors.designation}
                  value={userData.designation}
                  placeholder="Teacher"
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
                value={userData.username}
                label={'Teacher’s Username'}
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
                value={userData.password}
                password={true}
                required
                full
                placeholder="ttmmhee192312"
                label={'Teacher’s Password'}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    password: event.target.value
                  })
                }}
              />
            )}
            {checkIsFieldExist('bankAccountNo') && (
              <InputV2
                error={errors.bankAccountNo}
                value={userData.bankAccountNo}
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
                error={errors.bankIfsc}
                value={userData.bankIfsc}
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
                error={errors.bankName}
                value={userData.bankName}
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
                    value={userData.pfAccountNumber}
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
              {checkIsFieldExist('contractType') && (
                <div style={{ width: '49%' }}>
                  <Dropdownsmall
                    fullWidth
                    label={'Contract Type'}
                    options={TypeOfContract}
                    onSelect={(option) => {
                      setContractType(option)
                    }}
                    placeholder={'Regular'}
                    selectedValue={contractType}
                  ></Dropdownsmall>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {contractType?.value == 'Contract' &&
                checkIsFieldExist('contractStartDate')(
                  <div style={{ width: '49%' }}>
                    <CalenderSelectInput
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
                    value={userData.epsAccountNumber}
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
                  error={errors.panNumber}
                  value={userData.panNumber}
                  placeholder="560051"
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
                  error={errors.aadharNo}
                  value={userData.aadharNo}
                  placeholder="560051005214"
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
                disabled={
                  !(
                    selectedInstitute?.id &&
                    selectedBranch?.id &&
                    userData?.firstName &&
                    userData?.username
                  )
                }
                onClick={handleSubmit}
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
                  'Update'
                )}
              </ButtonV2>
            </ButtonContainer>
          </InputBar>
        </GridItem>
      </Grid>
    </PageContainer>
  )
}
export default EditTeacher
