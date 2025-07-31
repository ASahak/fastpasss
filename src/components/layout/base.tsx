'use client'

import { Flex, HStack, VStack } from '@chakra-ui/react';
import Header from './header';
import AppSidebar from '@/components/layout/sidebarWrapper';
import { IChildren } from '@/types/global';
import { useGlobalVariables } from '@/providers/globalVariables';
import { AnimatedPage } from '@/components/features';

const BaseLayout = ({ children }: IChildren) => {
  const { isMobile } = useGlobalVariables()

  return (<Flex as="main" bgColor="gray.900" flex={1} overflow="hidden">
    <HStack spacing={0} w="full" flex={1} alignItems="stretch">
      <AppSidebar />
      <VStack spacing={0} flex={1} px={{ base: '1.6rem', md: '.8rem' }} pb=".8rem" zIndex={1} overflow="hidden">
        <Header/>
        <Flex
          w="full"
          flex={1}
          overflow="hidden"
          {...(!isMobile && {
            p: "2.4rem",
            rounded: "1.6rem",
            bgColor: "gray.800",
            border: "1px solid",
            borderColor: "gray.600"
          })}
        >
          <AnimatedPage>{children}</AnimatedPage>
        </Flex>
      </VStack>
    </HStack>
  </Flex>)
}
export default BaseLayout