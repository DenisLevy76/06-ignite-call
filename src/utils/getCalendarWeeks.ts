import dayjs from 'dayjs'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

export const getCalendarWeeks = (
  today: dayjs.Dayjs,
  blockedWeekDays: number[] = [],
  blockedDays: number[] = [],
) => {
  if (blockedWeekDays.length <= 0) return []

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
      disabled:
        date.endOf('day').isBefore(new Date()) ||
        blockedWeekDays.includes(date.get('day')) ||
        blockedDays.includes(date.get('date')),
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
}
