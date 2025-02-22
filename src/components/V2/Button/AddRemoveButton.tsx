import styled from 'styled-components'
import { ReactComponent as RemoveIcon } from '../../../assets/svg/remove-minus.svg'
import { ReactComponent as AddPlusIcon } from '../../../assets/svg/add-plus.svg'

const AddRemoveButtonV2 = ({
  isSelected,
  onClick
}: {
  isSelected?: boolean
  onClick?: (d: any) => void
}) => {
  return (
    <AddRemoveButton onClick={onClick}>
      {isSelected ? <RemoveIcon /> : <AddPlusIcon />}
    </AddRemoveButton>
  )
}

export default AddRemoveButtonV2

const AddRemoveButton = styled.div`
  background: #ddf1ff;
  height: 43px;
  width: 43px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
