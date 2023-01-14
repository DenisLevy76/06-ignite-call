import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ConnectWrapper, ConnectPageContainer } from './_styles'
import { ArrowRight } from 'phosphor-react'

const Connect: React.FC = () => {
  return (
    <ConnectPageContainer>
      <header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </header>
      <ConnectWrapper>
        <label>
          <Text lang="en">Google Calendar</Text>
          <Button size="sm" variant="secondary">
            Conectar <ArrowRight size={24} />
          </Button>
        </label>
        <Button type="submit" disabled>
          Próximo passo <ArrowRight size={24} />
        </Button>
      </ConnectWrapper>
    </ConnectPageContainer>
  )
}

export default Connect
