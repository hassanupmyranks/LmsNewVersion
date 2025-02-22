import { ButtonV2, Flex } from '../../../../components/V2/styledComponents'
import {
  AlignCenter,
  Block,
  ButtonContainer,
  FileType,
  Pending,
  Table,
  TableRow,
  TableRowFirst,
  TableRowLast,
  TableWrapper,
  UploadAssignment,
  UploadUI,
  Uploaded,
  SuccessfulUploadMessage,
  FileCircle,
  MainMessage,
  WordTitle,
  PageWrapper,
  Format,
  Anchor,
  Text,
  Files,
  AlignFiles
} from './styledComponents'
import SimpleDropdown from '../../../../components/V2/Form/SimpleDropdown'
import {
  CloseButton,
  // DeleteButton,
  // DeleteIconContainer,
  // DeleteText,
  Percentage,
  ProgressBar,
  ProgressBarContainer,
  SecondHalfProgressBar,
  SuccessProgressBar,
  SuccessProgressBarPara,
  WrongMessage
} from '../addQuestions/components/styledComponents'
import { SocketResponse } from '../../../../utils/types'
// import Delete from '../../../../assets/Delete.png'
import {
  FileContainer,
  InnerContainer,
  MessageContainer,
  UploadFileMessageContainer
} from '../../../../components/V2/FileDragAndDrop/styledComponents'
import { Spinner } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import {
  GetAllUploadedFiles,
  UsersBulkUpload,
  getAllInstituteAPI,
  getBatchAPI,
  getBranchAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import File from '../../../../assets/File.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
const StudentBulkUploading = () => {
  const [data, setData] = useState<any>([])
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [file, setFile] = useState<any>()
  const [processingId, setProcessingId] = useState<string>('')
  const [instituteList, setInstituteList] = useState<any>([])
  const [selectedInstitute, setSelectedInstitute] = useState<any>()
  const [isSubmit, setIsSubmit] = useState(false)
  const [branchList, setBranchList] = useState<any>([])
  const [branchLoading, setBranchLoading] = useState<boolean>(false)
  const [selectedBranch, setSelectedBranch] = useState<any>()
  const [batchList, setBatchList] = useState<any>([])
  const [batchLoading, setBatchLoading] = useState<boolean>(false)
  const [selectedBatch, setSelectedBatch] = useState<any>()
  const [selectedRole, setSelectedRole] = useState<any>()
  const [socketResponse, setSocketResponse] = useState<SocketResponse>({
    finished: false,
    filePath: '',
    notUploadedCount: 0,
    uploadedCount: 0,
    isError: false,
    message: '',
    progress: 0
  })
  const [user] = useSelector((state: RootState) => [state.userV2.userInfoV2])

  const formData = new FormData()
  if (user.role === 'superAdmin') {
    formData.append('instituteId', selectedInstitute?.value)
  }

  if (user.role !== 'branchAdmin') {
    formData.append('branchId', selectedBranch?.value)
  }
  {
    selectedRole?.value == 'student'
      ? formData.append('batchId', selectedBatch?.value)
      : ''
  }
  formData.append('role', selectedRole?.value)
  formData.append('file', file)
  useEffect(() => {
    if (user.role === 'superAdmin') {
      getAllInstituteAPI({ limit: 100, page: 1 }).then((res: any) => {
        setInstituteList(res.data)
      })
    }
    if (user.role === 'instituteAdmin') {
      setBranchLoading(true)
      getBranchAPI({
        limit: 100,
        page: 1,
        instituteId: user.instituteId
      })
        .then((res: any) => {
          setBranchList(res.data)
        })
        .catch(() => setBranchLoading(false))
        .finally(() => setBranchLoading(false))
    }

    if (user.role === 'branchAdmin') {
      setBatchLoading(true)
      getBatchAPI({
        limit: 100,
        page: 1,
        branchIds: [user.branchId]
      })
        .then((res: any) => {
          setBatchList(res.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setBatchLoading(false))
    }
  }, [user])

  useEffect(() => {
    if (selectedInstitute?.value) {
      setBranchLoading(true)
      getBranchAPI({
        limit: 100,
        page: 1,
        instituteId: selectedInstitute?.value
      })
        .then((res: any) => {
          setBranchList(res.data)
        })
        .catch(() => setBranchLoading(false))
        .finally(() => setBranchLoading(false))
    }
  }, [selectedInstitute?.value])

  useEffect(() => {
    if (selectedBranch?.value) {
      setBatchLoading(true)
      getBatchAPI({
        limit: 100,
        page: 1,
        branchIds: [selectedBranch?.value]
      })
        .then((res: any) => {
          setBatchList(res.data)
        })
        .catch(() => setBatchLoading(false))
        .finally(() => setBatchLoading(false))
    }
  }, [selectedBranch?.value])

  useEffect(() => {
    GetAllUploadedFiles('users').then((res) => {
      setData(res.data)
    })
  }, [])

  const Idata: any =
    Array.isArray(instituteList) &&
    instituteList?.map((item: any) => ({
      value: item._id,
      label: item.name
    }))

  const Bdata: any =
    Array.isArray(branchList) &&
    branchList?.map((item: any) => ({
      value: item._id,
      label: item.name
    }))

  const BTdata: any =
    Array.isArray(batchList) &&
    batchList?.map((item: any) => ({
      value: item._id,
      label: item.name
    }))

  const RData = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' }
  ]

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    const options: any = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const formatTime = (dateString: any) => {
    const date = new Date(dateString)
    const options: any = {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    return date.toLocaleTimeString('en-US', options)
  }

  const onFileChange = (file: File) => {
    return file
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const onChangeEvent = (event: any) => {
    const { files } = event.target
    onFileChange(files)
    setFile(files[0])
  }
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    if (processingId) {
      const websocket = new WebSocket(
        `${process.env.REACT_APP_SOCKET_BASEURL_V2}/?processingId=${processingId}&type=questionDocUpload`
      )

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (!data.isError) {
          setSocketResponse(data)
          if (data.finished) {
            CustomToastMessage(`File Sent Successfully!`, 'success')
            setIsDisable(false)
            GetAllUploadedFiles('users')
              .then((res) => {
                setData(res.data)
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }
      }
      return () => {
        websocket.close()
      }
    }
  }, [processingId])

  useEffect(() => {
    if (file === undefined && fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [file])

  const toggleUploadUsers = () => {
    setIsSubmit(true)
    setIsDisable(true)
    setProcessingId('')
    setSocketResponse((prevState) => ({
      ...prevState,
      finished: false,
      filePath: '',
      notUploadedCount: 0,
      uploadedCount: 0,
      isError: false,
      message: '',
      progress: 0
    }))
    UsersBulkUpload(formData)
      .then((response) => {
        setProcessingId(response.data.processingId)
        setSelectedInstitute('')
        setSelectedBranch('')
        setSelectedBatch('')
        setSelectedRole('')
        setFile(undefined)
      })
      .catch((error) => {
        setIsDisable(false)
        CustomToastMessage(error.response.data.message, 'error')
      })
      .finally(() => setIsSubmit(false))
  }

  const handleClose = () => {
    setSocketResponse((prevState) => {
      return {
        ...prevState,
        finished: false,
        filePath: '',
        notUploadedCount: 0,
        uploadedCount: 0,
        isError: false,
        message: '',
        progress: 0
      }
    })
    setProcessingId('')
    setFile(undefined)
  }

  return (
    <PageWrapper>
      <UploadUI>
        <div style={{ display: 'Flex', gap: '20px' }}>
          <div
            style={
              user.role !== 'superAdmin'
                ? {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                  }
                : {
                    width: '48%'
                  }
            }
          >
            <SimpleDropdown
              style={{ marginBottom: '10px' }}
              label={'Select Role'}
              placeholder={'Please Select Role'}
              options={RData}
              onSelect={(selected) => {
                setSelectedRole(selected)
              }}
              selectedValue={selectedRole}
            ></SimpleDropdown>
          </div>
          {user.role === 'superAdmin' && (
            <SimpleDropdown
              style={{ width: '48%' }}
              label={'Select Institute / School'}
              placeholder={'Please Select Inst / Schl'}
              options={Idata}
              onSelect={(selected) => {
                setSelectedInstitute(selected)
              }}
              selectedValue={selectedInstitute}
            ></SimpleDropdown>
          )}
        </div>
        <div
          style={{
            display: 'Flex',
            justifyContent: 'center',
            gap: '20px',
            width: '100%'
          }}
        >
          {user.role !== 'branchAdmin' && (
            <SimpleDropdown
              style={{ marginBottom: '10px', width: '48%' }}
              label={'Select Branch'}
              placeholder={'Please Select Branch'}
              options={Bdata}
              onSelect={(selected) => {
                setSelectedBranch(selected)
              }}
              isLoading={branchLoading}
              selectedValue={selectedBranch}
            ></SimpleDropdown>
          )}
          {selectedRole?.value == 'student' ? (
            <SimpleDropdown
              style={{ width: '48%' }}
              label={'Select Batch / Section'}
              placeholder={'Please Select Batch / Section'}
              options={BTdata}
              onSelect={(selected) => {
                setSelectedBatch(selected)
              }}
              isLoading={batchLoading}
              selectedValue={selectedBatch}
            ></SimpleDropdown>
          ) : (
            ''
          )}
        </div>
        <UploadAssignment>
          <ProgressBarContainer>
            {Number(socketResponse.progress) === 100 ? (
              socketResponse.notUploadedCount === 0 ? (
                <div>
                  <SuccessProgressBar></SuccessProgressBar>
                  <SuccessProgressBarPara>
                    Teachers/Students from file are shown below
                  </SuccessProgressBarPara>
                </div>
              ) : (
                <ProgressBarContainer>
                  <WrongMessage>
                    {`Upload failed for ${
                      socketResponse.notUploadedCount
                    } Teachers/Students out of ${
                      socketResponse.notUploadedCount +
                      socketResponse.uploadedCount
                    }, please try again for them!
                     `}
                  </WrongMessage>

                  <CloseButton onClick={handleClose}>Close</CloseButton>
                  <CloseButton>
                    <a style={{ all: 'unset' }} href={socketResponse.filePath}>
                      Download Error File
                    </a>
                  </CloseButton>
                </ProgressBarContainer>
              )
            ) : (
              <Flex style={{ width: '100%' }}>
                <SecondHalfProgressBar
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0px'
                  }}
                >
                  <ProgressBar
                    width={socketResponse.progress}
                    style={{ top: '0px' }}
                  ></ProgressBar>
                </SecondHalfProgressBar>
                <Percentage>{`${socketResponse.progress}%`}</Percentage>
              </Flex>
            )}
            {socketResponse.progress === 100 ? (
              <Percentage>{`${socketResponse.progress}%`}</Percentage>
            ) : (
              ''
            )}
            {Number(socketResponse.progress) === 100 &&
              socketResponse.notUploadedCount === 0 && (
                <ProgressBarContainer>
                  <CloseButton onClick={handleClose}>Close</CloseButton>
                </ProgressBarContainer>
              )}
          </ProgressBarContainer>
          <Block>
            <AlignCenter>
              <WordTitle>Upload Attachment</WordTitle>
              <FileType>(Must be MS Excel file)</FileType>
            </AlignCenter>
            <form style={{ maxWidth: '100%' }}>
              <input
                type="file"
                name="file"
                hidden
                ref={fileInputRef}
                onChange={onChangeEvent}
              />
              <FileContainer onClick={handleFileSelect}>
                <InnerContainer>
                  <FileCircle src={'/assets/images/excel.png'} alt="" />
                  <MessageContainer>
                    {file === undefined ? (
                      <UploadFileMessageContainer>
                        <MainMessage>Click to Select File</MainMessage>
                      </UploadFileMessageContainer>
                    ) : (
                      <SuccessfulUploadMessage>
                        {file?.name}
                      </SuccessfulUploadMessage>
                    )}
                  </MessageContainer>
                </InnerContainer>
              </FileContainer>
            </form>
          </Block>
          <ButtonContainer>
            <ButtonV2
              onClick={toggleUploadUsers}
              disabled={isDisable || isSubmit}
            >
              {isDisable ? (
                <Spinner
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                  animation={'border'}
                />
              ) : (
                'Upload'
              )}
            </ButtonV2>
          </ButtonContainer>
        </UploadAssignment>
        <AlignFiles>
          <Format>Note : Use this file formats</Format>
          <Files>
            <AlignFiles>
              <Anchor
                href={`${process.env.PUBLIC_URL}/Student_XL_Format.xlsx`}
                download="Student_Bulk_Upload_Format.xlsx"
              >
                <img src={File} alt="File" height={'60px'} />
              </Anchor>
              <Text>Student</Text>
            </AlignFiles>
            <AlignFiles>
              <Anchor
                href={`${process.env.PUBLIC_URL}/Teacher_XL_Format.xlsx`}
                download="Teacher_Bulk_Upload_Format.xlsx"
              >
                <img src={File} alt="File" height={'60px'} />
              </Anchor>
              <Text>Teacher</Text>
            </AlignFiles>
          </Files>
        </AlignFiles>
      </UploadUI>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Date</th>
              <th>Time</th>
              <th>FileName</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableRowFirst>{index + 1}</TableRowFirst>
                <td style={{ minWidth: '90px' }}>
                  {formatDate(item.createdAt)}
                </td>
                <td style={{ minWidth: '90px' }}>
                  {formatTime(item.createdAt)}
                </td>
                <td style={{ minWidth: '90px' }}>{item.filename}</td>
                <TableRowLast>
                  {item.uploaded ? (
                    <Uploaded>Uploaded</Uploaded>
                  ) : (
                    <Pending>Pending</Pending>
                  )}
                </TableRowLast>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </PageWrapper>
  )
}

export default StudentBulkUploading
