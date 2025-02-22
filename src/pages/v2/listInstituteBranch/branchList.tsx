import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

import { ReactComponent as DownArrow } from '../../../assets/svg/darkblue-down-arrow.svg'

import styled from 'styled-components'

import BasicTable from '../../../components/V2/Table/BasicTable'

import { Flex, PageContainer } from '../../../components/V2/styledComponents'
import { Spinner } from 'react-bootstrap'
import { GetNewAllBranchResponce } from '../../../utils/types'

import { BlueButton } from '../../../const/V2/stylingVariables'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'

import { DeleteBranch, getBranchAPI } from '../../../helpers/V2/apis'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useHistory } from 'react-router-dom'
import PopupMenu from '../../../components/V2/Table/PopupMenu'
import ROUTES_V2 from '../../../const/V2/routes'
import WarningPopUp from '../../../components/V2/PopUp/WarningPopup'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'

const InstituteBranchList = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [tableData, setTableData] = useState<GetNewAllBranchResponce[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const [isWarning, setIsWarning] = useState(false)
  const [branchId, setBranchId] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getBranchAPI({
      page: page + 1,
      limit,
      instituteId: userInfoV2.instituteId
    })
      .then((res) => {
        if (res) {
          setTableData(res.data)
        }
        if (res.total) {
          setEntries(res.total)
        }
      })
      .catch((error) => console.log({ error }))
      .finally(() => setIsLoading(false))
  }, [page, limit, userInfoV2.instituteId])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  useEffect(() => {}, [sorting])

  const handleDelete = (branchID: string) => {
    setIsLoading(true)
    DeleteBranch(branchID)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          setIsWarning(false)

          getBranchAPI({
            page: page + 1,
            limit,
            instituteId: userInfoV2.instituteId
          })
            .then((res) => {
              if (res) {
                setTableData(res.data)
              }
              if (res.total) {
                setEntries(res.total)
              }
            })
            .catch((error) => CustomToastMessage(error.message, 'error'))
            .finally(() => setIsLoading(false))
        }
      })
      .catch((error) => {
        CustomToastMessage(error.response.data.message, 'error')
      })
      .finally(() => setIsLoading(false))
  }

  const editCellOption = useMemo(
    () => [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (id: any) => {
          history.push(`${ROUTES_V2.EDIT_INSTITUTE}/?${id}`)
        }
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (id: any) => {
          setBranchId(id)
          setIsWarning(id)
        }
      }
    ],
    [history]
  )

  const columnHelper = createColumnHelper<GetNewAllBranchResponce>()
  const columns: ColumnDef<GetNewAllBranchResponce, any>[] = [
    columnHelper.accessor('name', {
      size: 200,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            <P>Branch Name</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">
            <p>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('address', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '90px' }}>
            <P>Address</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('mobile', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '110px' }}>
            <P>Phone Number</P>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('username', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '110px' }}>
            <P>User Name</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('batchCount', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '100px' }}>
            <P> Number of Batches / Sections</P>
            <DownArrow />
          </Flex>
        )
      }
    }),

    columnHelper.accessor('isActive', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '80px' }}>
            <P>Status</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        if (props.getValue() == true) {
          return (
            <ShowStatus
              bgColor="
              rgba(1, 181, 116, 0.2)"
              color="
              rgba(1, 181, 116, 1)"
            >
              Active
            </ShowStatus>
          )
        } else {
          return (
            <ShowStatus
              bgColor="
                rgba(231, 29, 54, 0.2)"
              color="
                rgba(231, 29, 54, 1)"
            >
              Inactive
            </ShowStatus>
          )
        }
      }
    }),
    columnHelper.accessor('_id', {
      size: 60,
      header: '',
      cell: (props) => (
        <>
          <PopupMenu id={props.getValue()} options={editCellOption} />
        </>
      )
    })
  ]

  return (
    <PageContainer>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          isLoading={isLoading}
          onDelete={() => handleDelete(branchId)}
          text="Are you sure you want to delete this branch?"
        />
      )}

      <TableWrapper>
        {isLoading && (
          <Spinner
            style={{
              width: '44px',
              height: '44px',
              color: `${BlueButton}`,
              position: 'absolute',
              top: '50%',
              left: '45%'
            }}
            animation={'border'}
          />
        )}
        <BasicTable
          {...{
            tableData,
            columns,
            sorting,
            setSorting,
            setPage,
            setLimit,
            entries,
            limit,
            page
          }}
        />
      </TableWrapper>
    </PageContainer>
  )
}

export default InstituteBranchList

const P = styled.p`
  cursor: pointer;
`

const TableWrapper = styled.div`
  height: 100%;
  overflow-y: auto;

  & thead {
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
  }
`
const ShowStatus = styled.p<{
  bgColor: string
  color: string
}>`
  color: ${({ color }) => color};
  font-family: Nunito;
  width: 70px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.28px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 10px;
`

// const IconView = styled.div`
//   border-radius: 50%;
//   width: auto;
//   overflow: hidden;
// `
