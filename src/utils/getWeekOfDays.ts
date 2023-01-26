export const getWeekDays = (short: boolean = false) => {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  })

  return Array.from(Array(7).keys()).map((day) => {
    if (short)
      return formatter.format(new Date(Date.UTC(2021, 5, day))).substring(0, 3)
    return formatter.format(new Date(Date.UTC(2021, 5, day)))
  })
}
