import styled from 'styled-components'
import {
  Flex,
  Grid,
  GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
import { Blue, SecondaryGray600 } from '../../../../const/V2/stylingVariables'
import { useEffect, useState } from 'react'
import InstituteLogo from './addInstituteForm/InstituteLogo'
import InstituteInformation from './addInstituteForm/InstituteInformation'

import {
  AddInstituteV2,
  EditInstitute,
  getAllBoardsAPI,
  GetSingleInstitute
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useHistory, useParams } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { DataItem } from './addInstituteForm/types'
import { RootState } from '../../../../redux/store'
import { ContainerImg } from './addInstituteForm/styledComponents'
import { DropdownOptionData } from '../../assignment/Review/ReviewAssignment/Types'
import { CourseInstitute } from '../../../../utils/types'
import ROUTES_V2 from '../../../../const/V2/routes'

const AddInstituteForm = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  let { id }: any = useParams()
  const history = useHistory()

  const [instituteName, setInstituteName] = useState<string>('')
  const [contactName, setContactName] = useState<string>('')
  const [contactNumber, setContactNumber] = useState<number>(null!)
  const [instituteUserName, setInstituteUserName] = useState<string>('')
  const [institutePassword, setInstitutePassword] = useState<string>('')
  const [instituteLocation, setInstituteLocation] = useState<string>('')
  const [hasPrepMaterial, setHasPrepMaterial] = useState<boolean>(false)

  const [, setBranchStudentLimit] = useState<number>(0)

  const [instituteSelectedCourse, setinstituteSelectedCourse] = useState<
    string[]
  >([])

  // const [instituteSelectedBoard, setinstituteSelectedBoard] = useState<
  //   string[]
  // >([])

  const [, setCreatedInstitute] = useState({
    _id: '',
    name: ''
  })

  const [image, setImage] = useState<File>()
  const [imageInstute, setImageInstute] = useState<File>()
  const [logoImage, setLogoImage] = useState('')
  const [instituteImage, setInstituteImage] = useState('')
  const [checkInstitute, setCheckInstitute] = useState('')
  const [data, setData] = useState<DataItem[]>([])
  const [boardList, setBoardList] = useState([])
  const [isSubmiting, setIsSubmiting] = useState(false)

  const [selectedGrades, setSelectedGrades] = useState<
    DropdownOptionData<CourseInstitute>[]
  >([])

  // const [selectedBoards, setSelectedBoards] = useState<
  //   DropdownOptionData<any>[]
  // >([])

  const handleIdsChange = (ids: string[]) => {
    setinstituteSelectedCourse(ids)
  }

  // const onBoardIdsChange = (ids: string[]) => {
  //   setinstituteSelectedBoard(ids)
  // }

  const handleInstituteSubmit = () => {
    if (!id) {
      const Data = new FormData()
      Data.append('name', instituteName)
      Data.append('username', instituteUserName)
      Data.append('password', institutePassword)

      if (image != undefined) {
        Data.append('logo', image)
      }
      if (imageInstute != undefined) {
        Data.append('instituteImage', imageInstute)
      }
      Data.append('contactName', contactName)
      Data.append('contactNo', `+91${contactNumber}`)
      Data.append('address', instituteLocation)
      // Data.append('branchStudentLimit', branchStudentLimit.toString())
      Data.append('courseIds', JSON.stringify(instituteSelectedCourse))
      // Data.append('boardIds', JSON.stringify(instituteSelectedBoard))
      Data.append('hasPrepMaterial', hasPrepMaterial.toString())
      setIsSubmiting(true)
      AddInstituteV2(Data)
        .then((res) => {
          if (res) {
            setCreatedInstitute(res.data)
            history.push(ROUTES_V2.INSTITUTE_CARD_LIST)
            CustomToastMessage(res.message, 'success')
            setInstituteName('')
            setContactName('')
            setContactNumber(0)
            setInstituteUserName('')
            setInstituteLocation('')
            setInstitutePassword('')
            setBranchStudentLimit(0)
            setinstituteSelectedCourse([])
            setSelectedGrades([])
            // setSelectedBoards([])
            // setIsPublish(false)
          }
        })
        .catch((error) => {
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => setIsSubmiting(false))
    } else {
      setCreatedInstitute({
        _id: '',
        name: ''
      })
      const Data = new FormData()
      if (instituteName != checkInstitute) {
        Data.append('name', instituteName)
      }

      Data.append('address', instituteLocation)
      // Data.append('branchStudentLimit', branchStudentLimit.toString())
      Data.append('courseIds', JSON.stringify(instituteSelectedCourse))
      // Data.append('boardIds', JSON.stringify(instituteSelectedBoard))
      Data.append('hasPrepMaterial', hasPrepMaterial.toString())
      if (image != undefined) {
        Data.append('logo', image)
      }
      if (imageInstute != undefined) {
        Data.append('instituteImage', imageInstute)
      }

      setIsSubmiting(true)
      EditInstitute(id, Data)
        .then((res) => {
          if (res) {
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.INSTITUTE_CARD_LIST)
            setInstituteName('')
            setContactName('')
            setContactNumber(0)
            setInstituteUserName('')
            setInstituteLocation('')
            setInstitutePassword('')
            setBranchStudentLimit(0)
            setinstituteSelectedCourse([])
            setSelectedGrades([])
            // setSelectedBoards([])
            // setIsPublish(false)
          }
          // GetSingleInstitute(id).then((res) => {
          //   if (res) {
          //     setCreatedInstitute({
          //       _id: res.data._id,
          //       name: res.data.name
          //     })
          //   }
          // })
        })
        .catch((error) => {
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => setIsSubmiting(false))
    }
  }

  if (userInfoV2?.role == 'instituteAdmin') {
    id = userInfoV2.instituteId
  }

  useEffect(() => {
    if (id && userInfoV2.role === 'superAdmin') {
      GetSingleInstitute(id)
        .then((res) => {
          if (res) {
            if (res.data.mobile) {
              res.data.mobile = res.data?.mobile.replace('+91', '')
            }
            setCreatedInstitute({
              _id: res.data._id,
              name: res.data.name
            })

            // const preBoards =
            //   res.data?.boards?.map((item: any) => ({
            //     id: item.boardId,
            //     label: item.boardName
            //   })) || []

            setInstituteName(res.data.name)
            setCheckInstitute(res.data.name)
            setContactName(res.data.firstName)

            setData(res.data.courses)
            setContactNumber(res.data.mobile)
            setInstituteLocation(res.data.address)
            setInstituteUserName(res.data.username)
            setinstituteSelectedCourse(
              res.data?.courses?.map((item: any) =>
                item.courseId == null ? '' : item.courseId
              ) || []
            )
            // setinstituteSelectedBoard(
            //   res.data?.boards?.map((item: any) => item.boardId) || []
            // )
            // setSelectedBoards(preBoards)
            setBranchStudentLimit(res.data.branchStudentLimit)
            setLogoImage(res.data.logo)
            setInstituteImage(res.data.instituteImage)
            // setIsPublish(res.data.publishAllMaterial)
          }
        })

        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [id, userInfoV2.role])

  useEffect(() => {
    getAllBoardsAPI({
      page: 1,
      limit: 120
    })
      .then((res) => {
        const newBoards = res.data.map((board: any) => ({
          id: board._id,
          value: board._id,
          label: board.name
        }))
        setBoardList(newBoards)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }, [])

  const [screenSize, setScreenSize] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth) {
        setScreenSize(window.innerWidth)
      }
    }
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <PageContainer style={{ overflowY: 'auto' }}>
      <Grid columns={screenSize > 768 ? 10 : 1} gap="20px">
        {userInfoV2.role === 'branchAdmin' ? (
          ''
        ) : (
          <GridItem
            columnSpan={screenSize > 768 ? 3 : 6}
            style={{ minWidth: '240px' }}
          >
            <InstituteLogo
              {...{
                instituteImagedefault: instituteImage,
                instituteLogodefault: logoImage,
                image,
                imageInstute,
                setImage,
                setImageInstute,
                EditOrAdd: id
              }}
            />
          </GridItem>
        )}
        {userInfoV2.role === 'branchAdmin' ? (
          ''
        ) : (
          <GridItem columnSpan={screenSize > 768 ? 4 : 6}>
            <InstituteInformation
              {...{
                data,
                screenSize,
                // branchStudentLimit,
                // setBranchStudentLimit,
                isSubmiting,
                boardList,
                instituteName,
                setInstituteName,
                contactName,
                setContactName,
                contactNumber,
                setContactNumber,
                instituteUserName,
                setInstituteUserName,
                institutePassword,
                setInstitutePassword,
                instituteLocation,
                setInstituteLocation,
                onClick: handleInstituteSubmit,
                onIdsChange: handleIdsChange,
                selectedGrades,
                setSelectedGrades,
                hasPrepMaterial,
                setHasPrepMaterial
                // selectedBoards,
                // setSelectedBoards,
                // setIsPublish
              }}
            />
          </GridItem>
        )}
      </Grid>
    </PageContainer>
  )
}

export default AddInstituteForm

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
