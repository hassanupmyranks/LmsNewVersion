import { ChangeEvent, useRef, useState } from 'react'
import {
  BigCircle,
  ButtonWrapper,
  CameraIcon,
  IconCircle,
  SmallCircle,
  Image,
  UploadDiv,
  InsIcon,
  InstituteImage,
  InstituteImageViewer
} from './styledComponents'
import { CustomToastMessage } from '../../ToastMessage'

interface ImageSelectorProps {
  onImageSelected: (file: File) => void
  reset?: boolean
  defaultvalue: any
  instituteImage: (file: File) => void
  InstituteDefaultvalue: any
}

const InstituteImageSelector = ({
  onImageSelected,
  reset,
  defaultvalue,
  instituteImage,
  InstituteDefaultvalue
}: ImageSelectorProps) => {
  const [imageSrc, setImageSrc] = useState<string>()
  const [instituteImageSrc, setinstituteImageSrc] = useState<string>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const instuteImage = useRef<HTMLInputElement>(null)
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imagePath = e.target?.result as string
        setImageSrc(imagePath)
        onImageSelected(file)
      }
      reader.readAsDataURL(file)
    }
  }

  // const handleInstuteImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const fileInstute = event.target.files?.[0]

  //   if (fileInstute) {
  //     const readerImg = new FileReader()
  //     readerImg.onload = (e) => {
  //       const imagePathIns = e.target?.result as string
  //       setinstituteImageSrc(imagePathIns)
  //       instituteImage(fileInstute)
  //     }
  //     readerImg.readAsDataURL(fileInstute)
  //   }
  // }

  const handleInstuteImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInstute = event.target.files?.[0]

    if (fileInstute) {
      // Check if the file size exceeds 500 KB
      const maxSizeInBytes = 500 * 1024 // 500 KB
      if (fileInstute.size > maxSizeInBytes) {
        // Set your error message here
        const errorMessage = 'File size should not exceed 500KB'
        CustomToastMessage(errorMessage, 'error') // or use a state to display it in your UI
        return // Exit the function if file size is too large
      }

      const readerImg = new FileReader()
      readerImg.onload = (e) => {
        const imagePathIns = e.target?.result as string
        setinstituteImageSrc(imagePathIns)
        instituteImage(fileInstute)
      }
      readerImg.readAsDataURL(fileInstute)
    }
  }

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleInstuteClick = () => {
    if (instuteImage.current) {
      instuteImage.current.click()
    }
  }

  return (
    <InstituteImageViewer>
      <UploadDiv onClick={handleInstuteClick}>
        {reset ? (
          <ButtonWrapper style={{ width: '100%', height: '200px' }}>
            <InsIcon />
          </ButtonWrapper>
        ) : InstituteDefaultvalue ? (
          <InstituteImage
            src={instituteImageSrc ? instituteImageSrc : InstituteDefaultvalue}
            alt=""
            style={{ width: '100%', height: '200px', zIndex: '-1' }}
          />
        ) : instituteImageSrc ? (
          <InstituteImage
            src={instituteImageSrc}
            alt=""
            style={{ width: '100%', height: '200px', zIndex: '-1' }}
          />
        ) : (
          <ButtonWrapper style={{ width: '100%', height: '200px' }}>
            <InsIcon />
          </ButtonWrapper>
        )}
        <input
          type="file"
          style={{ display: 'none' }}
          ref={instuteImage}
          onChange={handleInstuteImageChange}
          accept="image/*"
        />
      </UploadDiv>
      <BigCircle>
        <SmallCircle>
          <IconCircle onClick={handleCameraClick}>
            {reset ? (
              <ButtonWrapper>
                <CameraIcon />
              </ButtonWrapper>
            ) : defaultvalue ? (
              <Image src={imageSrc ? imageSrc : defaultvalue} alt="" />
            ) : imageSrc ? (
              <Image src={imageSrc} alt="" />
            ) : (
              <ButtonWrapper>
                <CameraIcon />
              </ButtonWrapper>
            )}
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
            />
          </IconCircle>
        </SmallCircle>
      </BigCircle>
    </InstituteImageViewer>
  )
}

export default InstituteImageSelector
