import { Box, Text, styled } from '@ignite-ui/react'

export const TimesIntervalsPageContainer = styled('main', {
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

export const TimesIntervalsBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const IntervalsList = styled('ol', {
  border: '1px solid $gray600',
  borderRadius: '$md',
})

export const IntervalItem = styled('li', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },

  '@media (max-width: 480px)': {
    flexDirection: 'column',
    gap: '$4',
    alignItems: 'center',
  },
})

export const IntervalDay = styled('label', {
  display: 'flex',
  gap: '$3',
  alignItems: 'center',

  [`${Text}`]: {
    textTransform: 'capitalize',
  },
})

export const IntervalInputsGroup = styled('div', {
  display: 'grid',
  gridTemplateColumns: '100px 100px',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(80%)',
  },

  '@media (max-width: 300px)': {
    gridTemplateColumns: '1fr',
  },
})
