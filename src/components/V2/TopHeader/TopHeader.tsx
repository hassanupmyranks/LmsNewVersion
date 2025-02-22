import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import Header from '../Header/Header'
import TabMenu from '../TabMenu/TabMenu'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { updateTopHeader } from '../../../redux/topHeader/actions'
import { topHeaderValues } from '../../../const/V2/topHeaderConsts'
import { getHeaderTabsDataAPI } from '../../../helpers/V2/apis'
import { capitalizeFirstLetter } from '../../../helpers/V2/capitalizeFirstLetter'
import { PRODUCT_TYPE } from '../../../utils/env'
// import ROUTES_V2 from '../../../const/V2/routes'

export const HeaderContainer = styled.div<{
  role?: string
}>`
  position: sticky;
  top: 0;
  z-index: 5;
  background: ${({ role }) => (role === 'student' ? `#fff` : `#f4f7fe`)};

  display: flex;
  flex-direction: column;
  gap: 5px;
`

const TopHeader = ({ toggleSidebar }: any) => {
  const { pathname } = useLocation()

  const [
    { btnText, backbBtn, btnText2, btnUrl, btnUrl2, mainTitle, tabs },
    role,
    firstName
  ]: any = useSelector((state: RootState) => [
    state.topHeader,
    state.userV2.userInfoV2.role,
    state.userV2.userInfoV2.firstName
  ])
  const dispatch = useDispatch()

  useEffect(() => {
    const ArrayPath = pathname.split('/')
    const newPathName = ArrayPath.some((item) => item === 'edit')
      ? `${pathname.substring(0, pathname.indexOf('edit') + 4)}`
      : ArrayPath.some((item) => item === 'view')
      ? `${pathname.substring(0, pathname.indexOf('view') + 4)}`
      : ArrayPath.some((item) => item === 'review-assignment-student')
      ? `${pathname.substring(
          0,
          pathname.indexOf('review-assignment-student') + 25
        )}`
      : ''
    const newHeaderData = {
      ...topHeaderValues[
        (PRODUCT_TYPE === 'ERP' ? role?.toLowerCase() : role) || 'superAdmin'
      ][
        ArrayPath.some((item) => item === 'edit') ||
        ArrayPath.some((item) => item === 'view') ||
        ArrayPath.some((item) => item === 'review-assignment-student')
          ? newPathName
          : pathname
      ]
    }
    if (
      Object.keys(newHeaderData).length > 0 &&
      newHeaderData.tabs.length > 0
    ) {
      let newTabs = newHeaderData.tabs
      const newTabsData: string[] = newTabs?.map((item: any) => {
        return item?.label === 'Institutes / Schools'
          ? 'institutes'
          : item.label === 'Ongoing & Finished Assessment'
          ? 'tests-submitted'
          : item.label === 'Pattern/Template'
          ? 'patterns'
          : item.label === 'Grade'
          ? 'grades'
          : item.label === 'Batch/Section'
          ? 'batches'
          : item.label === 'All Assessment'
          ? 'tests'
          : item.label === 'Assigned Assessment'
          ? 'assigned-tests'
          : item.label === 'Branches'
          ? 'branches'
          : item.label === 'Un-Assigned Assessment'
          ? 'unassigned-tests'
          : item.label === 'My Custom Assesment'
          ? 'my-custom-test'
          : item.label === 'Assesment By Admin'
          ? 'test-by-admin'
          : item?.label?.split(' ').join('-').toLowerCase()
      })

      getHeaderTabsDataAPI({ tabs: newTabsData })
        .then((res) => {
          if (res) {
            const newData = newTabs?.map((item: any) => {
              const matchingNewItem = res?.find(
                (newItem: any) =>
                  (item?.label === 'Institutes / Schools'
                    ? 'Institutes'
                    : item.label === 'Ongoing & Finished Assessment'
                    ? 'Tests Submitted'
                    : item.label === 'Pattern/Template'
                    ? 'Patterns'
                    : item.label === 'Grade'
                    ? 'Grades'
                    : item.label === 'Batch/Section'
                    ? 'Batches'
                    : item.label === 'All Assessment'
                    ? 'Tests'
                    : item.label === 'Assigned Assessment'
                    ? 'Assigned Tests'
                    : item.label === 'Branches'
                    ? 'Branches'
                    : item.label === 'Un-Assigned Assessment'
                    ? 'Unassigned Tests'
                    : item.label === 'My Custom Assesment'
                    ? 'My Custom Test'
                    : item.label === 'Assesment By Admin'
                    ? 'Test By Admin'
                    : item?.label) ===
                  capitalizeFirstLetter(
                    newItem?.collectionName.split('-').join(' ')
                  )
              )

              if (matchingNewItem) {
                const newObj = {
                  ...item,
                  value: Number(matchingNewItem?.count)
                }
                return newObj
              }

              // If no matching item is found, return the original item
              return item
            })
            newHeaderData.tabs = newData
            dispatch(updateTopHeader(newHeaderData))
          }
        })
        .catch((error) => console.log({ error }))
    } else {
      const headerObj = {
        backbBtn: newHeaderData?.backbBtn,
        btnText: newHeaderData?.btnText,
        btnUrl: newHeaderData?.btnUrl,
        btnText2: newHeaderData?.btnText2,
        btnUrl2: newHeaderData?.btnUrl2,
        mainTitle:
          `${newHeaderData?.mainTitle ? newHeaderData?.mainTitle : ''}${
            role == 'student'
              ? // && pathname === ROUTES_V2.STUDENTS_DASHBOARD
                ` Greetings!`
              : ''
          }` || '',
        topTitle: newHeaderData?.topTitle || '',
        tabs: []
      }
      dispatch(updateTopHeader(headerObj))
    }
  }, [
    dispatch,
    pathname,
    role,
    firstName,
    backbBtn,
    btnText,
    btnUrl,
    btnText2,
    btnUrl2
  ])
  return (
    <HeaderContainer role={role} className="top-header">
      <Header
        mainTitle={mainTitle}
        backbBtn={backbBtn}
        btnText={btnText}
        btnText2={btnText2}
        btnUrl={btnUrl}
        btnUrl2={btnUrl2}
        toggleSidebar={toggleSidebar}
      />
      {tabs && <TabMenu tabs={tabs} />}
    </HeaderContainer>
  )
}

export default TopHeader
