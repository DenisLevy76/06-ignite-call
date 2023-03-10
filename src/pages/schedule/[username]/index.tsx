import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { ScheduleForm } from '../../../components/ScheduleForm'
import { prisma } from '../../../lib/prisma'
import { ScheduleContainer, UserHeader } from '../../../styles/schedule-styles'

interface ScheduleProps {
  user: {
    username: string
    bio: string
    avatarUrl: string
  }
}

const Schedule: React.FC<ScheduleProps> = ({
  user: { avatarUrl, bio, username },
}) => {
  return (
    <>
      <NextSeo
        title={`Agenda de ${username} | Ignite Call`}
        description="Conecte seu calendário e permita que as pessoas marquem
              agendamentos no seu tempo livre."
      />
      <ScheduleContainer>
        <UserHeader>
          <Avatar src={avatarUrl} />
          <Heading>{username}</Heading>
          <Text>{bio}</Text>
        </UserHeader>
        <ScheduleForm />
      </ScheduleContainer>
    </>
  )
}

export default Schedule

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  const revalidateAfterOneDay = 60 * 60 * 24 // 1 day

  return {
    props: {
      user: {
        username: user.username,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: revalidateAfterOneDay,
  }
}
