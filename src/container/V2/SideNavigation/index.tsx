import { useSelector } from 'react-redux'
import SideMenu from '../../../components/V2/SideMenu/SideMenu'
import { RootState } from '../../../redux/store'
import StudentSideBar from '../../../components/V2/SideMenu/StudentSideMenu'

const SideNavigation = ({ isOpen, toggleSidebar }: any) => {
  const role = useSelector((state: RootState) =>
    state.userV2.userInfoV2.role.toLowerCase()
  )
  if (role === 'student') {
    return <StudentSideBar toggleSidebar={toggleSidebar} />
  } else {
    return <SideMenu isOpen={isOpen} toggleSidebar={toggleSidebar} />
  }
}

export default SideNavigation
