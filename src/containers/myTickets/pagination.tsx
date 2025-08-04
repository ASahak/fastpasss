'use client'

import { memo, useState } from 'react'
import { Flex, Icon, Button } from '@chakra-ui/react'
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx'

type IProps = {
  maxPages: number
}
const Pagination = ({ maxPages }: IProps) => {
  const [page, setPage] = useState(1)

  return (
    <Flex
      gap={3}
      fontSize="1.5rem"
      px={4}
      border="1px
      solid"
      borderColor="gray.600"
      borderRadius="2rem"
      h="3.6rem"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        variant="unstyled"
        w="2rem"
        fontSize="2.2rem"
        h="2rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={RxChevronLeft} />
      </Button>
      {page} of {maxPages}
      <Button
        variant="unstyled"
        w="2rem"
        h="2rem"
        fontSize="2.2rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={RxChevronRight} />
      </Button>
    </Flex>
  )
}
export default memo(Pagination)
