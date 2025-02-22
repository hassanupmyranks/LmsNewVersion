import {
  CardContainer,
  DetailsContainer,
  Heading,
  CourseImage,
  LogoContainer,
  Para,
  // HeartLogoContainer,
  CourseContainer,
  // HeartLogo,
  SubjectLogo1,
  SubjectLogo2,
  SubjectLogoMore,
  Subjects,
  // Button,
  ButtonWrapper,
  SubjectIcons,
  // RedHeartLogo,
  MoreSubjects,
  SubjectsMore
} from './styledComponents'
import NoImage from './../../../assets/noimage.png'
import { ReactElement, useRef, useState } from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { DropdownOption, DropdownPopup } from '../Table/PopupMenu'
import { Flex } from '../styledComponents'
import { DotsIcon } from '../../../pages/v2/assessment/addCourseForm/styledComponents'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete-icon-red.svg'
import { EditDeleteProps } from '../../../utils/types'
import { deleteCourse } from '../../../helpers/V2/apis'
import { CustomToastMessage } from '../ToastMessage'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory } from 'react-router'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
export interface CourseCardParams {
  courselogoImage: string
  courseHeading: string
  courseDate: string | number
  subjectlogoImage1: string
  subjectlogoImage2: string
  subjectsLength: number
  OnButtonClick: (d: any) => void
  OnClickHeart: (value: boolean) => void
  subject1: string
  subject2: string
  subjectsList: [any]
  CourseId: string
}

const CourseCard = ({
  courselogoImage,
  courseHeading,
  courseDate,
  subjectlogoImage1,
  subjectlogoImage2,
  subjectsLength,
  OnButtonClick,
  // OnClickHeart,
  subject1,
  subject2,
  subjectsList,
  CourseId
}: CourseCardParams): ReactElement => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  // const [isHeartRed, setIsHeartRed] = useState(false)
  const [more, setMore] = useState(false)
  // const handleHeartClick = (): void => {
  //   setIsHeartRed((prevIsHeartRed) => !prevIsHeartRed)
  //   OnClickHeart && OnClickHeart(!isHeartRed)
  // }
  const formatDate = (dateString: any) => {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return ''
    }

    const option = {
      day: 'numeric' as const,
      month: 'short' as const,
      year: 'numeric' as const
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', option).format(date)
    return formattedDate
  }

  const [showDropDown, setShowDropDown] = useState(false)
  const closeDropDown = () => {
    setShowDropDown(false)
  }
  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, () => setShowDropDown(false))

  const HandleDelete = (user: EditDeleteProps) => {
    deleteCourse(user.id)
      .then((res) => {
        CustomToastMessage(`${res.data.message}`, 'success')
        OnButtonClick('true')
        history.push({
          pathname: ROUTES_V2.COURSE_CARD_LIST,
          state: { user: user }
        })
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
  }

  const history = useHistory()

  const HandleEdit = (user: EditDeleteProps) => {
    history.push({
      pathname: `${ROUTES_V2.EDIT_COURSE_V2}/${user.id}`
    })
  }
  return (
    <CardContainer>
      <CourseContainer>
        <CourseImage
          src={'/assets/images/course-bg.png'}
          onClick={() => {
            userInfoV2.role === 'instituteAdmin'
              ? ''
              : userInfoV2.role === 'branchAdmin'
              ? ''
              : HandleEdit({ id: CourseId })
          }}
        />
        {/* <HeartLogoContainer onClick={handleHeartClick}>
          {isHeartRed ? (
            <RedHeartLogo src={'/assets/images/red-heart-logo.png'} alt="" />
          ) : (
            <HeartLogo />
          )}
        </HeartLogoContainer> */}
      </CourseContainer>
      <LogoContainer
        src={
          courselogoImage && courselogoImage.startsWith('https')
            ? courselogoImage
            : NoImage
        }
        alt="img"
      />
      <DetailsContainer>
        <div>
          <Heading>{courseHeading}</Heading>
          <Para>{formatDate(courseDate)}</Para>
        </div>
        <SubjectIcons>
          {subjectlogoImage1 && (
            <SubjectLogo1 src={subjectlogoImage1} alt="img" />
          )}
          {subjectlogoImage2 && (
            <SubjectLogo2 src={subjectlogoImage2} alt="img" />
          )}
          {subjectsLength >= 1 ? (
            <SubjectLogoMore>+{subjectsLength}</SubjectLogoMore>
          ) : (
            ''
          )}
        </SubjectIcons>
      </DetailsContainer>
      <ButtonWrapper>
        <Flex>
          <Subjects>{subject1 && subject1}</Subjects>
          <Subjects>{subject2 && ','}</Subjects>
          <Subjects>{subject2 && subject2}</Subjects>
          {subjectsLength >= 1 ? (
            <Subjects
              style={{ cursor: 'pointer' }}
              onMouseOver={() => {
                setMore(true)
              }}
              onMouseLeave={() => {
                setMore(false)
              }}
            >
              +{subjectsLength}more
            </Subjects>
          ) : (
            ''
          )}
          {more && (
            <MoreSubjects>
              {subjectsList.slice(2).map((item, index) => (
                <div key={index}>
                  <SubjectsMore>
                    {item.subjectName}
                    {index !== subjectsLength - 1 ? ',' : ''}
                  </SubjectsMore>
                </div>
              ))}
            </MoreSubjects>
          )}
          {/* <Button onClick={OnButtonClick}>Create Pattern</Button> */}
        </Flex>
        {userInfoV2.role === 'superAdmin' && (
          <div
            style={{ cursor: 'pointer' }}
            role="presentation"
            onClick={() => {
              setShowDropDown(
                userInfoV2.role == 'instituteAdmin'
                  ? false
                  : userInfoV2.role == 'branchAdmin'
                  ? false
                  : true
              )
            }}
          >
            <DotsIcon />
          </div>
        )}
        {showDropDown && (
          <DropdownPopup style={{ right: '-14px' }} ref={popupRef}>
            <DropdownOption selected={'Edit'}>
              <Flex
                gap="6px"
                onClick={() => {
                  HandleEdit({ id: CourseId })
                  closeDropDown()
                }}
              >
                <EditIcon />
                Edit
              </Flex>
            </DropdownOption>
            <DropdownOption selected={'Delete'}>
              <Flex
                gap="6px"
                onClick={() => {
                  HandleDelete({ id: CourseId })
                  closeDropDown()
                }}
              >
                <DeleteIcon />
                Delete
              </Flex>
            </DropdownOption>
          </DropdownPopup>
        )}
      </ButtonWrapper>
    </CardContainer>
  )
}

export default CourseCard
