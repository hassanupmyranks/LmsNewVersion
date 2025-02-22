import { useState } from 'react'

const moment = require('moment')

const CountDown = ({ time }: { time?: any }) => {
  const targetDateTime = moment(time)
  const [endCountDown, setEndcountDown] = useState<any>({
    minutes: 0,
    seconds: 0
  })
  function updateCountdown() {
    const now = moment()

    const duration = moment.duration(targetDateTime.diff(now))
    if (duration.asSeconds() <= 0) {
      console.log('Countdown finished.')
      clearInterval(intervalId)
    } else {
      const minutes = duration.minutes()
      const seconds = duration.seconds()
      setEndcountDown({
        minutes: minutes,
        seconds: seconds
      })
    }
  }
  const intervalId = setInterval(updateCountdown, 1000)

  return (
    <div>
      <p>
        {endCountDown?.minutes}:{endCountDown?.seconds}Mins
      </p>
    </div>
  )
}
export default CountDown
