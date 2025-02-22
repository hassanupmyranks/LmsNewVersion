import {
  AddFormSections,
  CreateName,
  CreatorSections,
  DashedLineSections,
  DetailsHeading,
  DocumentSec,
  FileSections,
  ImageSec,
  UploadDocumentSec
} from '../styledComponent'
import SimpleButton from './SampleButton'
import TextArea from './TextArea'
import { ReactComponent as ExclamationIcon } from '../../../../../assets/svg/exclamation-red-icon.svg'
import { ReactComponent as UploadIcon } from '../../../../../assets/svg/upload-icon.svg'
import { DocumentIcon } from './DocumentIcon'
import UserProfile from '../../../../../assets/user-profile.png'
import { AssignmentsData } from '../types'
import moment from 'moment'
import { useRef, useState } from 'react'
import { submitAssignmentAPI } from '../../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import WordViewer from '../../../../../components/V2/WordViewer'
import { FileCircle } from '../../../../../components/V2/FileDragAndDrop/styledComponents'
import { TextMaterialFrame } from '../../../learn/components/styledComponents'
import MaterialPopup from '../../../learn/components/MaterialPopup'

const DetailsForm = ({
  selectedAssignment,
  iconColorDoc
}: {
  selectedAssignment: AssignmentsData
  iconColorDoc: string
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [submissionComment, setSubmissionComment] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [isView, setIsView] = useState(false)
  const [url, setUrl] = useState('')
  const [isPdfView, setIsPdfView] = useState(false)

  const submitHandler = () => {
    if (file && selectedAssignment._id) {
      const newFormData: any = new FormData()
      newFormData.append('assignmentId', selectedAssignment._id)
      newFormData.append('file', file)
      if (submissionComment) {
        newFormData.append('submissionComment', submissionComment)
      }
      setIsLoading(true)
      submitAssignmentAPI(newFormData)
        .then(() => {
          CustomToastMessage('Submitted Successfully', 'success')
          setFile(undefined)
          setSubmissionComment('')
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    } else {
      CustomToastMessage('Please select document file', 'error')
    }
  }

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const fileType = selectedAssignment?.attachmentType

  return (
    <>
      {isView && url && (
        <WordViewer url={url} closeHandler={() => setIsView(false)} />
      )}
      <DetailsHeading>
        <div>
          <h3>
            {selectedAssignment?.subjectName} - {selectedAssignment?.name}
          </h3>
          <p>
            {' '}
            <strong>{selectedAssignment?.studentCount || 0}</strong> Students
            submitted this
          </p>
        </div>
        <FileSections
          onClick={() => {
            setUrl(selectedAssignment?.attachment)
            if (
              fileType === 'application/pdf' ||
              fileType?.split('/').includes('image')
            ) {
              setIsPdfView(true)
            } else {
              setIsView(true)
            }
          }}
        >
          <DocumentIcon color={iconColorDoc} />
          <p>Read</p>
        </FileSections>
      </DetailsHeading>

      <DashedLineSections>
        <ExclamationIcon />
        <p>
          Deadline -{' '}
          {moment(selectedAssignment?.deadLine).format('Do MMM, YYYY')}
        </p>
      </DashedLineSections>
      <CreatorSections>
        <ImageSec>
          <img
            src={selectedAssignment?.createdBy?.profileImage || UserProfile}
            alt="Test"
          />
        </ImageSec>
        <CreateName>
          <p>{selectedAssignment?.createdBy?.name}</p>
          <span>Creator</span>
        </CreateName>
      </CreatorSections>
      <TextArea
        onChange={(e) => setSubmissionComment(e.target.value)}
        value={submissionComment}
        label=""
        placeholder="Write your assignment here"
      />

      <AddFormSections>
        <p> You can also add Attachment </p>
        <UploadDocumentSec>
          <DocumentSec onClick={handleFileSelect}>
            <FileCircle>
              <UploadIcon width={28} height={30} />
            </FileCircle>
            {file === undefined ? (
              <p style={{ marginTop: '10px' }}>Click to Select File</p>
            ) : (
              <p style={{ marginTop: '10px' }}>{file?.name}</p>
            )}
            <input
              type="file"
              name="file"
              hidden
              ref={fileInputRef}
              onChange={(event: any) => {
                const { files } = event.target
                setFile(files[0])
              }}
            />
          </DocumentSec>
        </UploadDocumentSec>
      </AddFormSections>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SimpleButton
          label={'Submit'}
          clickHandler={() => submitHandler()}
          disabled={isLoading}
        />
      </div>

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
    </>
  )
}

export default DetailsForm

const PdfViewer = (selectedPdf: any) => {
  return <TextMaterialFrame src={`${selectedPdf}#toolbar=0`} loading="lazy" />
}
