import {
  CreateName,
  ReviewedSections,
  DashedLineSections,
  DetailsHeading,
  FileSections,
  ImageSec,
  ReviewedButton,
  ReviewedText,
  ReviewedTitle,
  ReviewedAttachment,
  ViewFileSections,
  ViewText,
  GoodReviewedSpan,
  OverdueReviewedSpan,
  CreatedSections
} from '../styledComponent'
import { ReactComponent as ExclamationIcon } from '../../../../../assets/svg/exclamation-red-icon.svg'
import { DocumentIcon } from './DocumentIcon'
import UserProfile from '../../../../../assets/user-profile.png'
import { ReviewedAssignment } from '../types'
import moment from 'moment'
import { useState } from 'react'
import WordViewer from '../../../../../components/V2/WordViewer'
import { TextMaterialFrame } from '../../../learn/components/styledComponents'
import MaterialPopup from '../../../learn/components/MaterialPopup'

const AssignmentReviewed = ({
  reviewedAssignmentData
}: {
  reviewedAssignmentData: ReviewedAssignment
}) => {
  const [isView, setIsView] = useState(false)
  const [url, setUrl] = useState('')
  const [isPdfView, setIsPdfView] = useState(false)

  const fileType = reviewedAssignmentData?.attachments[0]?.attachmentType

  const fileType2 = reviewedAssignmentData?.assignmentAttachmentType

  console.log(fileType2, 'fileType2')
  return (
    <>
      {isView && url && (
        <WordViewer url={url} closeHandler={() => setIsView(false)} />
      )}
      <DetailsHeading>
        <div>
          <h3>{reviewedAssignmentData?.assignmentName}</h3>
          <p>
            You submitted this on{' '}
            {moment(reviewedAssignmentData?.submittedOn).format('Do MMM, YYYY')}
          </p>
        </div>
        <FileSections
          onClick={() => {
            setUrl(reviewedAssignmentData?.assignmentAttachment)
            if (
              fileType2 === 'application/pdf' ||
              fileType2?.split('/').includes('image')
            ) {
              setIsPdfView(true)
            } else {
              setIsView(true)
            }
          }}
        >
          <DocumentIcon />
        </FileSections>
      </DetailsHeading>

      <DashedLineSections>
        <ExclamationIcon />
        <p>
          Deadline -{' '}
          {moment(reviewedAssignmentData?.submittedOn).format('Do MMM, YYYY')}
        </p>
      </DashedLineSections>
      <CreatedSections>
        <ReviewedSections>
          <ImageSec>
            <img
              src={
                reviewedAssignmentData?.createdBy?.profileImage || UserProfile
              }
              alt="Test"
            />
          </ImageSec>
          <CreateName>
            <p>{reviewedAssignmentData?.createdBy?.firstName} - creator</p>
            <span>Reviewer</span>
          </CreateName>
        </ReviewedSections>
        <ReviewedButton>
          {reviewedAssignmentData.review === 'good' ? (
            <GoodReviewedSpan>Good</GoodReviewedSpan>
          ) : (
            <OverdueReviewedSpan>Overdue</OverdueReviewedSpan>
          )}
        </ReviewedButton>
        <ReviewedText>
          {reviewedAssignmentData?.reviewComment || '-'}
        </ReviewedText>
      </CreatedSections>
      <CreatedSections>
        <ReviewedTitle>
          <p>My Submitted assignment</p>
          <ReviewedText>
            {reviewedAssignmentData?.submissionComment || '-'}
          </ReviewedText>
          <ReviewedAttachment>
            Attachments ({reviewedAssignmentData?.attachments?.length})
          </ReviewedAttachment>
          <ViewFileSections
            onClick={() => {
              setUrl(reviewedAssignmentData?.attachments[0].attachment)
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
            <DocumentIcon />
            <ViewText>View</ViewText>
          </ViewFileSections>
        </ReviewedTitle>
      </CreatedSections>

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

export default AssignmentReviewed

const PdfViewer = (selectedPdf: any) => {
  return <TextMaterialFrame src={`${selectedPdf}#toolbar=0`} loading="lazy" />
}
