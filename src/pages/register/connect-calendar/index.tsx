import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import {
  ConnectWrapper,
  ConnectPageContainer,
} from '../../../styles/pages/connect-calendar-styles'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { HelperText } from '../../../components/FormUsernameRegister/_styles'
import { NextSeo } from 'next-seo'

const Connect: React.FC = () => {
  const session = useSession()
  const { query } = useRouter()
  const router = useRouter()

  const hasAuthError = !!query.error
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = async () => await signIn('google')

  const handleNextStep = async () =>
    await router.push('/register/time-intervals')

  return (
    <>
      <NextSeo title="Registro 2/4 | Ignite Call" noindex />
      <ConnectPageContainer>
        <header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text css={{ color: '$gray200' }}>
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
          <Button
            type="button"
            onClick={handleNextStep}
            disabled={hasAuthError || !isSignedIn}
          >
            Próximo passo <ArrowRight size={24} />
          </Button>
        </ConnectWrapper>
      </ConnectPageContainer>
    </>
  )
}

export default Connect
