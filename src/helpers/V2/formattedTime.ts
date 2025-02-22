import { format } from 'date-fns'
import moment from 'moment'

export function formattedTime(date: any, time: any, testEndTime?: any) {
  let newTime: any = `${format(date, 'do MMMM, yyyy')} - ${
    testEndTime
      ? testEndTime
      : `${time.title}:${time.firstName} ${time.lastName}`
  } `
  newTime = moment(newTime, 'Do MMMM, YYYY - hh:mm A')
  return newTime.toISOString()
}

export function formattedTimeNew(date: any, time: any, testEndTime?: any) {
  let timeString = testEndTime ? testEndTime : `${time}`

  let newTime = moment(`${date} ${timeString}`, 'DD/MM/YYYY HH:mm:ss')

  return newTime.toISOString()
}

export function assignedTestFormattedTime(date: any, testEndTime: any) {
  let newTime = `${format(date, 'do MMMM, yyyy')} - ${testEndTime}`

  return (newTime = moment(newTime, 'Do MMMM, YYYY - hh:mm A').toISOString())
}

export function newFormattedTime(date: any, time: any, testEndTime?: any) {
  let newTime: any = `${format(date, 'do MMMM, yyyy')} - ${
    testEndTime
      ? testEndTime
      : `${time.title}:${time.firstName} ${time.lastName}`
  } `

  return (newTime = moment(newTime, 'Do MMMM, YYYY - hh:mm A'))
}

export function isDateInPast(dateTimeString: any) {
  // Create a Date object for the selected date and time
  const selectedDate = new Date(dateTimeString)

  // Create a Date object for the current date and time
  const currentDate = new Date()

  // Compare the selected date with the current date
  // Return true if the selected date is in the past, false otherwise
  return selectedDate < currentDate
}
