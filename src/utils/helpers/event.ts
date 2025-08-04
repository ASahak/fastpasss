import { toBig } from '@/utils/helpers/bignumber'
import { formatUnitValue } from '@/utils/helpers/global'
import { IEvent } from '@/common/types/events'
import { FTN_DECIMAL } from '@/common/constants/global'

export const populateEventStruct = (data: any): IEvent => ({
  contractAddress: data.contractAddr,
  description: data.desc,
  event_id: toBig(data.eid).toString(),
  media_paths: data.media,
  price: toBig(formatUnitValue(data.priceWei, FTN_DECIMAL)).toString(),
  organization_name: data.org,
  title: data.title,
  placeName: data.place,
  start_date: toBig(data.startStr).toString()
})
