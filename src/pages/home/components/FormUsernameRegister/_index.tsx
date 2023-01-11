import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, HelperText } from './_styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const formSchema = zod.object({
  username: zod
    .string()
    .min(4, 'Usuário deve conter pelo menos 4 caracteres.')
    .max(60, 'Usuário deve conter no máximo 60 caracteres.')
    .regex(
      /^([a-z,0-9]+)$/i,
      'O nome de usuário deve conter apenas letras e números.',
    ),
})

type FormType = zod.infer<typeof formSchema>

export const FormUsernameRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const handleClaimUsername = (data: FormType) => {
    console.log(data.username)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <div>
          <TextInput
            size="sm"
            prefix="ignite.com/"
            placeholder="seu-nome-de-usuário"
            id="username"
            {...register('username')}
          />
        </div>
        <Button size="sm">
          Reservar <ArrowRight size={24} />
        </Button>
      </Form>
      {errors.username?.message ? (
        <HelperText size="sm" as="label" htmlFor="username">
          {errors.username.message}
        </HelperText>
      ) : (
        <Text
          size="sm"
          as="label"
          htmlFor="username"
          css={{ display: 'inline-block' }}
        >
          Digite seu nome de usuário
        </Text>
      )}
    </>
  )
}
