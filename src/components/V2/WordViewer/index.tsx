import styled from 'styled-components'
import CLOSE from '../../../assets/close.png'

const WordViewer = ({
  url,
  closeHandler
}: {
  url: string
  closeHandler: () => void
}) => {
  const officeOnlineViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=`

  return (
    <PopupViewer>
      <PopupContainer>
        <IconViewer onClick={closeHandler}>
          <Icon src={CLOSE} alt="" />
        </IconViewer>
        <WordContainer>
          <iframe
            title="Word Document Viewer"
            src={`${officeOnlineViewerUrl}${url}`}
            style={{ marginTop: '2%' }}
            width="95%"
            height="95%"
            allowFullScreen={true}
          ></iframe>
        </WordContainer>
      </PopupContainer>
    </PopupViewer>
  )
}

export default WordViewer

export const PopupViewer = styled.div`
  z-index: 1000;
  position: absolute;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`
export const PopupContainer = styled.div`
  position: relative;

  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 50%;
  height: 80%;

  @media (max-width: 1400px) {
    width: 85%;
  }

  @media (max-width: 800px) {
    width: 98%;
  }
`

export const IconViewer = styled.div`
  /* position: relative; */
  display: flex;
  /* background: rgba(0, 0, 0, 0.5); */
  justify-content: flex-end;

  width: 100%;
`
export const WordContainer = styled.div`
  position: relative;
  background-color: #ffff;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 95%;
  height: 100%;
  overflow-x: auto;
`
export const Icon = styled.img`
  width: auto;
`
