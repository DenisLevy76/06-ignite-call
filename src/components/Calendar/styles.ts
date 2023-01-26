import { styled, Text } from '@ignite-ui/react'

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
  width: '100%',
})
export const CalendarHeader = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})
export const CalendarTitle = styled(Text, {
  fontWeight: '$bold',
  color: '$white',

  span: {
    color: '$gray200',
  },
})
export const CalendarActions = styled(Text, {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  },
})

export const CalendarBody = styled('table', {
  width: '100%',
  tableLayout: 'fixed',
  borderSpacing: '0.25rem',

  'thead > th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize: '$sm',
  },

  'tbody:before': {
    content: '',
    height: '$3',
    display: 'block',
  },

  'tbody > td': {
    boxSizing: 'border-box',
  },
})
export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',
  aspectRatio: '1 / 1',
  background: '$gray600',
  textAlign: 'center',
  borderRadius: '$sm',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  '&:disabled': {
    background: 'transparent',
    cursor: 'default',
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
