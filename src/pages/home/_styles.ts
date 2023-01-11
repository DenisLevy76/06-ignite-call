import { styled, Text, Heading } from '@ignite-ui/react'

export const HomeContainer = styled('main', {
  display: 'flex',
  maxWidth: 'calc(100vw - ((100vw - 1280px) / 2))',
  marginLeft: 'auto',
  height: '100vh',
  alignItems: 'center',
  overflow: 'hidden',

  '@media (max-width: 700px)': {
    img: {
      display: 'none',
    },
  },
})

export const HeroContainer = styled('div', {
  background: 'url(/textures/backgroundTexture.png)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',

  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$20',

  '@media (max-width: 700px)': {
    padding: '$4',
  },
})

export const Hero = styled('article', {
  maxWidth: 480,
  textAlign: 'left',

  [`> ${Text}`]: {
    color: '$gray200',
    marginTop: '$2',
  },

  '@media (max-width: 700px)': {
    textAlign: 'center',

    [`> ${Heading}`]: {
      fontSize: '$4xl',
    },

    [`> ${Text}`]: {
      fontSize: '$md',
    },
  },
})
