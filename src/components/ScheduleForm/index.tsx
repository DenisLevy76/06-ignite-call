import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export const ScheduleForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  if (selectedDate)
    return (
      <ConfirmStep
        scheduleDate={selectedDate}
        onCancel={() => setSelectedDate(null)}
      />
    )

  return <CalendarStep onSelectDate={setSelectedDate} />
}
