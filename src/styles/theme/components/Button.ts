import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: () => ({
    fontSize: '1.6rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '400',
    rounded: '0.8rem',
    h: 'auto',
    _hover: {}
  }),
  sizes: {
    sm: {
      fontSize: '1.2rem',
      p: '.6rem 1.2rem',
      rounded: '1.4rem'
    },
    md: {
      fontSize: '1.4rem',
      p: '.8rem 1.6rem',
      rounded: '2.4rem'
    },
    lg: {
      fontSize: '1.6rem',
      p: '1.2rem 1.8rem',
      rounded: '2.4rem'
    }
  },
  variants: {
    unstyled: {
      border: 'none',
      bgColor: 'transparent !important',
      h: 'auto',
      minW: 'auto',
      w: 'auto',
      p: 0
    },
    magenta: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      lineHeight: '2rem',
      color: 'white',
      bgColor: 'var(--chakra-colors-magenta-400)',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      _hover: {
        bg: 'var(--chakra-colors-magenta-450)'
      },
      _active: {
        bg: 'var(--chakra-colors-magenta-450)'
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline: '1px solid var(--chakra-colors-magenta-450)'
      },
      _disabled: {
        opacity: 1,
        bg: 'var(--chakra-colors-magenta-800) !important',
        color: 'white !important'
      }
    },
    connect: {
      fontSize: '1.3rem',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      bg: 'gray.700',
      border: 'none',
      rounded: '1.2rem',
      display: 'flex',
      justifyContent: 'flex-start',
      h: 'auto',
      p: '1.2rem',
      gap: '1.2rem',
      _hover: {
        bgColor: 'gray.600'
      }
    },
    tag: {
      fontSize: '1.4rem',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      bg: 'gray.600',
      border: 'none',
      rounded: '2.4rem',
      display: 'flex',
      alignItems: 'center',
      color: 'gray.400',
      justifyContent: 'center',
      h: 'auto',
      px: '1.6rem',
      py: '.8rem',
      gap: '.6rem',
      _hover: {
        bgColor: 'gray.700'
      }
    },
    'popover-btn': {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      color: 'gray.300',
      bgColor: 'gray.700',
      border: '1px solid',
      borderColor: 'gray.600',
      rounded: '2.4rem',
      h: '4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.4rem',
      _hover: {
        bgColor: 'gray.800',
        borderColor: 'gray.400'
      },
      _active: {
        bgColor: 'gray.800',
        borderColor: 'gray.400',
        _hover: {
          borderColor: 'gray.400'
        }
      },
      _focus: {
        boxShadow: 'none',
        bgColor: 'gray.800',
        borderColor: 'gray.400',
        _hover: {
          borderColor: 'gray.400'
        }
      }
    },
    'magenta-secondary': {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      color: 'white',
      // bgColor: 'gray.700',
      border: '1px solid',
      borderColor: 'var(--chakra-colors-magenta-400)',
      rounded: '2.4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.4rem',
      _hover: {
        bgColor: 'gray.800',
        borderColor: 'var(--chakra-colors-magenta-350)'
      },
      _active: {
        bgColor: 'gray.800',
        borderColor: 'gray.400',
        _hover: {
          borderColor: 'gray.400'
        }
      },
      _focus: {
        boxShadow: 'none',
        bgColor: 'gray.800',
        borderColor: 'gray.400',
        _hover: {
          borderColor: 'gray.400'
        }
      }
    }
  },
  defaultProps: {
    size: 'md'
  }
})
