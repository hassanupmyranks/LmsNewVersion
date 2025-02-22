import styled from 'styled-components'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'
import { Spinner } from 'react-bootstrap'
import {
  Blue,
  BlueButton,
  LightBlue
} from '../../../../const/V2/stylingVariables'

const CourseAndSubjectItemCheckbox = ({
  label,
  isChecked,
  onCheck,
  children,
  onChildCheck,
  selectedSubjects,
  isLoading,
  childCheck
}: {
  label: string
  isChecked: boolean
  selectedSubjects?: any[]
  onCheck: (checked: boolean) => void
  onChildCheck: (d: any) => void
  children?: any[]
  isLoading?: boolean
  childCheck?: boolean
}) => {
  const isAvailableInSupplier = (checkingArray: any, checker: any) => {
    return checkingArray.some(
      (item: any) =>
        item.batchId === checker.batchId && item.subjectId === checker.subjectId
    )
  }
  const checkStringArray = (checkingArray: any, checker: any) => {
    return checkingArray.includes(checker)
  }

  return (
    <>
      <CheckboxContainer
        className="checkbox"
        onClick={() => onCheck(!isChecked)}
        isChecked={isChecked}
      >
        <Checkbox>{isChecked ? <CheckedSvg /> : <UnCheckedSvg />}</Checkbox>
        <span>{label}</span>
      </CheckboxContainer>
      {isChecked && isLoading ? (
        <Spinner
          style={{
            width: '24px',
            height: '24px',
            color: `${BlueButton}`,
            marginInline: 'auto'
          }}
          animation={'border'}
        />
      ) : (
        isChecked &&
        children &&
        children.length > 0 &&
        children.map((itm: any) => (
          <CheckboxContainerChild
            key={`children_topics_${itm.subjectId}`}
            className="checkbox"
            onClick={() => onChildCheck(itm)}
            isChecked={
              childCheck
                ? isAvailableInSupplier(selectedSubjects, itm)
                : checkStringArray(selectedSubjects, itm.subjectId)
            }
          >
            <Checkbox>
              {childCheck ? (
                isAvailableInSupplier(selectedSubjects, itm) ? (
                  <CheckedSvg />
                ) : (
                  <UnCheckedSvg />
                )
              ) : checkStringArray(selectedSubjects, itm.subjectId) ? (
                <CheckedSvg />
              ) : (
                <UnCheckedSvg />
              )}
            </Checkbox>
            <span>{itm?.subjectName}</span>
          </CheckboxContainerChild>
        ))
      )}
    </>
  )
}

export default CourseAndSubjectItemCheckbox

const CheckboxContainer = styled.div<{ isChecked: boolean }>`
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 16px;
  border: ${(props) => (props?.isChecked ? 'none' : '1px solid #A3AED054')};
  margin-bottom: 5px;

  span {
    color: ${Blue};
    font-family: DM Sans;
    letter-spacing: -0.68px;
    font-size: 16px;
    font-weight: 700;
  }

  box-shadow: ${(props) =>
    props?.isChecked ? '0px 18px 40px 0px rgba(112, 144, 176, 0.12)' : 'none'};
`
const Checkbox = styled.div`
  background-color: ${LightBlue};
  display: flex;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
`

const CheckboxContainerChild = styled.div<{ isChecked: boolean }>`
  margin-left: 25px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 16px;
  border: ${(props) => (props?.isChecked ? 'none' : '1px solid #A3AED054')};
  span {
    color: ${Blue};
    font-family: DM Sans;
    letter-spacing: -0.68px;
    font-size: 14px;
    font-weight: 700;
  }

  box-shadow: ${(props) =>
    props?.isChecked ? '0px 18px 40px 0px rgba(112, 144, 176, 0.12)' : 'none'};
`
