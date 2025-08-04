import { memo, ReactNode, useEffect } from 'react'
import dayjs from 'dayjs'
import { Heading, Box, VStack, Text, Button, Flex } from '@chakra-ui/react'
import { useSignTypedData } from 'wagmi'
import { SmartImage } from '@/components/ui/image'
import { ITicket } from '@/common/types/tickets'
import NextLink from 'next/link'
import { usePopup } from '@/providers/popupProvider'
import { POPUP_TYPES } from '@/common/constants/popup'
import { toBig } from '@/utils/helpers/bignumber'
import { HORIZON_CHAIN_ID } from '@/common/constants/global'
import qrCodeIconIcon from '@/assets/qrcode.svg'
import Image from 'next/image'
import metamaskIcon from '@/assets/metamask.svg'

const CardTicket = ({ data }: { data: ITicket }) => {
  const { openPopup } = usePopup()
  const {
    data: typedSignature,
    isLoading: isTypedLoading,
    signTypedData
  } = useSignTypedData()

  const isCheckedId = data.checkedIn === 'true'

  const domain = {
    name: 'FastPassNFT',
    version: '1',
    chainId: HORIZON_CHAIN_ID,
    verifyingContract: data.eventAddress
  }

  const types = {
    Checkin: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'eventId', type: 'uint256' },
      { name: 'nonce', type: 'uint256' }
    ]
  }

  const messageToSign = {
    tokenId: toBig(data.id),
    eventId: toBig(data.eventId),
    nonce: toBig(Date.now())
  }

  const openQRPopup = () => {
    signTypedData({
      domain,
      message: messageToSign,
      primaryType: 'Checkin',
      types
    })
  }

  useEffect(() => {
    if (typedSignature) {
      const payload = {
        v: 2,
        tokenId: data.id,
        eventId: data.eventId,
        nonce: toBig(Date.now()),
        signature: typedSignature
      }

      openPopup(POPUP_TYPES.CHECKIN_TICKET, 'Checkin your Fastpass', payload)
    }
  }, [typedSignature])
  return (
    <VStack
      spacing="1.6rem"
      h="full"
      w="full"
      rounded=".8rem"
      bgColor="gray.700"
      p="1.2rem"
    >
      <Box position="relative" w="full" flex={1}>
        <Flex
          justifyContent="space-between"
          position="absolute"
          top=".6rem"
          left=".6rem"
          w="calc(100% - 1.6rem)"
          zIndex="2"
        >
          <Text
            fontWeight="700"
            fontSize="1.6rem"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="70%"
          >
            {data.eventDescription}
          </Text>

          <Button variant="unstyled" target="_blank" onClick={openQRPopup}>
            <Image width={35} height={35} alt="qr code" src={qrCodeIconIcon} />
          </Button>
        </Flex>
        {data.imageUrl && (
          <SmartImage
            containerProps={{
              minHeight: '20rem'
            }}
            src={data.imageUrl}
            alt={data.eventName}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
              borderRadius: '0.4rem'
            }}
          />
        )}

        <Text
          fontSize="1.2rem"
          color="white"
          justifyContent="space-between"
          position="absolute"
          bottom=".6rem"
          left=".6rem"
          rounded=".6rem"
          bg="#2f2f2fe6"
          p=".5rem .8rem"
        >
          {dayjs(data.eventDate).format('ddd, MMM D • h:mm A')}
        </Text>
      </Box>

      <VStack w="full" spacing=".2rem" alignItems="flex-start">
        <Flex justifyContent="space-between" alignItems="center" w="full">
          <Heading
            fontSize="1.6rem"
            color="white"
            w="full"
            noOfLines={2}
            mb={4}
          >
            {data.eventName}
          </Heading>
          <Text
            bg={isCheckedId ? 'red.300' : 'green.300'}
            rounded="1.6rem"
            fontSize="1.4rem"
            p=".15rem .6rem"
          >
            {isCheckedId ? 'Used' : 'Active'}
          </Text>
        </Flex>
        <Text
          fontSize="1.4rem"
          color="gray.300"
          w="full"
          noOfLines={1}
          mb="1rem"
        >
          {data.eventPlaceName}
        </Text>
        <Flex gap="1rem">
          <Button
            variant="magenta"
            as={NextLink}
            href={`https://horizon.ftnscan.com/token/${data.eventAddress}/instance/${data.id}`}
            target="_blank"
            lineHeight="1rem"
            fontSize="1.2rem"
          >
            View on Ftnscan
          </Button>
          {!isCheckedId &&
            ((
              <Button
                variant="magenta-secondary"
                target="_blank"
                lineHeight="1rem"
                minW="12rem"
                fontSize="1.2rem"
                justifyContent="center"
                onClick={openQRPopup}
              >
                Check-in
              </Button>
            ) as ReactNode)}
        </Flex>
      </VStack>
    </VStack>
  )
}
export default memo(CardTicket)
