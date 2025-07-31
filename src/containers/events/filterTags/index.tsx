import { memo, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { MusicIcon, GlobeIcon, FoodIcon, GameIcon, HeartIcon, WorkIcon, CalendarIcon, MaskIcon } from "@/components/ui/icons";
import { Box, Button, Icon } from '@chakra-ui/react';
import { SmartTags } from '@/components/features';
import { useEventsStore } from '@/store/events';

const FILTER_TAGS = [
  { label: 'All Types', value: '*', icon: null },
  { label: 'Music', value: 'music', icon: MusicIcon },
  { label: 'Nightlife', value: 'nightlife', icon: GlobeIcon },
  { label: 'Performing', value: 'performing', icon: MaskIcon },
  { label: 'Holiday', value: 'holiday', icon: CalendarIcon },
  { label: 'Dating', value: 'dating', icon: HeartIcon },
  { label: 'Bobbies', value: 'bobbies', icon: GameIcon },
  { label: 'Business', value: 'business', icon: WorkIcon },
  { label: 'Food & Drink', value: 'food_drink ', icon: FoodIcon },
]
const FilterTags = () => {
  const { active, setActive } = useEventsStore(useShallow((state) => ({
    active: state.activeFilter,
    setActive: state.actions.setActiveFilter
  })))

  const onFilter = useCallback((index: number) => {
    setActive(FILTER_TAGS[index].value)
  }, [])

  const renderTag = useCallback((tagValue: string) => {
    const tag = FILTER_TAGS.find(e => e.value === tagValue);

    return (<Button
      variant="tag"
      key={tag!.value}
      {...active === tag!.value && { color: '#000 !important', bgColor: 'white !important'}}
    >
      {tag!.icon ? <Icon as={tag!.icon} fontSize="2rem" /> : null}
      {tag!.label}
    </Button>)
  }, [active])

  return (<Box pb="2.4rem" w="full"><SmartTags
    elements={FILTER_TAGS}
    renderTag={renderTag}
    defaultActiveIndex={0}
    emitTabChange={onFilter}
  /></Box>)
}

export default memo(FilterTags)