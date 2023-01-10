import { globalCss } from '@ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    border: 0,
  },

  body: {
    backgroundColor: '$gray900',
  },

  'body, input, button, textarea': {
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },
})
