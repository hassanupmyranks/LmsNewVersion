import styled from 'styled-components'
import { Blue, BlueButton, LightBlue } from '../../../const/V2/stylingVariables'
import { ReactComponent as CheckedSvg } from '../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../assets/svg/un-check-icon.svg'
import { SubTopicsDetails } from '../../../utils/types'
import { Spinner } from 'react-bootstrap'

const SingleSelectItemCheckBox = ({
  label,
  isChecked,
  onCheck,
  children,
  onChildCheck,
  selectedChildChaptersAndTopics,
  isLoading,
  totalQuestions
}: {
  label: string
  isChecked: boolean
  selectedChildChaptersAndTopics: any
  onCheck: (checked: boolean) => void
  onChildCheck: (d: SubTopicsDetails) => void
  children?: any[]
  isLoading?: boolean
  totalQuestions?: number
}) => {
  return (
    <>
      <CheckboxContainer
        className="checkbox"
        onClick={() => onCheck(!isChecked)}
        isChecked={isChecked}
      >
        <Checkbox>{isChecked ? <CheckedSvg /> : <UnCheckedSvg />}</Checkbox>
        <span>{label}</span>
        {totalQuestions ? <span>({totalQuestions})</span> : ''}
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
        children.map((itm: SubTopicsDetails) => (
          <CheckboxContainerChild
            key={`children_topics_${itm._id}`}
            className="checkbox"
            onClick={() => onChildCheck(itm)}
            isChecked={
              selectedChildChaptersAndTopics._id == itm._id ? true : false
            }
          >
            <Checkbox>
              {selectedChildChaptersAndTopics._id == itm._id ? (
                <CheckedSvg />
              ) : (
                <UnCheckedSvg />
              )}
            </Checkbox>
            <span>{itm?.name}</span>
          </CheckboxContainerChild>
        ))
      )}
    </>
  )
}

export default SingleSelectItemCheckBox

const CheckboxContainer = styled.div<{ isChecked: boolean }>`
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 16px;
  border: ${(props) => (props?.isChecked ? 'none' : '1px solid #A3AED054')};
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
  margin-left: 20px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

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
