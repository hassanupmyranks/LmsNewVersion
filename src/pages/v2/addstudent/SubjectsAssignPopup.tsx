import styled from 'styled-components'
import { Blue, BlueButton } from '../../../const/V2/stylingVariables'
import { ReactComponent as RemoveIconSvg } from '../../../assets/svg/close-page.svg'
import { useEffect, useState } from 'react'
import { getSubjectData } from '../../../helpers/V2/apis'
import { ButtonV2 } from '../../../components/V2/styledComponents'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'

import MultiselectDropdown from '../../../components/V2/Form/MultiselectDropdown'
import {
  getNewAllStudentAPI,
  AssignSubjectForStudentV2
} from '../../../redux/addStudentV2/api'

const SubjectsAssignPopUp = ({
  setpopup,
  id
}: {
  setpopup: (d: boolean) => void
  id: any
}) => {
  const [subjectApiLoading, setSubjectApiLoading] = useState(false)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [batchId, setBatchId] = useState('')

  useEffect(() => {
    if (id) {
      setSubjectApiLoading(true)
      getNewAllStudentAPI({
        id: id
      })
        .then((res) => {
          setBatchId(res.data.batchId)
          if (res.subjects && res.subjects.length > 0) {
            let newSubjects: any[] = []
            res.subjects.map((item: any) => {
              newSubjects.push({
                id: item.subjectId,
                label: item.subjectName
              })
            })
            setSelectedSubjects(newSubjects)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSubjectApiLoading(false))
    }
  }, [id])

  useEffect(() => {
    if (batchId) {
      setSubjectApiLoading(true)
      getSubjectData({
        page: 1,
        limit: 120,
        batchIds: [batchId]
      })
        .then((res) => {
          if (res) {
            console.log(res, 'res?.data')
            const subjectData = res?.map((item: any) => ({
              id: item._id,
              label: item.name,
              value: item._id
            }))
            setSelectedSubjects(subjectData)
            setSubjects(subjectData)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSubjectApiLoading(false))
    }
  }, [batchId])

  const handleSubmit = () => {
    setIsSubmitted(true)
    if (selectedSubjects && selectedSubjects.length > 0) {
      const subjectIds = selectedSubjects.map((item: any) => item.id)
      // const formData = new FormData()
      // formData.append('subjectIds', JSON.stringify(subjectIds))

      setIsSubmitLoading(true)
      AssignSubjectForStudentV2({ subjectIds: subjectIds }, id)
        .then((res) => {
          if (res) {
            CustomToastMessage(res.message, 'success')
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => {
          setpopup(false)
          setIsSubmitLoading(false)
        })
    }
  }

  return (
    <PopUpBox>
      <AlignHeading>
        <div></div>
        <Heading> Subjects Assign to Student</Heading>
        <RemoveIcon onClick={() => setpopup(false)} />
      </AlignHeading>
      <MultiselectDropdown
        selectedValue={selectedSubjects}
        isLoading={subjectApiLoading}
        label="Select subjects (Select multiple)"
        placeholder="Enter or select subjects"
        error={
          selectedSubjects.length > 0 || !isSubmitted ? '' : 'Field is required'
        }
        options={subjects}
        onSelect={(data) => {
          setSelectedSubjects(data)
        }}
        fullWidth
      />
      <ButtonWrapper>
        <ButtonV2
          disabled={isSubmitLoading}
          onClick={() => {
            handleSubmit()
          }}
        >
          {isSubmitLoading && (
            <Spinner
              style={{
                width: '14px',
                height: '14px',
                color: `${BlueButton}`
              }}
              animation={'border'}
            />
          )}{' '}
          Assign
        </ButtonV2>
      </ButtonWrapper>
    </PopUpBox>
  )
}

export default SubjectsAssignPopUp

export const PopUpBox = styled.div`
  position: relative;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 430px;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;
  z-index: 1000;
  margin-top: 10%;
  margin-left: 40%;
`
export const Heading = styled.div`
  color: ${Blue};
  user-select: none;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
export const RemoveIcon = styled(RemoveIconSvg)`
  cursor: pointer;
  height: 20px;
  width: 20px;
`

export const AlignHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0px 15px 0px;
`
export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-self: center;
`
export const SearchInputWrapper = styled.div`
  margin-bottom: 8px;
`
