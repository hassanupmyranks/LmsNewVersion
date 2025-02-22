import { PageTitle } from '../../components/V2/Header/styledComponents'
import { Flex } from '../../components/V2/styledComponents'
import { MenuBar } from './dashboard/SuperAdminDashoard/styledComponents'

const NoModuleFoundPage = () => {
  return (
    <MenuBar>
      <Flex
        style={{
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PageTitle>
          Modules not assigned. Please contact the administrator for further
          details
        </PageTitle>
      </Flex>
    </MenuBar>
  )
}

export default NoModuleFoundPage
