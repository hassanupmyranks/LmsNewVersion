import PopupMenu from '../../../../../components/V2/Table/PopupMenu'
import {
  Flex
  // Grid,
  // GridItem
} from '../../../../../components/V2/styledComponents'
import {
  BlueButton,
  SecondaryGray600
} from '../../../../../const/V2/stylingVariables'
import { Container, OptionalText, P } from './styledComponents'
import { ReactComponent as EditIcon } from '../../../../../assets/svg/edit-grey-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/Delete.svg'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { useEffect, useRef, useState } from 'react'
import {
  DeleteBatch,
  getNewAllBatch,
  getAllBranchAPI
} from '../../../../../helpers/V2/apis'
import { ListBatchProps } from './types'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'
import { EmptyContainer } from '../batchForm'
import { ReactComponent as AddTeacherIcon } from '../../../../../assets/svg/add-teacher.svg'
import { DropdownOptionData } from '../../../../../components/V2/Form/types'
import { BranchDetails, NewBranchDetails } from '../../../../../utils/types'
import MultiselectDropdown from '../../../learn/components/MultiselectDropdown'
import { getDropDownOptions } from '../../../../../helpers/V2/dropdown'
const Teachers = ({ setBatchEdit, CreatedInstituteId }: ListBatchProps) => {
  const dispatch = useDispatch()
  const { user, batchList, batchLoading } = useSelector(
    (state: RootState) => ({
      batchList: state.institutebatch.data,
      batchLoading: state.institutebatch.loading,
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )

  const [branchTotal, setBranchTotal] = useState(0)
  const [branchData, setBranchData] = useState<any[]>([])
  const [branchLoading, setBranchLoading] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<
    DropdownOptionData<BranchDetails>[]
  >([])
  const [branchListPage, setBranchListPage] = useState(1)

  const flexOutsideRef = useRef<HTMLDivElement>(null)
  const flexInsideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (CreatedInstituteId !== '' && user.role !== 'branchAdmin') {
      dispatch(
        getNewAllBatch({
          page: 1,
          limit: 100,
          instituteId: CreatedInstituteId
        })
      )
      const payload = {
        page: 1,
        limit: 150,
        instituteId: CreatedInstituteId
      }
      getAllBranchAPI(payload)
        .then((res: any) => {
          setBranchTotal(res.total)
          const newInstitute = res?.data?.map((item: NewBranchDetails) => {
            return {
              id: item._id,
              label: item.name
            }
          })
          setBranchData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
  }, [dispatch, CreatedInstituteId, user.role])

  const handleInfiniteScroll = (total: number, length: number) => {
    if (total > length) {
      setBranchListPage(branchListPage + 1)
      setBranchLoading(true)
      const payload = {
        page: branchListPage + 1,
        limit: 50
      }
      getAllBranchAPI(payload)
        .then((res: any) => {
          const newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setBranchData((prev) => [...prev, ...newInstitute])
        })
        .catch((err: any) => console.log(err))
        .finally(() => setBranchLoading(false))
    }
  }

  return (
    <Container style={{ paddingRight: '0px', paddingLeft: '0px' }}>
      <P fontSize={20} style={{ paddingBottom: '10px', marginLeft: '20px' }}>
        Newely Added Batches / Sections
      </P>
      <Flex style={{ marginLeft: '20px' }}>
        {(user.role === 'superAdmin' || user.role === 'instituteAdmin') && (
          <MultiselectDropdown
            style={{ width: '290px' }}
            selectedValue={selectedBranch}
            isLoading={branchLoading}
            handleInfiniteScroll={(first: any, second: any) => {
              handleInfiniteScroll(first, second)
            }}
            total={branchTotal}
            length={branchData.length}
            label={'Select Branch (Select multiple)'}
            placeholder="Please Select Branch"
            options={getDropDownOptions(branchData, 'id', 'label')}
            isClear={selectedBranch?.length > 0}
            onSelect={(option: any) => {
              setSelectedBranch(option)
              console.log(
                option.map((list: any) => list.id),
                'option'
              )
              dispatch(
                getNewAllBatch({
                  page: 1,
                  limit: 100,
                  branchIds: option.map((list: any) => list.id),
                  instituteId: CreatedInstituteId
                })
              )
            }}
          />
        )}
      </Flex>
      {batchLoading ? (
        <Spinner
          style={{
            width: '44px',
            height: '44px',
            color: `${BlueButton}`,
            position: 'absolute',
            left: '85%'
          }}
          animation={'border'}
        />
      ) : !batchList.length ? (
        <EmptyContainer
          icon={<AddTeacherIcon />}
          text={
            'No Batches / Sections Added yet! Create Batches / Sections for this Branch'
          }
        />
      ) : (
        <Flex
          direction="column"
          gap="20px"
          style={{
            height: '372px',
            overflowY: 'auto',
            padding: '12px'
          }}
          ref={flexOutsideRef}
        >
          {batchList.map((data, index) => {
            return (
              <Flex
                justifyContent="space-between"
                style={{
                  borderRadius: '16px',
                  padding: '12px 8px',
                  boxShadow: '0px 18px 40px 0px rgba(112, 144, 176, 0.12)',
                  width: '100%'
                }}
                key={`teacher_${index}`}
                ref={flexInsideRef}
              >
                {/* <Grid columns={5} gap="8px">
                  <GridItem columnSpan={4}> */}
                <div>
                  <P fontSize={14} style={{ lineHeight: '1' }}>
                    {data.name}
                  </P>
                  <OptionalText
                    fontSize={13}
                    style={{
                      fontWeight: '500',
                      lineHeight: '10px'
                    }}
                  >
                    {data.instituteName}-{data.branchName}
                  </OptionalText>
                </div>
                {/* </GridItem>
                </Grid> */}

                <PopupMenu
                  options={[
                    {
                      Icon: <EditIcon />,
                      label: 'Edit',
                      onClick: () => {
                        setBatchEdit(data._id)
                      }
                    },
                    {
                      Icon: <DeleteIcon />,
                      label: 'Delete',
                      onClick: () => {
                        DeleteBatch(data._id)
                          .then((res) => {
                            if (res) {
                              CustomToastMessage(res.message, 'success')
                              dispatch(
                                getNewAllBatch({
                                  page: 1,
                                  limit: 100,
                                  instituteId: CreatedInstituteId
                                })
                              )
                            }
                          })
                          .catch((error) => {
                            CustomToastMessage(
                              error.response.data.message,
                              'error'
                            )
                          })
                      }
                    }
                  ]}
                  rotate="90deg"
                  fill={SecondaryGray600}
                />
              </Flex>
            )
          })}
        </Flex>
      )}
    </Container>
  )
}

export default Teachers
