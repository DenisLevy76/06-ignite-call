import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './_styles'
import { ArrowRight } from 'phosphor-react'

export const FormUsernameRegister: React.FC = () => {
  return (
    <Form as="form">
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-nome-de-usuário"
      />
      <Button size="sm">
        Reservar <ArrowRight size={24} />
      </Button>
    </Form>
  )
}
