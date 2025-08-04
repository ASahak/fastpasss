import { memo, useMemo } from 'react'
import { Box, Flex, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'
import { IEvent } from '@/common/types/events'
import { Empty, Spinner } from '@/components/ui'
import EventCard from './card'

type IProps = {
  data: IEvent[] | undefined
  loading: boolean
}

const _Card = ({ data }: any) => (
  <GridItem
    w="full"
    h="full"
    display="flex"
    alignItems="center"
    justifyContent="center"
    minH="150px"
    overflow="hidden"
  >
    <EventCard data={data} />
  </GridItem>
)

const Events = ({ data, loading }: IProps) => {
  const length = data?.length || 0
  const content = useMemo(() => {
    if (loading)
      return (
        <Flex justifyContent="center" alignItems="center" w="full" h="full">
          <Spinner
            w="40px"
            h="40px"
            size="4px"
            color="var(--chakra-colors-blue-300)"
          />
        </Flex>
      )

    if (!data) return <Empty />

    switch (length) {
      case 1:
        return (
          <Flex w="full" h="full">
            <_Card data={data[0]} />
          </Flex>
        )

      case 2:
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full" h="full">
            <_Card data={data[0]} />
            <_Card data={data[1]} />
          </Grid>
        )

      case 3:
        return (
          <Grid
            w="full"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <GridItem rowSpan={2}>
              <_Card data={data[0]} />
            </GridItem>
            <_Card data={data[1]} />
            <_Card data={data[2]} />
          </Grid>
        )

      case 4:
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full" h="full">
            {data.map((item, index) => (
              <_Card key={index} data={item} />
            ))}
          </Grid>
        )

      case 5:
        return (
          <Grid
            w="full"
            h="full"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <GridItem colSpan={1} rowSpan={2}>
              <_Card data={data[0]} />
            </GridItem>
            <GridItem colSpan={1}>
              <_Card data={data[1]} />
            </GridItem>
            <GridItem colSpan={1}>
              <_Card data={data[2]} />
            </GridItem>
            <GridItem colSpan={1}>
              <_Card data={data[3]} />
            </GridItem>
            <GridItem colSpan={1}>
              <_Card data={data[4]} />
            </GridItem>
          </Grid>
        )

      // Default case: No items or more than 5.
      default:
        return <Empty />
    }
  }, [data, length, loading])

  return (
    <VStack spacing="1.8rem" w="full" flex={1}>
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize="2.4rem" color="white">
          Trending Events near Yerevan
        </Heading>
        <Box />
      </Flex>
      {
        (!loading && !data) || (data && length === 0) ? (
          <Flex justifyContent="center" py={8} h="full" w="full">
            <Empty />
          </Flex>
        ) : (
          <Flex w="full" flex={1}>
            {content}
          </Flex>
        )
        // <Grid w="full" gap="1.6rem" gridTemplate={templateArea}>
        //   {length === 1
        //     ? <GridItem gridArea="a" h={{ base: '40rem', md: '50rem' }}>
        //       {loading
        //         ? <Skeleton/>
        //         : <EventCard data={data![0]}/>
        //       }
        //     </GridItem>
        //     : <>
        //       <GridItem gridArea="a" h={{ base: '40rem', md: length === 1 ? '50rem' : 'auto' }}>
        //         {loading
        //           ? <Skeleton/>
        //           : <EventCard data={data![0]}/>
        //         }
        //       </GridItem>
        //       <GridItem gridArea="b" h={{ base: '40rem', lg: '30rem' }}>
        //         {loading
        //           ? <Skeleton/>
        //           : data![1] ? <EventCard data={data![1]}/> : null
        //         }
        //       </GridItem>
        //       <GridItem gridArea="c" h={{ base: '40rem', lg: '30rem' }}>
        //         {loading
        //           ? <Skeleton/>
        //           : data![2] ? <EventCard data={data![2]}/> : null
        //         }
        //       </GridItem>
        //       {(length > 3 || loading) ? (<>
        //         <GridItem gridArea="d" h={{ base: '40rem', lg: '30rem' }}>
        //           {loading
        //             ? <Skeleton/>
        //             : <EventCard data={data![3]}/>
        //           }
        //         </GridItem>
        //         <GridItem gridArea="e" h={{ base: '40rem', lg: '30rem' }}>
        //           {loading
        //             ? <Skeleton/>
        //             : data![4] ? <EventCard data={data![4]}/> : null
        //           }
        //         </GridItem>
        //       </>) : null}
        //     </>
        //   }
        // </Grid>
      }
    </VStack>
  )
}

export default memo(Events)
