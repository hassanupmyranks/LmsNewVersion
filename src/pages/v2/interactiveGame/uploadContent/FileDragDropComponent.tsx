import { ReactElement, useEffect, useRef } from 'react'

import { ReactComponent as UploadIcon } from '../../../../assets/svg/upload-icon.svg'
import { FileUploaderProps } from '../../../../utils/types'
import {
  FileCircle,
  FileContainer,
  InnerContainer,
  MainMessage,
  MessageContainer,
  SuccessfulUploadMessage,
  UploadFileMessageContainer
} from '../../../../components/V2/FileDragAndDrop/styledComponents'

const FileDragDropComponent = ({
  onFileChange,
  values,
  setValues,
  width,
  accept,
  fileTypeName
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
    <form style={{ width: width }}>
      <input
        type="file"
        name="file"
        hidden
        ref={fileInputRef}
        onChange={onChangeEvent}
        accept={accept ? accept : ''}
      />
      <FileContainer onClick={handleFileSelect}>
        <InnerContainer>
          <FileCircle>
            <UploadIcon width={28} height={30} />
          </FileCircle>
          <MessageContainer>
            {values === undefined ? (
              <UploadFileMessageContainer>
                <MainMessage>Click to Select File</MainMessage>
              </UploadFileMessageContainer>
            ) : (
              <SuccessfulUploadMessage>
                {values?.name ? values.name : `File.${fileTypeName}`}
              </SuccessfulUploadMessage>
            )}
          </MessageContainer>
        </InnerContainer>
      </FileContainer>
    </form>
  )
}

export default FileDragDropComponent
