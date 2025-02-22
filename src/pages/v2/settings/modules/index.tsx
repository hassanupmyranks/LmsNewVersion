import { useEffect, useState } from 'react'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  getAllInstituteAPI,
  getModulesAPI,
  getRoleModulesAPI,
  getSingleInstituteModulesAPI,
  modulesSettingsAPI,
  rolemodulesSettingsAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { FormContainerV2 } from '../../assessment/TestPreview/subcomponents'
import { Flex } from '../../../../components/V2/styledComponents'
import {
  ButtonDiv,
  Checkbox,
  CheckboxContainer,
  ChildFields,
  FieldContainer,
  FieldLabel,
  Fields,
  FirstDiv,
  SecondDiv,
  SelectContainer,
  SelectedFieldContainer,
  SubHeading
} from './styledComponents'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'
import styled from 'styled-components'
import SimpleButton from '../../../../components/V2/Button/SimpleButton'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

interface SubModule {
  id: string
  name: string
}

interface Module {
  id: string
  subModules: string[]
}

interface SelectedLMSModule {
  module: string
  subModules?: string[]
}

const ModulesSetings = () => {
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )

  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [selectedInstitute, setSelectedInstitute] = useState<any>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>()
  const [selectedData2, setSelectedData2] = useState<any[]>([])
  const [isRoleSubmitting, setIsRoleSubmitting] = useState(false)
  const [selectedLMSModules, setSelectedLMSModules] = useState<
    SelectedLMSModule[]
  >([])

  const [roles, setRoles] = useState<any[]>([
    { label: 'Institute Admin ', id: 'instituteAdmin' },
    { label: 'Branch Admin ', id: 'branchAdmin' },
    { label: 'Student ', id: 'student' },
    { label: 'Teacher', id: 'teacher' }
  ])

  const [modulesList, setModulesList] = useState<any>([])
  const [roleModulesList, setRoleModulesList] = useState<any>([])
  const [isModulesLoading, setModulesLoading] = useState(false)
  // const [isInstituteAdmin, setIsInstituteAdmin] = useState(false)

  useEffect(() => {
    if (user.role === 'superAdmin') {
      let newInstitute: any = []
      setInsLoading(true)
      const payload = {
        page: 1,
        limit: 150
      }
      getAllInstituteAPI(payload)
        .then((res: any) => {
          newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name
            }
          })
          setInstituteData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInsLoading(false))

      setModulesLoading(true)
      const payload2 = {
        page: 1,
        limit: 150
      }
      getModulesAPI(payload2)
        .then((res: any) => {
          setModulesList(res.data)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setModulesLoading(false))
    }
  }, [user])

  useEffect(() => {
    if (user.role !== 'superAdmin') {
      getRoleModulesAPI({
        // role: role.id,
        // instituteId: selectedInstitute2.id
      })
        .then((res) => {
          setRoleModulesList(res.data)
          // let newSelectedData: any = []
          // res.data.map((item: any) => {
          //   if (item.subModules.length > 0) {
          //     newSelectedData.push({
          //       module: item.id,
          //       subModules:
          //         item.subModules.length > 0
          //           ? item.subModules.map((id: any) => id.id)
          //           : []
          //     })
          //   } else {
          //     newSelectedData.push({
          //       module: item.id
          //     })
          //   }
          // })
          // setSelectedData2(newSelectedData)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [user])

  const onModuleCheck = (value: any) => {
    const moduleId = value?.id
    const isSelected = selectedLMSModules.some(
      (mItem: any) => mItem.module === moduleId
    )

    let newSelectedData = [...selectedLMSModules]

    if (!isSelected) {
      const moduleData = modulesList.find((mItem: any) => mItem.id === moduleId)

      if (moduleData) {
        newSelectedData.push({
          module: moduleId,
          ...(moduleData.subModules.length > 0 && {
            subModules: moduleData.subModules.map((item: any) => item.id)
          })
        })
      }
    } else {
      newSelectedData = newSelectedData.filter(
        (item: any) => item.module !== moduleId
      )
    }

    setSelectedLMSModules(newSelectedData)
  }

  const onSubModuleCheck = (module: Module, subModule: SubModule) => {
    const newSelectedData: SelectedLMSModule[] = [...selectedLMSModules]
    const moduleIndex = newSelectedData.findIndex(
      (item) => item.module === module.id
    )
    if (moduleIndex !== -1) {
      const moduleItem: any = {
        module: newSelectedData[moduleIndex].module,
        subModules: newSelectedData[moduleIndex].subModules
          ? newSelectedData[moduleIndex].subModules
          : []
      }
      const subModuleIndex = moduleItem?.subModules?.indexOf(subModule.id)

      if (subModuleIndex === -1) {
        moduleItem?.subModules.push(subModule.id)
      } else {
        moduleItem.subModules.splice(subModuleIndex, 1)
      }
      newSelectedData[moduleIndex] = moduleItem
    }

    setSelectedLMSModules(newSelectedData)
  }

  const onRoleModuleCheck = (value: any) => {
    const moduleId = value?.id
    const isSelected = selectedData2.some(
      (mItem: any) => mItem.module === moduleId
    )

    let newSelectedData = [...selectedData2]

    if (!isSelected) {
      const moduleData = roleModulesList.find(
        (mItem: any) => mItem.id === moduleId
      )

      if (moduleData) {
        newSelectedData.push({
          module: moduleId,
          ...(moduleData.subModules.length > 0 && {
            subModules: moduleData.subModules.map((item: any) => item.id)
          })
        })
      }
    } else {
      newSelectedData = newSelectedData.filter(
        (item: any) => item.module !== moduleId
      )
    }
    setSelectedData2(newSelectedData)
  }

  const onRoleSubModuleCheck = (module: Module, subModule: SubModule) => {
    const newSelectedData: SelectedLMSModule[] = [...selectedData2]
    const moduleIndex = newSelectedData.findIndex(
      (item) => item.module === module.id
    )
    if (moduleIndex !== -1) {
      const moduleItem: any = {
        module: newSelectedData[moduleIndex].module,
        subModules: newSelectedData[moduleIndex].subModules
          ? newSelectedData[moduleIndex].subModules
          : []
      }
      const subModuleIndex = moduleItem?.subModules?.indexOf(subModule.id)

      if (subModuleIndex === -1) {
        moduleItem?.subModules.push(subModule.id)
      } else {
        moduleItem.subModules.splice(subModuleIndex, 1)
      }
      newSelectedData[moduleIndex] = moduleItem
    }

    setSelectedData2(newSelectedData)
  }

  const handleSubmit = () => {
    if (selectedInstitute?.id) {
      let newSelectedmodule = [...selectedLMSModules]
      newSelectedmodule.map((item) => {
        if (item.subModules && item.subModules.length <= 0) {
          delete item.subModules
        }
      })

      setIsSubmitting(true)
      const payload = {
        instituteId: selectedInstitute?.id,
        lmsModules: newSelectedmodule
      }
      modulesSettingsAPI(payload)
        .then((res: any) => {
          CustomToastMessage(res.message, 'success')
          setSelectedInstitute({
            id: '',
            label: ''
          })
          setSelectedLMSModules([])
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsSubmitting(false))
    } else {
      CustomToastMessage('Please Select Institue', 'error')
    }
  }

  const checkInstitute = (instituteId: string) => {
    getSingleInstituteModulesAPI({
      instituteId: instituteId
    })
      .then((res) => {
        if (res && res.data?.length > 0) {
          let newSelectedData: any = []
          res.data.map((item: any) => {
            newSelectedData.push({
              module: item.id,
              subModules:
                item.subModules.length > 0
                  ? item.subModules.map((id: any) => id.id)
                  : []
            })
          })
          setSelectedLMSModules(newSelectedData)

          setSelectedData2([])
          setRoleModulesList(res.data)
        }
      })
      .catch((error) => console.log(error.message, 'error'))
  }

  // const checkInstitute2 = (instituteId: string) => {
  //   getSingleInstituteModulesAPI({
  //     instituteId: instituteId
  //   })
  //     .then((res) => {
  //       setSelectedData2([])
  //       if (res && res.data?.length > 0) {
  //         setRoleModulesList(res.data)
  //       }
  //     })
  //     .catch((error) => CustomToastMessage(error.message, 'error'))
  // }

  const handleGetRoles = (role: any) => {
    getRoleModulesAPI({
      role: role.id,
      instituteId: user.role === 'superAdmin' ? selectedInstitute.id : ''
    })
      .then((res) => {
        let newSelectedData: any = []
        res.data.map((item: any) => {
          if (item.subModules.length > 0) {
            newSelectedData.push({
              module: item.id,
              subModules:
                item.subModules.length > 0
                  ? item.subModules.map((id: any) => id.id)
                  : []
            })
          } else {
            newSelectedData.push({
              module: item.id
            })
          }
        })
        setSelectedData2(newSelectedData)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }

  const handleSetRoles = () => {
    if (selectedInstitute?.id && selectedRole?.id) {
      let newSelectedmodule = [...selectedData2]
      newSelectedmodule.map((item) => {
        if (item.subModules && item.subModules.length <= 0) {
          delete item.subModules
        }
      })

      setIsRoleSubmitting(true)
      const payload = {
        instituteId: selectedInstitute?.id,
        lmsModules: newSelectedmodule,
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
      CustomToastMessage('Please Select Institute and Role', 'error')
    }
  }

  useEffect(() => {
    if (user.role === 'instituteAdmin' && user.instituteId) {
      setSelectedInstitute({ id: user.instituteId, label: user.instituteName })
      setRoles([
        { label: 'Branch Admin ', id: 'branchAdmin' },
        { label: 'Student ', id: 'student' },
        { label: 'Teacher', id: 'teacher' }
      ])
    }
    if (user.role === 'branchAdmin') {
      setSelectedInstitute({ id: user.instituteId, label: user.instituteName })
      setRoles([
        { label: 'Student ', id: 'student' },
        { label: 'Teacher', id: 'teacher' }
      ])
    }
  }, [user])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <FormContainerV2 style={{ margin: '5px 20px ' }}>
      <div>
        <Flex
          style={{
            width: '100%',
            margin: windowWidth >= 768 ? '5px 20px' : '5px 0px'
          }}
          gap="20px"
          alignItems="start"
          direction={windowWidth >= 768 ? 'row' : 'column'}
        >
          {user.role === 'superAdmin' && (
            <>
              <FirstDiv>
                <SubHeading>Menus for Institute</SubHeading>

                <SearchableDropdown
                  style={{ width: '290px' }}
                  isLoader={insLoading}
                  label={'Select Institute / School'}
                  placeHolder={'Please Select Institute / School'}
                  options={instituteData}
                  isClear={!!selectedInstitute?.id}
                  onSelect={(option) => {
                    setSelectedInstitute(option)
                    setSelectedLMSModules([])
                    if (option.id) {
                      checkInstitute(String(option.id))
                    }
                  }}
                  selectedValue={selectedInstitute}
                />

                <FieldContainer>
                  {!isModulesLoading &&
                    modulesList.map((item: any, index: any) => (
                      <>
                        <Fields key={`key_${index}`}>
                          <CheckboxContainer
                            className="d-flex justify-content-center"
                            onClick={() => onModuleCheck(item)}
                            onKeyDown={() => onModuleCheck(item)}
                            role="button" // Adding role="button" to indicate this is an interactive element
                            tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
                          >
                            <Checkbox>
                              {selectedLMSModules.some(
                                (id) => id.module === item.id
                              ) ? (
                                <CheckedSvg />
                              ) : (
                                <UnCheckedSvg />
                              )}
                            </Checkbox>
                          </CheckboxContainer>{' '}
                          <FieldLabel>{item.name}</FieldLabel>{' '}
                        </Fields>
                        {selectedLMSModules.some(
                          (id) => id.module === item.id
                        ) &&
                          item?.subModules.length > 0 &&
                          item?.subModules.map(
                            (subModulesItem: any, ind: number) => (
                              <ChildFields key={`key_${ind}`}>
                                <CheckboxContainer
                                  className="d-flex justify-content-center"
                                  onClick={() =>
                                    onSubModuleCheck(item, subModulesItem)
                                  }
                                  onKeyDown={() =>
                                    onSubModuleCheck(item, subModulesItem)
                                  }
                                  role="button" // Adding role="button" to indicate this is an interactive element
                                  tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
                                >
                                  <Checkbox>
                                    {selectedLMSModules
                                      .find(
                                        (module) => module.module === item.id
                                      )
                                      ?.subModules?.some(
                                        (subId) => subId === subModulesItem.id
                                      ) ? (
                                      <CheckedSvg />
                                    ) : (
                                      <UnCheckedSvg />
                                    )}
                                  </Checkbox>
                                </CheckboxContainer>{' '}
                                <FieldLabel>{subModulesItem.name}</FieldLabel>{' '}
                              </ChildFields>
                            )
                          )}
                      </>
                    ))}
                </FieldContainer>
                <ButtonDiv>
                  <SimpleButton
                    label={'Submit'}
                    clickHandler={() => handleSubmit()}
                    disabled={isSubmitting}
                  />
                </ButtonDiv>
              </FirstDiv>
              <Divider />
            </>
          )}
          <SecondDiv>
            <SubHeading>Menus for Role</SubHeading>
            <Flex gap="20px">
              {/* {user.role === 'superAdmin' && (
                <SearchableDropdown
                  style={{ width: '290px' }}
                  isLoader={insLoading}
                  label={'Select Institute / School'}
                  placeHolder={'Please Select Institute / School'}
                  options={instituteData}
                  isClear={!!selectedInstitute2?.id}
                  onSelect={(option) => {
                    if (!isInstituteAdmin) {
                      setSelectedInstitute2(option)
                      setSelectedRole({ id: '', label: '' })
                      setRoleModulesList([])
                      if (option.id) {
                        checkInstitute2(String(option.id))
                      }
                    }
                  }}
                  selectedValue={selectedInstitute2}
                />
              )} */}
              <SearchableDropdown
                style={{ width: '290px' }}
                label={'Select Role'}
                placeHolder={'Please Select Role'}
                options={roles}
                isClear={!!selectedRole?.id}
                onSelect={(option) => {
                  // setRoleModulesList([])
                  setSelectedData2([])
                  setSelectedRole(option)
                  if (option.id) {
                    handleGetRoles(option)
                  }
                }}
                selectedValue={selectedRole}
              />
            </Flex>
            <SelectContainer>
              <SelectedFieldContainer>
                {selectedRole?.id &&
                  selectedInstitute?.id &&
                  roleModulesList.map((item: any, index: any) => (
                    <>
                      <Fields key={`key_${index}`}>
                        <CheckboxContainer
                          className="d-flex justify-content-center"
                          onClick={() => onRoleModuleCheck(item)}
                          onKeyDown={() => onRoleModuleCheck(item)}
                          role="button" // Adding role="button" to indicate this is an interactive element
                          tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
                        >
                          <Checkbox>
                            {selectedData2.some(
                              (id) => selectedRole?.id && id.module === item.id
                            ) ? (
                              <CheckedSvg />
                            ) : (
                              <UnCheckedSvg />
                            )}
                          </Checkbox>
                        </CheckboxContainer>{' '}
                        <FieldLabel>{item.name}</FieldLabel>{' '}
                      </Fields>
                      {item?.subModules.length > 0 &&
                        item?.subModules.map(
                          (subModulesItem: any, ind: number) => (
                            <ChildFields key={`key_${ind}`}>
                              <CheckboxContainer
                                className="d-flex justify-content-center"
                                onClick={() =>
                                  onRoleSubModuleCheck(item, subModulesItem)
                                }
                                onKeyDown={() =>
                                  onRoleSubModuleCheck(item, subModulesItem)
                                }
                                role="button" // Adding role="button" to indicate this is an interactive element
                                tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
                              >
                                <Checkbox>
                                  {selectedData2
                                    .find((module) => module.module === item.id)
                                    ?.subModules?.some(
                                      (subId: any) =>
                                        subId === subModulesItem.id
                                    ) ? (
                                    <CheckedSvg />
                                  ) : (
                                    <UnCheckedSvg />
                                  )}
                                </Checkbox>
                              </CheckboxContainer>{' '}
                              <FieldLabel>{subModulesItem.name}</FieldLabel>{' '}
                            </ChildFields>
                          )
                        )}
                    </>
                  ))}
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

export default ModulesSetings

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
export const Divider = styled.div`
  border-right: 2px solid rgba(25, 123, 189, 0.14);
  height: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    display: none;
  }
`
