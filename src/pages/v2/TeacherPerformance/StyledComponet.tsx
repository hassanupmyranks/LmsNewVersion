import styled from 'styled-components'

export const TecherProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`
export const GraphandTableContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  padding: 20px;
  overflow: auto;
  @media (max-width: 768px) {
    width: 100% !important;
  }
`
export const GraphandTableContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  padding: 20px;
  overflow: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const GraphandTableContainer3 = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  /* padding: 20px; */
  overflow: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`
