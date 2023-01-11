import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { RegisterForm, RegisterPageContainer } from './_styles'
import { ArrowRight } from 'phosphor-react'

const Register: React.FC = () => {
  return (
    <RegisterPageContainer>
      <header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </header>
      <RegisterForm as="form">
        <label>
          <Text>Nome de usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="usuário" />
        </label>
        <label>
          <Text>Nome completo</Text>
          <TextInput placeholder="João Carlos da Silva" />
        </label>
        <Button type="submit">
          Próximo passo <ArrowRight size={24} />
        </Button>
      </RegisterForm>
    </RegisterPageContainer>
  )
}

export default Register
