export function formatDateString(inputDateString: any) {
  const inputDate = new Date(inputDateString)

  // Function to get the day with suffix
  function getDayWithSuffix(day: any) {
    if (day >= 11 && day <= 13) {
      return `${day}th`
    }
    switch (day % 10) {
      case 1:
        return `${day}st`
      case 2:
        return `${day}nd`
      case 3:
        return `${day}rd`
      default:
        return `${day}th`
    }
  }

  // Extract day, month, and year components
  const day = inputDate.getDate()
  const month = inputDate.toLocaleString('default', { month: 'short' })
  const year = inputDate.getFullYear()

  // Format the date
  const formattedDate = `${getDayWithSuffix(day)} ${month} ${year}`

  return formattedDate
}
