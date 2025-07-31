import type { QueryClient } from '@tanstack/react-query'

import {
  QUERY_KEYS_FACTORY,
  WHITE_LIST_OF_RESET_QUERY
} from '@/common/constants/query'
import { sleep } from '@/utils/helpers/global'

export const reFetchQueryCalls = (
  queryClient: QueryClient,
  ignoreWhiteList?: Array<(typeof WHITE_LIST_OF_RESET_QUERY)[number]>
) => {
  const whiteList = WHITE_LIST_OF_RESET_QUERY.filter(
    (e) => !(ignoreWhiteList ?? []).includes(e)
  )
  // Revalidate data for each QUERY_KEYS_FACTORY key
  Object.values(QUERY_KEYS_FACTORY).forEach((key) => {
    if (!whiteList.includes(key as never)) {
      queryClient.refetchQueries({ queryKey: [key] })
    }
  })
}

export const deleteQueryCaches = async (
  queryClient: QueryClient
): Promise<any> => {
  const cache = queryClient.getQueryCache()
  const keys = cache.getAll().map((query) => query.queryKey)
  keys.forEach((key) => {
    const ableToReset = !WHITE_LIST_OF_RESET_QUERY.includes(key[0] as never)
    if (ableToReset) {
      queryClient.removeQueries({ queryKey: key })
    }
  })
  return await sleep(0)
}