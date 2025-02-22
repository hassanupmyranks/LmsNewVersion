import { Container, Div, P } from './styledComponents'
import InstituteImageSelector from '../../../../../components/V2/Form/InstituteandprofileImage/imageInstitute'
import { InstuteImageprops } from './types'

const InstituteLogo = ({
  setImageInstute,
  setImage,
  image,
  imageInstute,
  instituteImagedefault,
  instituteLogodefault,
  EditOrAdd
}: InstuteImageprops) => {
  console.log(image, imageInstute)
  return (
    <Container>
      <div>
        <InstituteImageSelector
          onImageSelected={(file: File) => {
            setImage(file)
          }}
          defaultvalue={instituteLogodefault}
          instituteImage={(file: File) => {
            setImageInstute(file)
          }}
          InstituteDefaultvalue={instituteImagedefault}
        ></InstituteImageSelector>
      </div>
      <Div style={{ marginTop: '15%' }}>
        <P fontSize={20} style={{ paddingBottom: '8px' }}>
          {EditOrAdd == 'institute' ? 'Add' : 'Edit'} Institute / School Logo &
          Background image
        </P>
        <p>Image requirements</p>
        <ul>
          <li>Minimum size 500x500</li>
          <li>Should be in PNG,JPG,JPEG format</li>
        </ul>
      </Div>
    </Container>
  )
}

export default InstituteLogo
