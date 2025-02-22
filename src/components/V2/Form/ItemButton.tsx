import styled from 'styled-components'
import { ReactComponent as DeleteIconSvg } from '../../../assets/svg/Delete.svg'
import { SecondaryGray } from '../../../const/V2/stylingVariables'

const ItemButton = ({
  label,
  onClick
}: {
  label: string
  onClick?: () => void
}) => {
  return (
    <ButtonContainer>
      <span>{label}</span>
      <DeleteIcon onClick={onClick} />
    </ButtonContainer>
  )
}

export default ItemButton

const ButtonContainer = styled.div`
  padding: 16px 18px;

  display: flex;
  align-items: center;
  gap: 20px;

  border-radius: 16px;
  border: 1px solid ${SecondaryGray};
`

const DeleteIcon = styled(DeleteIconSvg)`
  cursor: pointer;
`
