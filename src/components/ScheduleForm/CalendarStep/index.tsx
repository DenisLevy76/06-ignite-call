import { Calendar } from '../../Calendar'
import {
  CalendarStepContainer,
  TimePicker,
  TimePickerList,
  TimePickerTitle,
} from './styles'

export const CalendarStep: React.FC = () => {
  const isDaySelected = true
  return (
    <CalendarStepContainer className="teste" isTimePickerOpen={isDaySelected}>
      <Calendar />
      {isDaySelected && (
        <TimePicker>
          <TimePickerTitle as="strong">
            terça-feira, <span>20 de janeiro</span>
          </TimePickerTitle>
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
