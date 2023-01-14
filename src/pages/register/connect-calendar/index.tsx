import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ConnectWrapper, ConnectPageContainer } from './_styles'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { HelperText } from '../../home/components/FormUsernameRegister/_styles'

const Connect: React.FC = () => {
  const session = useSession()
  const { query } = useRouter()

  const hasAuthError = !!query.error
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = async () => await signIn('google')

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
          {isSignedIn ? (
            <Button size="sm" type="button" variant="secondary" disabled>
              Conectado <Check size={24} />
            </Button>
          ) : (
            <Button
              size="sm"
              type="button"
              variant="secondary"
              onClick={handleConnectCalendar}
            >
              Conectar <ArrowRight size={24} />
            </Button>
          )}
        </label>
        {hasAuthError && (
          <HelperText size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </HelperText>
        )}
        <Button type="button" disabled={hasAuthError || !isSignedIn}>
          Próximo passo <ArrowRight size={24} />
        </Button>
      </ConnectWrapper>
    </ConnectPageContainer>
  )
}

export default Connect
