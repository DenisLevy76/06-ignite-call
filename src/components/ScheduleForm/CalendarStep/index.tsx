import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { api } from '../../../lib/axios'
import { Calendar } from '../../Calendar'
import {
  CalendarStepContainer,
  TimePicker,
  TimePickerList,
  TimePickerTitle,
} from './styles'

interface IAvailabilityResponse {
  availableTimes: number[]
  possibleTimes: number[]
}

interface CalendarStepProps {
  onSelectDate: (date: Date) => void
}

export const CalendarStep: React.FC<CalendarStepProps> = ({ onSelectDate }) => {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useState<IAvailabilityResponse | null>(null)
  const isDaySelected = !!selectedDate

  const username = String(router.query.username)
  const selectedDayFormatted = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const getAvailability = async () => {
    const { data } = await api.get<IAvailabilityResponse>(
      `/users/${username}/availability`,
      {
        params: {
          date: selectedDayFormatted,
        },
      },
    )

    return data
  }

  const { data: availability } = useQuery<IAvailabilityResponse>(
    ['availability', selectedDayFormatted],
    getAvailability,
    {
      enabled: !!selectedDate,
    },
  )

  const handleSelectTime = (hour: number) => {
    const dateTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()
    onSelectDate(dateTime)
  }

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
            {availability?.possibleTimes.map((hour) => (
              <li key={hour}>
                <button
                  type="button"
                  disabled={!availability.availableTimes.includes(hour)}
                  onClick={() => handleSelectTime(hour)}
                >
                  {String(hour).padStart(2, '0').padEnd(5, ':00')}h
                </button>
              </li>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </CalendarStepContainer>
  )
}
