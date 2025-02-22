import styled from 'styled-components'

export const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: auto;
  margin: 16px;

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
