import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    fontFamily: 'inherit',
    wordBreak: 'break-all',
    padding: '0'
  },
  sizes: {
    sm: {
      fontSize: '1rem',
      padding: '0.2rem 0.6rem',
      height: '2.2rem'
    },
    md: {
      fontSize: '1.4rem',
      height: '2.9rem',
      padding: '0.5rem 0.8rem'
    },
    lg: {
      fontSize: '1.6rem',
      height: '3.5rem',
      padding: '0.8rem 1.4rem'
    }
  },
  variants: {
    'pill-magenta-fill': {
      gap: 2,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '1.2rem',
      bgColor: 'magenta.400',
      color: 'gray.100',
      h: 'fit-content',
      lineHeight: 'initial',
      textTransform: 'capitalize',
      fontWeight: 500
    }
  },
  defaultProps: {
    size: 'md'
  }
})
