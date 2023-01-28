import { Box, styled, Text } from '@ignite-ui/react'

export const ConfirmStepForm = styled(Box, {
  maxWidth: 540,
  width: '100%',
  padding: '$6',
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormHeader = styled('header', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  paddingBottom: '$6',
  borderBottom: '1px solid $gray600',

  [`${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray400',
    },
  },
})

export const ActionsGroup = styled('div', {
  display: 'flex',
  gap: '$2',
  alignItems: 'center',
  justifyContent: 'flex-end',
})
