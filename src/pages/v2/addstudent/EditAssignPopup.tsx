import styled from 'styled-components'
import { Blue, BlueButton } from '../../../const/V2/stylingVariables'
import { ReactComponent as RemoveIconSvg } from '../../../assets/svg/close-page.svg'

import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  getAllInstituteAPI,
  getAllBranchAPI,
  getBatchAPI
} from '../../../helpers/V2/apis'
import { RootState } from '../../../redux/store'

import {
  GetSingleStudentV2,
  UpdateStudentV2
} from '../../../redux/addStudentV2/api'
import { DropdownOptionData } from '../../../components/V2/Form/types'
import { ButtonV2 } from '../../../components/V2/styledComponents'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'

const EditAssignStudentPopUp = ({
  setpopup,
  id
}: {
  setpopup: (d: boolean) => void
  id: any
}) => {
  const { users } = useSelector(
    (state: RootState) => ({
      users: state.userV2.userInfoV2
    }),

    shallowEqual
  )
  const dispatch = useDispatch()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [selectedinstitute, setSelectedInstitute] = useState<
    DropdownOptionData<string> | any
  >()
  const [selectedBranch, setselectedBranch] = useState<
    DropdownOptionData<string> | any
  >()
  const [selectedBatch, setselectedBatch] = useState<
    DropdownOptionData<string> | any
  >()
  const [instituteError, setInstituteError] = useState<string>('')
  const [branchError, setBranchError] = useState<string>('')
  const [batchError, setBatchError] = useState<string>('')

  const [isLoading, setIsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState([])
  const [branchLoading, setBranchLoading] = useState(false)
  const [branchData, setBranchData] = useState([])
  const [batchLoading, setBatchLoading] = useState(false)
  const [batchData, setBatchData] = useState([])

  useEffect(() => {
    if (users.role == 'instituteAdmin') {
      setSelectedInstitute({
        id: 1,
        label: users.instituteName,
        value: users.instituteId
      })

      setBranchLoading(true)
      getAllBranchAPI({ page: 1, limit: 150 })
        .then((res) => {
          const branches = res.data.map((item: any) => ({
            id: item._id,
            label: item.name,
            value: item._id
          }))
          setBranchData(branches)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setBranchLoading(false))
    }

    if (users.role == 'branchAdmin') {
      setSelectedInstitute({
        id: 1,
        label: users.instituteName,
        value: users.instituteName
      })
      setselectedBranch({
        id: 1,
        label: users.branchName,
        value: users.branchId
      })

      setBatchLoading(true)
      getBatchAPI({ page: 1, limit: 150 })
        .then((res) => {
          const batches = res.data.map((item: any) => ({
            id: item._id,
            label: item.name,
            value: item._id
          }))
          setBatchData(batches)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setBatchLoading(false))
    }
    if (users.role === 'superAdmin') {
      setIsLoading(true)
      getAllInstituteAPI({ page: 1, limit: 150 })
        .then((res) => {
          const institutes = res.data.map((item: any) => ({
            id: item._id,
            label: item.name,
            value: item._id
          }))
          setInstituteData(institutes)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }, [dispatch, users, users.role])

  const handleSubmit = () => {
    if (!selectedinstitute) {
      setInstituteError('Please select an institute / School')
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

    formData.append('instituteId', selectedinstitute?.id?.toString() || '')
    formData.append('branchId', selectedBranch?.id?.toString() || '')
    formData.append('batchId', selectedBatch?.id?.toString() || '')
    setIsSubmitLoading(true)
    UpdateStudentV2(formData, id)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
        }
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
      .finally(() => {
        setpopup(false)
        setIsSubmitLoading(false)
      })
  }
  useEffect(() => {
    GetSingleStudentV2(id)
      .then((res) => {
        setSelectedInstitute({
          id: res.data.instituteId,
          label: res.data.instituteName,
          value: res.data.instituteName
        })
        setselectedBranch({
          id: res.data.branchId,
          label: res.data.branchName,
          value: res.data.branchName
        })
        setselectedBatch({
          id: res.data.batchId,
          label: res.data.batchName,
          value: res.data.batchName
        })
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }, [id])

  return (
    <PopUpBox>
      <AlignHeading>
        <div></div>
        <Heading> Edit Assign Student</Heading>
        <RemoveIcon onClick={() => setpopup(false)} />
      </AlignHeading>
      {users.role === 'superAdmin' && (
        <SearchableDropdown
          isLoader={isLoading}
          isClear={selectedinstitute?.id ? true : false}
          error={instituteError}
          style={{ width: '100%' }}
          label={'Select Institute / School'}
          required
          placeHolder={'Select Institute / School'}
          options={instituteData}
          onSelect={(option) => {
            setSelectedInstitute(option)
            setselectedBranch({ id: '', label: '' })
            setselectedBatch({ id: '', label: '' })
            setBatchData([])
            setBranchData([])
            setInstituteError('')
            if (option?.id) {
              setBranchLoading(true)
              getAllBranchAPI({ page: 1, limit: 150, instituteId: option?.id })
                .then((res) => {
                  const branches = res.data.map((item: any) => ({
                    id: item._id,
                    label: item.name,
                    value: item._id
                  }))
                  setBranchData(branches)
                })
                .catch((error) => CustomToastMessage(error.message, 'error'))
                .finally(() => setBranchLoading(false))
            }
          }}
          selectedValue={selectedinstitute}
        ></SearchableDropdown>
      )}
      {users.role !== 'branchAdmin' && (
        <SearchableDropdown
          isLoader={branchLoading}
          isClear={selectedBranch?.id ? true : false}
          error={branchError}
          style={{ width: '100%' }}
          label={'Select Branch'}
          required
          placeHolder={'Select Branch'}
          options={branchData}
          onSelect={(option) => {
            setselectedBranch(option)
            setBranchError('')
            setselectedBatch({ id: '', label: '' })
            setBatchLoading(true)
            setBatchData([])
            if (option?.id) {
              setBatchLoading(true)
              getBatchAPI({
                page: 1,
                limit: 150,
                branchIds: [String(option?.id)]
              })
                .then((res) => {
                  const batches = res.data.map((item: any) => ({
                    id: item._id,
                    label: item.name,
                    value: item._id
                  }))
                  setBatchData(batches)
                })
                .catch((error) => CustomToastMessage(error.message, 'error'))
                .finally(() => setBatchLoading(false))
            }
          }}
          selectedValue={selectedBranch}
        ></SearchableDropdown>
      )}
      <SearchableDropdown
        isLoader={batchLoading}
        error={batchError}
        isClear={selectedBatch?.id ? true : false}
        style={{ width: '100%' }}
        label={'Select Batch / Section'}
        required
        placeHolder={'Select Batch / Section'}
        options={batchData}
        onSelect={(option) => {
          setselectedBatch(option)
          setBatchError('')
        }}
        selectedValue={selectedBatch}
      ></SearchableDropdown>
      <ButtonWrapper>
        <ButtonV2
          disabled={isSubmitLoading}
          onClick={() => {
            handleSubmit()
          }}
        >
          {isSubmitLoading && (
            <Spinner
              style={{
                width: '14px',
                height: '14px',
                color: `${BlueButton}`
              }}
              animation={'border'}
            />
          )}{' '}
          Assign
        </ButtonV2>
      </ButtonWrapper>
    </PopUpBox>
  )
}

export default EditAssignStudentPopUp

export const PopUpBox = styled.div`
  position: relative;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // height: 400px;
  width: 560px;
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
