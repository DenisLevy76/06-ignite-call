import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../lib/axios'
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

interface ConfirmStepProps {
  scheduleDate: Date
  onCancel: () => void
}

export const ConfirmStep: React.FC<ConfirmStepProps> = ({
  scheduleDate,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmStepFormData>({
    resolver: zodResolver(ConfirmStepSchema),
  })

  const router = useRouter()

  const { username } = router.query

  const handleConfirmStop = async (data: ConfirmStepFormData) => {
    await api.post(`/users/${username}/schedule`, {
      name: data.username,
      email: data.email,
      observations: data.obs,
      date: scheduleDate,
    })

    onCancel()
  }

  const date = dayjs(scheduleDate)

  return (
    <ConfirmStepForm as="form" onSubmit={handleSubmit(handleConfirmStop)}>
      <FormHeader>
        <Text>
          <CalendarBlank size={24} />
          <time dateTime={date.toISOString()}>
            {date.format('D [de] MMMM [de] YYYY')}
          </time>
        </Text>
        <Text>
          <Clock size={24} />
          <time
            dateTime={date.toISOString()}
            title={date.format('D [de] MMMM [de] YYYY[, às ]HH:mm[ horas.]')}
          >
            {date.format('HH:mm[h]')}
          </time>
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
        <Button type="button" variant="tertiary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ActionsGroup>
    </ConfirmStepForm>
  )
}
