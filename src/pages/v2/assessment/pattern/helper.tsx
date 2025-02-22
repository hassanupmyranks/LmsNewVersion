import { validateRequired } from '../../../../helpers/V2/formValidattion'
import {
  CreatePatternPayload,
  PatternSectionDetails
} from '../../../../utils/types'

interface Time {
  title: string
  firstName: string
  lastName: string
}

export const getSelectedTime = (time: Time) => {
  return `${time.title}:${time.firstName} ${time.lastName}`
}

export const addFifteenMinutes = (time: any) => {
  const newTime = new Date(time) // Create a new Date object to avoid mutating the original
  newTime.setMinutes(newTime.getMinutes()) // Add 15 minutes
  return newTime
}

export const addFifteenMinutesCurrentTime = (time: any) => {
  const newTime = addFifteenMinutes(time)

  return `${
    newTime.getHours() % 12 === 0 ? 12 : newTime.getHours() % 12
  }:${`${newTime.getMinutes()}`.padStart(2, '0')} ${
    newTime.getHours() >= 12 ? 'PM' : 'AM'
  }
  `
}

export const formatOnlyTime = (time: any) => {
  return `${
    time.getHours() % 12 === 0 ? 12 : time.getHours() % 12
  }:${`${time.getMinutes()}`.padStart(2, '0')} ${
    time.getHours() >= 12 ? 'PM' : 'AM'
  }
  `
}

export const getTimeObjectFormat = (newDate: any) => {
  const defaultTime = {
    title: `${
      new Date(newDate).getHours() % 12 === 0 ? 12 : new Date().getHours() % 12
    }`,
    firstName: `${`${new Date(newDate).getMinutes()}`.padStart(2, '0')}`,
    lastName: `${new Date(newDate).getHours() >= 12 ? 'PM' : 'AM'}`
  }
  return defaultTime
}

export const getOnlyTimeObjectFormat = (newTime: any) => {
  const tmpTimeSplit = newTime.split(' ')

  const hoursMinutes = tmpTimeSplit[0]
  const amPm = tmpTimeSplit[1][0] + tmpTimeSplit[1][1]
  const [hours, minutes] = hoursMinutes.split(':')

  const defaultTime = {
    title: hours,
    firstName: minutes,
    lastName: amPm
  }
  return defaultTime
}

const validateSectionDetails = (
  subjects: CreatePatternPayload['subjects_details'],
  error: string
): string => {
  if (
    subjects.map((subject) => subject?.sections?.length).some((item) => !item)
  ) {
    return error
  } else {
    return ''
  }
}

const validateSectionQuestion = (
  subjects: CreatePatternPayload['subjects_details'],
  error: string
): string => {
  if (
    subjects
      .map((subject) => subject?.total_questions_for_subject)
      .some((item) => !item)
  ) {
    return error
  } else {
    return ''
  }
}

export const createPatternValidator = (
  payload: CreatePatternPayload
): Record<string, string> => {
  const validatedObj: Record<string, string> = {}

  validatedObj.patternName = validateRequired(
    payload.test_name,
    'Pattern Name is required.'
  )
  validatedObj.totalDuration = validateRequired(
    payload.test_duration,
    'Test Duration is required.'
  )
  validatedObj.testInstructions = validateRequired(
    payload.instruction_text,
    'Test Instruction is required.'
  )
  validatedObj.courseDetails = validateRequired(
    payload.course_details.course_id,
    'Please Select One grade.'
  )
  validatedObj.subjectDetails = validateRequired(
    payload.subjects_details,
    'At least one subject it required.'
  )
  validatedObj.sections = validateSectionDetails(
    payload.subjects_details,
    'For each subject at least one section is required.'
  )
  validatedObj.sectionsQuestion = validateSectionQuestion(
    payload.subjects_details,
    'For each subject at least one question is required.'
  )

  return validatedObj
}

export const createPatternSingleFiledValidator = (
  fieldName: string,
  payload: any
): string => {
  switch (fieldName) {
    case 'patternName':
      return validateRequired(payload, 'Pattern Name is required.')
    case 'totalDuration':
      return validateRequired(payload, 'Test Duration is required.')
    case 'testInstructions':
      return validateRequired(payload, 'Test Instruction is required.')
    case 'courseDetails':
      return validateRequired(payload, 'Please Select One grade.')
    case 'subjectDetails':
      return validateRequired(payload, 'At least one subject it required.')
    default:
      return ''
  }
}

export const validateSection = (
  payload: PatternSectionDetails
): Record<string, string> => {
  const validatedObj: Record<string, string> = {}

  validatedObj.name = validateRequired(
    payload.section_name,
    'Section Name is required.'
  )
  validatedObj.type = validateRequired(
    payload.question_type,
    'This filed is required.'
  )

  return validatedObj
}

export const validateSingleFieldOfSection = (
  fieldName: string,
  payload: any
): string => {
  switch (fieldName) {
    case 'name':
      return validateRequired(payload, 'Section Name is required.')
    case 'type':
      return validateRequired(payload, 'This filed is required.')
    default:
      return ''
  }
}

export const areAllSectionsValid = (payload: CreatePatternPayload): boolean => {
  return (
    !!payload.subjects_details.length &&
    payload.subjects_details
      .map((subject) => {
        if (subject?.sections?.length) {
          return subject.sections
            .map((item) => {
              return (
                !validateRequired(item.question_type) &&
                !validateRequired(item.section_name)
              )
            })
            .every((item) => item)
        } else {
          return false
        }
      })
      .every((item) => item)
  )
}
