import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    base: {
      list: {
        border: '1px solid',
        borderColor: 'gray.600',
        boxShadow: 'none',
        borderRadius: '1.2rem',
        bgColor: 'gray.850',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'none',
        width: '100%'
      },
      item: {
        bgColor: 'transparent',
        color: 'gray.100',
        p: '1.2rem',
        _hover: {
          bgColor: 'gray.700'
        },
        _active: {
          bgColor: 'gray.700'
        },
        _focus: {
          bgColor: 'gray.700'
        }
      }
    }
  },
  defaultProps: {}
})
