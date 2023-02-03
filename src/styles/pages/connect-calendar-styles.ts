import { Box, styled } from '@ignite-ui/react'

export const ConnectPageContainer = styled('main', {
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

export const ConnectWrapper = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '$4 $6',
    border: '1px solid $gray600',
    borderRadius: '$sm',
  },

  '@media (max-width: 400px)': {
    label: {
      flexDirection: 'column',
      gap: '$4',
    },
  },
})
