import { memo, useRef } from 'react'
import { Button, Flex, Icon, Input } from '@chakra-ui/react'
import { HiOutlineSearch } from 'react-icons/hi'

const BaseSearch = () => {
  const fieldRef = useRef<HTMLInputElement>(null)

  const onFocusField = () => {
    fieldRef.current?.focus()
  }

  return (
    <Flex position="relative" onClick={onFocusField}>
      <Icon
        cursor="text"
        position="absolute"
        zIndex={1}
        fontSize="2rem"
        color="gray.400"
        inset={0}
        my="auto"
        ml="1.6rem"
        as={HiOutlineSearch}
      />
      <Input
        type="text"
        ref={fieldRef}
        placeholder="Search Event"
        size="lg"
        variant="base"
        w="full"
        pl="4.4rem"
        pr="5rem"
      />
      <Button
        bgColor="gray.500"
        w="3.6rem"
        h="3.6rem"
        position="absolute"
        zIndex={1}
        right={0}
        top={0}
        bottom={0}
        fontSize="2rem"
        color="gray.400"
        my="auto"
        mx=".6rem"
      >
        <Icon as={HiOutlineSearch} color="white" />
      </Button>
    </Flex>
  )
}
export default memo(BaseSearch)
