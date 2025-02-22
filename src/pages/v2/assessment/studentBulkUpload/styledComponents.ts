import styled from 'styled-components'
import {
  Blue,
  SecondaryGray,
  SecondaryGray600
} from '../../../../const/V2/stylingVariables'

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  padding: 0px 20px;
  margin-top: 20px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  & thead {
    position: sticky;
    top: -22px;
    background-color: #f4f7fe;
    height: 50px;
  }

  @media (max-width: 992px) {
    overflow: visible;
  }
`
export const UploadAssignment = styled.div`
  height: auto;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${SecondaryGray};
  margin: 20px 0px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const WordTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  font-family: 'DM Sans';
  color: ${Blue};
  line-height: 24px;
`
export const Format = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Blue};
  line-height: 24px;
`
export const AlignFiles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Anchor = styled.a`
  text-decoration: none;
`
export const Files = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 30px;
`
export const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${Blue};
`

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 10px;
`
export const FileType = styled.div`
  font-size: 16px;
  font-family: 'DM Sans';
  font-weight: 400;
  color: ${SecondaryGray600};
  margin-left: 25px;
`

export const Block = styled.div`
  display: block;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`
export const UploadUI = styled.div`
  background-color: white;
  border-radius: 15px;
  // min-height: 400px;
  height: fit-content;
  width: 875px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
  // margin: 20px 0px 20px 20px;
`
export const TableRow = styled.tr`
  height: 70px;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
`
export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0px 20px;
  width: 100%;
`
export const TableRowFirst = styled.td`
  background-color: white;
  border-radius: 15px 0px 0px 15px;
`
export const TableRowLast = styled.td`
  background-color: white;
  border-radius: 0px 15px 15px 0px;
`
export const Uploaded = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  border-radius: 18px;
  background-color: #01b574;
  color: white;
  font-size: 14px;
`
export const Pending = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  border-radius: 18px;
  background-color: #fcf6e9;
  color: #e0a922;
  font-size: 14px;
`
export const PageWrapper = styled.div`
  display: flex;
  height: calc(100vh - 77px);
  overflow-y: auto;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const MainMessage = styled.p`
  color: #40ad40;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`
export const SuccessfulUploadMessage = styled.div`
  color: #40ad40;
  text-align: center;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`
export const FileCircle = styled.img`
  border-radius: 50%;
  background-color: #ddf1ff;
  width: 50px;
  height: 50px;
  margin-top: 10px;
`
