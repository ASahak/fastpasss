'use client'

import { memo } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, List, ListItem, VStack, Link as ChakraLink, Flex, Button, Icon } from '@chakra-ui/react'
import { RxCross1 } from 'react-icons/rx';
import { ROUTES } from '@/common/constants/routes';
import { RemoveScroll } from 'react-remove-scroll';
import { AnimatePresence, domAnimation, Easing, LazyMotion, m } from 'framer-motion';
import { useGlobalVariables } from '@/providers/globalVariables';
import { BaseSearch } from '@/components/features';
import { useAccount } from 'wagmi';

const variants = {
  initial: { opacity: 0, x: 0, y: 40, transform: 'scale(.9)' },
  in: { opacity: 1, x: 0, y: 0, transform: 'scale(1)' },
  exit: { opacity: 0, y: 40, transform: 'scale(.9)' }
}
const drawerTransition = {
  ease: 'linear' as Easing,
  duration: 0.2
}

const NAV_ITEMS = [
  { label: 'Events', href: ROUTES.EVENTS },
  { label: 'My Tickets', href: ROUTES.MY_TICKETS, needAuth: true },
  { label: 'Favorites', href: ROUTES.FAVORITES },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'FAQs', href: ROUTES.FAQ },
]

const SidebarWrapper = () => {
  const pathname = usePathname()
  const { address } = useAccount()
  const { navDrawerIsOpen, setNavDrawerIsOpen } = useGlobalVariables()

  const navItems = (<>
    <List w="full" flex={1}>
      {NAV_ITEMS.map((item) => {
        if (item.needAuth && !address) return null

        const isActive = pathname === item.href
        return (
          <ListItem
            key={item.href}
            lineHeight="2.4rem"
            p="1.2rem"
            color={isActive ? 'white' : 'gray.450'}
            pl={{ base: '0', md: '2.4rem' }}
            fontSize="1.6rem"
            fontWeight={isActive ? 700 : 500}
          >
            <ChakraLink as={NextLink} href={item.href}
                        _hover={{ textDecoration: 'none', color: isActive ? 'white' : 'gray.300' }}>
              {item.label}
            </ChakraLink>
          </ListItem>
        )
      })}
    </List>
    <Flex>
      <ChakraLink
        p="1rem 1.2rem"
        color={'gray.450'}
        fontSize="1.4rem"
        fontWeight={500}
        as={NextLink}
        href={ROUTES.PRIVACY}
        _hover={{ textDecoration: 'none', color: 'gray.300' }}>
        Privacy Policy
      </ChakraLink>
    </Flex>
  </>)

  return (<RemoveScroll
      enabled={navDrawerIsOpen}
      style={{ position: 'relative', zIndex: 2 }}
    >
      <Flex h="full" w="var(--sidebar-width)" display={{ base: 'none', md: 'flex' }}>
        <VStack spacing={0} align="start" h="full" w="inherit">
          <Box h="var(--header-height)" w="full"/>
          {navItems}
        </VStack>
      </Flex>
      <AnimatePresence>
        {navDrawerIsOpen && (
          <LazyMotion features={domAnimation}>
            <m.div
              initial="initial"
              animate="in"
              exit={variants.exit}
              variants={variants}
              transition={drawerTransition}
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'var(--chakra-colors-gray-800)',
                position: "fixed"
              }}
            >
              <VStack
                spacing="1.2rem"
                w="ful"
                align="start"
                h="full"
                display={{ base: 'flex', md: 'none' }}
                px={{ base: '1.6rem', md: '.8rem' }}>
                {/*Mobile Menu button*/}
                <Box display={{ base: 'flex', md: 'none' }} h="var(--header-height)" w="full">
                  <Button variant="unstyled" display="flex" onClick={() => setNavDrawerIsOpen(false)}>
                    <Icon as={RxCross1} fontSize="3rem"/>
                  </Button>
                </Box>
                {/*_____*/}
                <Box w="full">
                  <BaseSearch/>
                </Box>

                {navItems}
              </VStack>
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}

export default memo(SidebarWrapper)
