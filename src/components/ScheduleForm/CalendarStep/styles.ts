import { Box, styled, Text } from '@ignite-ui/react'

export const CalendarStepContainer = styled(Box, {
  margin: '$6 auto 0',
  padding: '0',
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',
        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        gridTemplateColumns: '1fr',
        width: 540,
      },
    },
  },
})

export const TimePicker = styled('div', {
  padding: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  borderLeft: '1px solid $colors$gray600',

  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,

  '@media (max-width: 900px)': {
    position: 'initial',
    width: 'auto',
  },
})

export const TimePickerTitle = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
})

export const TimePickerList = styled('ol', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
  listStyle: 'none',
  overflowY: 'auto',
  paddingRight: '$2',

  'li > button': {
    width: '100%',
    background: '$gray600',
    borderRadius: '$sm',
    textAlign: 'center',
    padding: '$2 $4',
    fontSize: '$sm',
    cursor: 'pointer',
  },

  '&::-webkit-scrollbar': {
    width: '$2',
  },

  '&::-webkit-scrollbar-track': {
    background: '$gray600',
    borderRadius: '$sm',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$gray800',
    borderRadius: '$sm',
    border: '2px solid $colors$gray600',
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: '$gray700',
    borderRadius: '$sm',
  },

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',

    'li > button': {
      padding: '$4 $6',
      fontSize: '$md',
    },
  },
})
