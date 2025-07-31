import { toBig } from '@/utils/helpers/bignumber';
import { formatUnitValue } from '@/utils/helpers/global';
import { IEvent } from '@/common/types/events';

export const populateEventStruct = (data: any): IEvent => ({
  contractAddress: data.contractAddress,
  description: data._description,
  event_id: toBig(data._eventId).toString(),
  media_paths: data._media,
  price: toBig(formatUnitValue(data._priceWei, 6/*todo*/)).toString(),
  organization_name: data._org,
  title: data._title,
  placeName: data._place,
  start_date: toBig(data._start).toString(),
})