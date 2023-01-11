import { Box, Text, styled } from '@ignite-ui/react'

export const RegisterPageContainer = styled('main', {
  maxWidth: 540,
  boxSizing: 'initial',
  padding: '0 $4',
  margin: '0 auto',
  marginTop: '$20',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3',
  },
})

export const RegisterForm = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    [`${Text}`]: {
      marginBottom: '$2',
    },
  },
})
