import File from '../../../assets/download.png'
import styled from 'styled-components'
import { getScoreExcelApi } from '../../../helpers/V2/apis'

const DownloadComponent = (props: any) => {
  const handleClick = () => {
    getScoreExcelApi({
      testId: props?.row
    })
      .then((res) => {
        const filePath = res.data.filePath
        if (filePath) {
          const fileName = `${props?.row}.xlsx`
          const link = document.createElement('a')
          link.href = filePath
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          console.error('File path is not available')
        }
      })
      .catch((error) => {
        console.error({ error })
      })
  }

  return (
    <BFlex onClick={handleClick}>
      <div>Download Excel</div>
      <img src={File} alt="File" height="30px" />
    </BFlex>
  )
}

export default DownloadComponent

const BFlex = styled.div`
  border-radius: 20px;
  color: white;
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 14px;
  background-color: #6c64d8;
  display: flex;
  justify-content: center;
  align-self: last baseline;
  align-items: center;
  gap: 11px;
  width: 170px;
  min-width: 60px;
  cursor: pointer;
  margin-right: 20px;
`
