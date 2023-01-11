import { Box, Text, styled } from '@ignite-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  '@media (max-width: 450px)': {
    gridTemplateColumns: '1fr',
  },
})

export const HelperText = styled(Text, {
  color: '#f75a68 !important',
  marginTop: '$2 !important',
  display: 'inline-block',
})
