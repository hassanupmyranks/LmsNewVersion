import React, { ReactElement } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import styled from 'styled-components'
import { BlueButton } from '../../../const/V2/stylingVariables'

const LoadingIndicator = styled(Spinner)`
  margin: 12px auto;
  display: block;
  width: 50px;
  height: 50px;
  color: ${BlueButton};
`

interface LoaderProps {
  buttonLoader?: boolean
  text?: any
}

const Loader = ({ buttonLoader, text }: LoaderProps): ReactElement => {
  return buttonLoader ? (
    <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
      <Spinner
        style={{
          width: '20px',
          height: '20px',
          margin: '0 auto',
          color: `${BlueButton}`
        }}
        animation={'border'}
      />
      <span
        style={{ display: 'flex', textAlign: 'center', marginLeft: '10px' }}
      >
        {text}
      </span>
    </div>
  ) : (
    <>
      <LoadingIndicator animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </LoadingIndicator>
    </>
  )
}

export default Loader
