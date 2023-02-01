import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
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

export const CalendarStep: React.FC = () => {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] =
    useState<IAvailabilityResponse | null>(null)
  const isDaySelected = !!selectedDate

  const username = String(router.query.username)

  const getAvailability = useCallback(async () => {
    const { data } = await api.get<IAvailabilityResponse>(
      `/users/${username}/availability`,
      {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      },
    )

    console.log(data)

    setAvailability(data)
  }, [selectedDate, username])

  useEffect(() => {
    if (!selectedDate) {
      return
    }

    getAvailability()
  }, [selectedDate, getAvailability])

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
