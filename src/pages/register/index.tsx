import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { RegisterForm, RegisterPageContainer } from './_styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HelperText } from '../home/components/FormUsernameRegister/_styles'

const registerFormSchema = zod.object({
  username: zod
    .string()
    .min(4, 'Usuário deve conter pelo menos 4 caracteres.')
    .max(60, 'Usuário deve conter no máximo 60 caracteres.')
    .regex(
      /^([a-z,0-9]+)$/i,
      'O nome de usuário deve conter apenas letras e números.',
    ),
  fullName: zod
    .string()
    .min(3, 'O nome deve conter pelo menos 3 letras.')
    .regex(/^([a-z]+)$/i, 'O nome de nome deve conter apenas letras.'),
})

type RegisterFormType = zod.infer<typeof registerFormSchema>

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleStepOne = (data: RegisterFormType) => {
    console.log(data)
  }

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
      <RegisterForm as="form" onSubmit={handleSubmit(handleStepOne)}>
        <label>
          <Text>Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="usuário"
            {...register('username')}
          />
          {errors.username && (
            <HelperText size="sm">{errors.username?.message}</HelperText>
          )}
        </label>
        <label>
          <Text>Nome completo</Text>
          <TextInput
            placeholder="João Carlos da Silva"
            {...register('fullName')}
          />
          {errors.fullName && (
            <HelperText size="sm">{errors.fullName?.message}</HelperText>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight size={24} />
        </Button>
      </RegisterForm>
    </RegisterPageContainer>
  )
}

export default Register
