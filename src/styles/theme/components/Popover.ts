import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    base: {
      content: {
        border: '1px solid',
        borderColor: 'gray.600',
        boxShadow: 'none',
        borderRadius: '1.2rem',
        bgColor: 'gray.850',
        p: '1.6rem',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'none',
        width: '100%'
      }
    }
  },
  defaultProps: {}
})
