import { ChangeEvent, useEffect, useState } from 'react'
import InputV2 from '../../../../components/V2/Form/Input'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'
import { AddHolidayWrapper } from './StyledComponents'
import { AddOrEditHolidayProps } from '../../../../utils/types'
import CalenderSelectInput from '../../../../components/V2/Calender'
import FormValidator from '../../addstudent/validation'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  addHolidayAPI,
  getAllInstituteAPI,
  updateHoliday
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import SimpleButton from '../../../../components/V2/Button/SimpleButton'
import { useLocation } from 'react-router-dom'

const AddLeave = () => {
  const { pathname } = useLocation()

  const holidayinfo = {
    name: '',
    description: '',
    academicYear: '',
    date: '',
    instituteId: ''
  }

  useEffect(() => {
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
  }, [])

  const [date, setDate] = useState<Date | any>()
  const [submit, isSubmit] = useState(false)
  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [selectedinstitute, setSelectedInstitute] = useState<any>({
    id: '',
    label: ''
  })
  const [addHoliday, setAddHoliday] =
    useState<AddOrEditHolidayProps>(holidayinfo)
  const [finalData, setFinalData] = useState<any>()
  const { formErrors, handleInputChange } = FormValidator({
    finalData,
    setFinalData
  })

  // const today = new Date()
  // const maxSelectableDate = new Date(
  //   today.getFullYear(),
  //   today.getMonth(),
  //   today.getDate()
  // )

  const SelectDate = (selectedDate: Date | null) => {
    setDate(selectedDate)
    const formattedDate = selectedDate ? selectedDate.toISOString() : ''
    setAddHoliday({
      ...addHoliday,
      date: formattedDate
    })
    handleInputChange('dob', formattedDate)
    return selectedDate
  }

  const handleSubmit = () => {
    isSubmit(true)
    addHolidayAPI(addHoliday)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
        }
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
      .finally(() => {
        isSubmit(false)
        setAddHoliday({
          name: '',
          description: '',
          academicYear: '',
          date: '',
          instituteId: ''
        })
        setSelectedInstitute({
          id: '',
          label: ''
        })
        setDate('')
      })

    if (pathname === '/V2/edit-holiday') {
      updateHoliday(addHoliday)
        .then((res) => {
          if (res) {
            CustomToastMessage(res.message, 'success')
          }
        })
        .catch((error) => {
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => {
          isSubmit(false)
          setAddHoliday({
            name: '',
            description: '',
            academicYear: '',
            date: '',
            instituteId: ''
          })
          setSelectedInstitute({
            id: '',
            label: ''
          })
          setDate('')
        })
    }
  }

  return (
    <PageContainer>
      <Flex
        justifyContent="center"
        alignItems="center"
        // style={{ width: '40%' }}
      >
        <AddHolidayWrapper>
          <SearchableDropdown
            style={{ width: '100%' }}
            isLoader={insLoading}
            label={'Select Institute / School'}
            placeHolder={'Please Select Institute / School'}
            options={instituteData}
            isClear={!!selectedinstitute?.id}
            onSelect={(option) => {
              setSelectedInstitute(option)
              setAddHoliday({
                ...addHoliday,
                instituteId: String(option.id)
              })
            }}
            selectedValue={selectedinstitute}
          />
          <InputV2
            label="Holiday Name"
            required
            full
            placeholder="Enter Holiday Name"
            onBlur={() => {
              //   validateField({
              //     type: FinalpayloadCreateSubject.name,
              //     value: createChapter.name
              //   })
            }}
            // error={errors.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setAddHoliday({
                ...addHoliday,
                name: event.target.value
              })
            }}
            value={addHoliday.name}
          ></InputV2>
          <InputV2
            label="Holiday Description"
            required
            full
            placeholder="Enter Holiday Description"
            onBlur={() => {
              //   validateField({
              //     type: FinalpayloadCreateSubject.name,
              //     value: createChapter.name
              //   })
            }}
            // error={errors.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setAddHoliday({
                ...addHoliday,
                description: event.target.value
              })
            }}
            value={addHoliday.description}
          ></InputV2>
          <InputV2
            label="Academic Year"
            required
            full
            placeholder="Enter Academic Year"
            onBlur={() => {
              //   validateField({
              //     type: FinalpayloadCreateSubject.name,
              //     value: createChapter.name
              //   })
            }}
            // error={errors.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setAddHoliday({
                ...addHoliday,
                academicYear: event.target.value
              })
            }}
            value={addHoliday.academicYear}
          ></InputV2>
          <CalenderSelectInput
            // maxDate={maxSelectableDate}
            label={'Select Date'}
            placeholder={'Please Select Date'}
            value={
              date &&
              date?.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })
            }
            onChangeDate={SelectDate}
            error={formErrors?.dob}
          >
            {date}
          </CalenderSelectInput>
          <Flex style={{ justifyContent: 'flex-end' }}>
            <SimpleButton
              label={
                pathname === '/V2/edit-holiday'
                  ? 'Update Holiday'
                  : 'Add Holiday'
              }
              clickHandler={() => handleSubmit()}
              disabled={submit}
            />
          </Flex>
        </AddHolidayWrapper>
      </Flex>
    </PageContainer>
  )
}

export default AddLeave
