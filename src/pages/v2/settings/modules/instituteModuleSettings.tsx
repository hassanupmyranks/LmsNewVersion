import { useEffect, useState } from 'react'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  getRoleModulesAPI,
  getSingleInstituteModulesAPI,
  rolemodulesSettingsAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { FormContainerV2 } from '../../assessment/TestPreview/subcomponents'
import { Flex } from '../../../../components/V2/styledComponents'
import {
  ButtonDiv,
  Checkbox,
  CheckboxContainer,
  FieldLabel,
  Fields,
  SecondDiv,
  SelectContainer,
  SelectedFieldContainer,
  SubHeading
} from './styledComponents'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'
import styled from 'styled-components'
import SimpleButton from '../../../../components/V2/Button/SimpleButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

const InstituteModulesSettings = () => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const [selectedData, setSelectedData] = useState<any[]>([])
  const [selectedRole, setSelectedRole] = useState<any>()
  const [selectedData2, setSelectedData2] = useState<any[]>([])
  const [isRoleSubmitting, setIsRoleSubmitting] = useState(false)

  const [roles] = useState<any[]>([
    { label: 'Institute Admin ', id: 'instituteAdmin' },
    { label: 'Branch Admin ', id: 'branchAdmin' },
    { label: 'Student ', id: 'student' },
    { label: 'Teacher', id: 'teacher' }
  ])

  const [roleModulesList, setRoleModulesList] = useState<any>([])

  useEffect(() => {
    getSingleInstituteModulesAPI({
      instituteId: user?.instituteId
    })
      .then((res) => {
        setSelectedData2([])
        if (res && res.data?.length > 0) {
          setRoleModulesList(res.data)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }, [user])

  const onCheck = (value: any) => {
    let newSelectedData = [...selectedData]
    console.log(
      newSelectedData.some((id: any) => id === value?.id),
      'newSelectedData.some((id: any) => id === value?.id'
    )

    // let newSelectedFullData = [...selectedFullData]

    if (!newSelectedData.some((id: any) => id === value?.id)) {
      newSelectedData.push(value?.id)
      // newSelectedFullData.push(value)
    } else {
      newSelectedData = newSelectedData.filter((id: any) => id !== value?.id)
      // newSelectedFullData = newSelectedFullData.filter(
      //   (field: any) => field.field !== value?.field
      // )
    }
    // setSelectedFullData(newSelectedFullData)
    setSelectedData(newSelectedData)
  }

  const handleGetRoles = () => {
    getRoleModulesAPI({
      role: 'ins',
      instituteId: ''
    })
      .then((res) => {
        let newSelectedData: any = []
        res.data.map((item: any) => {
          newSelectedData.push(item.id)
        })
        setSelectedData2(newSelectedData)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }

  const handleSetRoles = () => {
    if (user?.instituteId && selectedRole?.id) {
      setIsRoleSubmitting(true)
      const payload = {
        instituteId: user?.instituteId,
        lmsModules: selectedData2,
        role: selectedRole.id
      }
      rolemodulesSettingsAPI(payload)
        .then((res: any) => {
          CustomToastMessage(res.message, 'success')
          setSelectedData2([])
          setSelectedRole({ label: '', id: '' })
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsRoleSubmitting(false))
    } else {
      CustomToastMessage('Please Select Role', 'error')
    }
  }

  return (
    <FormContainerV2 style={{ margin: '20px' }}>
      <div>
        <Flex
          style={{ width: '100%', margin: '20px 0px' }}
          gap="20px"
          alignItems="start"
        >
          <SecondDiv>
            <SubHeading>Modules for Role</SubHeading>
            <Flex gap="20px">
              {/* <SearchableDropdown
                style={{ width: '290px' }}
                isLoader={insLoading}
                label={'Select Institute / School'}
                placeHolder={'Please Select Institute / School'}
                options={instituteData}
                isClear={!!selectedInstitute2?.id}
                onSelect={(option) => {
                  setSelectedInstitute2(option)
                  if (option.id) {
                    checkInstitute2(String(option.id))
                  }
                }}
                selectedValue={selectedInstitute2}
              /> */}
              <SearchableDropdown
                style={{ width: '290px' }}
                label={'Select Role'}
                placeHolder={'Please Select Role'}
                options={roles}
                isClear={!!selectedRole?.id}
                onSelect={(option) => {
                  setSelectedRole(option)
                  handleGetRoles()
                }}
                selectedValue={selectedRole}
              />
            </Flex>
            <SelectContainer>
              <SelectedFieldContainer>
                {roleModulesList.map((item: any, index: any) => (
                  <Fields key={`key_${index}`}>
                    <CheckboxContainer
                      className="d-flex justify-content-center"
                      onClick={() => onCheck(item)}
                      onKeyDown={() => onCheck(item)}
                      role="button" // Adding role="button" to indicate this is an interactive element
                      tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
                    >
                      <Checkbox>
                        {selectedData2.some((id) => id === item.id) ? (
                          <CheckedSvg />
                        ) : (
                          <UnCheckedSvg />
                        )}
                      </Checkbox>
                    </CheckboxContainer>{' '}
                    <FieldLabel>{item.name}</FieldLabel>{' '}
                  </Fields>
                ))}

                {/* {selectedFullData.map((field: any, index: number) => {
                  return index === 0 ? (
                    <ProfileField key={`key_${index}`}></ProfileField>
                  ) : (
                    <SelectedInputField key={`key_${index}`}>
                      <p>{field.name}</p>
                    </SelectedInputField>
                  )
                })} */}
              </SelectedFieldContainer>
            </SelectContainer>
            <ButtonDiv>
              <SimpleButton
                label={'Submit'}
                clickHandler={() => handleSetRoles()}
                disabled={isRoleSubmitting}
              />
            </ButtonDiv>
          </SecondDiv>
        </Flex>
      </div>
    </FormContainerV2>
  )
}

export default InstituteModulesSettings

export const TableWrapper = styled.div`
  width: 100%;
  max-height: 55vh;
  overflow-y: auto;
  padding: 0px 5px;
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    width: 3px;
  }

  & thead {
    position: sticky;
    top: -5px;
    background-color: #f4f7fe;
    height: 47px;
  }

  @media (max-width: 992px) {
    overflow: visible;
  }
`
