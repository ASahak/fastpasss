import { memo } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Heading, Box, VStack, Text, Button, Icon } from '@chakra-ui/react'
import { RxHeart } from 'react-icons/rx'
import { IEvent } from '@/common/types/events'
import { FASTTICKET_IMAGE_URL } from '@/common/constants/global'
import { SmartImage } from '@/components/ui/image'

const CardEvent = ({ data }: { data: IEvent }) => {
  return (
    <VStack
      href={`/event/${data.contractAddress}`}
      passHref
      as={Link}
      spacing="1.6rem"
      h="full"
      w="full"
      rounded=".8rem"
      bgColor="gray.700"
      p="1.2rem"
      cursor="pointer"
      willChange="transform"
      transition="transform .2s"
      _hover={{ transform: 'scale(1.01)', textDecoration: 'none' }} // Prevent underline on hover
    >
      <Box position="relative" w="full" flex={1}>
        <Button
          position="absolute"
          bgColor="#00000045"
          border="1px solid"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderColor="gray.400"
          top=".4rem"
          right=".4rem"
          zIndex={1}
          variant="unstyled"
          w="3.6rem"
          h="3.6rem"
          rounded="full"
          onClick={(e) => {
            e.preventDefault() // Prevent navigation when clicking the heart
            // Add your favorite/wishlist logic here
            console.log(`Toggled favorite for event ${data.event_id}`)
          }}
        >
          <Icon as={RxHeart} fontSize="2rem" />
        </Button>
        <SmartImage
          src={`${FASTTICKET_IMAGE_URL}/${data.media_paths[0]}`}
          alt={data.title} // Use the actual event title for the alt text
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            borderRadius: '0.4rem'
          }}
        />
      </Box>
      <VStack w="full" spacing=".2rem" alignItems="flex-start">
        <Heading fontSize="1.6rem" color="white" w="full" noOfLines={2} mb={4}>
          {data.title}
        </Heading>
        <Text fontSize="1.4rem" color="gray.300" w="full">
          {dayjs(data.start_date).format('ddd, MMM D • h:mm A')}
        </Text>
        <Text fontSize="1.4rem" color="gray.300" w="full" noOfLines={1}>
          {data.placeName}
        </Text>
        <Text fontSize="1.4rem" color="gray.300" w="full">
          {data.price} FTN
        </Text>
      </VStack>
    </VStack>
  )
}
export default memo(CardEvent)
