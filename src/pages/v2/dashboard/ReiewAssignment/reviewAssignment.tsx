import {
  AssignInfo,
  Assignment,
  AssignmentFile,
  ButtonAlign,
  Dateinfo,
  DocLogo,
  Flex,
  FlexAlign,
  FlexBetween,
  FlexEnd,
  HeadInfo,
  HeadInfoDivider,
  Heading,
  Info,
  Info2,
  InputFields,
  LogoArrange,
  MainWrapper,
  ReviewHeading,
  ReviewWrapper,
  ReviewedStudent,
  StatusOntime,
  StatusOverdue,
  StatusPending,
  StatusReviewed,
  StudentImage,
  StudentList,
  StudentName,
  StudentProfileImage,
  StudentReviewPage,
  // WordLogo,
  WordLogoCircle
  // WordPadLogo
} from './styledComponents'
import Dropdown from '../../../../components/V2/Form/Dropdown'
import InputV2 from '../../../../components/V2/Form/Input'
import { ButtonV2 } from '../../../../components/V2/styledComponents'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getAllSubmittedAssignmentAPI,
  getSingleAssignment,
  getSingleReviewAssignmentData,
  reviewSubmittedAssignmentAPI
} from '../../../../helpers/V2/apis'
import moment from 'moment'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { formatDateString } from '../../assignment/Review/ReviewAssignment/Utils/formatString'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import WordViewer from '../../../../components/V2/WordViewer'
// import {
//   ImageSvg,
//   MediaCard,
//   PdfSvg
//   // TextMaterialFrame
// } from '../../learn/components/styledComponents'
import MaterialPopup from '../../learn/components/MaterialPopup'
// import ImagesIcon from '../../../../assets/gallery.png'
import {
  AlignCenter,
  FileType,
  UploadAssignment,
  WordTitle
} from '../../addAssignment/styledComponents'
import FileDragDropComponent from '../../interactiveGame/uploadContent/FileDragDropComponent'
import ReviewSection from './ReviewSection'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { BatchesMore, Close, MoreBatches } from '../../assessment/table/tests'
import FileViewer from './FileViewer'
import VideoIcon from '../../../../assets/video player logo.png'
import AudioIcon from '../../../../assets/audioplayer.png'
import PdfIcon from '../../../../assets/pdf logo.png'
import PptxIcon from '../../../../assets/pptx logo.jpeg'
import WordIcon from '../../../../assets/word logo.png'
import GradeMethod from '../../../../components/Grade/grade'

const ReviewAssignment = () => {
  const params: any = useParams()
  const [reviewAssignmentAPILoading, setReviewAssignmentAPILoading] =
    useState(false)
  const [assignmentData, setAssignmentData] = useState<any>()

  const [comment, setComment] = useState('')
  const [scoreMark, setScoreMark] = useState('')
  // const [markPerQuestion, setMarkPerQuestion] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const [review, setReview] = useState<any>({
    label: '',
    value: '',
    id: ''
  })
  const [reviewedAPILoading, setReviewedAPILoading] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isView, setIsView] = useState(false)
  const [url, setUrl] = useState('')
  const [isPdfView, setIsPdfView] = useState(false)
  const [reviewedAssignment, setReviewedAssignment] = useState<any>(null)
  const [selectedBatch, setSelectedBatch] = useState({ id: '', label: '' })
  const [isBatchLoading, setIsBatchLoading] = useState(false)
  const [batch, setBatch] = useState<any[]>([])
  const [assignmentdata, setAssignmentdata] = useState<any>({})
  const [show, setShow] = useState(false)
  const reviewData = [
    {
      label: 'Good',
      value: 'good',
      id: 'good'
    },
    {
      label: 'Bad',
      value: 'bad',
      id: 'bad'
    },
    {
      label: 'Very Bad',
      value: 'veryBad',
      id: 'veryBad'
    }
  ]

  useEffect(() => {
    if (params.id) {
      setReviewAssignmentAPILoading(true)

      getAllSubmittedAssignmentAPI({
        limit: 100,
        assignmentId: params.id,
        ...(selectedBatch?.id && { batchId: selectedBatch?.id })
      })
        .then((res) => {
          if (res && res?.data?.length > 0) {
            setAssignmentData(res.data)
            setSelectedStudent(res?.data[0])
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setReviewAssignmentAPILoading(false))
    }
  }, [params.id, selectedBatch?.id])
  useEffect(() => {
    if (params.id) {
      setIsBatchLoading(true)
      getSingleAssignment(params.id)
        .then((res) => {
          setAssignmentdata(res.data)
          const Batches = res?.data?.batches?.map((data: any) => ({
            label: data.batchName,
            id: data.batchId
          }))
          setBatch(Batches)
        })
        .catch((error) => {
          console.log(error?.message)
        })
        .finally(() => {
          setIsBatchLoading(false)
        })
    }
  }, [params.id])

  const handleGetAssignment = () => {
    setReviewAssignmentAPILoading(true)
    getAllSubmittedAssignmentAPI({ limit: 100, assignmentId: params.id })
      .then((res) => {
        if (res) {
          setAssignmentData(res.data)
        }
      })
      .catch((error) => console.log({ error }))
      .finally(() => setReviewAssignmentAPILoading(false))
  }

  const submitHandler = () => {
    if (selectedStudent?.submittedBy?._id && review.label && comment !== '') {
      const newFormData: any = new FormData()
      if (review.value) {
        newFormData.append('review', review.value)
      }
      if (comment) {
        newFormData.append('reviewComment', comment)
      }
      if (scoreMark) {
        if (assignmentdata?.scoreFormat === 'grade') {
          newFormData.append('grade', scoreMark)
        } else {
          newFormData.append('scoredMarks', scoreMark)
        }
      }
      if (file) {
        newFormData.append('file', file)
      }
      // const payload = {
      //   review: review.value,
      //   reviewComment: comment,
      //   ...(scoreMark && { scoredMarks: scoreMark }),
      //   ...(markPerQuestion && { marksPerQuestion: markPerQuestion }),
      //   ...(file && { file: file })
      // }
      setReviewedAPILoading(true)
      reviewSubmittedAssignmentAPI(selectedStudent?._id, newFormData)
        .then((res) => {
          if (res) {
            setSelectedStudent(null)
            handleGetAssignment()
            setReview({
              label: '',
              value: '',
              id: ''
            })
            setSubmitted(false)
            CustomToastMessage(res.message, 'success')
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setReviewedAPILoading(false))
    }
  }

  const handleGetSingleSubmitted = (id: string) => {
    getSingleReviewAssignmentData(id)
      .then((res) => {
        if (res) {
          setReviewedAssignment(res.data)
          let defaultReviewed: any = {}
          reviewData.map((item) => {
            if (item.id === res?.data?.review) {
              defaultReviewed = item
            }
          })
          setReview(defaultReviewed)
        }
      })
      .catch((error) => console.log({ error }))
  }

  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsSmall(true)
      } else {
        setIsSmall(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  // const fileExtension = selectedStudent?.attachments
  //   ? selectedStudent?.attachments[0]?.attachment
  //     .split('.')
  //     .pop()
  //     ?.toLowerCase()
  //   : 'others'

  const AssignmentfileExtension = assignmentdata?.attachmentType
    ?.split('.')
    .pop()
    .toLowerCase()

  return (
    <>
      {isView && url !== '' && (
        <WordViewer url={url} closeHandler={() => setIsView(false)} />
      )}

      <MainWrapper>
        <AssignInfo>
          <Flex style={{ width: '70%', flexDirection: 'column' }}>
            <Heading>{assignmentdata?.name}</Heading>
            {assignmentdata && assignmentdata?.assignedOn && (
              <HeadInfo>
                <HeadInfoDivider style={{ width: '100%' }}>
                  <div style={{ width: '100%', display: 'flex', gap: '5px' }}>
                    <Info>
                      Created At:{' '}
                      <Info2>
                        {moment(assignmentdata?.assignedOn)?.format(
                          'Do MMM, YYYY'
                        )}
                      </Info2>{' '}
                      |
                    </Info>

                    <Info>
                      Last Submission Date:{' '}
                      <Info2>
                        {moment(assignmentdata?.deadLine)?.format(
                          'Do MMM, YYYY'
                        )}
                      </Info2>{' '}
                      |
                    </Info>

                    <div
                      style={{
                        display: 'flex',
                        gap: '5px',
                        top: '0px',
                        position: 'relative'
                      }}
                    >
                      <Info>
                        {' '}
                        Assigned To: {''}
                        <Info2>
                          {' '}
                          {assignmentdata?.batches?.[0]?.batchName ||
                            'No batch data available'}
                        </Info2>
                      </Info>
                      {assignmentdata?.batches?.length > 1 && (
                        <>
                          <p>...</p>{' '}
                          <button
                            onClick={() => {
                              setShow(!show)
                            }}
                            style={{
                              width: 'auto',
                              height: '30px',
                              borderRadius: '30px',
                              border: 'none',
                              fontFamily: 'GT Walsheim, sans-serif'
                            }}
                          >
                            +{assignmentdata?.batches?.length}
                          </button>
                          {show && (
                            <MoreBatches
                              style={{ position: 'absolute', top: '0px' }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                Batches / Sections
                                <Close
                                  onClick={() => {
                                    setShow(!show)
                                  }}
                                />
                              </div>
                              {assignmentdata?.batches?.map(
                                (data: any, index: any) => (
                                  <div key={index}>
                                    <BatchesMore>{data?.batchName}</BatchesMore>
                                  </div>
                                )
                              )}
                            </MoreBatches>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </HeadInfoDivider>
              </HeadInfo>
            )}
          </Flex>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <a
              target="_upmyrank"
              href={assignmentdata?.attachment && assignmentdata?.attachment}
              style={{ color: '#000' }}
            >
              <DocLogo
                style={{ height: '30px', width: '30px' }}
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
              Attachment
            </a>
          </div>

          <HeadInfoDivider style={{ justifyContent: 'flex-end', width: '30%' }}>
            {' '}
            <SearchableDropdown
              style={{ width: '250px' }}
              selectedValue={selectedBatch}
              isLoader={isBatchLoading}
              label="Select Batch / Section"
              placeHolder="Enter or select Batch / Section"
              options={batch}
              isClear={selectedBatch?.id ? true : false}
              onSelect={(option: any) => {
                setSelectedBatch(option)
              }}
            />
          </HeadInfoDivider>
        </AssignInfo>
        <Flex style={{ justifyContent: 'space-between', gap: '20px' }}>
          {reviewAssignmentAPILoading ? (
            <Spinner
              style={{
                width: '38px',
                height: '38px',
                color: `${BlueButton}`
              }}
              animation={'border'}
            />
          ) : (
            <StudentList>
              {' '}
              {assignmentData &&
                assignmentData.length > 0 &&
                assignmentData.map((item: any, index: number) => (
                  <ReviewedStudent
                    active={selectedStudent?._id === item?._id}
                    onClick={() => {
                      if (item?.status === 'reviewed') {
                        handleGetSingleSubmitted(item?._id)
                        setSelectedStudent(item)
                      } else {
                        setSelectedStudent(item)
                        setReview({
                          label: '',
                          value: '',
                          id: ''
                        }),
                          setReviewedAssignment(null)
                      }
                    }}
                    key={`assignment_${index}`}
                  >
                    <FlexAlign>
                      <StudentImage
                        src={item?.submittedBy?.profileImage}
                        alt=""
                      />
                      <Info>{item?.submittedBy?.name}</Info>
                    </FlexAlign>
                    <Info> {formatDateString(item?.submittedOn)}</Info>
                    {item?.status === 'reviewed' ? (
                      <StatusReviewed>Reviewed</StatusReviewed>
                    ) : (
                      <StatusPending>Pending</StatusPending>
                    )}
                    {assignmentdata?.deadLine >= item?.submittedOn ? (
                      <StatusOntime>Ontime</StatusOntime>
                    ) : (
                      <StatusOverdue>Overdue</StatusOverdue>
                    )}
                  </ReviewedStudent>
                ))}
            </StudentList>
          )}

          {selectedStudent !== null &&
            selectedStudent?.assignmentType !== 'assignmentTest' && (
              <StudentReviewPage>
                <ReviewHeading>Review Assignment</ReviewHeading>
                <FlexBetween>
                  <Flex style={{ alignItems: 'center' }}>
                    <StudentProfileImage
                      src={selectedStudent?.submittedBy?.profileImage}
                      alt=""
                    />
                    <div>
                      {' '}
                      <StudentName>
                        {selectedStudent?.submittedBy?.name}
                      </StudentName>{' '}
                    </div>
                  </Flex>
                  <FlexEnd>
                    {assignmentdata?.deadLine >=
                    selectedStudent?.submittedOn ? (
                      <StatusOntime>Ontime</StatusOntime>
                    ) : (
                      <StatusOverdue>Overdue</StatusOverdue>
                    )}
                    <Dateinfo style={{ marginTop: '15px' }}>
                      Submitted Date -{' '}
                      {formatDateString(selectedStudent?.submittedOn)}
                    </Dateinfo>
                  </FlexEnd>
                </FlexBetween>
                <InputFields>
                  <Dropdown
                    label={'Select Review'}
                    selectedValue={review}
                    placeholder={'Please Select Review'}
                    options={reviewData}
                    onSelect={(data) => {
                      if (!(selectedStudent.status == 'reviewed')) {
                        setReview(data)
                      }
                    }}
                    required
                    error={
                      review?.label !== '' || !submitted
                        ? ''
                        : 'Field is required'
                    }
                  />
                  <Flex
                    style={{
                      gap: '10px'
                    }}
                  >
                    <Flex
                      style={{
                        flexDirection: 'column',
                        width: '100%'
                      }}
                    >
                      <InputV2
                        disabled={selectedStudent.status == 'reviewed'}
                        label={'Add Comments'}
                        defaultValue={reviewedAssignment?.reviewComment}
                        placeholder="Enter Comments of this Assignment"
                        onChange={(e) => setComment(e.target.value)}
                        style={{ marginTop: '15px' }}
                        full
                        error={
                          comment !== '' || !submitted
                            ? ''
                            : 'Field is required'
                        }
                      />
                      <InputV2
                        disabled={selectedStudent.status == 'reviewed'}
                        label={
                          assignmentdata?.scoreFormat === 'grade'
                            ? 'Add Scored Grade'
                            : 'Add Scored Marks'
                        }
                        defaultValue={
                          assignmentdata?.scoreFormat === 'grade'
                            ? reviewedAssignment?.grade
                            : reviewedAssignment?.scoredMarks
                        }
                        placeholder={
                          assignmentdata?.scoreFormat === 'grade'
                            ? 'Enter Scored Garde'
                            : 'Enter Scored Marks'
                        }
                        onChange={(e) => setScoreMark(e.target.value)}
                        style={{ marginTop: '15px' }}
                        full
                        toolTipText={
                          assignmentdata?.scoreFormat === 'grade' ? (
                            <GradeMethod />
                          ) : (
                            ''
                          )
                        }
                      />
                      {/* <InputV2
                        label={'Add Marks Per Question'}
                        defaultValue={reviewedAssignment?.marksPerQuestion}
                        placeholder="Enter Marks Per Question"
                        onChange={(e) => setMarkPerQuestion(e.target.value)}
                        style={{ marginTop: '15px' }}
                        full
                      /> */}
                    </Flex>
                    {selectedStudent.status !== 'reviewed' &&
                      selectedStudent.status !== 'submitted' && (
                        <UploadAssignment>
                          <AlignCenter>
                            <WordTitle>Upload Attachment</WordTitle>
                            <FileType>
                              ( PNG / PDF / DOCS / XLSX / PPTX / VIDEO / AUDIO )
                            </FileType>
                          </AlignCenter>
                          <FileDragDropComponent
                            onFileChange={(ExcelFile) => {
                              setFile(ExcelFile)
                            }}
                            values={file}
                            setValues={setFile}
                          />
                        </UploadAssignment>
                      )}
                  </Flex>
                  <AssignmentFile>
                    Submitted Assignment File [Click for Preview]
                  </AssignmentFile>
                  {isPdfView && url != ' ' && (
                    <MaterialPopup
                      width={isSmall ? '90%' : '63%'}
                      height="95%"
                      child={<FileViewer selectedFile={url} />}
                      onClick={() => {
                        setIsPdfView(false)
                        setUrl('')
                      }}
                    />
                  )}
                  <LogoArrange>
                    <WordLogoCircle>
                      <DocLogo
                        onClick={() => {
                          setIsPdfView(true)
                          setUrl(
                            selectedStudent?.attachments
                              ? selectedStudent?.attachments[0]?.attachment
                              : ''
                          )
                        }}
                        src={
                          // selectedStudent?.assignmentType === 'video'
                          //   ? VideoIcon
                          //   : selectedStudent?.assignmentType === 'audio'
                          //     ? AudioIcon
                          //     : selectedStudent?.assignmentType === 'pptx'
                          //       ? PptxIcon
                          //       : fileExtension === 'pdf'
                          //         ? PdfIcon
                          //         : WordIcon
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
                    </WordLogoCircle>
                    <Assignment>Attachment</Assignment>
                  </LogoArrange>
                </InputFields>
                <ButtonAlign>
                  <ButtonV2
                    disabled={
                      reviewedAPILoading ||
                      selectedStudent?.status === 'reviewed'
                    }
                    onClick={() => {
                      setSubmitted(true)
                      submitHandler()
                    }}
                  >
                    {reviewedAPILoading ? (
                      <Spinner
                        style={{
                          width: '15px',
                          height: '15px',
                          color: `${BlueButton}`
                        }}
                        animation={'border'}
                      />
                    ) : (
                      'Submit Review'
                    )}
                  </ButtonV2>
                </ButtonAlign>
              </StudentReviewPage>
            )}
          {selectedStudent !== null &&
            selectedStudent?.assignmentType === 'assignmentTest' && (
              <ReviewWrapper>
                <ReviewSection
                  questionAnswers={selectedStudent}
                  setReviewQuestion={() => {}}
                  type={selectedStudent?.assignmentType}
                  Reviewed={true}
                />
              </ReviewWrapper>
            )}
        </Flex>
      </MainWrapper>
    </>
  )
}
export default ReviewAssignment

// const PdfViewer = (selectedPdf: any) => {
//   return <TextMaterialFrame src={`${selectedPdf}#toolbar=0`} loading="lazy" />
// }
