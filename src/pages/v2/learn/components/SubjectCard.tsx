import SubjectLogo from '../../../../assets/subject-logo.png'
import { SubjectCardProps } from '../types'
import { CardWrapper, Logo, SubjectName, Details } from './styledComponents'

const SubjectCard = ({
  active,
  subjectName,
  details,
  logo,
  onSelectSubject
}: SubjectCardProps) => {
  return (
    <CardWrapper onClick={() => onSelectSubject()} active={active}>
      <Logo alt="Subject" src={logo ?? SubjectLogo} />
      <div>
        <SubjectName>{subjectName}</SubjectName>
        <Details>{details}</Details>
      </div>
    </CardWrapper>
  )
}

export default SubjectCard
