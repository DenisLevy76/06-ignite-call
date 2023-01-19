export const convertTimeStringToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map((number) => Number(number))

  return hours * 60 + minutes
}
