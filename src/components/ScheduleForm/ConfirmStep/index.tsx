import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { HelperText } from '../../../pages/home/components/FormUsernameRegister/_styles'
import { ActionsGroup, ConfirmStepForm, FormHeader } from './styles'

const ConfirmStepSchema = z.object({
  username: z
    .string()
    .min(4, 'Usuário deve conter pelo menos 4 caracteres.')
    .max(60, 'Usuário deve conter no máximo 60 caracteres.')
    .regex(
      /^([a-z,0-9]+)$/i,
      'O nome de usuário deve conter apenas letras e números.',
    ),
  email: z.string().email({ message: 'Digite um email válido.' }),
  obs: z.string().min(3, 'Insira uma observação para este registro.'),
})

type ConfirmStepFormData = z.infer<typeof ConfirmStepSchema>

export const ConfirmStep: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmStepFormData>({
    resolver: zodResolver(ConfirmStepSchema),
  })

  const handleConfirmStop = (data: ConfirmStepFormData) => {
    console.log(data)
  }

  return (
    <ConfirmStepForm as="form" onSubmit={handleSubmit(handleConfirmStop)}>
      <FormHeader>
        <Text>
          <CalendarBlank size={24} />
          <time>22 de Setembro de 2022</time>
        </Text>
        <Text>
          <Clock size={24} />
          <time>18:00h</time>
        </Text>
      </FormHeader>
      <label>
        <Text>Seu nome de usuário</Text>
        <TextInput
          type="text"
          prefix="ignite.com/"
          placeholder="JorgeSilva123"
          {...register('username')}
        />
        {errors.username && (
          <HelperText size="sm">{errors.username?.message}</HelperText>
        )}
      </label>
      <label>
        <Text>Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="exemplo@exemplo.com.br"
          {...register('email')}
        />
        {errors.username && (
          <HelperText size="sm">{errors.email?.message}</HelperText>
        )}
      </label>
      <label>
        <Text>Observações</Text>
        <TextArea {...register('obs')} />
        {errors.username && (
          <HelperText size="sm">{errors.obs?.message}</HelperText>
        )}
      </label>
      <ActionsGroup>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ActionsGroup>
    </ConfirmStepForm>
  )
}
