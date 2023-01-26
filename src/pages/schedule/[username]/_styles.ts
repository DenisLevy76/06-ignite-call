import { Heading, styled, Text } from '@ignite-ui/react'

export const ScheduleContainer = styled('main', {
  maxWidth: 852,
  padding: '0 $4',
  margin: '$20 auto $4',
})

export const UserHeader = styled('header', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  [`${Heading}`]: {
    marginTop: '$2',
    lineHeight: '$base',
  },
  [`${Text}`]: {
    color: '$gray200',
  },
})
