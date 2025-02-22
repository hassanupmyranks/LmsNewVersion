import { useState } from 'react'
import Picker from 'react-mobile-picker'

interface MyTimePickerProps {
  onChangeTime: (value: any) => void
}

const MyTimePicker: React.FC<MyTimePickerProps> = ({ onChangeTime }) => {
  // Initialize with the current 24-hour format
  const [pickerValue, setPickerValue] = useState({
    hour: `${new Date().getHours()}`.padStart(2, '0'),
    minute: `${new Date().getMinutes()}`.padStart(2, '0')
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
      {/* Hour Picker (00 to 23) */}
      <Picker.Column name="hour">
        {Array.from({ length: 24 }, (_, i) =>
          i.toString().padStart(2, '0')
        ).map((option) => (
          <Picker.Item key={option} value={option}>
            {option}
          </Picker.Item>
        ))}
      </Picker.Column>

      {/* Minute Picker (00 to 59) */}
      <Picker.Column name="minute">
        {Array.from({ length: 60 }, (_, i) =>
          i.toString().padStart(2, '0')
        ).map((option) => (
          <Picker.Item key={option} value={option}>
            {option}
          </Picker.Item>
        ))}
      </Picker.Column>
    </Picker>
  )
}

export default MyTimePicker
