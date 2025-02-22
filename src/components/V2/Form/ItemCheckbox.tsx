import styled from 'styled-components'
import { Blue, BlueButton, LightBlue } from '../../../const/V2/stylingVariables'
import { ReactComponent as CheckedSvg } from '../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../assets/svg/un-check-icon.svg'
import { SubTopicsDetails } from '../../../utils/types'
import { Spinner } from 'react-bootstrap'
import { Count } from '../SideMenu/styledComponents'

const ItemCheckbox = ({
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
  selectedChildChaptersAndTopics: string[]
  onCheck: (checked: boolean) => void
  onChildCheck: (d: SubTopicsDetails) => void
  children?: SubTopicsDetails[]
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
        {totalQuestions == undefined ? '' : <Count>{totalQuestions}</Count>}

        {/* {totalQuestions ? <span>({totalQuestions})</span> : ''} */}
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
            onClick={() => onChildCheck(itm)}
            isChecked={selectedChildChaptersAndTopics.includes(itm._id)}
          >
            <Checkbox>
              {selectedChildChaptersAndTopics.includes(itm._id) ? (
                <CheckedSvg />
              ) : (
                <UnCheckedSvg />
              )}
            </Checkbox>
            <span>{itm?.name}</span>
            {itm?.questionCount == undefined ? (
              ''
            ) : (
              <Count>{itm?.questionCount}</Count>
            )}
          </CheckboxContainerChild>
        ))
      )}
    </>
  )
}

export default ItemCheckbox

export const CheckboxContainer = styled.div<{ isChecked: boolean }>`
  padding: 16px 16px;
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

  @media (max-width: 768px) {
    padding: 6px 6px;
  }
`
export const Checkbox = styled.div`
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
