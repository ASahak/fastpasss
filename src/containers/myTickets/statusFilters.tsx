'use client'

import { memo, ReactNode, useState } from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { TicketStatus } from '@/common/enums/ticket'

const STATUSES = [
  { label: 'Active', value: TicketStatus.ACTIVE },
  { label: 'Used', value: TicketStatus.USED },
  { label: 'Expired', value: TicketStatus.EXPIRED }
]
const StatusFilters = ({
  status,
  setStatus
}: {
  status: typeof TicketStatus
  setStatus: (status: typeof TicketStatus) => void
}) => {
  return (
    <Flex
      gap={3}
      p={2}
      borderRadius="2.4rem"
      alignItems="center"
      justifyContent="center"
      bgColor="gray.600"
    >
      {STATUSES.map(
        (s) =>
          (
            <Button
              key={s.value}
              variant={s.value === status ? 'magenta' : 'unstyled'}
              fontSize="1.4rem"
              px={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => setStatus(s.value)}
            >
              {s.label}
            </Button>
          ) as ReactNode
      )}
    </Flex>
  )
}
export default memo(StatusFilters)
