// import { Container } from './styles'

import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
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

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

export const Calendar: React.FC = () => {
  const [today, setToday] = useState(dayjs().set('date', 1))
  const currentMonth = today.format('MMMM')
  const currentYear = today.format('YYYY')

  const handlePreviousMonth = () => {
    setToday((state) => state.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setToday((state) => state.add(1, 'month'))
  }

  const calendarWeeks = useMemo(() => {
    const daysOfMonth = Array.from({
      length: today.daysInMonth(),
    }).map((_, index) => {
      return today.set('date', index + 1)
    })

    const firstWeekDay = today.get('day')

    const daysOfPreviousMonthToFill = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return today.subtract(index + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = today.set('date', today.daysInMonth())
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const daysOfNextMonthToFill = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    })

    const calendarDays = [
      ...daysOfPreviousMonthToFill.map((date) => ({
        date,
        disabled: true,
      })),
      ...daysOfMonth.map((date) => ({
        date,
        disabled: date.endOf('day').isBefore(new Date()),
      })),
      ...daysOfNextMonthToFill.map((date) => ({
        date,
        disabled: true,
      })),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeek[]>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7

        if (!isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [today])

  console.log(calendarWeeks)

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
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
                      <CalendarDay disabled={day.disabled}>
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
