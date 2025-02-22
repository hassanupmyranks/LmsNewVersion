import { ChangeEvent, useEffect, useState } from 'react'
import { getAllInstituteAPI } from '../../../../helpers/V2/apis'
import { GetInstituteResponse } from '../../../../utils/types'
import { MainWrapper } from './styledComponents'
import InstituteCard from '../../../../components/V2/InstituteCard'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { BranchWrapper } from '../BranchCardList/styledComponents'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'

const InstituteCardList = () => {
  const [list, setList] = useState<GetInstituteResponse[] | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(false)
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getAllInstituteAPI({
      limit: 50,
      page: 1,
      searchKey: searchKey
    })
      .then((response) => {
        setList(response.data)
      })
      .finally(() => setIsLoading(false))
  }, [searchKey])

  const handleDelete = (instituteId: string) => {
    setList((prevList) =>
      prevList ? prevList.filter((item) => item._id !== instituteId) : []
    )
  }

  return (
    <BranchWrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'sticky',
          zIndex: '999',
          marginRight: '18px',
          gap: '15px',
          marginBottom: '15px'
        }}
      >
        <InputSearchV2
          label="Search Institute"
          required
          placeholder="Enter Institute Name"
          style={{ width: '430px', marginTop: '6px' }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (
              event.target.value.length >= 1 ||
              event.target.value.length === 0
            ) {
              setSearchKey(event.target.value)
            }
          }}
        />
      </div>

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
        {list?.map((item, index) => (
          <InstituteCard
            key={index}
            logoImage={item.logo}
            instituteHeading={item.name}
            teacherCount={item.teacherCount}
            branchCount={item.branchCount}
            batchCount={item.batchCount}
            InstituteId={item._id}
            instituteImage={item.instituteImage}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </MainWrapper>
    </BranchWrapper>
  )
}

export default InstituteCardList
