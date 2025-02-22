import styled from 'styled-components'

export const MainWrapper = styled.div`
  height: 68vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: auto;
  padding: 17px;
  gap: 10px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
export const BranchWrapper = styled.div`
  height: 100vh;
  position: relative;
  top: 0;
`
export const FilterContainer = styled.div`
  display: flex;
  position: sticky;
  z-index: 999;
  margin-left: 18px;
  margin-right: 18px;
  gap: 15px;
  margin-bottom: 15px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0px;
  }
`
