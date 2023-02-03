import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import {
  DescriptionInput,
  ImageSection,
  UpdateProfileBox,
  UpdateProfilePageContainer,
} from './_styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth'
import { BuildAuthOptions } from '../../api/auth/[...nextauth]'
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const UpdateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof UpdateProfileFormSchema>

const UpdateProfile: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(UpdateProfileFormSchema),
  })

  const handleUpdateProfile = async (data: UpdateProfileFormData) => {
    await api.patch('/users/profile', {
      bio: data.bio,
    })

    router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Registro 4/4 | Ignite Call" noindex />
      <UpdateProfilePageContainer>
        <header>
          <Heading as="strong">Defina sua disponibilidade</Heading>
          <Text css={{ color: '$gray200' }}>
            Por último, uma breve descrição e uma foto de perfil.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </header>
        <UpdateProfileBox
          as="form"
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <ImageSection>
            {session.data?.user && (
              <>
                <Avatar
                  src={session.data.user.avatar_url}
                  alt={session.data.user.name}
                />
                <Text>{session.data.user.username}</Text>
              </>
            )}
          </ImageSection>
          <DescriptionInput>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
            <Text size="sm" css={{ color: '$gray200' }}>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </Text>
          </DescriptionInput>
          <Button type="submit" disabled={isSubmitting}>
            Finalizar <ArrowRight size={24} />
          </Button>
        </UpdateProfileBox>
      </UpdateProfilePageContainer>
    </>
  )
}

export default UpdateProfile

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    BuildAuthOptions(req, res),
  )

  if (!session) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
