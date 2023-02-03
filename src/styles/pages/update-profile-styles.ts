import { Box, styled } from '@ignite-ui/react'

export const UpdateProfilePageContainer = styled('main', {
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

export const UpdateProfileBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const ImageSection = styled('div', {
  width: '100%',

  display: 'flex',
  gap: '$4',
  alignItems: 'center',
})

export const DescriptionInput = styled('label', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  width: '100%',
})
