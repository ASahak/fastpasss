export default {
  global: (props: any) => ({
    ':root': {
      '--header-height': '6rem',
      '--sidebar-width': '24.8rem',
    },
    html: {
      fontSize: '10px',
      [`@media only screen and (min-width: ${props.theme.breakpoints['4xl']})`]:
        {
          fontSize: '18px'
        }
    },
    'body *': {
      fontFamily: '"Montserrat", sans-serif',
      margin: '0',
      boxSizing: 'border-box',
    },
    body: {
      background: 'gray.900',
      height: '100dvh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    '#chakra-toast-manager-top-right': {
      top: '6rem !important'
    },
    '.w-full': {
      width: '100%'
    },
    '.sr-only': {
      border: '0 !important',
      clip: 'rect(1px, 1px, 1px, 1px) !important',
      WebkitClipPath: 'inset(50%) !important',
      clipPath: 'inset(50%) !important',
      height: '1px !important',
      margin: '-1px !important',
      overflow: 'hidden !important',
      padding: '0 !important',
      position: 'absolute !important',
      width: '1px !important',
      whiteSpace: 'nowrap !important'
    },
    // Custom scrollbar
    '.increase-height-hover': {
      transition: 'width .1s',
      '&:hover, &:active': {
        width: '.8rem !important'
      }
    },
    '.increase-width-hover': {
      transition: 'height .1s',
      '&:hover, &:active': {
        height: '.8rem !important'
      }
    },
    // _________
    '.non-visible-scroll': {
      '@media screen and (hover: hover)': {
        '::-webkit-scrollbar': {
          width: '0px',
          height: '0px'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent'
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent'
        }
      }
    },
    '.prevent_rtl': {
      direction: 'ltr',
      textAlign: 'left'
    }
  })
}
