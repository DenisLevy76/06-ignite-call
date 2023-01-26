import { Calendar } from '../../Calendar'
import { CalendarStepContainer } from './styles'

export const CalendarStep: React.FC = () => {
  return (
    <CalendarStepContainer className="teste">
      <Calendar />
    </CalendarStepContainer>
  )
}
