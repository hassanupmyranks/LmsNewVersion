import { useEffect, useState } from 'react'

const CountdownTimer = ({
  startDate,
  endDate,
  testDuration
}: {
  startDate: Date
  endDate: Date
  testDuration: number
}) => {
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const startTime = startDate.getTime() - now.getTime()

      const endTimeWithBuffer = new Date(endDate.getTime() + 5 * 60 * 1000)
      const currentTimePlusDuration = new Date(
        now.getTime() + testDuration * 60 * 1000
      ) // Current time + duration

      // Check if test has ended
      if (now >= endTimeWithBuffer) {
        clearInterval(intervalId)
        setTimeRemaining('Test Ended')
        return
      }

      // Check if test time has been passed (5 minutes after endDate)
      if (currentTimePlusDuration > endTimeWithBuffer) {
        clearInterval(intervalId)
        setTimeRemaining('Test time has been passed')
        return
      }

      if (startTime <= 0) {
        clearInterval(intervalId)
        setTimeRemaining('Test Started')
      } else {
        if (startTime <= 5 * 60 * 1000) {
          // 5 minutes in milliseconds
          const minutes = Math.floor(startTime / (1000 * 60))
          const seconds = Math.floor((startTime % (1000 * 60)) / 1000)
          setTimeRemaining(`${minutes || 0}m ${seconds || 0}s`)
        } else {
          const daysRemaining = Math.floor(startTime / (1000 * 60 * 60 * 24))
          setTimeRemaining(`${daysRemaining} days`)
        }

        // if (hoursRemaining <= 12) {
        //   const hours = Math.floor(
        //     (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        //   )
        //   const minutes = Math.floor(
        //     (difference % (1000 * 60 * 60)) / (1000 * 60)
        //   )
        //   const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        //   setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
        // } else {
        //   const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24))
        //   setTimeRemaining(`${daysRemaining} days`)
        // }
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [startDate, endDate, testDuration])

  return <span>{timeRemaining}</span>
}

export default CountdownTimer

// import { useEffect, useState } from 'react'

// const CountdownTimer = ({
//   startDate,
//   endDate,
//   durationMinutes
// }: {
//   startDate: Date
//   endDate: Date
//   durationMinutes: number // Duration of the test in minutes
// }) => {
//   const [timeRemaining, setTimeRemaining] = useState('')
//   const [status, setStatus] = useState('') // New state to manage the status messages

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const now = new Date()
//       const difference = startDate.getTime() - now.getTime()
//       // const differenceEnd = endDate.getTime() - now.getTime()

//       // Calculate the buffer end time
//       const bufferEndTime = new Date(endDate.getTime() + 5 * 60 * 1000) // endDate + 5 minutes

//       if (now > bufferEndTime) {
//         setStatus('Test time has been passed')
//         setTimeRemaining('') // Clear countdown when passed
//         clearInterval(intervalId)
//       } else if (now > endDate) {
//         setStatus('Test Ended')
//         setTimeRemaining('') // Clear countdown when ended
//         clearInterval(intervalId)
//       } else if (now >= startDate && now <= endDate) {
//         setStatus('Test In Progress')
//         const hoursRemaining = Math.floor(difference / (1000 * 60 * 60))
//         const minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
//         const secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000)
//         setTimeRemaining(`${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`)
//       } else if (now < startDate) {
//         setStatus('Read Instruction: Countdown')
//         const hoursRemaining = Math.floor(difference / (1000 * 60 * 60))
//         const minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
//         const secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000)
//         setTimeRemaining(`${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`)
//       }
//     }, 1000)

//     return () => clearInterval(intervalId)
//   }, [startDate, endDate, durationMinutes])

//   return (
//     <div>
//       <span>{status}</span>
//       {status !== 'Test time has been passed' && <span>{timeRemaining}</span>}
//     </div>
//   )
// }

// export default CountdownTimer
