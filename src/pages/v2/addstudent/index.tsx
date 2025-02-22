import { useEffect, useState } from 'react'
import {
  ButtonV2,
  Grid,
  GridItem,
  PageContainer
} from '../../../components/V2/styledComponents'
import { BlueButton, White } from '../../../const/V2/stylingVariables'
import {
  ButtonContainer,
  DoubleInputV2,
  HeaderImage,
  Heading,
  InputBar,
  PopupViewer
} from './stylecomponent'
import InputV2 from '../../../components/V2/Form/Input'
import Dropdown from '../../../components/V2/Form/Dropdown'
import TextArea from '../../../components/V2/Form/TextArea'
import Dropdownsmall from '../../../components/V2/Form/Dropdownsmall'
import InputMobile from '../../../components/V2/Form/Mobilenumber'
import AssignStudentPopUp from './AssignPopup'
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
  AddStudentV2,
  checkUserNameAPI,
  GetSingleStudentV2,
  UpdateStudentV2
} from '../../../redux/addStudentV2/api'
import CalenderSelectInput from '../../../components/V2/Calender'
import FormValidator from './validation'
import { UserResponse } from '../../../redux/addStudentV2/types'
import InputPasswordV2 from '../../../components/V2/Form/InputPassword'
import {
  getAllBranchAPI,
  getInstituteSettingsAPI,
  getNewAllBatchAPI,
  getNewAllInstituteAPI
} from '../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useHistory, useParams } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import { Spinner } from 'react-bootstrap'
import { NewBranchDetails } from '../../../utils/types'

const AddStudent = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [date, setDate] = useState<Date | any>()
  const [admissionDate, setadmissionDate] = useState<Date | any>()
  const [popup, setpopup] = useState(false)
  const [selectedAcademicYear, setselectedAcademicYear] = useState<any>({
    id: '',
    label: ''
  })
  const [gender, setGender] = useState<DropdownOptionData<string> | any>({
    id: '',
    label: ''
  })
  const [registration, setRegistration] = useState<any>({ id: '', label: '' })
  const [community, setCommunity] = useState<DropdownOptionData<string> | any>({
    id: '',
    label: ''
  })
  const [caste, setCaste] = useState<any>()
  const [religion, setReligion] = useState<DropdownOptionData<string> | any>({
    id: '',
    label: ''
  })
  const [tableData, setTableData] = useState<UserResponse>({
    message: '',
    data: {
      userExists: false
    }
  })

  const param: any = useParams()
  const [finalData, setFinalData] = useState<any>()
  const { formErrors, handleInputChange } = FormValidator({
    finalData,
    setFinalData
  })

  const [image, setImage] = useState<File>()
  const [studentField, setStudentField] = useState<any>([])
  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const today = new Date()
  const maxSelectableDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const [selectedinstitute, setSelectedInstitute] = useState<any>({
    id: '',
    label: ''
  })
  const [selectedBranch, setselectedBranch] = useState<any>({
    id: '',
    label: ''
  })
  const [selectedBatch, setselectedBatch] = useState<any>({ id: '', label: '' })
  const [branchError, setBranchError] = useState<string>('')
  const [batchError, setBatchError] = useState<string>('')
  const [issLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [branchData, setBranchData] = useState<any[]>([])
  const [branchLoading, setBranchLoading] = useState(false)

  const { users, batchList, batchLoading } = useSelector(
    (state: RootState) => ({
      users: state.userV2.userInfoV2,
      batchList: state.batchV2.data,
      batchLoading: state.batchV2.loading
    }),
    shallowEqual
  )

  const history = useHistory()
  const dispatch = useDispatch()

  const batchData = batchList.map((item) => ({
    id: item._id,
    label: item.name,
    value: ''
  }))

  const SelectDate = (selectedDate: Date | null) => {
    setDate(selectedDate)
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString() : ''
    handleInputChange('dob', formattedDate)
    return selectedDate
  }

  const SelectAdmissionDate = (selectedDate: Date) => {
    setadmissionDate(selectedDate)
    const formattedAdmissionDate = selectedDate
      ? selectedDate.toLocaleDateString()
      : ''
    handleInputChange('admissionDate', formattedAdmissionDate)
    return selectedDate
  }

  const handleBlur = (event: string | any) => {
    if (!isEdit) {
      const inputValueOnBlur = event.target.value
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

  const checkIsFieldExist = (name: string) => {
    return studentField.some((item: any) => item.fieldName === name)
  }

  useEffect(() => {
    if (users.role !== 'branchAdmin') {
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
  }, [users.role])

  const getInstituteSettings = (id: string) => {
    getInstituteSettingsAPI({
      page: 1,
      limit: 20,
      instituteId: id
    })
      .then((res) => {
        if (res) {
          if (res?.data.length > 0) {
            if (
              res?.data[0]?.studentFields &&
              res?.data[0]?.studentFields.length > 0
            ) {
              setStudentField(res?.data[0]?.studentFields)
              let requiredField = res?.data[0]?.studentFields.reduce(
                (acc: any, field: any) => {
                  acc[field.fieldName] = ''
                  return acc
                },
                {}
              )
              setFinalData(requiredField)
            } else {
              CustomToastMessage(
                'Set the student form Master first from settings',
                'error'
              )
            }
          }
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => handleInputChange('instituteId', id))
  }

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
      if (selectedinstitute.id) {
        setBranchLoading(true)
        const payload = {
          page: 1,
          limit: 150,
          instituteId: selectedinstitute?.id
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

    if (userInfoV2.role !== 'superAdmin' && !param.id) {
      getInstituteSettingsAPI({
        page: 1,
        limit: 20,
        instituteId: userInfoV2.instituteId
      })
        .then((res) => {
          if (res) {
            if (res?.data.length > 0) {
              if (
                res?.data[0]?.studentFields &&
                res?.data[0]?.studentFields.length > 0
              ) {
                setStudentField(res?.data[0]?.studentFields)
                let requiredField = res?.data[0]?.studentFields.reduce(
                  (acc: any, field: any) => {
                    acc[field.fieldName] = ''
                    return acc
                  },
                  {}
                )
                setFinalData(requiredField)
              } else {
                CustomToastMessage(
                  'Set the student form Master first from settings',
                  'error'
                )
              }
            }
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [selectedinstitute, dispatch, userInfoV2, param.id])

  useEffect(() => {
    if (users.role === 'branchAdmin') {
      setSelectedInstitute({
        label: users.instituteName,
        value: users.instituteId,
        id: users.instituteId
      })
      setselectedBranch({
        label: users.branchName,
        value: users.branchId,
        id: users.branchId
      })

      dispatch(
        getNewAllBatchAPI({
          page: 1,
          limit: 150,
          branchIds: [users.branchId]
        })
      )
    }
    if (users.role === 'instituteAdmin') {
      setSelectedInstitute({
        label: users.instituteName,
        value: users.instituteId,
        id: users.instituteId
      })
    }

    if (users.role === 'superAdmin') {
      dispatch(
        getNewAllInstituteAPI({
          page: 1,
          limit: 50
        })
      )
    }
  }, [dispatch, users, users.role])

  const handleSubmit = () => {
    // const canContinue = handleContinue()
    // if (canContinue) {

    if (!selectedinstitute) {
      return
    }
    if (!selectedBranch) {
      setBranchError('Please select a branch')
      return
    }
    if (!selectedBatch) {
      setBatchError('Please select a Batch / Section')
      return
    }
    const formData = new FormData()
    if (finalData?.firstName) {
      formData.append('firstName', finalData?.firstName)
    }

    if (finalData?.lastName || finalData?.lastName === '') {
      formData.append('lastName', finalData?.lastName)
    }
    formData.append('role', 'student')
    if (finalData?.admissionNo) {
      formData.append('admissionNo', finalData?.admissionNo)
    }
    if (finalData?.userName && !isEdit) {
      formData.append('username', finalData?.userName)
    }
    if (finalData?.password) {
      formData.append('password', finalData?.password)
    }
    if (gender?.label) {
      formData.append('gender', gender?.label)
    }
    if (finalData?.mobile) {
      formData.append('mobile', `+91${finalData?.mobile}`)
    }
    if (finalData?.fatherName) {
      formData.append('fatherName', finalData?.fatherName)
    }
    if (finalData?.motherName) {
      formData.append('motherName', finalData?.motherName)
    }
    if (finalData?.parentMobile) {
      formData.append('parentMobile', `+91${finalData?.parentMobile}`)
    }
    if (date) {
      formData.append('dob', date)
    }
    if (finalData?.aadharNo) {
      formData.append('aadharNo', finalData?.aadharNo)
    }
    if (finalData?.address) {
      formData.append('address', finalData?.address)
    }
    if (finalData?.city) {
      formData.append('city', finalData?.city)
    }
    if (finalData?.pincode) {
      formData.append('pincode', finalData?.pincode)
    }
    if (finalData?.statsNo) {
      formData.append('satsNo', finalData?.statsNo)
    }

    formData.append('instituteId', selectedinstitute?.id?.toString() || '')
    formData.append('branchId', selectedBranch?.id?.toString() || '')
    formData.append('batchId', selectedBatch?.id?.toString() || '')

    if (finalData?.nationality) {
      formData.append('nationality', finalData?.nationality)
    }

    if (caste != undefined && caste.label) {
      formData.append('caste', caste.label)
    }

    if (religion != undefined && religion.label) {
      formData.append('religion', religion.label)
    }
    if (selectedAcademicYear != undefined && selectedAcademicYear?.label) {
      formData.append('academicYear', selectedAcademicYear?.label)
    }
    if (registration?.label) {
      formData.append('registrationType', registration?.label)
    }
    if (image != undefined) {
      formData.append('profileImage', image)
    }
    if (community?.label) {
      formData.append('community', community?.label)
    }
    if (admissionDate) {
      formData.append('dateOfJoining', admissionDate)
    }
    setIsLoading(true)
    if (!isEdit) {
      AddStudentV2(formData)
        .then((res) => {
          if (res) {
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.STUDENT_LIST)
          }
        })
        .catch((error) => {
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      UpdateStudentV2(formData, param.id)
        .then((res) => {
          if (res) {
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.STUDENT_LIST)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
    // } else {
    //   console.log(
    //     'Form contains errors. Please correct them before submitting.'
    //   )
    // }
  }

  useEffect(() => {
    if (param.id) {
      setIsEdit(true)
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

                      // let requiredField = res?.data[0]?.studentFields.reduce(
                      //   (acc: any, field: any) => {
                      //     acc[field.fieldName] = ''
                      //     return acc
                      //   },
                      //   {}
                      // )
                      // setFinalData(requiredField)
                    } else {
                      CustomToastMessage(
                        'Set the student form Master first from settings',
                        'error'
                      )
                    }
                  }
                }
              })
              .catch((error) => CustomToastMessage(error.message, 'error'))
          }

          if (res) {
            const resData = res.data
            if (resData.instituteId && resData.branchId && resData.batchId) {
              setSelectedInstitute({
                id: resData.instituteId,
                label: resData.instituteName
              })
              setselectedBranch({
                id: resData.branchId,
                label: resData.branchName
              })
              setselectedBatch({
                id: resData.batchId,
                label: resData.batchName
              })
            }
            if (res.data.mobile) {
              res.data.mobile = res.data.mobile.replace('+91', '')
            }
            if (res.data.parentMobile) {
              res.data.parentMobile = res.data.mobile.replace('+91', '')
            }
            // setUsername(res.data.username)
            // seteditPassword(res.data.password)
            setFinalData({
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
              pincode: res.data.pincode,
              userName: res.data.username,
              password: res.data.password
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

            setImage(res?.data?.profileImage)
          }
        })
        .catch((error) => console.log({ error }))
    }
  }, [param?.id])

  const isFormIncomplete = () => {
    const isBasicInfoComplete =
      selectedinstitute?.id &&
      selectedBranch?.id &&
      selectedBatch?.id &&
      finalData?.userName &&
      finalData?.firstName

    return param.id
      ? !isBasicInfoComplete
      : !(isBasicInfoComplete && finalData?.password)
  }

  return (
    <PageContainer style={{ overflowY: 'scroll' }}>
      {popup == true ? (
        <PopupViewer>
          <AssignStudentPopUp
            selectedInstitute={selectedinstitute}
            admissiondate={admissionDate}
            caste={caste}
            community={community}
            religion={religion}
            profile={image}
            academicyear={selectedAcademicYear}
            type={registration}
            fromData={finalData}
            date={date}
            gender={gender}
            {...{
              setpopup
            }}
          />
        </PopupViewer>
      ) : (
        ''
      )}

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
                    onImageSelected={(file: File) => {
                      setImage(file)
                    }}
                    defaultvalue={''}
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
            {userInfoV2.role === 'superAdmin' && (
              <SearchableDropdown
                style={{ width: '100%' }}
                isLoader={insLoading}
                label={'Select Institute / School'}
                placeHolder={'Please Select Institute / School'}
                options={instituteData}
                isClear={!!selectedinstitute?.id}
                onSelect={(option) => {
                  setStudentField([])
                  setSelectedInstitute(option)
                  setselectedBranch({ id: '', label: '' })
                  setselectedBatch({ id: '', label: '' })
                  if (option.id) {
                    getInstituteSettings(String(option.id))
                  }
                }}
                selectedValue={selectedinstitute}
              />
            )}
            {users.role !== 'branchAdmin' && (
              <SearchableDropdown
                isLoader={branchLoading}
                error={branchError}
                label={'Select Branch'}
                required
                placeHolder={'Select Branch'}
                options={branchData}
                onSelect={(option) => {
                  setselectedBranch(option)
                  setBranchError('')
                  setselectedBatch({ id: '', label: '' })
                  dispatch(
                    getNewAllBatchAPI({
                      page: 1,
                      limit: 100,
                      branchIds: [String(option.id)]
                    })
                  )
                }}
                selectedValue={selectedBranch}
                isClear={!!selectedBranch?.id}
              />
            )}
            <SearchableDropdown
              isLoader={batchLoading}
              error={batchError}
              label={'Select Batch / Section'}
              required
              placeHolder={'Select Batch / Section'}
              options={batchData}
              onSelect={(option) => {
                setselectedBatch(option)
                setBatchError('')
              }}
              selectedValue={selectedBatch}
              isClear={!!selectedBatch?.id}
            />
            {checkIsFieldExist('firstName') && (
              <InputV2
                full
                placeholder="Mahendra"
                required
                label={'Student First Name'}
                name="firstName"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.firstName}
                error={formErrors?.firstName}
              />
            )}
            {checkIsFieldExist('lastName') && (
              <InputV2
                full
                placeholder="Singh"
                label={'Student Last Name'}
                name="lastName"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.lastName}
              />
            )}

            {checkIsFieldExist('mobile') && (
              <InputMobile
                full
                type="number"
                placeholder="Enter your mobile number"
                label={'Student Mobile Number'}
                name="mobile"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.mobile}
                error={formErrors?.mobile}
              ></InputMobile>
            )}
            {checkIsFieldExist('fatherName') && (
              <InputV2
                full
                placeholder="Amrendra"
                label={'Student’s Father Name'}
                name="fatherName"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.fatherName}
              />
            )}
            {checkIsFieldExist('motherName') && (
              <InputV2
                full
                placeholder="Devsena"
                label={'Student’s Mother Name'}
                name="motherName"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.motherName}
              />
            )}
            {checkIsFieldExist('parentMobile') && (
              <InputMobile
                type="number"
                full
                label={'Parent Mobile Number'}
                placeholder="Enter your mobile number"
                name="parentMobile"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.parentMobile}
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
                // error={formErrors?.dob}
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
                fullWidth
                label={"Student's Gender"}
                options={Gender}
                onSelect={(option) => {
                  setGender(option)
                  handleInputChange('gender', option.value)
                }}
                selectedValue={gender}
                placeholder={'Male'}
              ></Dropdownsmall>
            )}

            {checkIsFieldExist('nationality') && (
              <InputV2
                full
                placeholder="Indian"
                label={'Nationality'}
                name="nationality"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.nationality}
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
                fullWidth
                label={'Student’s Community'}
                placeholder={'Select Community'}
                options={StudentCommunity}
                onSelect={(option) => {
                  setCommunity(option)
                  handleInputChange('community', option.value)
                }}
                selectedValue={community}
              ></Dropdown>
            )}

            {checkIsFieldExist('aadharNo') && (
              <InputV2
                full
                type="number"
                placeholder="I1231231 12312312"
                label={"Student's Adhar Number"}
                name="aadharNo"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.aadharNo}
              />
            )}
            {checkIsFieldExist('address') && (
              <TextArea
                rows={4}
                value={finalData?.address}
                label="Student’s Permanent Home address"
                placeholder="3, Queens Rd, Govinda Chetty Colony, 
                Shivaji Nagar, Bengaluru, Karnataka 560051"
                name="address"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
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
                    handleInputChange(e.target.name, e.target.value)
                  }
                  value={finalData?.city}
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
                    handleInputChange(e.target.name, e.target.value)
                  }
                  value={finalData?.pincode}
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
                label={"Student's UserName"}
                placeholder="Mahendra1001"
                full
                required
                name="userName"
                onChange={(e) => {
                  !isEdit && handleInputChange(e.target.name, e.target.value)
                }}
                value={finalData?.userName}
                error={
                  formErrors?.userName ||
                  (tableData?.data.userExists ? 'Username already exists' : '')
                }
                onBlur={handleBlur}
                autoComplete="off" // Disable autocomplete
              />
            )}
            {checkIsFieldExist('password') && (
              <InputPasswordV2
                required
                full
                placeholder="Min.6 (eg. Mahi$001)"
                password={true}
                label={'Student’s Password'}
                name="password"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.password}
                error={formErrors?.password}
                autoComplete="new-password" // Use "new-password" for password fields
              />
            )}

            <DoubleInputV2>
              {checkIsFieldExist('dateOfJoining') && (
                <div style={{ width: '49%' }}>
                  <CalenderSelectInput
                    label={'Admission Date'}
                    placeholder={''}
                    value={admissionDate?.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                    onChangeDate={SelectAdmissionDate}
                    // error={formErrors?.admissionDate}
                  >
                    {admissionDate}
                  </CalenderSelectInput>
                </div>
              )}
              {checkIsFieldExist('academicYear') && (
                <div style={{ width: '49%' }}>
                  <Dropdownsmall
                    fullWidth
                    label={'Acadamic Year'}
                    placeholder={'2024'}
                    options={sampleOptions}
                    onSelect={(option) => {
                      setselectedAcademicYear(option)
                    }}
                    selectedValue={selectedAcademicYear}
                  ></Dropdownsmall>
                </div>
              )}
            </DoubleInputV2>

            {checkIsFieldExist('registrationType') && (
              <Dropdown
                // error={formErrors?.type}
                // required
                fullWidth
                label={'Register type'}
                placeholder={'Select type of registration'}
                options={RegistrationType}
                onSelect={(option) => {
                  setRegistration(option)
                  handleInputChange('type', option.value)
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
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.admissionNo}
                // error={formErrors?.admissionNo}
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
                  handleInputChange(e.target.name, e.target.value)
                }
                value={finalData?.statsNo}
                // error={formErrors?.statsNo}
              />
            )}
            <ButtonContainer>
              <ButtonV2
                // disabled={
                //   param.id ?
                //   !(
                //     selectedinstitute?.id &&
                //     selectedBranch?.id &&
                //     selectedBatch?.id &&
                //     finalData?.userName &&
                //     finalData?.firstName
                //   ) : !(
                //     selectedinstitute?.id &&
                //     selectedBranch?.id &&
                //     selectedBatch?.id &&
                //     finalData?.password &&
                //     finalData?.userName &&
                //     finalData?.firstName
                //   )
                // }
                disabled={isFormIncomplete()}
                onClick={() => {
                  handleSubmit()
                }}
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
                ) : isEdit ? (
                  ' Update'
                ) : (
                  'Submit'
                )}
              </ButtonV2>
            </ButtonContainer>
          </InputBar>
        </GridItem>
      </Grid>
    </PageContainer>
  )
}

export default AddStudent
