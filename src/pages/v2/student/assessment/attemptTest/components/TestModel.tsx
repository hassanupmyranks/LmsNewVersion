import React, { useRef } from 'react'
import styled from 'styled-components'
import { Blue } from '../../../../../../const/V2/stylingVariables'
import useOnClickOutside from '../../../../../../hooks/useOnClickOutside'

const TestModel = ({ handleModel }: { handleModel: () => void }) => {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, handleModel)
  return (
    <Container>
      <Model ref={ref}>
        You are on track; please do not try to switch the tabs on the screen
        once the test has begun. If you again switch, we will terminate your
        test.
      </Model>
    </Container>
  )
}

export default TestModel

const Container = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: grid;
  place-items: center;
`

const Model = styled.div`
  max-width: 600px;
  padding: 40px;
  border: 1px solid ${Blue};
  border-radius: 24px;
  color: ${Blue};
  font-size: 30px;
  font-weight: 700;
  background-color: #fff;
  text-align: center;
`
