import styled from 'styled-components'

const PublishButtonV2 = ({ status }: { status: number }) => {
  return (
    <PublishButton>
      {status === 200 ? (
        <PublishedButtonContainer>Published</PublishedButtonContainer>
      ) : (
        <PublishButtonContainer>Publish</PublishButtonContainer>
      )}
    </PublishButton>
  )
}

export default PublishButtonV2
const PublishButton = styled.div`
  all: unset;
`

const PublishButtonContainer = styled.button`
  all: unset;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 33px;
  background-color: rgba(1, 181, 116, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  font-weight: 400;
  line-height: 19.1px;
  font-family: 'Nunito';
  width: 120px;
  height: 27px;
  top: 146px;
  left: 1281px;
`
const PublishedButtonContainer = styled.button`
  all: unset;

  cursor: pointer;
  padding: 12px 20px;
  border-radius: 33px;
  background-color: rgba(1, 181, 116, 0.1);
  color: rgba(1, 181, 116, 1);
  font-size: 24px;
  font-weight: 400;
  line-height: 19.1px;
  font-family: 'Nunito';
  width: 120px;
  height: 27px;
  top: 146px;
  left: 1281px;
`
