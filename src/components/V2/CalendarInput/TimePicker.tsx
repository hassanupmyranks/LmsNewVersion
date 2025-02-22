import { useState } from 'react'
import Picker from 'react-mobile-picker'
import selections from '../../../const/V2/timePicker'

interface Selections {
  title: string[]
  firstName: string[]
  lastName: string[]
}

interface MyTimePickerProps {
  onChangeTime: (value: any) => void
}

const MyTimePicker: React.FC<MyTimePickerProps> = ({
  onChangeTime
}: MyTimePickerProps) => {
  const [pickerValue, setPickerValue] = useState({
    title: `${new Date().getHours() % 12}`,
    firstName: `${`${new Date().getMinutes()}`.padStart(2, '0')}`,
    lastName: `${new Date().getHours() > 12 ? 'PM' : 'AM'}`
  })
  return (
    <Picker
      value={pickerValue}
      onChange={(value) => {
        setPickerValue(value)
        onChangeTime(value)
      }}
      wheelMode="normal"
    >
      {Object.keys(selections).map((name) => (
        <Picker.Column key={name} name={name}>
          {selections[name as keyof Selections].map((option) => (
            <Picker.Item key={option} value={option}>
              {option}
            </Picker.Item>
          ))}
        </Picker.Column>
      ))}
    </Picker>
  )
}

export default MyTimePicker
