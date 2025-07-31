import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    fontFamily: 'inherit'
  },
  sizes: {
    sm: {
      field: {
        fontSize: '1.6rem',
        p: '.6rem 1.2rem',
        h: '3.4rem',
        rounded: '1.4rem'
      }
    },
    md: {
      field: {
        fontSize: '1.6rem',
        p: '.8rem 1.6rem',
        h: '4rem',
        rounded: '2.4rem'
      }
    },
    lg: {
      field: {
        h: '4.8rem',
        fontSize: '1.8rem',
        p: '1.2rem 1.8rem',
        rounded: '2.4rem'
      }
    }
  },
  variants: {
    base: () => ({
      field: {
        fontWeight: 'normal',
        border: '1px solid transparent',
        boxShadow: 'none',
        borderRadius: '0.8rem ',
        bgColor: 'gray.700',
        color: 'white',
        py: '1.2rem',
        px: '1.4rem',
        _placeholder: {
          color: 'gray.400'
        },
        _invalid: {
          borderColor: 'red.400'
        },
        _focus: {
          borderColor: 'gray.400'
        }
      }
    })
  },
  defaultProps: {
    size: 'md'
  }
})
