'use client'

import { memo } from 'react';
import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { BaseSearch, ConnectWalletBtn } from '@/components/features';
import { useGlobalVariables } from '@/providers/globalVariables';

const Header = () => {
  const { setNavDrawerIsOpen } = useGlobalVariables()

  return (
    <Flex as="header" w="full" alignItems="center" justifyContent="space-between" h="var(--header-height)">
      {/*Mobile Menu button*/}
      <Box display={{ base: 'flex', md: 'none' }}>
        <Button variant="unstyled" display="flex" onClick={() => setNavDrawerIsOpen(true)}>
          <Icon as={RxHamburgerMenu} fontSize="3rem"/>
        </Button>
      </Box>
      {/**/}

      <Box display={{ base: 'none', md: 'flex' }}/>
      <Box w="min(50%, 52rem)" display={{ base: 'none', md: 'block' }}>
        <BaseSearch/>
      </Box>
      <ConnectWalletBtn />
    </Flex>
  )
}

export default memo(Header);