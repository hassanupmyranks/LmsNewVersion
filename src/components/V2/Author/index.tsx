import { ReactElement, useEffect, useState, useMemo } from 'react'
import {
  AuthorHeading,
  DropDownContainer,
  PageContainer
} from './styledComponents'
import SearchableDropdown from '../Form/SearchableDropdown'
import { listAuthorResponse } from '../../../utils/types'
import { getAuthorListAPI } from '../../../helpers/V2/apis'

const Author = (): ReactElement => {
  const [authorList, setAuthorList] = useState<listAuthorResponse[]>([])

  useEffect(() => {
    getAuthorListAPI()
      .then((response) => {
        setAuthorList(response)
      })
      .catch((error) => console.log({ error }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const optionValues = useMemo(() => {
    return authorList.map((eachAuthor) => {
      const joiningDate = new Date(eachAuthor.createdAt)
      return {
        value: `Data added - ${joiningDate.getDate()}nd,${joiningDate.toLocaleString(
          'en-US',
          { month: 'short' }
        )} ${joiningDate.getFullYear()}`,
        label: eachAuthor.name,
        id: String(eachAuthor._id),
        url:
          eachAuthor.profileImage === undefined ? '' : eachAuthor.profileImage
      }
    })
  }, [authorList])

  return (
    <PageContainer>
      <AuthorHeading>Select Author</AuthorHeading>
      <DropDownContainer>
        <SearchableDropdown
          label={'Select Author'}
          options={optionValues}
          onSelect={() => {}}
          required={true}
          fullWidth={false}
          placeHolder={'Please select auhtor'}
        />
      </DropDownContainer>
    </PageContainer>
  )
}
export default Author
