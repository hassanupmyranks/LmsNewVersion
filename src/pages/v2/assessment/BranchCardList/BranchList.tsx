import { ChangeEvent, useEffect, useState } from 'react'
import { GetBranchResponse } from '../../../../utils/types'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { BranchWrapper, FilterContainer, MainWrapper } from './styledComponents'
import BranchCard from '../../../../components/V2/Form/BranchCard/BranchCard'
import {
  getAllBranchAPI,
  getAllInstituteAPI
} from '../../../../helpers/V2/apis'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { Flex } from '../../dashboard/SuperAdminDashoard/styledComponents'
import { PageTitle } from '../../../../components/V2/Header/styledComponents'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'

const BranchCardList = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [list, setList] = useState<GetBranchResponse[] | undefined>([])
  const [isLoading, setIsLoading] = useState(false)
  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [selectedInstitute, setSelectedInstitute] = useState<any>()

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (userInfoV2.role !== 'branchAdmin') {
      if (selectedInstitute?.id || userInfoV2.instituteId) {
        setIsLoading(true)
        getAllBranchAPI({
          limit: 200,
          page: 1,
          searchKey: searchKey,
          instituteId: selectedInstitute?.id || userInfoV2.instituteId
        })
          .then((response) => {
            setList(response.data)
          })
          .finally(() => setIsLoading(false))
      }
    }
  }, [selectedInstitute?.id, userInfoV2, searchKey])

  const handleDelete = (branchId: string) => {
    setList((prevList) =>
      prevList ? prevList.filter((item) => item._id !== branchId) : []
    )
  }

  const [resWidth, setResWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setResWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <BranchWrapper>
      <FilterContainer>
        {userInfoV2.role === 'superAdmin' && (
          <SearchableDropdown
            style={{ width: '290px', marginTop: '6px' }}
            isLoader={insLoading}
            label={'Select Institute / School'}
            placeHolder={'Please Select Institute / School'}
            options={instituteData}
            isClear={!!selectedInstitute?.id}
            onSelect={(option) => {
              setList([])
              setIsLoading(false)
              setSelectedInstitute(option)
            }}
            selectedValue={selectedInstitute}
          />
        )}
        <InputSearchV2
          label="Search Branch"
          required
          placeholder="Enter Branch Name"
          style={{ width: resWidth >= 768 ? '430px' : '100%', margin: '6px' }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (
              event.target.value.length >= 1 ||
              event.target.value.length === 0
            ) {
              setSearchKey(event.target.value)
            }
          }}
        />
      </FilterContainer>

      <MainWrapper>
        {isLoading && (
          <Spinner
            style={{
              color: `${BlueButton}`,
              position: 'absolute',
              top: '50%',
              left: '50%'
            }}
            animation={'border'}
          />
        )}
        {(selectedInstitute?.id || userInfoV2.instituteId) &&
        list &&
        list.length > 0 ? (
          list?.map((item, index) => (
            <BranchCard
              key={index}
              logoImage={item.logo}
              branchHeading={item.name}
              teacherCount={item.teacherCount}
              batchCount={item.batchCount}
              BranchId={item._id}
              branchImage={item.branchImage}
              onDelete={() => handleDelete(item._id)}
            />
          ))
        ) : (
          <Flex
            style={{
              height: '80%',
              position: 'absolute',
              width: '90%',
              // top: '20%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <PageTitle style={{ margin: '0px' }}>
              {selectedInstitute?.id && !isLoading
                ? 'No Branches Available'
                : isLoading
                ? ''
                : 'Select an Institute to view Branches'}
            </PageTitle>
          </Flex>
        )}
      </MainWrapper>
    </BranchWrapper>
  )
}

export default BranchCardList
