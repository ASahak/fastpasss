'use client'

import { memo } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import { RxCalendar } from "react-icons/rx";
import { RiMapPin2Line } from "react-icons/ri";
import { Box, Flex, Heading, VStack, Badge, Text, Icon, Button } from '@chakra-ui/react';
import { FASTTICKET_IMAGE_URL } from '@/common/constants/global';
import { Empty, SmartImage } from '@/components/ui';
import { POPUP_TYPES } from '@/common/constants/popup';
import { usePopup } from '@/providers/popupProvider';
import { AddressType } from '@/common/types/global';
import { useFetchEvent } from '@/hooks/queries/useFetchEvent';
import Skeleton from 'react-skeleton-builder';

type IProps = {
  address: AddressType
}
const EventDetails = ({ address: contractAddress }: IProps) => {
  const event = useFetchEvent(contractAddress as AddressType)
  const { address } = useAccount()
  const { openPopup } = usePopup()

  const onMint = () => {
    if(!address) {
      openPopup(POPUP_TYPES.CONNECT_WALLET, 'Connect Your Wallet', {})
      return
    }
  }

  return event.isLoading ? <Skeleton
    styles={{ width: "100%", height: "100%" }}
    grid={{
      direction: "column" as never,
      gridGap: "4",
      children: [
        { h: "36rem", skeletons: [{ r: ".6rem" }] },
        {
          direction: "column" as never,
          h: "9rem",
          skeletons: [{ w: "70%", r: ".6rem" }, { w: "50%", r: ".6rem" }]
        },
        { skeletons: [{ w: "60%", r: ".6rem" }] }
      ]
    }}
  /> : event.data ? <VStack spacing="4rem" w="full">
    <VStack w="full" spacing="1rem">
      <Box position="relative" w="full" h="36rem">
        <SmartImage
          src={`${FASTTICKET_IMAGE_URL}/${event.data.media_paths[0]}`}
          alt={event.data.title} // Use the actual event title for the alt text
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            borderRadius: '0.4rem'
          }}
        />
      </Box>
      <Flex justifyContent="space-between" alignItems="center" gap={6} w="full">
        <Heading>{event.data.title}</Heading>
        <Badge variant="pill-magenta-fill" borderRadius=".6rem">{event.data.price} FTN</Badge>
      </Flex>
    </VStack>
    <VStack
      spacing="2.4rem"
      w="full"
      p="2.4rem"
      rounded="1rem"
      bgColor="gray.700"
      border="1px solid"
      borderColor="gray.600"
    >
      <Heading fontSize="2.4rem" w="full">About Ehe Event</Heading>
      <VStack spacing="1.2rem" w="full" alignItems="start">
        <Text fontSize="1.8rem" fontWeight={500}>
          Location
        </Text>
        <Text fontSize="1.6rem" fontWeight={500} display="flex" gap={3} alignItems="center">
          <Icon as={RiMapPin2Line} fontSize="1.8rem" />
          {event.data.placeName}
        </Text>
      </VStack>
      <VStack spacing="1.2rem" w="full" alignItems="start">
        <Text fontSize="1.8rem" fontWeight={500}>
          Date & Time
        </Text>
        <Text fontSize="1.6rem" fontWeight={500} display="flex" gap={3} alignItems="center">
          <Icon as={RxCalendar} fontSize="1.8rem"/>
          {dayjs(event.data.start_date).format('ddd, MMM D • h:mm A')}
        </Text>
      </VStack>
    </VStack>
    <VStack spacing="1.2rem" w="full" alignItems="start">
      <Text fontSize="1.8rem" fontWeight={500}>
        Description
      </Text>
      <Text fontSize="1.6rem" fontWeight={500}>
        {event.data.description}
      </Text>
    </VStack>
    <Flex w="full">
      <Button variant="magenta" onClick={onMint}>{!address ? 'Connect To Mint Your Ticket' : 'Mint Your Fastpass'}</Button>
    </Flex>
  </VStack> : <Empty />
}

export default memo(EventDetails)