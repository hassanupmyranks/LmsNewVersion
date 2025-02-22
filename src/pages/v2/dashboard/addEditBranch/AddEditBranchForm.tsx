import styled from 'styled-components'
import {
  Flex,
  Grid,
  GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
import { Blue, SecondaryGray600 } from '../../../../const/V2/stylingVariables'
import { useEffect, useRef, useState } from 'react'
import AddBranch from './addInstituteForm/AddBranch'
// import AddedBranch from './addInstituteForm/AddedBranch'
import {
  AddBranchV2,
  EditBranch,
  GetSingleBranch,
  getNewAllBranchAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useHistory, useParams } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { DataItem } from './addInstituteForm/types'
import { RootState } from '../../../../redux/store'
import { ContainerImg } from './addInstituteForm/styledComponents'
import BranchLogo from './addInstituteForm/BranchLogo'
import ROUTES_V2 from '../../../../const/V2/routes'

const BranchForm = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const addEditBranchRef = useRef<HTMLDivElement>(null)

  const params: any = useParams()
  const history: any = useHistory()
  const [branchName, setBranchName] = useState<string>('')
  const [studentLimit, setStudentLimit] = useState<number>(0)
  const [branchLocation, setBranchLocation] = useState<string>('')
  const [branchUserName, setBranchUserName] = useState<string>('')
  const [branchPassword, setBranchPassword] = useState<string>('')
  const [branchContactName, setBranchContactName] = useState<string>('')
  const [branchContactNumber, setBranchContactNumber] = useState<number>(null!)
  const [isSubmiting, setIsSubmiting] = useState(false)

  const [selectedInstitute, setSelectedInstitute] = useState({
    id: '',
    label: ''
  })
  const [imageInstute, setImageInstute] = useState<File>()
  const [BranchSelectedCourse, setBranchSelectedCourse] = useState<string[]>([])
  const [image, setImage] = useState<File>()
  const [logoImage, setLogoImage] = useState('')
  const [instituteImage, setInstituteImage] = useState('')
  const [EditBranchId, setEditBranchId] = useState('')
  const [checkBranch, setCheckBranch] = useState('')
  const [, setddBranchBachId] = useState('')
  const [branchData, setBranchData] = useState<DataItem[]>([])
  const [isPublish, setIsPublish] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleBranchCourseChange = (ids: string[]) => {
    setBranchSelectedCourse(ids)
  }
  useEffect(() => {
    if (userInfoV2.role === 'branchAdmin') {
      setEditBranchId(userInfoV2.branchId)
      setddBranchBachId(userInfoV2.branchId)
    }
  }, [userInfoV2.branchId, userInfoV2.role])

  useEffect(() => {
    if (params.id !== 'add' && params.id !== undefined) {
      setEditBranchId(params.id)
    }
  }, [params.id])

  const handleBranchSubmit = () => {
    if (!EditBranchId) {
      const BranchData = new FormData()
      BranchData.append('name', branchName)
      BranchData.append('username', branchUserName)
      BranchData.append('password', branchPassword)

      BranchData.append('contactName', branchContactName)
      BranchData.append('contactNo', `+91${branchContactNumber}`)
      BranchData.append('address', branchLocation)
      // BranchData.append('studentLimit', studentLimit.toString())
      BranchData.append('courseIds', JSON.stringify(BranchSelectedCourse))
      BranchData.append('instituteId', selectedInstitute.id)
      // BranchData.append('boardId', selectedBoard.id)
      if (image != undefined) {
        BranchData.append('logo', image)
      }
      if (imageInstute != undefined) {
        BranchData.append('branchImage', imageInstute)
      }
      BranchData.append('publishAllMaterial', isPublish.toString())
      setIsSubmiting(true)
      AddBranchV2(BranchData)
        .then((res) => {
          if (res) {
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.BRANCH_CARD_LIST)
            setBranchContactNumber(0)
            setBranchContactName('')
            setBranchPassword('')
            setBranchUserName('')
            setBranchLocation('')
            setStudentLimit(0)
            setBranchName('')
            setIsPublish(false)
            setSelectedInstitute({ id: '', label: '' })
            dispatch(
              getNewAllBranchAPI({
                page: 1,
                limit: 20,
                instituteId: selectedInstitute.id
              })
            )
          }
        })
        .catch((error) => {
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => setIsSubmiting(false))
    } else {
      const BranchData = new FormData()
      if (branchName != checkBranch) {
        BranchData.append('name', branchName)
      }

      BranchData.append('address', branchLocation)
      // BranchData.append('studentLimit', studentLimit.toString())
      BranchData.append('courseIds', JSON.stringify(BranchSelectedCourse))
      // BranchData.append('boardId', selectedBoard.id)

      if (image != undefined) {
        BranchData.append('logo', image)
      }
      if (imageInstute != undefined) {
        BranchData.append('branchImage', imageInstute)
      }
      BranchData.append('publishAllMaterial', isPublish.toString())
      setIsSubmiting(true)

      EditBranch(EditBranchId, BranchData)
        .then((res) => {
          if (res) {
            CustomToastMessage(res.message, 'success')
            setBranchContactNumber(0)
            history.push(ROUTES_V2.BRANCH_CARD_LIST)
            setSelectedInstitute({ id: '', label: '' })
            setBranchContactName('')
            setBranchPassword('')
            setBranchUserName('')
            setBranchLocation('')
            setStudentLimit(0)
            setBranchName('')
            setEditBranchId('')
            setIsPublish(false)
          }
        })
        .catch((error) => {
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => setIsSubmiting(false))
    }
  }

  useEffect(() => {
    if (EditBranchId !== '') {
      if (addEditBranchRef.current) {
        addEditBranchRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }

      GetSingleBranch(EditBranchId)
        .then((res) => {
          if (res) {
            if (res.data.mobile) {
              res.data.mobile = res.data.mobile.replace('+91', '')
            }
            if (res.data.publishAllMaterial) {
              setIsPublish(res.data.publishAllMaterial)
            }

            setCheckBranch(res.data.name)
            setBranchName(res.data.name)
            setBranchContactName(res.data.firstName)
            setBranchData(res.data.courses)
            setBranchContactNumber(res.data.mobile)
            setBranchLocation(res.data.address)
            setBranchUserName(res.data.username)
            setStudentLimit(res.data.studentLimit)

            setSelectedInstitute({
              id: res.data.instituteId,
              label: res.data.instituteName
            })
            setBranchSelectedCourse(
              res.data?.courses?.map((item: any) => item.courseId) || []
            )
            setInstituteImage(res.data.branchImage)
            setLogoImage(res.data.logo)
          }
        })
        .catch((error) => console.log({ error }))
    }
  }, [EditBranchId, addEditBranchRef])

  const [screenSize, setScreenSize] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth) {
        setScreenSize(window.innerWidth)
      }
    }
    window.addEventListener('resize', handleResize)

    // Run once to handle initial load
    handleResize()

    // Cleanup the event listener on component unmount
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
            <BranchLogo
              {...{
                instituteImagedefault: instituteImage,
                instituteLogodefault: logoImage,
                image,
                imageInstute,
                setImage,
                setImageInstute,
                EditOrAdd: params.id
              }}
            />
          </GridItem>
        )}
        <GridItem columnSpan={screenSize > 768 ? 4 : 6} ref={addEditBranchRef}>
          <AddBranch
            {...{
              isSubmiting,
              branchData,
              EditBranchId,
              selectedInstitute,
              setSelectedInstitute,
              onClick: handleBranchSubmit,
              branchName,
              setBranchName,
              studentLimit,
              setStudentLimit,
              branchLocation,
              setBranchLocation,
              onBranchCourse: handleBranchCourseChange,
              branchUserName,
              setBranchUserName,
              branchPassword,
              setBranchPassword,
              branchContactName,
              setBranchContactName,
              branchContactNumber,
              setBranchContactNumber,
              isPublish,
              setIsPublish
              // setSelectedBoard,
              // selectedBoard
            }}
          />
        </GridItem>
        {/* {userInfoV2.role === 'branchAdmin' ? (
          ''
        ) : (
          <GridItem columnSpan={screenSize > 768 ? 3 : 6}>
            <AddedBranch
              {...{
                CreatedInstituteId: selectedInstitute.id,
                setEditBranchId,
                setddBranchBachId
              }}
            />
          </GridItem>
        )} */}
      </Grid>
    </PageContainer>
  )
}

export default BranchForm

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
