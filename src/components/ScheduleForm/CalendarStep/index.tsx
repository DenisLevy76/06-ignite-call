import dayjs from 'dayjs'
import { useState } from 'react'
import { Calendar } from '../../Calendar'
import {
  CalendarStepContainer,
  TimePicker,
  TimePickerList,
  TimePickerTitle,
} from './styles'

export const CalendarStep: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDaySelected = !!selectedDate

  return (
    <CalendarStepContainer className="teste" isTimePickerOpen={isDaySelected}>
      <Calendar onSelectDate={setSelectedDate} selectedDate={selectedDate} />
      {isDaySelected && (
        <TimePicker>
          {selectedDate && (
            <TimePickerTitle as="strong">
              {dayjs(selectedDate).format('dddd')},{' '}
              <span>{dayjs(selectedDate).format('DD [de] MMMM')}</span>
            </TimePickerTitle>
          )}
          <TimePickerList>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">9:00h</button>
            </li>
            <li>
              <button type="button">10:00h</button>
            </li>
          </TimePickerList>
        </TimePicker>
      )}
    </CalendarStepContainer>
  )
}
