import { ReactElement, useEffect, useRef } from 'react'

import { ReactComponent as MicroSoftIcon } from '../../../assets/svg/microsoft-word.svg'
import { FileUploaderProps } from '../../../utils/types'
import {
  FileCircle,
  FileContainer,
  InnerContainer,
  MainMessage,
  MessageContainer,
  SuccessfulUploadMessage,
  UploadFileMessageContainer
} from './styledComponents'

const FileDragDropComponent = ({
  onFileChange,
  values,
  setValues
}: FileUploaderProps): ReactElement => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onChangeEvent = (event: any) => {
    const { files } = event.target
    onFileChange(files)
    setValues(files[0])
  }
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    if (values === undefined && fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [values])

  return (
    <form style={{ maxWidth: '100%' }}>
      <input
        type="file"
        name="file"
        hidden
        ref={fileInputRef}
        onChange={onChangeEvent}
      />
      <FileContainer onClick={handleFileSelect}>
        <InnerContainer>
          <FileCircle>
            <MicroSoftIcon />
          </FileCircle>
          <MessageContainer>
            {values === undefined ? (
              <UploadFileMessageContainer>
                <MainMessage>Click to Select File</MainMessage>
              </UploadFileMessageContainer>
            ) : (
              <SuccessfulUploadMessage>{values?.name}</SuccessfulUploadMessage>
            )}
          </MessageContainer>
        </InnerContainer>
      </FileContainer>
    </form>
  )
}

export default FileDragDropComponent
