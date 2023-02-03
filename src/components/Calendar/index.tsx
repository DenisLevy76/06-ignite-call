import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { api } from '../../lib/axios'
import { getCalendarWeeks } from '../../utils/getCalendarWeeks'
import { getWeekDays } from '../../utils/getWeekOfDays'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

const weekDays = getWeekDays(true)

interface IBlockedDatesResponse {
  blockedWeekDays: number[]
  blockedDays: number[]
}

interface CalendarProps {
  selectedDate?: Date | null
  onSelectDate: (date: Date) => void
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const [today, setToday] = useState(dayjs().set('date', 1))
  const router = useRouter()
  const currentMonth = today.format('MMMM')
  const currentYear = today.format('YYYY')

  const username = String(router.query.username)

  const handlePreviousMonth = () => {
    setToday((state) => state.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setToday((state) => state.add(1, 'month'))
  }

  const getBlockedDates = async () => {
    const { data } = await api.get<IBlockedDatesResponse>(
      `/users/${username}/blocked-dates`,
      {
        params: {
          year: today.get('year'),
          month: today.add(1, 'month').get('month').toString().padStart(2, '0'),
        },
      },
    )

    return data
  }

  const { data: blockedDays } = useQuery<IBlockedDatesResponse>(
    ['blocked-dates', today.get('year'), today.format('MM')],
    getBlockedDates,
  )

  const calendarWeeks = useMemo(
    () =>
      getCalendarWeeks(
        today,
        blockedDays?.blockedWeekDays,
        blockedDays?.blockedDays,
      ),
    [today, blockedDays],
  )
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle
          as="time"
          dateTime={today.toISOString()}
          title={today.format(`DD [de] MMMM [de] YYYY`)}
        >
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button
            onClick={handlePreviousMonth}
            aria-label="Ver mês anterior."
            title="Ver mês anterior."
          >
            <CaretLeft size={24} />
          </button>
          <button
            onClick={handleNextMonth}
            aria-label="Ver mês posterior."
            title="Ver mês posterior."
          >
            <CaretRight size={24} />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay.toUpperCase()}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map((week) => {
            return (
              <tr key={week.week}>
                {week.days.map((day) => {
                  return (
                    <td key={day.date.toISOString()}>
                      <CalendarDay
                        type="button"
                        disabled={day.disabled}
                        title={`${day.date.format(
                          'DD [de] MMMM [de] YYYY, dddd',
                        )}`}
                        aria-label={`${day.date.format(
                          'DD [de] MMMM [de] YYYY, dddd',
                        )}`}
                        onClick={() => onSelectDate(day.date.toDate())}
                      >
                        {day.date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
