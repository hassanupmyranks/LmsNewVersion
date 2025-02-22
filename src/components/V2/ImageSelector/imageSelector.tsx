import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  BigCircle,
  ButtonWrapper,
  CameraIcon,
  IconCircle,
  SmallCircle,
  Image
} from './styledComponents'
import UserProfile from '../../../assets/Teacherreplace.jpeg'

interface ImageSelectorProps {
  onImageSelected: (file: File) => void
  reset?: boolean
  defaultvalue: any
}

const ImageSelector = ({
  onImageSelected,
  reset,
  defaultvalue
}: ImageSelectorProps) => {
  const [imageSrc, setImageSrc] = useState<string>(UserProfile)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (defaultvalue) {
      setImageSrc(defaultvalue)
    }
  }, [defaultvalue])

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

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <BigCircle>
      <SmallCircle>
        <IconCircle onClick={handleCameraClick}>
          {reset ? (
            <ButtonWrapper>
              <CameraIcon />
            </ButtonWrapper>
          ) : (
            <Image src={imageSrc} alt="" />
          )}
          {/*           
          defaultvalue ? (
            <Image src={defaultvalue} alt="" />
          ) : imageSrc ? (
            <Image src={imageSrc} alt="" />
          ) : defaultvalue ? (
            <Image src={defaultvalue} alt="" />
          ) : (
            <ButtonWrapper>
              <CameraIcon />
            </ButtonWrapper>
          )} */}
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
  )
}

export default ImageSelector
