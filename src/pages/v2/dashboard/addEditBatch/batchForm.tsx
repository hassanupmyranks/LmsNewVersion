import styled from 'styled-components'
import {
  Flex,
  // Grid,
  // GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
import { Blue, SecondaryGray600 } from '../../../../const/V2/stylingVariables'

import { ReactComponent as AddBatchIcon } from '../../../../assets/svg/add-batch.svg'

import { useEffect, useState } from 'react'
import AddBatch from './components/AddBatch'
// import Teachers from './components/Teachers'
import { useParams } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { ContainerImg } from './components/styledComponents'

const BatchForm = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const Show = false

  let { id }: any = useParams()

  const [CreatedInstitute] = useState({
    _id: '',
    name: ''
  })
  const [teacherName, setTeacherName] = useState<string>('')
  const [, setEditBranchId] = useState('')
  const [batchEdit, setBatchEdit] = useState('')

  useEffect(() => {
    if (id) {
      setBatchEdit(id)
    }
  }, [id])

  useEffect(() => {
    if (userInfoV2.role === 'branchAdmin') {
      setEditBranchId(userInfoV2.branchId)
    }
  }, [userInfoV2.branchId, userInfoV2.role])

  return (
    <PageContainer style={{ overflowY: 'auto' }}>
      {Show ? (
        <EmptyContainer
          title={'asdsd'}
          optionalText={'(Add Batches / Sections and Teachers)'}
          icon={<AddBatchIcon />}
          text={
            'No Teachers yet! Create branch and add teachers for this institute / school'
          }
        />
      ) : (
        <AddBatch
          {...{
            CreatedInstituteId: CreatedInstitute._id,
            setBatchEdit,
            teacherName,
            setTeacherName,
            batchEdit
          }}
        />
      )}
    </PageContainer>
  )
}

export default BatchForm

const P = styled.p<{
  fontSize?: number
}>`
  color: ${Blue};
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.48px;
  font-size: ${({ fontSize }) => fontSize ?? 18}px;
`

const OptionalText = styled.span<{
  fontSize?: number
}>`
  color: ${SecondaryGray600};
  font-size: ${({ fontSize }) => fontSize ?? 18}px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.38px;
`

export const EmptyContainer = ({
  title,
  optionalText,
  icon,
  text
}: {
  title?: string
  optionalText?: string
  icon: JSX.Element
  text: string
}) => {
  return (
    <ContainerImg style={{ padding: '20px 20px 60px' }}>
      <P fontSize={20} style={{ paddingBottom: '16px', minHeight: '64px' }}>
        {title}
        <OptionalText>{optionalText}</OptionalText>
      </P>
      <Flex direction="column" gap="20px">
        {icon}
        <P style={{ textAlign: 'center' }}>{text}</P>
      </Flex>
    </ContainerImg>
  )
}
