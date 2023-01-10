import Image from 'next/image'
import { Hero, HeroContainer, HomeContainer } from './_styles'
import { Heading, Text } from '@ignite-ui/react'
import igniteCallPreview from '../../assets/appPrintScreen.png'
import { FormUsernameRegister } from './components/FormUsernameRegister/_index'

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HeroContainer>
        <Hero>
          <Heading size="4xl" as="h1">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <FormUsernameRegister />
        </Hero>
      </HeroContainer>
      <Image
        src={igniteCallPreview}
        alt="Uma foto do calendário principal da aplicação no dia 19 de setembro de 2022"
        height={480}
        quality={100}
      />
    </HomeContainer>
  )
}

export default Home
