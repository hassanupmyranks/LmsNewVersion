import styled from 'styled-components'
import { Blue, BlueButton } from '../../../const/V2/stylingVariables'
import { ReactComponent as RemoveIconSvg } from '../../../assets/svg/close-page.svg'

import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  getNewAllInstituteAPI,
  getNewAllBranchAPI,
  getNewAllBatchAPI
} from '../../../helpers/V2/apis'
import { RootState } from '../../../redux/store'
import { Spinner } from 'react-bootstrap'
import { AddStudentV2 } from '../../../redux/addStudentV2/api'
import { DropdownOptionData } from '../../../components/V2/Form/types'
import Dropdownsmall from '../../../components/V2/Form/Dropdownsmall'
import { ButtonV2 } from '../../../components/V2/styledComponents'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'

const AssignStudentPopUp = ({
  setpopup,
  fromData,
  date,
  gender,
  academicyear,
  type,
  profile,
  caste,
  community,
  religion,
  admissiondate,
  selectedInstitute
}: {
  setpopup: (d: boolean) => void
  fromData: any
  date: any
  gender: any
  academicyear: any
  type: any
  profile: any
  caste: any
  community: any
  religion: any
  admissiondate: any
  selectedInstitute: any
}) => {
  const { branchList, batchList, branchLoading, batchLoading, users } =
    useSelector(
      (state: RootState) => ({
        users: state.userV2.userInfoV2,
        branchList: state.branchV2.data,
        batchList: state.batchV2.data,
        branchLoading: state.branchV2.loading,
        batchLoading: state.batchV2.loading
      }),
      shallowEqual
    )

  const history = useHistory()
  const dispatch = useDispatch()
  const [selectedinstitute, setSelectedInstitute] = useState<
    DropdownOptionData<string>
  >(selectedInstitute.id ? selectedInstitute : '')
  useEffect(() => {
    // if (users.role === 'instituteAdmin') {
    // setSelectedInstitute({
    //   label: users.instituteName,
    //   value: users.instituteId,
    //   id: users.instituteId
    // })

    dispatch(
      getNewAllBranchAPI({
        page: 1,
        limit: 150,
        instituteId: selectedinstitute?.id
      })
    )

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
    if (users.role === 'superAdmin') {
      dispatch(
        getNewAllInstituteAPI({
          page: 1,
          limit: 50
        })
      )
    }
  }, [dispatch, users, users.role, selectedinstitute?.id])

  const branchData = branchList.map((item) => ({
    id: item._id,
    label: item.name,
    value: item._id
  }))

  const batchData = batchList.map((item) => ({
    id: item._id,
    label: item.name,
    value: item._id
  }))

  const [selectedBranch, setselectedBranch] =
    useState<DropdownOptionData<string>>()
  const [selectedBatch, setselectedBatch] =
    useState<DropdownOptionData<string>>()
  const [branchError, setBranchError] = useState<string>('')
  const [batchError, setBatchError] = useState<string>('')
  const [issLoading, setIsLoading] = useState(false)
  const handleSubmit = () => {
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
    formData.append('firstName', fromData.firstName)
    formData.append('lastName', fromData.lastName)
    formData.append('role', 'student')
    formData.append('admissionNo', fromData.admissionNo)
    formData.append('username', fromData.userName)
    formData.append('password', fromData.password)
    formData.append('gender', gender.label)
    formData.append('mobile', `+91${fromData.mobile}`)

    if (fromData?.fatherName) {
      formData.append('fatherName', fromData.fatherName)
    }
    if (fromData?.motherName) {
      formData.append('motherName', fromData.motherName)
    }
    if (fromData?.parentMobile) {
      formData.append('parentMobile', `+91${fromData.parentMobile}`)
    }
    if (date) {
      formData.append('dob', date)
    }
    if (fromData?.aadharNo) {
      formData.append('aadharNo', fromData.aadharNo)
    }
    if (fromData?.address) {
      formData.append('address', fromData.address)
    }
    if (fromData?.city) {
      formData.append('city', fromData.city)
    }
    if (fromData.pincode) {
      formData.append('pincode', fromData.pincode)
    }
    if (fromData.statsNo) {
      formData.append('satsNo', fromData.statsNo)
    }

    formData.append('instituteId', selectedinstitute?.id?.toString() || '')
    formData.append('branchId', selectedBranch?.id?.toString() || '')
    formData.append('batchId', selectedBatch?.id?.toString() || '')

    if (fromData.nationality) {
      formData.append('nationality', fromData.nationality)
    }
    if (caste != undefined) {
      formData.append('caste', caste.label)
    }
    if (religion != undefined) {
      formData.append('religion', religion.label)
    }
    if (academicyear != undefined) {
      formData.append('academicYear', academicyear.label)
    }
    if (type?.label) {
      formData.append('registrationType', type.label)
    }
    if (profile != undefined) {
      formData.append('profileImage', profile)
    }
    if (community?.label) {
      formData.append('community', community.label)
    }
    if (admissiondate) {
      formData.append('dateOfJoining', admissiondate)
    }

    setIsLoading(true)
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
        setpopup(false)
        setIsLoading(false)
      })
  }
  return (
    <PopUpBox>
      <AlignHeading>
        <div></div>
        <Heading>Assign Student</Heading>
        <RemoveIcon onClick={() => setpopup(false)} />
      </AlignHeading>
      {users.role !== 'branchAdmin' && (
        <Dropdownsmall
          isLoading={branchLoading}
          error={branchError}
          label={'Select Branch'}
          required
          placeholder={'Select Branch'}
          options={branchData}
          onSelect={(option) => {
            setselectedBranch(option)
            setBranchError('')
            dispatch(
              getNewAllBatchAPI({
                page: 1,
                limit: 100,
                branchIds: [String(option.id)]
              })
            )
          }}
          selectedValue={selectedBranch}
        ></Dropdownsmall>
      )}

      <Dropdownsmall
        isLoading={batchLoading}
        error={batchError}
        label={'Select Batch / Section'}
        required
        placeholder={'Select Batch / Section'}
        options={batchData}
        onSelect={(option) => {
          setselectedBatch(option)
          setBatchError('')
        }}
        selectedValue={selectedBatch}
      ></Dropdownsmall>
      <ButtonWrapper>
        <ButtonV2
          disabled={issLoading}
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
          ) : (
            'Assign'
          )}
        </ButtonV2>
      </ButtonWrapper>
    </PopUpBox>
  )
}

export default AssignStudentPopUp

export const PopUpBox = styled.div`
  position: relative;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // height: 400px;
  width: 360px;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;
  z-index: 1000;
  margin-top: 10%;
  margin-left: 40%;
`
export const Heading = styled.div`
  color: ${Blue};
  user-select: none;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
export const RemoveIcon = styled(RemoveIconSvg)`
  cursor: pointer;
  height: 20px;
  width: 20px;
`

export const AlignHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0px 15px 0px;
`
export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-self: center;
`
export const SearchInputWrapper = styled.div`
  margin-bottom: 8px;
`
