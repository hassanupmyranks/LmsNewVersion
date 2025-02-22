import { QuestionSection } from '../../utils/types'

export function calculateHoursDifference(
  startDate: Date | undefined,
  endDate: Date | undefined
): number {
  // Check if either date is undefined
  if (!startDate || !endDate) {
    return 0
  }
  // Convert both dates to UTC to ensure accurate calculation
  const startUtc: number = new Date(startDate).getTime()
  const endUtc: number = new Date(endDate).getTime()

  // Calculate the time difference in milliseconds
  const timeDifference: number = endUtc - startUtc

  // Convert milliseconds to hours
  const hoursDifference: number = timeDifference / (1000 * 60 * 60)

  return hoursDifference
}

export function calculateTotalQuestions(
  questionsArray: QuestionSection[]
): number {
  // Sum the 'total_questions_for_section' field for each object
  const totalQuestions: number = questionsArray.reduce(
    (acc, section) => acc + (section.total_questions_for_section || 0),
    0
  )

  return totalQuestions
}

export function calculateTotalMarks(questionsArray: QuestionSection[]): number {
  // Calculate the total marks for each section and sum them up
  const totalMarks: number = questionsArray.reduce(
    (acc, section) =>
      acc +
      (section.total_questions_for_section || 0) *
        (section.marks_per_question || 0),
    0
  )

  return totalMarks
}

export function convertMinutesToHours(minutes: any) {
  // Convert minutes to hours by dividing by 60
  const hours = Math.floor(minutes / 60)
  // Calculate the remaining minutes
  const remainingMinutes = minutes % 60
  // Return the result as a string in the format "hours:minutes"
  return `${hours} : ${remainingMinutes}`
}
