import React, { useEffect, useRef, useState } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { useParams } from 'react-router-dom'
import {
  MainTitle,
  Title
} from '../assessment/dashboard/components/styledComponents'
import {
  AddFormSections,
  AssignmentCountWrapper,
  DocumentSec,
  FileSections,
  UploadDocumentSec
} from './styledComponent'
// import TextArea from '../../../../components/V2/Form/TextArea'
import { FileCircle } from '../../../../components/V2/FileDragAndDrop/styledComponents'
import { ReactComponent as UploadIcon } from '../../../../assets/svg/upload-icon.svg'
import SimpleButton from './components/SampleButton'
import {
  getSingleAssignment,
  submitAssignmentAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import BackButton from '../../../../components/V2/BackButton'
import { DocLogo } from '../../dashboard/ReiewAssignment/styledComponents'
import VideoIcon from '../../../../assets/video player logo.png'
import AudioIcon from '../../../../assets/audioplayer.png'
import PdfIcon from '../../../../assets/pdf logo.png'
import PptxIcon from '../../../../assets/pptx logo.jpeg'
import WordIcon from '../../../../assets/word logo.png'
import WordViewer from '../../../../components/V2/WordViewer'
import MaterialPopup from '../../learn/components/MaterialPopup'
import { TextMaterialFrame } from '../../learn/components/styledComponents'
import { Flex } from '../../../../components/V2/styledComponents'
import { Label } from '../../../../components/V2/Form/styledComponents'

const SubmitAssignment = (): ReactElement => {
  const params: any = useParams()
  const [file, setFile] = useState<File | undefined>()
  const [fileUrl, setFileUrl] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [assignmentData, setAssignmentData] = useState<any>({})
  const [url, setUrl] = useState('')
  const [isPdfView, setIsPdfView] = useState(false)
  const [isView, setIsView] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    if (params?.id) {
      getSingleAssignment(params?.id)
        .then((res) => {
          setAssignmentData(res.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => {})
    }
  }, [params?.id])

  const handleFileChange = (file: any) => {
    // const fileURL = URL.createObjectURL(file)
    setFileUrl(file)
    setFileName(file.name)
    const fileSizeInMB = Math.round(
      Number((file.size / (1024 * 1024)).toFixed(2))
    )
    if (fileSizeInMB > 5) {
      CustomToastMessage(`File size Should be less than 5MB`, 'error')
    } else if (
      assignmentData?.type === 'video' ||
      assignmentData?.type === 'audio'
    ) {
      if (file?.type?.split('/')[0] === assignmentData?.type) {
        setFile(file)
      } else {
        CustomToastMessage(
          `File Type Should be ${assignmentData?.type}`,
          'error'
        )
        setFile(undefined)
      }
    } else if (assignmentData?.type === 'presentation') {
      if (file?.type?.split('/')[0] === 'pptx') {
        setFile(file)
      } else {
        CustomToastMessage(
          `File Type Should be ${assignmentData?.type}`,
          'error'
        )
        setFile(undefined)
      }
    } else if (assignmentData?.type === 'project') {
      console.log('1')
      if (
        file?.type?.split('/')[0] === 'audio' ||
        file?.type?.split('/')[0] === 'video' ||
        file?.type?.split('/')[0] === 'pptx' ||
        file?.type?.split('/')[0] === 'application'
      ) {
        setFile(file)
      } else {
        CustomToastMessage(
          `File Type Should be ${assignmentData?.type}`,
          'error'
        )
        setFile(undefined)
      }
    }
  }
  const submitHandler = () => {
    if (!fileUrl) {
      CustomToastMessage('Please select document file', 'error')
    } else if (fileUrl && assignmentData._id) {
      const newFormData: any = new FormData()
      newFormData.append('assignmentId', assignmentData._id)
      newFormData.append('file', fileUrl)
      // if (submissionComment) {
      //   newFormData.append('submissionComment', submissionComment)
      // }
      setIsLoading(true)
      submitAssignmentAPI(newFormData)
        .then(() => {
          CustomToastMessage(
            `${assignmentData?.name} Submitted Successfully`,
            'success'
          )
          setFile(undefined)
          // setSubmissionComment('')
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    } else {
      CustomToastMessage('Please select document file', 'error')
    }
  }

  const AssignmentfileExtension =
    assignmentData?.attachmentType?.split('.').pop()?.toLowerCase() || 'unknown'

  const fileType = assignmentData?.attachmentType

  return (
    <div
      style={{
        overflow: 'auto',
        padding: '0 24px 16px',
        background: '#fff',
        height: '100%',
        position: 'relative'
      }}
    >
      {isView && url && (
        <WordViewer url={url} closeHandler={() => setIsView(false)} />
      )}
      <MainTitle>
        <BackButton
          handleBack={() => {
            history.back()
          }}
        />{' '}
        {assignmentData?.name} Assignment{' '}
        <Title>created by {assignmentData?.createdBy?.name}</Title>
      </MainTitle>
      <AssignmentCountWrapper style={{ height: 'auto' }}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <AddFormSections style={{ width: '70%' }} className="mt-4">
            <p>Assignment Description</p>
            <Label>{assignmentData?.description}</Label>
          </AddFormSections>

          <FileSections
            onClick={() => {
              setUrl(assignmentData?.attachment)
              if (
                fileType === 'application/pdf' ||
                fileType?.split('/').includes('image')
              ) {
                setIsPdfView(true)
              } else {
                setIsView(true)
              }
            }}
            style={{
              marginRight: '80px',
              marginTop: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }} // Shifted right
          >
            <DocLogo
              style={{ height: '45px', width: '45px' }} // Slightly bigger icon
              src={
                AssignmentfileExtension === 'mp4'
                  ? VideoIcon
                  : AssignmentfileExtension === 'mp3'
                  ? AudioIcon
                  : AssignmentfileExtension === 'pptx'
                  ? PptxIcon
                  : AssignmentfileExtension === 'document'
                  ? WordIcon
                  : PdfIcon
              }
            />
            <p>Read</p>
          </FileSections>
        </Flex>

        <AddFormSections className="mt-4">
          <p> You can also add Attachment </p>
          <span>
            File type should be {assignmentData?.type} type & less than 5 MB.
          </span>
          <br />
          {file ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <iframe
                src={URL.createObjectURL(fileUrl[0])}
                title="Word Document Viewer"
                width={'300px'}
                height={'500px'}
              ></iframe>
            </div>
          ) : (
            <UploadDocumentSec>
              <DocumentSec onClick={handleFileSelect}>
                <FileCircle>
                  <UploadIcon width={28} height={30} />
                </FileCircle>
                {fileName === '' ? (
                  <p style={{ marginTop: '10px' }}>Click to Select File</p>
                ) : (
                  <p style={{ marginTop: '10px' }}>{fileName}</p>
                )}
                <input
                  type="file"
                  name="file"
                  hidden
                  ref={fileInputRef}
                  onChange={(event: any) => {
                    const { files } = event.target
                    handleFileChange(files[0])
                  }}
                />
              </DocumentSec>
            </UploadDocumentSec>
          )}
        </AddFormSections>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SimpleButton
            label={'Submit'}
            clickHandler={() => submitHandler()}
            disabled={isLoading}
          />
        </div>
      </AssignmentCountWrapper>
      {isPdfView && url !== '' && (
        <MaterialPopup
          width={'63%'}
          height="95%"
          child={PdfViewer(url)}
          onClick={() => {
            setIsPdfView(false)
            setUrl('')
          }}
        />
      )}
    </div>
  )
}

export default SubmitAssignment

const PdfViewer = (selectedPdf: any) => {
  return <TextMaterialFrame src={`${selectedPdf}#toolbar=0`} loading="lazy" />
}
