import styled from 'styled-components'
import {
  Blue,
  SecondaryGray,
  SecondaryGray600
} from '../../../../const/V2/stylingVariables'

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  padding: 0px 5px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  & thead {
    position: sticky;
    top: -18px;
    background-color: #f4f7fe;
    height: 52px;
  }

  @media (max-width: 992px) {
    overflow: visible;
  }
`
export const UploadAssignment = styled.div`
  height: auto;
  width: 500px;
  border-radius: 1rem;
  border: 1px solid ${SecondaryGray};
  margin: 10px 0px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 992px) {
    width: 100%;
  }
`
export const WordTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  font-family: 'DM Sans';
  color: ${Blue};
  line-height: 24px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`
export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-left: 0px;
  }
`
export const FileType = styled.div`
  font-size: 16px;
  font-family: 'DM Sans';
  font-weight: 400;
  color: ${SecondaryGray600};
  margin-left: 25px;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-left: 4px;
  }
`

export const Block = styled.div`
  display: block;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  margin-top: 0px;
`
export const UploadUI = styled.div`
  background-color: white;
  border-radius: 15px;
  min-height: 620px;
  height: fit-content;
  width: 540px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`
export const TableRow = styled.tr`
  height: 50px;
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
  padding: 18px;
  gap: 20px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`
