import { SideMenuItemDetails } from '../../utils/types'
import { SideMenuItems } from '../../const/V2/sideMenuItems'

/* eslint-disable no-unused-vars */
export enum ROLE {
  STUDENT = 'student',
  ADMIN = 'superAdmin',
  INSTITUTE_ADMIN = 'institudeAdmin',
  BRANCH_ADMIN = 'BRANCH',
  TEACHER_ADMIN = 'TEACHER',
  STAFF_ADMIN = 'STAFF',
  INSTITUTEV2_ADMIN = 'instituteAdmin',
  BRANCH_ADMINV2 = 'branchAdmin'
}

const determineMenu = (role: string): Array<SideMenuItemDetails> => {
  const {
    student,
    admin,
    institudeAdmin,
    teacherAdmin,
    branchAdmin,
    instituteAdmin
  } = SideMenuItems

  switch (role) {
    case ROLE.STUDENT:
      return student as Array<SideMenuItemDetails>
    case ROLE.BRANCH_ADMIN:
      return branchAdmin as Array<SideMenuItemDetails>
    case 'PARENT':
      return student as Array<SideMenuItemDetails>
    case ROLE.INSTITUTE_ADMIN:
      return institudeAdmin as Array<SideMenuItemDetails>
    case ROLE.INSTITUTEV2_ADMIN:
      return instituteAdmin as Array<SideMenuItemDetails>
    case ROLE.TEACHER_ADMIN:
      return teacherAdmin as Array<SideMenuItemDetails>
    default:
      return admin as Array<SideMenuItemDetails>
  }
}

export default determineMenu

// export const determineDpsMenu = (role: string): Array<Menu> => {
//   const { dpsstudent } = dpsmenus

//   switch (role) {
//     case ROLE.STUDENT:
//       return dpsstudent as Array<Menu>
//     default:
//       return dpsstudent as Array<Menu>
//   }
// }
